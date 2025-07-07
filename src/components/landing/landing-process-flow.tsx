import { ArrowRight, Edit3, Timer, Link2, Zap } from "lucide-react";
import { Card, CardContent } from "~/components/ui/card";

export function LandingProcessFlow() {
  return (
    <div className="lg:pl-4">
      <Card className="shadow-sm border-2 border-slate-200 bg-slate-50/50 hover:border-indigo-200 transition-colors py-2">
        <CardContent className="py-2">
          <div className="flex items-center justify-between text-xs text-slate-600">
            <div className="text-lg font-medium text-slate-700 mb-1">
              Share secrets on a whim:
            </div>
          </div>
          <div className="flex items-center gap-1.5 text-base text-slate-600">
            <div className="flex md:flex-row flex-col items-center gap-1.5">
              <Edit3 className="size-4" />
              <span>Write</span>
            </div>
            <ArrowRight className="size-4 text-slate-400" />
            <div className="flex md:flex-row flex-col items-center gap-1.5">
              <Timer className="size-4" />
              <span>Time</span>
            </div>
            <ArrowRight className="size-4 text-slate-400" />
            <div className="flex md:flex-row flex-col items-center gap-1.5">
              <Link2 className="size-4" />
              <span>Share</span>
            </div>
            <ArrowRight className="size-4 text-slate-400" />
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
