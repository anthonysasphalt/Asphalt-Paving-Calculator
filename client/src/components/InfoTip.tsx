// Design: Industrial Blueprint — gold-accented info tooltips
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Info } from "lucide-react";

interface InfoTipProps {
  content: string;
}

export default function InfoTip({ content }: InfoTipProps) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <button
          type="button"
          className="inline-flex items-center justify-center w-4 h-4 ml-1.5 rounded-full text-gold-dim hover:text-gold transition-colors"
          tabIndex={-1}
        >
          <Info className="w-3.5 h-3.5" />
        </button>
      </TooltipTrigger>
      <TooltipContent
        side="top"
        className="max-w-[280px] bg-popover text-popover-foreground border-gold/20 text-sm leading-relaxed"
      >
        {content}
      </TooltipContent>
    </Tooltip>
  );
}
