// Design: Industrial Blueprint — persistent results panel with gold highlights
import type { CalculatorResults } from "@/lib/calculator";
import { formatCurrency, formatCurrencyDecimal, formatNumber } from "@/lib/calculator";
import { TrendingUp, DollarSign, Weight, Ruler, Truck, Users, Wrench, Building2, CreditCard, UserCircle, HardHat } from "lucide-react";

interface ResultsSummaryProps {
  results: CalculatorResults;
  targetMargin: number;
}

export default function ResultsSummary({ results, targetMargin }: ResultsSummaryProps) {
  const marginPercent = results.totalJobPrice > 0
    ? ((results.marginAmount / results.totalJobPrice) * 100)
    : 0;

  return (
    <div className="space-y-5">
      {/* Primary Price Display */}
      <div className="bg-card border border-gold/30 rounded-lg p-5 relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-gold via-gold-bright to-gold/50" />
        <h3 className="font-display text-sm uppercase tracking-widest text-gold mb-4">
          Recommended Job Price
        </h3>
        <div className="text-center mb-4">
          <p className="font-mono text-4xl font-bold text-gold gold-glow">
            {formatCurrency(results.totalJobPrice)}
          </p>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-background/50 rounded p-3 text-center">
            <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Per Ton</p>
            <p className="font-mono text-lg font-semibold text-gold-bright">
              {formatCurrencyDecimal(results.pricePerTon)}
            </p>
          </div>
          <div className="bg-background/50 rounded p-3 text-center">
            <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Per Sq Ft</p>
            <p className="font-mono text-lg font-semibold text-gold-bright">
              {formatCurrencyDecimal(results.pricePerSqFt)}
            </p>
          </div>
        </div>
      </div>

      {/* Margin Gauge */}
      <div className="bg-card border border-border rounded-lg p-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-gold" />
            <span className="text-sm font-medium text-foreground">Net Margin</span>
          </div>
          <span className="font-mono text-sm font-semibold text-gold">
            {marginPercent.toFixed(1)}%
          </span>
        </div>
        <div className="w-full h-2.5 bg-background rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{
              width: `${Math.min(marginPercent, 100)}%`,
              background: `linear-gradient(90deg, oklch(0.7 0.12 85), oklch(0.85 0.15 85))`,
            }}
          />
        </div>
        <div className="flex justify-between mt-1.5">
          <span className="text-xs text-muted-foreground">Target: {targetMargin}%</span>
          <span className="text-xs font-mono text-gold-dim">
            {formatCurrency(results.marginAmount)} profit
          </span>
        </div>
      </div>

      {/* Job Stats */}
      <div className="bg-card border border-border rounded-lg p-4 space-y-3">
        <h4 className="font-display text-xs uppercase tracking-widest text-muted-foreground">
          Job Statistics
        </h4>
        <div className="space-y-2">
          <StatRow icon={<Ruler className="w-3.5 h-3.5" />} label="Total Area" value={`${formatNumber(results.totalArea, 0)} sq ft`} />
          <StatRow icon={<Weight className="w-3.5 h-3.5" />} label="Total Tonnage" value={`${formatNumber(results.totalTons)} tons`} />
          <StatRow icon={<Truck className="w-3.5 h-3.5" />} label="Truck Loads" value={`${results.totalTruckLoads} loads`} />
          <StatRow icon={<Users className="w-3.5 h-3.5" />} label="Est. Job Duration" value={`${formatNumber(results.jobHours)} hours`} />
        </div>
      </div>

      {/* Cost Breakdown */}
      <div className="bg-card border border-border rounded-lg p-4 space-y-3">
        <h4 className="font-display text-xs uppercase tracking-widest text-muted-foreground">
          Cost Breakdown
        </h4>
        <div className="space-y-2">
          <CostRow icon={<DollarSign className="w-3.5 h-3.5" />} label="Materials" value={results.totalMaterialsCost} total={results.totalJobCost} />
          <CostRow icon={<Truck className="w-3.5 h-3.5" />} label="Hauling" value={results.haulCost} total={results.totalJobCost} />
          <CostRow icon={<Users className="w-3.5 h-3.5" />} label="Labor" value={results.totalLaborCost} total={results.totalJobCost} />
          <CostRow icon={<Wrench className="w-3.5 h-3.5" />} label="Equipment" value={results.totalEquipmentCost} total={results.totalJobCost} />
          <CostRow icon={<Building2 className="w-3.5 h-3.5" />} label="Overhead" value={results.overheadAllocation} total={results.totalJobCost} />
          <CostRow icon={<CreditCard className="w-3.5 h-3.5" />} label="Loans" value={results.loanAllocation} total={results.totalJobCost} />
          <CostRow icon={<UserCircle className="w-3.5 h-3.5" />} label="Owner Salary" value={results.ownerAllocation} total={results.totalJobCost} />
          {results.totalSitePrepCost > 0 && (
            <CostRow icon={<HardHat className="w-3.5 h-3.5" />} label="Site Prep" value={results.totalSitePrepCost} total={results.totalJobCost} />
          )}
        </div>
        <div className="pt-2 border-t border-border/50 flex justify-between items-center">
          <span className="text-sm font-medium text-foreground">Total Cost</span>
          <span className="font-mono text-sm font-semibold text-foreground">
            {formatCurrency(results.totalJobCost)}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-muted-foreground">Cost per ton</span>
          <span className="font-mono text-sm text-muted-foreground">
            {formatCurrencyDecimal(results.costPerTon)}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-muted-foreground">Cost per sq ft</span>
          <span className="font-mono text-sm text-muted-foreground">
            {formatCurrencyDecimal(results.costPerSqFt)}
          </span>
        </div>
      </div>
    </div>
  );
}

function StatRow({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2 text-muted-foreground">
        {icon}
        <span className="text-sm">{label}</span>
      </div>
      <span className="font-mono text-sm text-foreground">{value}</span>
    </div>
  );
}

function CostRow({ icon, label, value, total }: { icon: React.ReactNode; label: string; value: number; total: number }) {
  const pct = total > 0 ? (value / total) * 100 : 0;
  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-muted-foreground">
          {icon}
          <span className="text-sm">{label}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground">{pct.toFixed(0)}%</span>
          <span className="font-mono text-sm text-foreground w-20 text-right">
            {formatCurrency(value)}
          </span>
        </div>
      </div>
      <div className="w-full h-1 bg-background rounded-full overflow-hidden">
        <div
          className="h-full rounded-full bg-gold/40"
          style={{ width: `${Math.min(pct, 100)}%` }}
        />
      </div>
    </div>
  );
}
