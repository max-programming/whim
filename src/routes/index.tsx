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
    <div className="min-h-screen content-center bg-gradient-to-br from-slate-50 via-white to-slate-100">
      <div className="container mx-auto px-4 py-6 max-w-6xl">
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl border border-slate-200/60 shadow-lg p-6 lg:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-center">
            <div className="space-y-6">
              <LandingHero />
              <LandingStats />
            </div>
            <div className="space-y-4">
              <LandingProcessFlow />
              <LandingSecretForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
