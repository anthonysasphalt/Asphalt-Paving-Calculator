// ============================================================
// Asphalt Paving Job Cost Calculator — Main Page
// Design: Industrial Blueprint — dark workspace, gold accents,
// Oswald headers, Source Sans body, JetBrains Mono values
// ============================================================

import { useState, useMemo, useCallback } from "react";
import {
  type CalculatorInputs,
  type LiftConfig,
  type CrewMember,
  type EquipmentItem,
  type OverheadItem,
  type LoanItem,
  type SitePrepItem,
  type OverheadItemWithTip,
  type EquipmentItemWithTip,
  getDefaultInputs,
  calculate,
  MIX_TYPES,
  DEFAULT_OVERHEAD,
  DEFAULT_EQUIPMENT,
  formatCurrency,
  formatNumber,
} from "@/lib/calculator";
import SectionCard from "@/components/SectionCard";
import NumberInput from "@/components/NumberInput";
import InfoTip from "@/components/InfoTip";
import ResultsSummary from "@/components/ResultsSummary";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Ruler,
  Truck,
  Package,
  Users,
  Wrench,
  Building2,
  CreditCard,
  UserCircle,
  HardHat,
  Calculator,
  ChevronUp,
  RotateCcw,
} from "lucide-react";

const HERO_IMG = "https://private-us-east-1.manuscdn.com/sessionFile/SL9p2Fj9XqZp4ETUk6TK3T/sandbox/n7zGlTIr5y1VY2hECIa2Ze-img-1_1771371290000_na1fn_aGVyby1hc3BoYWx0.jpg?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvU0w5cDJGajlYcVpwNEVUVWs2VEszVC9zYW5kYm94L243ekdsVElyNXkxVlkyaEVDSWEyWmUtaW1nLTFfMTc3MTM3MTI5MDAwMF9uYTFmbl9hR1Z5YnkxaGMzQm9ZV3gwLmpwZz94LW9zcy1wcm9jZXNzPWltYWdlL3Jlc2l6ZSx3XzE5MjAsaF8xOTIwL2Zvcm1hdCx3ZWJwL3F1YWxpdHkscV84MCIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTc5ODc2MTYwMH19fV19&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=DrOZO28GDuj3APYLJM3HPIksiCsmFyYxww5fhaQsj5-X1Qc4XJGDy~gjfjqrDhyLpvXBlSQG~bJSHjZVuvWg1rNNieMSljKg7jAxMhiQMP65U-oklzukXxlrRQk4DvKAbocR8bFNlFDBclRxWOhuwOyrYn8zudPMd1JbrC55rfgBSI4uuHWQK5sR8HnftOikE7n2kB8lyV3w1iINws9H5aSd0U1CKhjYH2hsKyaAYbO5y33ddDTc9kGMGXolHqoYAmn-1Zo8rPyeXs19nzJx0q2NokGBgCdXK-tI1gyaQo-tj-morYWgOEFXoxXUJl6oo~SY~gigmx5pAE205QJ8Fg__";

export default function Home() {
  const [inputs, setInputs] = useState<CalculatorInputs>(getDefaultInputs);
  const [showMobileResults, setShowMobileResults] = useState(false);

  const results = useMemo(() => calculate(inputs), [inputs]);

  const update = useCallback(<K extends keyof CalculatorInputs>(
    key: K,
    value: CalculatorInputs[K]
  ) => {
    setInputs((prev) => ({ ...prev, [key]: value }));
  }, []);

  const updateLift = useCallback((id: string, changes: Partial<LiftConfig>) => {
    setInputs((prev) => ({
      ...prev,
      lifts: prev.lifts.map((l) => (l.id === id ? { ...l, ...changes } : l)),
    }));
  }, []);

  const updateCrew = useCallback((id: string, changes: Partial<CrewMember>) => {
    setInputs((prev) => ({
      ...prev,
      crew: prev.crew.map((c) => (c.id === id ? { ...c, ...changes } : c)),
    }));
  }, []);

  const updateEquipment = useCallback((id: string, changes: Partial<EquipmentItem>) => {
    setInputs((prev) => ({
      ...prev,
      equipment: prev.equipment.map((e) =>
        e.id === id ? { ...e, ...changes } : e
      ),
    }));
  }, []);

  const updateOverhead = useCallback((id: string, changes: Partial<OverheadItem>) => {
    setInputs((prev) => ({
      ...prev,
      overhead: prev.overhead.map((o) =>
        o.id === id ? { ...o, ...changes } : o
      ),
    }));
  }, []);

  const updateLoan = useCallback((id: string, changes: Partial<LoanItem>) => {
    setInputs((prev) => ({
      ...prev,
      loans: prev.loans.map((l) => (l.id === id ? { ...l, ...changes } : l)),
    }));
  }, []);

  const updateSitePrep = useCallback((id: string, changes: Partial<SitePrepItem>) => {
    setInputs((prev) => ({
      ...prev,
      sitePrep: prev.sitePrep.map((s) =>
        s.id === id ? { ...s, ...changes } : s
      ),
    }));
  }, []);

  const resetAll = useCallback(() => {
    setInputs(getDefaultInputs());
  }, []);

  return (
    <div className="min-h-screen bg-background noise-overlay">
      {/* Hero Section */}
      <header className="relative h-[280px] sm:h-[320px] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={HERO_IMG}
            alt="Asphalt paving operation"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-background" />
        </div>
        <div className="relative container h-full flex flex-col justify-between pb-8">
          {/* Logo */}
          <div className="flex justify-center pt-6">
            <img
              src="/logo.webp"
              alt="Anthony's Asphalt Logo"
              className="h-16 sm:h-20 object-contain drop-shadow-lg"
            />
          </div>
          
          {/* Title Section */}
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded bg-gold/20 flex items-center justify-center">
                <Calculator className="w-5 h-5 text-gold" />
              </div>
              <div className="h-px flex-1 bg-gradient-to-r from-gold/40 to-transparent max-w-[200px]" />
            </div>
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-wide uppercase leading-tight">
            Asphalt Paving<br />
            <span className="text-gold gold-glow">Job Cost Calculator</span>
          </h1>
          <p className="mt-3 text-sm sm:text-base text-white/70 max-w-xl" style={{ fontFamily: "var(--font-body)" }}>
            Calculate accurate job pricing with 40% net margin protection. Input your costs, get your price.
          </p>
          </div>
        </div>
      </header>

      {/* Decorative divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />

      {/* Main Content */}
      <main className="container py-6 lg:py-8">
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          {/* Left Column — Input Sections */}
          <div className="flex-1 space-y-4 min-w-0">
            {/* Reset Button */}
            <div className="flex justify-end">
              <button
                onClick={resetAll}
                className="flex items-center gap-2 px-3 py-1.5 text-xs text-muted-foreground hover:text-gold border border-border hover:border-gold/30 rounded transition-colors"
              >
                <RotateCcw className="w-3 h-3" />
                Reset to Defaults
              </button>
            </div>

            {/* Section 1: Tonnage */}
            <SectionCard
              number={1}
              title="Tonnage Calculations"
              icon={<Ruler className="w-5 h-5" />}
              subtitle="Job area, lifts, thickness, and density"
            >
              <div className="space-y-5">
                <div className="grid grid-cols-2 gap-4">
                  <NumberInput
                    label="Job Length"
                    value={inputs.jobLength}
                    onChange={(v) => update("jobLength", v)}
                    suffix="ft"
                    tooltip="Total length of the paving area in feet"
                  />
                  <NumberInput
                    label="Job Width"
                    value={inputs.jobWidth}
                    onChange={(v) => update("jobWidth", v)}
                    suffix="ft"
                    tooltip="Total width of the paving area in feet"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <NumberInput
                    label="Asphalt Density"
                    value={inputs.asphaltDensity}
                    onChange={(v) => update("asphaltDensity", v)}
                    suffix="lbs/ft³"
                    tooltip="Compacted HMA density. Standard is 145-150 lbs/cu ft. Default 148 is a good average for most mixes."
                    step={1}
                  />
                  <NumberInput
                    label="Waste Factor"
                    value={inputs.wasteFactor}
                    onChange={(v) => update("wasteFactor", v)}
                    suffix="%"
                    step={1}
                    min={0}
                    max={25}
                    tooltip="Extra material to account for waste, irregular edges, and compaction variance. Industry standard: 5-10%. Default 7% is a safe average."
                  />
                </div>

                {/* Quick Stats */}
                <div className="bg-background/50 rounded p-3 border border-border/50">
                  <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Total Area</p>
                  <p className="font-mono text-lg text-gold">{formatNumber(results.totalArea, 0)} sq ft</p>
                  <p className="font-mono text-sm text-muted-foreground">{formatNumber(results.totalAreaSqYd, 0)} sq yd</p>
                </div>

                {/* Lifts */}
                <div className="space-y-3">
                  <h4 className="text-sm font-semibold text-foreground flex items-center">
                    Lifts / Courses
                    <InfoTip content="Each lift is a layer of asphalt. A typical overlay uses 1-2 lifts. Full-depth construction may use 2-3 lifts. Enable the courses you need for this job." />
                  </h4>
                  {inputs.lifts.map((lift) => (
                    <div
                      key={lift.id}
                      className={`border rounded-lg p-4 transition-all ${
                        lift.enabled
                          ? "border-gold/30 bg-gold/[0.03]"
                          : "border-border/50 bg-transparent opacity-60"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <Switch
                            checked={lift.enabled}
                            onCheckedChange={(v) => updateLift(lift.id, { enabled: v })}
                          />
                          <span className="text-sm font-medium text-foreground">
                            {lift.name}
                          </span>
                        </div>
                        {lift.enabled && (
                          <span className="font-mono text-xs text-gold">
                            {formatNumber(
                              results.liftDetails.find((l) => l.name === lift.name)?.tons ?? 0
                            )}{" "}
                            tons
                          </span>
                        )}
                      </div>
                      {lift.enabled && (
                        <div className="grid grid-cols-2 gap-3">
                          <div className="space-y-1.5">
                            <label className="text-xs text-muted-foreground">Mix Type</label>
                            <Select
                              value={lift.mixType}
                              onValueChange={(v) => updateLift(lift.id, { mixType: v })}
                            >
                              <SelectTrigger className="h-9 text-xs bg-input border-border">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                {MIX_TYPES.map((mix) => (
                                  <SelectItem key={mix} value={mix} className="text-xs">
                                    {mix}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          <NumberInput
                            label="Thickness"
                            value={lift.thicknessInches}
                            onChange={(v) => updateLift(lift.id, { thicknessInches: v })}
                            suffix="inches"
                            step={0.25}
                            min={0.5}
                            max={6}
                          />
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Tonnage Summary */}
                <div className="bg-gold/[0.05] border border-gold/20 rounded-lg p-4 space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-display text-sm uppercase tracking-wider text-gold">
                      Total Tonnage Required
                    </span>
                    <span className="font-mono text-2xl font-bold text-gold gold-glow">
                      {formatNumber(results.totalTons)} tons
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Includes {inputs.wasteFactor}% waste factor ({formatNumber(results.totalTons - results.totalTons / (1 + inputs.wasteFactor / 100))} tons extra)
                  </p>
                </div>
              </div>
            </SectionCard>

            {/* Section 2: Hauling */}
            <SectionCard
              number={2}
              title="Hauling & Delivery"
              icon={<Truck className="w-5 h-5" />}
              subtitle="Distance, truck capacity, and delivery costs"
            >
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <NumberInput
                    label="Distance to Plant"
                    value={inputs.distanceToPlant}
                    onChange={(v) => update("distanceToPlant", v)}
                    suffix="miles"
                    tooltip="One-way distance from the asphalt plant to the job site"
                  />
                  <NumberInput
                    label="Truck Capacity"
                    value={inputs.truckCapacity}
                    onChange={(v) => update("truckCapacity", v)}
                    suffix="tons"
                    tooltip="Tons per load. Tandem axle: 12-16 tons. Tri-axle: 18-22 tons."
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <NumberInput
                    label="Truck Cost"
                    value={inputs.truckCostPerHour}
                    onChange={(v) => update("truckCostPerHour", v)}
                    prefix="$"
                    suffix="/hr"
                    tooltip="Cost per hour for truck + driver. Typically $90-$130/hr."
                  />
                  <NumberInput
                    label="Avg Truck Speed"
                    value={inputs.avgTruckSpeed}
                    onChange={(v) => update("avgTruckSpeed", v)}
                    suffix="mph"
                    tooltip="Average speed including city/highway driving to plant"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <NumberInput
                    label="Loading Time"
                    value={inputs.loadingTime}
                    onChange={(v) => update("loadingTime", v)}
                    suffix="min"
                    tooltip="Time to load one truck at the asphalt plant"
                  />
                  <NumberInput
                    label="Unloading Time"
                    value={inputs.unloadingTime}
                    onChange={(v) => update("unloadingTime", v)}
                    suffix="min"
                    tooltip="Time to unload/dump at the job site"
                  />
                </div>
                <div className="bg-background/50 rounded p-3 border border-border/50 grid grid-cols-3 gap-3">
                  <div>
                    <p className="text-xs text-muted-foreground">Truck Loads</p>
                    <p className="font-mono text-sm text-foreground">{results.totalTruckLoads}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Round Trip</p>
                    <p className="font-mono text-sm text-foreground">{formatNumber(results.roundTripMinutes, 0)} min</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Haul Cost</p>
                    <p className="font-mono text-sm text-gold">{formatCurrency(results.haulCost)}</p>
                  </div>
                </div>
              </div>
            </SectionCard>

            {/* Section 3: Materials */}
            <SectionCard
              number={3}
              title="Materials"
              icon={<Package className="w-5 h-5" />}
              subtitle="Asphalt, tack coat, aggregate, and extras"
            >
              <div className="space-y-4">
                <NumberInput
                  label="Asphalt Cost Per Ton"
                  value={inputs.asphaltCostPerTon}
                  onChange={(v) => update("asphaltCostPerTon", v)}
                  prefix="$"
                  suffix="/ton"
                  tooltip="Price per ton from the asphalt plant. Standard HMA: $85-$150/ton depending on region and mix type."
                />
                <div className="grid grid-cols-2 gap-4">
                  <NumberInput
                    label="Tack Coat Rate"
                    value={inputs.tackCoatRate}
                    onChange={(v) => update("tackCoatRate", v)}
                    suffix="gal/yd²"
                    step={0.01}
                    tooltip="Application rate for tack coat between lifts. Typical: 0.05-0.15 gal/sq yd."
                  />
                  <NumberInput
                    label="Tack Coat Cost"
                    value={inputs.tackCoatCostPerGal}
                    onChange={(v) => update("tackCoatCostPerGal", v)}
                    prefix="$"
                    suffix="/gal"
                    tooltip="Cost per gallon of asphalt emulsion tack coat"
                  />
                </div>

                <div className="border-t border-border/50 pt-4">
                  <h4 className="text-sm font-semibold text-foreground mb-3 flex items-center">
                    Aggregate Base (Optional)
                    <InfoTip content="If you're installing an aggregate base layer before paving. Set thickness to 0 if not needed." />
                  </h4>
                  <div className="grid grid-cols-3 gap-3">
                    <NumberInput
                      label="Thickness"
                      value={inputs.aggregateBaseThickness}
                      onChange={(v) => update("aggregateBaseThickness", v)}
                      suffix="in"
                      step={0.5}
                      tooltip="Aggregate base thickness. Set to 0 if not doing base work."
                    />
                    <NumberInput
                      label="Cost/Ton"
                      value={inputs.aggregateBaseCostPerTon}
                      onChange={(v) => update("aggregateBaseCostPerTon", v)}
                      prefix="$"
                      tooltip="Cost per ton of aggregate base material"
                    />
                    <NumberInput
                      label="Density"
                      value={inputs.aggregateBaseDensity}
                      onChange={(v) => update("aggregateBaseDensity", v)}
                      suffix="lb/ft³"
                      tooltip="Aggregate base density. Typical: 120-140 lbs/cu ft."
                    />
                  </div>
                </div>

                <div className="border-t border-border/50 pt-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium text-foreground flex items-center">
                      Geotextile Fabric
                      <InfoTip content="Geotextile fabric placed between subgrade and base for stabilization. Typical cost: $1-2/sq yd." />
                    </label>
                    <Switch
                      checked={inputs.useGeotextile}
                      onCheckedChange={(v) => update("useGeotextile", v)}
                    />
                  </div>
                  {inputs.useGeotextile && (
                    <NumberInput
                      label="Geotextile Cost"
                      value={inputs.geotextileCostPerSqYd}
                      onChange={(v) => update("geotextileCostPerSqYd", v)}
                      prefix="$"
                      suffix="/yd²"
                      step={0.25}
                    />
                  )}
                </div>

                <NumberInput
                  label="Edge Materials / Forms"
                  value={inputs.edgeMaterialsCost}
                  onChange={(v) => update("edgeMaterialsCost", v)}
                  prefix="$"
                  tooltip="Flat cost for edge forms, lumber, stakes, etc. for this job."
                />

                <div className="bg-background/50 rounded p-3 border border-border/50">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Total Materials</span>
                    <span className="font-mono text-sm text-gold">{formatCurrency(results.totalMaterialsCost)}</span>
                  </div>
                </div>
              </div>
            </SectionCard>

            {/* Section 4: Labor */}
            <SectionCard
              number={4}
              title="Labor"
              icon={<Users className="w-5 h-5" />}
              subtitle="Crew, wages, production rate, and payroll burden"
            >
              <div className="space-y-4">
                <NumberInput
                  label="Production Rate"
                  value={inputs.productionRate}
                  onChange={(v) => update("productionRate", v)}
                  suffix="tons/hr"
                  tooltip="How many tons per hour your crew can lay and compact. Residential: 50-80. Commercial: 80-120. Highway: 120-200+."
                />

                <div className="space-y-3">
                  <h4 className="text-sm font-semibold text-foreground flex items-center">
                    Crew Members
                    <InfoTip content="Standard paving crew: Foreman, paver operator, screed operator, roller operator, 2 rakers, 2 laborers. Adjust counts and wages to match your crew." />
                  </h4>
                  <div className="space-y-2">
                    {inputs.crew.map((member) => (
                      <div
                        key={member.id}
                        className="grid grid-cols-[1fr_80px_70px] gap-3 items-end"
                      >
                        <div className="flex items-center h-10">
                          <label className="text-sm text-foreground/80">{member.role}</label>
                        </div>
                        <NumberInput
                          label="$/hr"
                          value={member.hourlyWage}
                          onChange={(v) => updateCrew(member.id, { hourlyWage: v })}
                          prefix="$"
                        />
                        <NumberInput
                          label="#"
                          value={member.count}
                          onChange={(v) => updateCrew(member.id, { count: v })}
                          min={0}
                          max={10}
                        />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <NumberInput
                    label="Payroll Tax Rate"
                    value={inputs.payrollTaxRate}
                    onChange={(v) => update("payrollTaxRate", v)}
                    suffix="%"
                    step={0.5}
                    tooltip="Employer's share: FICA 7.65% + FUTA 0.6% + SUTA ~2-3%. Total typically 10-12%."
                  />
                  <NumberInput
                    label="Workers Comp Rate"
                    value={inputs.workersCompRate}
                    onChange={(v) => update("workersCompRate", v)}
                    suffix="%"
                    step={0.5}
                    tooltip="Workers comp for paving is high-hazard. Typically 8-15% of payroll depending on state and experience modifier."
                  />
                </div>

                <div className="bg-background/50 rounded p-3 border border-border/50 space-y-1">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Est. Job Hours</span>
                    <span className="font-mono text-sm text-foreground">{formatNumber(results.jobHours)} hrs</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Base Labor</span>
                    <span className="font-mono text-sm text-foreground">{formatCurrency(results.laborCostBeforeBurden)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">+ Payroll Taxes</span>
                    <span className="font-mono text-sm text-foreground">{formatCurrency(results.payrollTaxCost)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">+ Workers Comp</span>
                    <span className="font-mono text-sm text-foreground">{formatCurrency(results.workersCompCost)}</span>
                  </div>
                  <div className="flex justify-between pt-1 border-t border-border/50">
                    <span className="text-sm font-medium text-foreground">Total Labor</span>
                    <span className="font-mono text-sm text-gold">{formatCurrency(results.totalLaborCost)}</span>
                  </div>
                </div>
              </div>
            </SectionCard>

            {/* Section 5: Equipment */}
            <SectionCard
              number={5}
              title="Equipment"
              icon={<Wrench className="w-5 h-5" />}
              subtitle="Monthly payments, fuel consumption"
              defaultOpen={false}
            >
              <div className="space-y-4">
                <NumberInput
                  label="Diesel Cost"
                  value={inputs.dieselCostPerGallon}
                  onChange={(v) => update("dieselCostPerGallon", v)}
                  prefix="$"
                  suffix="/gal"
                  step={0.05}
                  tooltip="Current diesel fuel price per gallon"
                />

                <div className="space-y-3">
                  {inputs.equipment.map((item) => {
                    const defaultItem = DEFAULT_EQUIPMENT.find(d => d.id === item.id) as EquipmentItemWithTip | undefined;
                    return (
                      <div
                        key={item.id}
                        className="border border-border/50 rounded-lg p-3 space-y-2"
                      >
                        <div className="flex items-center">
                          <p className="text-sm font-medium text-foreground">{item.name}</p>
                          {defaultItem?.tooltip && <InfoTip content={defaultItem.tooltip} />}
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <NumberInput
                            label="Monthly Payment"
                            value={item.monthlyPayment}
                            onChange={(v) => updateEquipment(item.id, { monthlyPayment: v })}
                            prefix="$"
                            suffix="/mo"
                          />
                          <NumberInput
                            label="Fuel Usage"
                            value={item.fuelGallonsPerHour}
                            onChange={(v) => updateEquipment(item.id, { fuelGallonsPerHour: v })}
                            suffix="gal/hr"
                            step={0.5}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>

                <NumberInput
                  label="Estimated Jobs Per Month"
                  value={inputs.estimatedJobsPerMonth}
                  onChange={(v) => update("estimatedJobsPerMonth", v)}
                  suffix="jobs"
                  min={1}
                  tooltip="How many jobs you expect to complete per month. Used to allocate fixed costs (equipment, overhead, loans) across jobs."
                />

                <div className="bg-background/50 rounded p-3 border border-border/50 space-y-1">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Job Fuel Cost</span>
                    <span className="font-mono text-sm text-foreground">{formatCurrency(results.equipmentFuelCost)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Equipment Allocation</span>
                    <span className="font-mono text-sm text-foreground">{formatCurrency(results.equipmentAllocation)}</span>
                  </div>
                  <div className="flex justify-between pt-1 border-t border-border/50">
                    <span className="text-sm font-medium text-foreground">Total Equipment</span>
                    <span className="font-mono text-sm text-gold">{formatCurrency(results.totalEquipmentCost)}</span>
                  </div>
                </div>
              </div>
            </SectionCard>

            {/* Section 6: Overhead */}
            <SectionCard
              number={6}
              title="Overhead"
              icon={<Building2 className="w-5 h-5" />}
              subtitle="Insurance, marketing, office, yard, permits"
              defaultOpen={false}
            >
              <div className="space-y-3">
                {inputs.overhead.map((item) => {
                  const defaultItem = DEFAULT_OVERHEAD.find(d => d.id === item.id) as OverheadItemWithTip | undefined;
                  return (
                    <NumberInput
                      key={item.id}
                      label={item.name}
                      value={item.monthlyAmount}
                      onChange={(v) => updateOverhead(item.id, { monthlyAmount: v })}
                      prefix="$"
                      suffix="/mo"
                      tooltip={defaultItem?.tooltip}
                    />
                  );
                })}
                <div className="bg-background/50 rounded p-3 border border-border/50 space-y-1">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Total Monthly Overhead</span>
                    <span className="font-mono text-sm text-foreground">{formatCurrency(results.totalMonthlyOverhead)}/mo</span>
                  </div>
                  <div className="flex justify-between pt-1 border-t border-border/50">
                    <span className="text-sm font-medium text-foreground">Per-Job Allocation</span>
                    <span className="font-mono text-sm text-gold">{formatCurrency(results.overheadAllocation)}</span>
                  </div>
                </div>
              </div>
            </SectionCard>

            {/* Section 7: Loans */}
            <SectionCard
              number={7}
              title="Business Loans & Financing"
              icon={<CreditCard className="w-5 h-5" />}
              subtitle="SBA loans, equipment financing, lines of credit"
              defaultOpen={false}
            >
              <div className="space-y-3">
                {inputs.loans.map((item) => (
                  <NumberInput
                    key={item.id}
                    label={item.name}
                    value={item.monthlyPayment}
                    onChange={(v) => updateLoan(item.id, { monthlyPayment: v })}
                    prefix="$"
                    suffix="/mo"
                    tooltip={
                      item.id === "sba"
                        ? "SBA 7(a) loans: 10.5-15.5% rate. SBA 504: ~6-7% fixed. Enter your monthly payment."
                        : item.id === "equip_finance"
                        ? "Equipment financing: typically 5-15% rate. Enter your total monthly equipment loan payments."
                        : item.id === "loc"
                        ? "Business line of credit: 7-25% rate. Enter monthly payment if carrying a balance."
                        : "Any other monthly debt payments"
                    }
                  />
                ))}
                <div className="bg-background/50 rounded p-3 border border-border/50 space-y-1">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Total Monthly Loans</span>
                    <span className="font-mono text-sm text-foreground">{formatCurrency(results.totalMonthlyLoans)}/mo</span>
                  </div>
                  <div className="flex justify-between pt-1 border-t border-border/50">
                    <span className="text-sm font-medium text-foreground">Per-Job Allocation</span>
                    <span className="font-mono text-sm text-gold">{formatCurrency(results.loanAllocation)}</span>
                  </div>
                </div>
              </div>
            </SectionCard>

            {/* Section 8: Owner's Salary */}
            <SectionCard
              number={8}
              title="Owner's Salary"
              icon={<UserCircle className="w-5 h-5" />}
              subtitle="Your monthly draw before profit"
              defaultOpen={false}
            >
              <div className="space-y-3">
                <NumberInput
                  label="Monthly Owner's Salary"
                  value={inputs.ownerMonthlySalary}
                  onChange={(v) => update("ownerMonthlySalary", v)}
                  prefix="$"
                  suffix="/mo"
                  tooltip="What you pay yourself monthly as the business owner. This is a cost of doing business and should be covered before profit margin."
                />
                <div className="bg-background/50 rounded p-3 border border-border/50">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium text-foreground">Per-Job Allocation</span>
                    <span className="font-mono text-sm text-gold">{formatCurrency(results.ownerAllocation)}</span>
                  </div>
                </div>
              </div>
            </SectionCard>

            {/* Section 9: Site Prep */}
            <SectionCard
              number={9}
              title="Site Prep (Optional)"
              icon={<HardHat className="w-5 h-5" />}
              subtitle="Milling, grading, drainage"
              defaultOpen={false}
            >
              <div className="space-y-3">
                {inputs.sitePrep.map((item) => (
                  <div
                    key={item.id}
                    className={`border rounded-lg p-3 transition-all ${
                      item.enabled
                        ? "border-gold/30 bg-gold/[0.03]"
                        : "border-border/50"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <Switch
                          checked={item.enabled}
                          onCheckedChange={(v) => updateSitePrep(item.id, { enabled: v })}
                        />
                        <span className="text-sm font-medium text-foreground">{item.name}</span>
                      </div>
                      {item.enabled && (
                        <span className="font-mono text-xs text-gold">
                          {formatCurrency(item.costPerSqFt * results.totalArea)}
                        </span>
                      )}
                    </div>
                    {item.enabled && (
                      <NumberInput
                        label="Cost per sq ft"
                        value={item.costPerSqFt}
                        onChange={(v) => updateSitePrep(item.id, { costPerSqFt: v })}
                        prefix="$"
                        suffix="/ft²"
                        step={0.05}
                      />
                    )}
                  </div>
                ))}
                {results.totalSitePrepCost > 0 && (
                  <div className="bg-background/50 rounded p-3 border border-border/50">
                    <div className="flex justify-between">
                      <span className="text-sm font-medium text-foreground">Total Site Prep</span>
                      <span className="font-mono text-sm text-gold">{formatCurrency(results.totalSitePrepCost)}</span>
                    </div>
                  </div>
                )}
              </div>
            </SectionCard>

            {/* Section 10: Margin */}
            <SectionCard
              number={10}
              title="Profit Margin"
              icon={<Calculator className="w-5 h-5" />}
              subtitle="Target net margin after all costs"
            >
              <div className="space-y-5">
                {/* Margin Slider */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="flex items-center text-sm font-medium text-muted-foreground">
                      Target Net Margin
                      <InfoTip content="Your desired net profit margin after ALL costs including overhead, loans, and owner salary. Adjust down for competitive bids. 40% is recommended for standard jobs." />
                    </label>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-lg font-bold text-gold">{inputs.targetNetMargin}%</span>
                    </div>
                  </div>
                  <div className="slider-gold">
                    <Slider
                      value={[inputs.targetNetMargin]}
                      onValueChange={(v) => update("targetNetMargin", v[0])}
                      min={5}
                      max={80}
                      step={1}
                      className="w-full"
                    />
                  </div>
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>5%</span>
                    <span>40% (Recommended)</span>
                    <span>80%</span>
                  </div>
                </div>

                {/* Margin Explanation */}
                <div className="bg-gold/[0.05] border border-gold/20 rounded-lg p-4 space-y-3">
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground uppercase tracking-wider">Margin Formula</p>
                    <p className="font-mono text-sm text-foreground">Price = Total Cost ÷ (1 - Margin%)</p>
                  </div>
                  <div className="border-t border-gold/10 pt-3">
                    <p className="text-xs text-muted-foreground">
                      At <span className="text-gold font-semibold">{inputs.targetNetMargin}%</span> margin: For every $1 of revenue, <span className="text-gold font-semibold">${(inputs.targetNetMargin / 100).toFixed(2)}</span> is profit.
                    </p>
                  </div>
                </div>
              </div>
            </SectionCard>
          </div>

          {/* Right Column — Results (Desktop) */}
          <div className="hidden lg:block w-[380px] shrink-0">
            <div className="sticky top-6">
              <ResultsSummary results={results} targetMargin={inputs.targetNetMargin} />
            </div>
          </div>
        </div>
      </main>

      {/* Mobile Results Toggle */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50">
        {showMobileResults && (
          <div className="bg-background border-t border-gold/30 max-h-[70vh] overflow-y-auto p-4">
            <ResultsSummary results={results} targetMargin={inputs.targetNetMargin} />
          </div>
        )}
        <button
          onClick={() => setShowMobileResults(!showMobileResults)}
          className="w-full bg-card/95 backdrop-blur-md border-t border-gold/30 p-4 flex items-center justify-between"
        >
          <div className="flex items-center gap-3">
            <Calculator className="w-5 h-5 text-gold" />
            <div className="text-left">
              <p className="text-xs text-muted-foreground uppercase tracking-wider">Job Price</p>
              <p className="font-mono text-xl font-bold text-gold">
                {formatCurrency(results.totalJobPrice)}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <span className="text-xs">{showMobileResults ? "Hide" : "Details"}</span>
            <ChevronUp
              className={`w-4 h-4 transition-transform ${showMobileResults ? "rotate-180" : ""}`}
            />
          </div>
        </button>
      </div>

      {/* Footer */}
      <footer className="border-t border-gold/10 mt-8 lg:mt-16 py-10 bg-card/50">
        <div className="container">
          <div className="flex flex-col items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded bg-gold/10 flex items-center justify-center">
                <Calculator className="w-4 h-4 text-gold" />
              </div>
              <span className="font-display text-sm uppercase tracking-widest text-gold">Asphalt Paving Calculator</span>
            </div>
            <div className="h-px w-24 bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
            <p className="text-xs text-muted-foreground text-center max-w-lg">
              Built for paving professionals. Default values are industry averages (2024-2025 data)
              and should be adjusted to your local market and business costs.
            </p>
            <p className="text-xs text-muted-foreground text-center max-w-lg">
              Tonnage calculations use standard HMA density of 148 lbs/ft³ with a 7% waste factor.
              Actual density varies by mix design — always verify with your asphalt supplier.
            </p>
          </div>
        </div>
      </footer>

      {/* Bottom padding for mobile results bar */}
      <div className="lg:hidden h-20" />
    </div>
  );
}
