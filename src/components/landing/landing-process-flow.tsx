import { Edit3, Shield, Link2, Eye, Clock, Zap } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";

export function LandingProcessFlow() {
  return (
    <div>
      <Card className="shadow-sm border-2 border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/30 hover:border-indigo-200 dark:hover:border-indigo-700 transition-colors">
        <CardHeader className="pb-4">
          <CardTitle className="text-xl text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <Shield className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            How It Works
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Step 1 */}
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 w-8 h-8 bg-indigo-100 dark:bg-indigo-900/50 rounded-full flex items-center justify-center">
              <span className="text-indigo-600 dark:text-indigo-400 font-semibold text-sm">
                1
              </span>
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <Edit3 className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                <h3 className="font-semibold text-sm text-slate-900 dark:text-slate-100">
                  Write Your Secret
                </h3>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-300">
                Type your sensitive information (API keys, passwords, private
                notes) into the secure form.
              </p>
            </div>
          </div>

          {/* Step 2 */}
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 w-8 h-8 bg-indigo-100 dark:bg-indigo-900/50 rounded-full flex items-center justify-center">
              <span className="text-indigo-600 dark:text-indigo-400 font-semibold text-sm">
                2
              </span>
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <Shield className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                <h3 className="font-semibold text-sm text-slate-900 dark:text-slate-100">
                  Encrypt & Generate
                </h3>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-300">
                Your secret is encrypted end-to-end and a unique URL + one-time
                password (OTP) are generated.
              </p>
            </div>
          </div>

          {/* Step 3 */}
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 w-8 h-8 bg-indigo-100 dark:bg-indigo-900/50 rounded-full flex items-center justify-center">
              <span className="text-indigo-600 dark:text-indigo-400 font-semibold text-sm">
                3
              </span>
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <Link2 className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                <h3 className="font-semibold text-sm text-slate-900 dark:text-slate-100">
                  Share the Link & OTP
                </h3>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-300">
                Send the URL and OTP to your recipient through separate channels
                for maximum security.
              </p>
            </div>
          </div>

          {/* Step 4 */}
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 w-8 h-8 bg-indigo-100 dark:bg-indigo-900/50 rounded-full flex items-center justify-center">
              <span className="text-indigo-600 dark:text-indigo-400 font-semibold text-sm">
                4
              </span>
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <Eye className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                <h3 className="font-semibold text-sm text-slate-900 dark:text-slate-100">
                  Limited Access
                </h3>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-300">
                The recipient opens the link, enters the OTP, and views your
                secret for the allowed number of times.
              </p>
            </div>
          </div>

          {/* Step 5 */}
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 w-8 h-8 bg-red-100 dark:bg-red-900/50 rounded-full flex items-center justify-center">
              <span className="text-red-600 dark:text-red-400 font-semibold text-sm">
                5
              </span>
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <Zap className="w-4 h-4 text-red-600 dark:text-red-400" />
                <h3 className="font-semibold text-sm text-slate-900 dark:text-slate-100">
                  Automatic Destruction
                </h3>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-300">
                The secret is permanently deleted from our servers after all
                allowed accesses are used.
              </p>
            </div>
          </div>

          {/* Security Note */}
          <div className="bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-800 rounded-lg p-3 mt-4">
            <div className="flex items-start gap-2">
              <Clock className="w-4 h-4 text-indigo-600 dark:text-indigo-400 mt-0.5 flex-shrink-0" />
              <div className="text-sm text-indigo-800 dark:text-indigo-200">
                <p className="font-medium mb-1">Zero-Knowledge Security</p>
                <p className="text-indigo-700 dark:text-indigo-300">
                  Your secret is encrypted in your browser before being sent to
                  our servers. We never see your data in plain text.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
