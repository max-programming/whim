import { Edit3, Shield, Link2, Eye, Zap } from "lucide-react";

export function LandingProcessFlow() {
  const steps = [
    {
      icon: Edit3,
      title: "Write your secret",
      description: "Enter your sensitive information in the secure form",
    },
    {
      icon: Shield,
      title: "Encrypt automatically",
      description: "Your message is encrypted with AES-256 before leaving your browser",
    },
    {
      icon: Link2,
      title: "Share credentials",
      description: "Send the unique URL and OTP to your recipient",
    },
    {
      icon: Eye,
      title: "Recipient views once",
      description: "They access the secret with the OTP for the set number of times",
    },
    {
      icon: Zap,
      title: "Auto-destruction",
      description: "The secret vanishes forever after viewing",
      isLast: true,
    },
  ];

  return (
    <div className="space-y-4">
      <div className="space-y-3">
        {steps.map((step, index) => (
          <div key={index} className="flex gap-4">
            <div className="flex-shrink-0">
              <div className={`
                w-8 h-8 rounded-full flex items-center justify-center text-sm
                ${step.isLast 
                  ? 'bg-red-50 dark:bg-red-950/20 text-red-600 dark:text-red-400' 
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                }
              `}>
                {index + 1}
              </div>
            </div>
            <div className="flex-1 space-y-1">
              <div className="flex items-center gap-2">
                <step.icon className="w-3 h-3 text-slate-400" />
                <h4 className="text-sm font-medium text-slate-900 dark:text-white">
                  {step.title}
                </h4>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-500 leading-relaxed">
                {step.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="pt-3 border-t border-slate-200 dark:border-slate-800">
        <p className="text-xs text-slate-500 dark:text-slate-500">
          Zero-knowledge architecture • We never see your unencrypted data
        </p>
      </div>
    </div>
  );
}