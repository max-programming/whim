import { createFileRoute } from "@tanstack/react-router";
import {
  LandingHero,
  LandingStats,
  LandingProcessFlow,
  LandingSecretForm,
} from "~/components/landing";
import { statsQuery } from "~/lib/queries";

export const Route = createFileRoute("/")({
  component: LandingPage,
  loader({ context }) {
    context.queryClient.ensureQueryData(statsQuery);
  },
});

function LandingPage() {
  return (
    <div className="flex-1 flex items-center bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <div className="container mx-auto px-4 py-6 max-w-6xl">
        <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm rounded-2xl border border-slate-200/60 dark:border-slate-700/60 shadow-lg p-6 lg:p-8">
          {/* Mobile-First Layout */}
          <div className="lg:hidden space-y-6">
            {/* Hero Section */}
            <LandingHero />

            {/* Form - High Priority on Mobile */}
            <LandingSecretForm />

            {/* Stats */}
            <LandingStats />

            {/* How It Works - Lower Priority on Mobile */}
            <LandingProcessFlow />
          </div>

          {/* Desktop Layout */}
          <div className="hidden lg:block space-y-8">
            {/* First Row - Hero/Stats + Form */}
            <div className="grid grid-cols-12 gap-8">
              {/* Left Column - Hero and Stats */}
              <div className="col-span-5 flex flex-col justify-between">
                <LandingHero />
                <LandingStats />
              </div>

              {/* Right Column - Form */}
              <div className="col-span-7">
                <LandingSecretForm />
              </div>
            </div>

            {/* Second Row - How It Works (Full Width) */}
            <div className="w-full">
              <LandingProcessFlow />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
