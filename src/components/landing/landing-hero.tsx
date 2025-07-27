import { Shield, Clock, Lock, Flame } from "lucide-react";
import { Card, CardContent } from "~/components/ui/card";

export function LandingHero() {
  return (
    <div className="space-y-9">
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
          confidential data.
        </p>
      </div>

      {/* Essential Features - Condensed on Mobile */}
      <div className="grid grid-cols-3 gap-2 sm:gap-3">
        <Card className="py-2 sm:py-4 shadow-sm border-2 border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 hover:border-indigo-200 dark:hover:border-indigo-700 transition-colors">
          <CardContent className="px-2 sm:px-4 py-0">
            <div className="text-center space-y-1 sm:space-y-2">
              <div className="flex justify-center">
                <Shield className="w-4 h-4 sm:w-6 sm:h-6 text-indigo-600 dark:text-indigo-400" />
              </div>
              <div>
                <div className="font-semibold text-xs sm:text-sm text-slate-900 dark:text-slate-100">
                  Encrypted
                </div>
                <div className="text-xs sm:text-xs text-slate-500 dark:text-slate-400 mt-0.5 sm:mt-1">
                  End-to-end encrypted
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="py-2 sm:py-4 shadow-sm border-2 border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 hover:border-indigo-200 dark:hover:border-indigo-700 transition-colors">
          <CardContent className="px-2 sm:px-4 py-0">
            <div className="text-center space-y-1 sm:space-y-2">
              <div className="flex justify-center">
                <Clock className="w-4 h-4 sm:w-6 sm:h-6 text-indigo-600 dark:text-indigo-400" />
              </div>
              <div>
                <div className="font-semibold text-xs sm:text-sm text-slate-900 dark:text-slate-100">
                  Self-Destruct
                </div>
                <div className="text-xs sm:text-xs text-slate-500 dark:text-slate-400 mt-0.5 sm:mt-1">
                  Deleted after reading (once or multiple times)
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="py-2 sm:py-4 shadow-sm border-2 border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 hover:border-indigo-200 dark:hover:border-indigo-700 transition-colors">
          <CardContent className="px-2 sm:px-4 py-0">
            <div className="text-center space-y-1 sm:space-y-2">
              <div className="flex justify-center">
                <Lock className="w-4 h-4 sm:w-6 sm:h-6 text-indigo-600 dark:text-indigo-400" />
              </div>
              <div>
                <div className="font-semibold text-xs sm:text-sm text-slate-900 dark:text-slate-100">
                  Password Protected
                </div>
                <div className="text-xs sm:text-xs text-slate-500 dark:text-slate-400 mt-0.5 sm:mt-1">
                  OTP required
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
