import { useSuspenseQuery } from "@tanstack/react-query";
import { Edit3, Zap } from "lucide-react";
import { statsQuery } from "~/lib/queries";

export function LandingStats() {
  const { data: stats } = useSuspenseQuery(statsQuery);

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-medium text-slate-700 dark:text-slate-300">
        Platform Statistics
      </h3>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1">
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-light text-slate-900 dark:text-white">
              {stats.whimsCreated.toLocaleString()}
            </span>
            <Edit3 className="w-3 h-3 text-slate-400" />
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-500 capitalize">
            Whims created
          </p>
        </div>

        <div className="space-y-1">
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-light text-slate-900 dark:text-white">
              {stats.secretsVanished.toLocaleString()}
            </span>
            <Zap className="w-3 h-3 text-slate-400" />
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-500 capitalize">
            Whims vanished
          </p>
        </div>
      </div>

      <div className="pt-3 border-t border-slate-200 dark:border-slate-800">
        <p className="text-xs text-slate-500 dark:text-slate-500">
          Updated in real-time • Completely anonymous
        </p>
      </div>
    </div>
  );
}