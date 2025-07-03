import { useSuspenseQuery } from "@tanstack/react-query";
import { Edit3, Zap } from "lucide-react";
import { Card, CardContent } from "~/components/ui/card";
import { statsQuery } from "~/lib/queries";

export function LandingStats() {
  const { data: stats } = useSuspenseQuery(statsQuery);

  return (
    <div className="grid grid-cols-2 gap-2 w-full">
      <Card className="py-2 shadow-sm border-2 border-slate-200 bg-slate-50 hover:border-indigo-200 transition-colors">
        <CardContent className="px-3 py-0 text-center">
          <div className="flex items-center justify-center gap-1 mb-0.5">
            <Edit3 className="size-4 text-indigo-600" />
            <div className="text-lg font-bold text-slate-900">
              {stats.whimsCreated}
            </div>
          </div>
          <div className="text-xs text-slate-600">Whims Created</div>
        </CardContent>
      </Card>

      <Card className="py-2 shadow-sm border-2 border-slate-200 bg-slate-50 hover:border-indigo-200 transition-colors">
        <CardContent className="px-3 py-0 text-center">
          <div className="flex items-center justify-center gap-1 mb-0.5">
            <Zap className="size-4 text-red-500" />
            <div className="text-lg font-bold text-slate-900">
              {stats.secretsVanished}
            </div>
          </div>
          <div className="text-xs text-slate-600">Secrets Vanished</div>
        </CardContent>
      </Card>
    </div>
  );
}
