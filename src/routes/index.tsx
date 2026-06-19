import { createFileRoute } from "@tanstack/react-router";
import {
  LandingHero,
  LandingProcessFlow,
  LandingSecretForm,
  LandingStats,
} from "~/components/landing";
import ThemeRender from "~/components/theme-renderer";
import { statsQuery } from "~/lib/queries";

export const Route = createFileRoute("/")({
  component: LandingPage,
  loader({ context }) {
    context.queryClient.ensureQueryData(statsQuery);
  },
});

function LandingPage() {
  return (
    <ThemeRender>
      <div className="min-h-screen flex flex-col">
        <div className="relative flex-1 overflow-hidden">
          <div className="relative container mx-auto px-4 py-8 lg:py-12">
            <div className="max-w-7xl mx-auto">
              <div className="hidden lg:block">
                <div className="mb-12 text-center max-w-4xl mx-auto">
                  <LandingHero />
                </div>
                <div className="grid grid-cols-12 gap-8 mb-12">
                  <div className="col-span-7">
                    <div className="sticky top-8">
                      <LandingSecretForm />
                    </div>
                  </div>
                  <div className="col-span-5 space-y-8">
                    <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-2xl border border-slate-200/50 dark:border-slate-800/50 shadow-xs p-6">
                      <LandingStats />
                    </div>

                    <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-2xl border border-slate-200/50 dark:border-slate-800/50 shadow-xs p-6">
                      <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-4 flex items-center gap-2">
                        <div className="w-1 h-5 bg-gradient-to-b from-indigo-500 to-purple-500 rounded-full" />
                        How It Works
                      </h3>
                      <LandingProcessFlow />
                    </div>
                  </div>
                </div>
              </div>
              <div className="lg:hidden space-y-6">
                <div className="text-center">
                  <LandingHero />
                </div>
                <div className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl rounded-2xl border border-slate-200/50 dark:border-slate-800/50 shadow-xl">
                  <LandingSecretForm />
                </div>
                <div className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl rounded-2xl border border-slate-200/50 dark:border-slate-800/50 shadow-xl p-6">
                  <LandingStats />
                </div>
                <div className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl rounded-2xl border border-slate-200/50 dark:border-slate-800/50 shadow-xl p-6">
                  <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-4">
                    How It Works
                  </h3>
                  <LandingProcessFlow />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ThemeRender>

  );
}