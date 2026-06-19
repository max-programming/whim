import { Clock, Lock, Shield } from "lucide-react";

export function LandingHero() {
  return (
    <div className="space-y-8">
      <div className="flex justify-center">
        <div className="inline-flex items-center gap-2 bg-slate-300 dark:bg-slate-800 px-3 py-1.5 rounded-full">
          <img src="/favicon-32x32.png" alt="Whim" className="w-4 h-4" />
          <span className="text-sm font-medium text-slate-600 dark:text-slate-400">
            Whim
          </span>
        </div>
      </div>

      <div className="space-y-4 text-center">
        <h1 className="text-3xl font-semibold lg:text-4xl xl:text-5xl text-slate-900 dark:text-white capitalize">
          Send secrets that
          <span className="block  text-indigo-600 dark:text-indigo-400">
            disappear after they're read
          </span>
        </h1>

        <p className="text-base lg:text-lg text-slate-600 dark:text-slate-400 leading-relaxed max-w-xl mx-auto">
          Securely share passwords, API keys, or confidential notes in a single-use,
          encrypted message. Once opened, it’s gone forever — private, safe, and simple.
        </p>
      </div>


      <div className="flex flex-col lg:flex-row items-center justify-center gap-4 lg:gap-8">
        <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
          <Shield className="w-4 h-4 text-slate-400" />
          <span>AES-256 encrypted</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
          <Clock className="w-4 h-4 text-slate-400" />
          <span>Auto-destructs</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
          <Lock className="w-4 h-4 text-slate-400" />
          <span>OTP protected</span>
        </div>
      </div>

      <div className="text-center">
        <p className="text-xs text-slate-500 dark:text-slate-500">
          Open source • Zero knowledge • No registration required
        </p>
      </div>
    </div>
  );
}