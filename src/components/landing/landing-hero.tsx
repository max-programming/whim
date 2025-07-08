import { Shield, Clock, Lock, Flame, Users, Zap, Github } from "lucide-react";
import { Card, CardContent } from "~/components/ui/card";

export function LandingHero() {
  return (
    <div className="space-y-6">
      {/* Brand Badge with Whim */}
      <div className="inline-flex items-center gap-2 bg-indigo-50 dark:bg-indigo-900/30 px-3 py-1.5 rounded-full text-indigo-700 dark:text-indigo-300 font-medium text-sm border border-indigo-100 dark:border-indigo-800">
        <Flame className="w-4 h-4" />
        Whim
      </div>

      {/* Headline */}
      <div className="space-y-3">
        <h1 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-slate-900 dark:text-slate-100 leading-tight">
          Share Secrets
          <span className="text-indigo-600 dark:text-indigo-400 block">
            Safely & Securely
          </span>
        </h1>

        <p className="text-base lg:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-md">
          Share sensitive information on a{" "}
          <span className="font-medium text-slate-700 dark:text-slate-200">
            whim
          </span>{" "}
          - your secrets automatically self-destruct after being read or when
          time expires. Perfect for one-time sharing of API keys, passwords, and
          confidential data that shouldn't linger around.
        </p>
      </div>

      {/* Feature Badges - More Compact */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
        <Card className="py-2 shadow-sm border-2 border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 hover:border-indigo-200 dark:hover:border-indigo-700 transition-colors">
          <CardContent className="px-2.5 py-0">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-indigo-600 dark:text-indigo-400 flex-shrink-0" />
              <div>
                <div className="font-medium text-xs text-slate-900 dark:text-slate-100">
                  Encrypted
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400">
                  End-to-end
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="py-2 shadow-sm border-2 border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 hover:border-indigo-200 dark:hover:border-indigo-700 transition-colors">
          <CardContent className="px-2.5 py-0">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-indigo-600 dark:text-indigo-400 flex-shrink-0" />
              <div>
                <div className="font-medium text-xs text-slate-900 dark:text-slate-100">
                  Timed
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400">
                  Auto-delete
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="py-2 shadow-sm border-2 border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 hover:border-indigo-200 dark:hover:border-indigo-700 transition-colors">
          <CardContent className="px-2.5 py-0">
            <div className="flex items-center gap-2">
              <Lock className="w-4 h-4 text-indigo-600 dark:text-indigo-400 flex-shrink-0" />
              <div>
                <div className="font-medium text-xs text-slate-900 dark:text-slate-100">
                  Protected
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400">
                  Optional pwd
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Trust Indicators - Fill bottom space */}
      <div className="space-y-3 pt-2">
        <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
          <Users className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
          <span>Trusted by developers worldwide</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
          <Github className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
          <span>Open source & transparent</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
          <Zap className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
          <span>Zero-knowledge architecture</span>
        </div>
        <div className="text-xs text-slate-500 dark:text-slate-400">
          Act on your <span className="font-medium">whim</span> to share secrets
          instantly. Perfect for API keys, passwords, private notes, and any
          sensitive data that needs to vanish without a trace.
        </div>
      </div>
    </div>
  );
}
