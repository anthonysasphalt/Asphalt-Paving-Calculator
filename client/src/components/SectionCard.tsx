// Design: Industrial Blueprint — accordion sections with gold left-border
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown } from "lucide-react";
import { useState, type ReactNode } from "react";

interface SectionCardProps {
  number: number;
  title: string;
  icon: ReactNode;
  children: ReactNode;
  defaultOpen?: boolean;
  subtitle?: string;
}

export default function SectionCard({
  number,
  title,
  icon,
  children,
  defaultOpen = true,
  subtitle,
}: SectionCardProps) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <Collapsible open={open} onOpenChange={setOpen}>
      <div className="section-card animate-fade-in-up">
        <CollapsibleTrigger asChild>
          <button
            type="button"
            className="w-full flex items-center gap-4 p-5 hover:bg-white/[0.02] transition-colors"
          >
            <div className="flex items-center justify-center w-8 h-8 rounded bg-gold/10 text-gold shrink-0">
              <span className="font-display font-bold text-sm">{String(number).padStart(2, '0')}</span>
            </div>
            <div className="flex items-center gap-2 text-gold shrink-0">
              {icon}
            </div>
            <div className="flex flex-col items-start text-left">
              <h3 className="font-display font-semibold text-lg text-foreground tracking-wide uppercase">
                {title}
              </h3>
              {subtitle && (
                <p className="text-xs text-muted-foreground mt-0.5">{subtitle}</p>
              )}
            </div>
            <ChevronDown
              className={`ml-auto w-5 h-5 text-muted-foreground transition-transform duration-200 ${
                open ? "rotate-180" : ""
              }`}
            />
          </button>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <div className="px-5 pb-5 pt-1 border-t border-border/50">
            {children}
          </div>
        </CollapsibleContent>
      </div>
    </Collapsible>
  );
}
