// ============================================================
// Asphalt Paving Job Cost Calculator Engine
// Design: Industrial Blueprint — precision-first calculations
// All defaults based on industry research (2024-2025 data)
// ============================================================

// --- Types ---

export interface LiftConfig {
  id: string;
  name: string;
  mixType: string;
  thicknessInches: number;
  enabled: boolean;
}

export interface CrewMember {
  id: string;
  role: string;
  hourlyWage: number;
  count: number;
}

export interface EquipmentItem {
  id: string;
  name: string;
  monthlyPayment: number;
  fuelGallonsPerHour: number;
}

export interface OverheadItem {
  id: string;
  name: string;
  monthlyAmount: number;
}

export interface LoanItem {
  id: string;
  name: string;
  monthlyPayment: number;
}

export interface SitePrepItem {
  id: string;
  name: string;
  costPerSqFt: number;
  enabled: boolean;
}

export interface CalculatorInputs {
  // Job Details
  jobLength: number; // feet
  jobWidth: number; // feet
  lifts: LiftConfig[];
  asphaltDensity: number; // lbs per cubic foot
  wasteFactor: number; // percentage (typically 5-10%)

  // Hauling
  distanceToPlant: number; // miles one way
  truckCapacity: number; // tons per load
  truckCostPerHour: number; // $/hr for truck+driver
  avgTruckSpeed: number; // mph
  loadingTime: number; // minutes
  unloadingTime: number; // minutes

  // Materials
  asphaltCostPerTon: number;
  tackCoatRate: number; // gal per sq yd
  tackCoatCostPerGal: number;
  aggregateBaseCostPerTon: number;
  aggregateBaseThickness: number; // inches (0 = none)
  aggregateBaseDensity: number; // lbs/cu ft
  geotextileCostPerSqYd: number;
  useGeotextile: boolean;
  edgeMaterialsCost: number; // flat cost for job

  // Labor
  crew: CrewMember[];
  productionRate: number; // tons per hour
  payrollTaxRate: number; // percentage (FICA + FUTA + SUTA)
  workersCompRate: number; // percentage of payroll

  // Equipment
  equipment: EquipmentItem[];
  dieselCostPerGallon: number;

  // Overhead
  overhead: OverheadItem[];
  estimatedJobsPerMonth: number;

  // Loans / Financing
  loans: LoanItem[];

  // Owner's Salary
  ownerMonthlySalary: number;

  // Site Prep
  sitePrep: SitePrepItem[];

  // Margin
  targetNetMargin: number; // percentage (default 40)
}

export interface CalculatorResults {
  // Tonnage
  totalArea: number; // sq ft
  totalAreaSqYd: number;
  liftDetails: Array<{
    name: string;
    mixType: string;
    thickness: number;
    volumeCuFt: number;
    tons: number;
  }>;
  totalTons: number;
  totalTruckLoads: number;

  // Hauling
  roundTripMinutes: number;
  totalHaulHours: number;
  haulCost: number;

  // Materials
  asphaltMaterialCost: number;
  tackCoatCost: number;
  aggregateBaseCost: number;
  aggregateBaseTons: number;
  geotextileCost: number;
  edgeMaterialsCost: number;
  totalMaterialsCost: number;

  // Labor
  jobHours: number;
  laborCostBeforeBurden: number;
  payrollTaxCost: number;
  workersCompCost: number;
  totalLaborCost: number;

  // Equipment
  equipmentFuelCost: number;
  equipmentAllocation: number;
  totalEquipmentCost: number;

  // Overhead
  totalMonthlyOverhead: number;
  overheadAllocation: number;

  // Loans
  totalMonthlyLoans: number;
  loanAllocation: number;

  // Owner's Salary
  ownerAllocation: number;

  // Site Prep
  totalSitePrepCost: number;

  // Totals
  totalJobCost: number;
  marginAmount: number;
  totalJobPrice: number;
  pricePerTon: number;
  pricePerSqFt: number;
  costPerTon: number;
  costPerSqFt: number;
}

// --- Default Values ---

export const DEFAULT_LIFTS: LiftConfig[] = [
  { id: 'base', name: 'Base Course', mixType: '25.0mm (1") Base Mix', thicknessInches: 3, enabled: false },
  { id: 'binder', name: 'Binder Course', mixType: '19.0mm (3/4") Binder Mix', thicknessInches: 2, enabled: true },
  { id: 'surface', name: 'Surface/Wearing Course', mixType: '12.5mm (1/2") Surface Mix', thicknessInches: 1.5, enabled: true },
];

export const DEFAULT_CREW: CrewMember[] = [
  { id: 'foreman', role: 'Foreman', hourlyWage: 38, count: 1 },
  { id: 'paver_op', role: 'Paver Operator', hourlyWage: 32, count: 1 },
  { id: 'screed_op', role: 'Screed Operator', hourlyWage: 30, count: 1 },
  { id: 'roller_op', role: 'Roller Operator', hourlyWage: 28, count: 1 },
  { id: 'raker', role: 'Raker', hourlyWage: 22, count: 2 },
  { id: 'laborer', role: 'Laborer', hourlyWage: 18, count: 2 },
];

export interface EquipmentItemWithTip extends EquipmentItem {
  tooltip?: string;
}

export const DEFAULT_EQUIPMENT: EquipmentItemWithTip[] = [
  { id: 'paver', name: 'Asphalt Paver', monthlyPayment: 4500, fuelGallonsPerHour: 5, tooltip: 'New: $150K-$500K+. Used: $40K-$150K. Rental: $3,500-$6,000/mo. Default is a mid-range lease.' },
  { id: 'roller_vib', name: 'Vibratory Roller', monthlyPayment: 3000, fuelGallonsPerHour: 4, tooltip: 'Steel drum vibratory for initial compaction. New: $80K-$200K. Rental: $2,500-$4,000/mo.' },
  { id: 'roller_pneu', name: 'Pneumatic Roller', monthlyPayment: 2500, fuelGallonsPerHour: 3.5, tooltip: 'Rubber-tire roller for finish rolling. New: $60K-$150K. Rental: $2,000-$3,500/mo.' },
  { id: 'skidsteer', name: 'Skid Steer / Bobcat', monthlyPayment: 2000, fuelGallonsPerHour: 3.5, tooltip: 'For cleanup, material handling, and tight areas. New: $30K-$80K. Rental: $1,500-$2,500/mo.' },
  { id: 'dump1', name: 'Dump Truck #1', monthlyPayment: 2500, fuelGallonsPerHour: 6, tooltip: 'Tandem or tri-axle dump truck. New: $120K-$200K. Used: $40K-$80K. Payment varies by financing.' },
  { id: 'dump2', name: 'Dump Truck #2', monthlyPayment: 2500, fuelGallonsPerHour: 6, tooltip: 'Second dump truck for continuous material supply. Set to $0 if you only run one truck.' },
];

export interface OverheadItemWithTip extends OverheadItem {
  tooltip?: string;
}

export const DEFAULT_OVERHEAD: OverheadItemWithTip[] = [
  { id: 'gl_insurance', name: 'General Liability Insurance', monthlyAmount: 250, tooltip: 'GL insurance for paving contractors. Typically $3,000-$5,000/year. Higher for larger operations.' },
  { id: 'auto_insurance', name: 'Commercial Auto Insurance', monthlyAmount: 350, tooltip: 'Commercial auto for trucks and equipment trailers. Varies by fleet size and driving records.' },
  { id: 'umbrella', name: 'Umbrella Policy', monthlyAmount: 175, tooltip: 'Additional liability coverage above GL and auto limits. Recommended $1-2M for paving contractors.' },
  { id: 'fuel_nonjob', name: 'Fuel (Non-Job / Travel)', monthlyAmount: 800, tooltip: 'Fuel for traveling between jobs, estimates, and general business driving. Not job-specific fuel.' },
  { id: 'marketing', name: 'Marketing / Advertising', monthlyAmount: 1000, tooltip: 'Website, Google Ads, yard signs, truck wraps, etc. Critical for new operators building a customer base.' },
  { id: 'office', name: 'Office / Software / Phone', monthlyAmount: 400, tooltip: 'Estimating software, accounting, phone plans, internet, etc.' },
  { id: 'yard', name: 'Yard / Storage Rental', monthlyAmount: 1500, tooltip: 'Equipment storage yard or shop rental. Varies widely by location.' },
  { id: 'permits', name: 'Permits & Licensing', monthlyAmount: 200, tooltip: 'Business licenses, contractor licenses, DOT permits, etc. Spread monthly.' },
];

export const DEFAULT_LOANS: LoanItem[] = [
  { id: 'sba', name: 'SBA Loan', monthlyPayment: 0 },
  { id: 'equip_finance', name: 'Equipment Financing', monthlyPayment: 0 },
  { id: 'loc', name: 'Line of Credit', monthlyPayment: 0 },
  { id: 'other', name: 'Other Debt', monthlyPayment: 0 },
];

export const DEFAULT_SITE_PREP: SitePrepItem[] = [
  { id: 'milling', name: 'Milling / Grinding (per sq ft)', costPerSqFt: 0.75, enabled: false },
  { id: 'grading', name: 'Grading & Compaction (per sq ft)', costPerSqFt: 0.50, enabled: false },
  { id: 'drainage', name: 'Drainage Work (per sq ft)', costPerSqFt: 0.35, enabled: false },
];

export const MIX_TYPES = [
  '9.5mm (3/8") Fine Surface Mix',
  '12.5mm (1/2") Surface Mix',
  '19.0mm (3/4") Binder Mix',
  '25.0mm (1") Base Mix',
  'SMA (Stone Matrix Asphalt)',
  'Warm Mix Asphalt (WMA)',
  'Polymer Modified HMA',
];

export function getDefaultInputs(): CalculatorInputs {
  return {
    jobLength: 200,
    jobWidth: 50,
    lifts: DEFAULT_LIFTS.map(l => ({ ...l })),
    asphaltDensity: 148,
    wasteFactor: 7,

    distanceToPlant: 15,
    truckCapacity: 20,
    truckCostPerHour: 110,
    avgTruckSpeed: 35,
    loadingTime: 15,
    unloadingTime: 20,

    asphaltCostPerTon: 110,
    tackCoatRate: 0.10,
    tackCoatCostPerGal: 9,
    aggregateBaseCostPerTon: 25,
    aggregateBaseThickness: 0,
    aggregateBaseDensity: 130,
    geotextileCostPerSqYd: 1.50,
    useGeotextile: false,
    edgeMaterialsCost: 200,

    crew: DEFAULT_CREW.map(c => ({ ...c })),
    productionRate: 75,
    payrollTaxRate: 10.5,
    workersCompRate: 10,

    equipment: DEFAULT_EQUIPMENT.map(e => ({ ...e })),
    dieselCostPerGallon: 3.85,

    overhead: DEFAULT_OVERHEAD.map(o => ({ ...o })),
    estimatedJobsPerMonth: 8,

    loans: DEFAULT_LOANS.map(l => ({ ...l })),

    ownerMonthlySalary: 8000,

    sitePrep: DEFAULT_SITE_PREP.map(s => ({ ...s })),

    targetNetMargin: 40,
  };
}

// --- Calculator Engine ---

export function calculate(inputs: CalculatorInputs): CalculatorResults {
  // 1. Area
  const totalArea = inputs.jobLength * inputs.jobWidth;
  const totalAreaSqYd = totalArea / 9;

  // 2. Tonnage per lift
  const liftDetails = inputs.lifts
    .filter(l => l.enabled)
    .map(lift => {
      const volumeCuFt = totalArea * (lift.thicknessInches / 12);
      const weightLbs = volumeCuFt * inputs.asphaltDensity;
      const tons = weightLbs / 2000;
      return {
        name: lift.name,
        mixType: lift.mixType,
        thickness: lift.thicknessInches,
        volumeCuFt,
        tons,
      };
    });

  const baseTons = liftDetails.reduce((sum, l) => sum + l.tons, 0);
  const totalTons = baseTons * (1 + inputs.wasteFactor / 100);
  const totalTruckLoads = Math.ceil(totalTons / inputs.truckCapacity);

  // 3. Hauling
  const roundTripMinutes =
    ((inputs.distanceToPlant * 2) / inputs.avgTruckSpeed) * 60 +
    inputs.loadingTime +
    inputs.unloadingTime;
  const roundTripHours = roundTripMinutes / 60;
  const totalHaulHours = totalTruckLoads * roundTripHours;
  const haulCost = totalHaulHours * inputs.truckCostPerHour;

  // 4. Materials
  const asphaltMaterialCost = totalTons * inputs.asphaltCostPerTon;

  // Tack coat between lifts (applied between each lift and on existing surface)
  const enabledLifts = inputs.lifts.filter(l => l.enabled).length;
  const tackCoatApplications = Math.max(enabledLifts, 1); // at least 1 application
  const tackCoatGallons = totalAreaSqYd * inputs.tackCoatRate * tackCoatApplications;
  const tackCoatCost = tackCoatGallons * inputs.tackCoatCostPerGal;

  // Aggregate base
  let aggregateBaseTons = 0;
  let aggregateBaseCost = 0;
  if (inputs.aggregateBaseThickness > 0) {
    const baseVolumeCuFt = totalArea * (inputs.aggregateBaseThickness / 12);
    aggregateBaseTons = (baseVolumeCuFt * inputs.aggregateBaseDensity) / 2000;
    aggregateBaseCost = aggregateBaseTons * inputs.aggregateBaseCostPerTon;
  }

  // Geotextile
  const geotextileCost = inputs.useGeotextile
    ? totalAreaSqYd * inputs.geotextileCostPerSqYd
    : 0;

  const totalMaterialsCost =
    asphaltMaterialCost +
    tackCoatCost +
    aggregateBaseCost +
    geotextileCost +
    inputs.edgeMaterialsCost;

  // 5. Labor
  const jobHours = totalTons / inputs.productionRate;
  const totalCrewHourlyRate = inputs.crew.reduce(
    (sum, m) => sum + m.hourlyWage * m.count,
    0
  );
  const laborCostBeforeBurden = totalCrewHourlyRate * jobHours;
  const payrollTaxCost = laborCostBeforeBurden * (inputs.payrollTaxRate / 100);
  const workersCompCost = laborCostBeforeBurden * (inputs.workersCompRate / 100);
  const totalLaborCost = laborCostBeforeBurden + payrollTaxCost + workersCompCost;

  // 6. Equipment
  const totalFuelPerHour = inputs.equipment.reduce(
    (sum, e) => sum + e.fuelGallonsPerHour,
    0
  );
  const equipmentFuelCost = totalFuelPerHour * jobHours * inputs.dieselCostPerGallon;
  const totalMonthlyEquipment = inputs.equipment.reduce(
    (sum, e) => sum + e.monthlyPayment,
    0
  );
  const equipmentAllocation = totalMonthlyEquipment / Math.max(inputs.estimatedJobsPerMonth, 1);
  const totalEquipmentCost = equipmentFuelCost + equipmentAllocation;

  // 7. Overhead
  const totalMonthlyOverhead = inputs.overhead.reduce(
    (sum, o) => sum + o.monthlyAmount,
    0
  );
  const overheadAllocation = totalMonthlyOverhead / Math.max(inputs.estimatedJobsPerMonth, 1);

  // 8. Loans
  const totalMonthlyLoans = inputs.loans.reduce(
    (sum, l) => sum + l.monthlyPayment,
    0
  );
  const loanAllocation = totalMonthlyLoans / Math.max(inputs.estimatedJobsPerMonth, 1);

  // 9. Owner's Salary
  const ownerAllocation = inputs.ownerMonthlySalary / Math.max(inputs.estimatedJobsPerMonth, 1);

  // 10. Site Prep
  const totalSitePrepCost = inputs.sitePrep
    .filter(s => s.enabled)
    .reduce((sum, s) => sum + s.costPerSqFt * totalArea, 0);

  // 11. Total Cost
  const totalJobCost =
    totalMaterialsCost +
    haulCost +
    totalLaborCost +
    totalEquipmentCost +
    overheadAllocation +
    loanAllocation +
    ownerAllocation +
    totalSitePrepCost;

  // 12. Apply margin: Price = Cost / (1 - margin)
  const marginDecimal = inputs.targetNetMargin / 100;
  const totalJobPrice = totalJobCost / (1 - marginDecimal);
  const marginAmount = totalJobPrice - totalJobCost;

  // 13. Per-unit prices
  const pricePerTon = totalTons > 0 ? totalJobPrice / totalTons : 0;
  const pricePerSqFt = totalArea > 0 ? totalJobPrice / totalArea : 0;
  const costPerTon = totalTons > 0 ? totalJobCost / totalTons : 0;
  const costPerSqFt = totalArea > 0 ? totalJobCost / totalArea : 0;

  return {
    totalArea,
    totalAreaSqYd,
    liftDetails,
    totalTons,
    totalTruckLoads,
    roundTripMinutes,
    totalHaulHours,
    haulCost,
    asphaltMaterialCost,
    tackCoatCost,
    aggregateBaseCost,
    aggregateBaseTons,
    geotextileCost,
    edgeMaterialsCost: inputs.edgeMaterialsCost,
    totalMaterialsCost,
    jobHours,
    laborCostBeforeBurden,
    payrollTaxCost,
    workersCompCost,
    totalLaborCost,
    equipmentFuelCost,
    equipmentAllocation,
    totalEquipmentCost,
    totalMonthlyOverhead,
    overheadAllocation,
    totalMonthlyLoans,
    loanAllocation,
    ownerAllocation,
    totalSitePrepCost,
    totalJobCost,
    marginAmount,
    totalJobPrice,
    pricePerTon,
    pricePerSqFt,
    costPerTon,
    costPerSqFt,
  };
}

// --- Formatting Helpers ---

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatCurrencyDecimal(value: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

export function formatNumber(value: number, decimals = 1): string {
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value);
}

export function formatPercent(value: number): string {
  return `${value.toFixed(1)}%`;
}
