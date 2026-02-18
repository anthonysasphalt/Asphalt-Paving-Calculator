// Design: Industrial Blueprint — precision input fields with gold focus
import InfoTip from "./InfoTip";

interface NumberInputProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  tooltip?: string;
  prefix?: string;
  suffix?: string;
  min?: number;
  max?: number;
  step?: number;
  className?: string;
}

export default function NumberInput({
  label,
  value,
  onChange,
  tooltip,
  prefix,
  suffix,
  min = 0,
  max,
  step = 1,
  className = "",
}: NumberInputProps) {
  return (
    <div className={`space-y-1.5 ${className}`}>
      <label className="flex items-center text-sm font-medium text-muted-foreground">
        {label}
        {tooltip && <InfoTip content={tooltip} />}
      </label>
      <div className="relative flex items-center">
        {prefix && (
          <span className="absolute left-3 text-sm text-gold-dim font-mono pointer-events-none">
            {prefix}
          </span>
        )}
        <input
          type="number"
          value={value || ""}
          onChange={(e) => {
            const val = parseFloat(e.target.value);
            if (!isNaN(val)) {
              onChange(val);
            } else if (e.target.value === "") {
              onChange(0);
            }
          }}
          min={min}
          max={max}
          step={step}
          className={`w-full h-10 bg-input border border-border rounded-md font-mono text-sm text-foreground
            focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/15 transition-all
            ${prefix ? "pl-8" : "pl-3"} ${suffix ? "pr-12" : "pr-3"}`}
        />
        {suffix && (
          <span className="absolute right-3 text-xs text-muted-foreground font-mono pointer-events-none">
            {suffix}
          </span>
        )}
      </div>
    </div>
  );
}
