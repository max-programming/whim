import { ArrowRight, Edit3, Timer, Link2, Zap } from "lucide-react";
import { Card, CardContent } from "~/components/ui/card";

export function LandingProcessFlow() {
  return (
    <div className="lg:pl-4">
      <Card className="shadow-sm border-2 border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/30 hover:border-indigo-200 dark:hover:border-indigo-700 transition-colors py-2">
        <CardContent className="py-2">
          <div className="flex items-center justify-center md:justify-start text-xs text-slate-600 dark:text-slate-300">
            <div className="text-lg font-medium text-slate-700 dark:text-slate-200 mb-1">
              Share secrets on a whim
            </div>
          </div>
          <div className="flex items-center justify-between md:justify-start gap-1.5 text-base text-slate-600 dark:text-slate-300">
            <div className="flex md:flex-row flex-col items-center gap-1.5">
              <Edit3 className="size-4" />
              <span>Write</span>
            </div>
            <ArrowRight className="size-4 text-slate-400 dark:text-slate-500" />
            <div className="flex md:flex-row flex-col items-center gap-1.5">
              <Timer className="size-4" />
              <span>Time</span>
            </div>
            <ArrowRight className="size-4 text-slate-400 dark:text-slate-500" />
            <div className="flex md:flex-row flex-col items-center gap-1.5">
              <Link2 className="size-4" />
              <span>Share</span>
            </div>
            <ArrowRight className="size-4 text-slate-400 dark:text-slate-500" />
            <div className="flex md:flex-row flex-col items-center gap-1.5">
              <Zap className="size-4" />
              <span>Vanish</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
