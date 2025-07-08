import { useSuspenseQuery } from "@tanstack/react-query";
import { Edit3, Zap } from "lucide-react";
import { Card, CardContent } from "~/components/ui/card";
import { statsQuery } from "~/lib/queries";

export function LandingStats() {
  const { data: stats } = useSuspenseQuery(statsQuery);

  return (
    <div className="grid grid-cols-2 gap-2 w-full">
      <Card className="py-2 shadow-sm border-2 border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 hover:border-indigo-200 dark:hover:border-indigo-700 transition-colors">
        <CardContent className="px-3 py-0 text-center">
          <div className="flex items-center justify-center gap-1 mb-0.5">
            <Edit3 className="size-4 text-indigo-600 dark:text-indigo-400" />
            <div className="text-lg font-bold text-slate-900 dark:text-slate-100">
              {stats.whimsCreated}
            </div>
          </div>
          <div className="text-xs text-slate-600 dark:text-slate-300">
            Whims Created
          </div>
        </CardContent>
      </Card>

      <Card className="py-2 shadow-sm border-2 border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 hover:border-indigo-200 dark:hover:border-indigo-700 transition-colors">
        <CardContent className="px-3 py-0 text-center">
          <div className="flex items-center justify-center gap-1 mb-0.5">
            <Zap className="size-4 text-red-500 dark:text-red-400" />
            <div className="text-lg font-bold text-slate-900 dark:text-slate-100">
              {stats.secretsVanished}
            </div>
          </div>
          <div className="text-xs text-slate-600 dark:text-slate-300">
            Secrets Vanished
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
