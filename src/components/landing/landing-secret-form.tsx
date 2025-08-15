import { useState } from "react";
import {
  Lock,
  Copy,
  Eye,
  Shield,
  Sparkles,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { Button } from "~/components/ui/button";
import { Textarea } from "~/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "~/components/ui/alert-dialog";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";

import { useNewWhim } from "~/hooks/use-new-whim";

export function LandingSecretForm() {
  const { mutate: newWhim, isPending } = useNewWhim();
  const [message, setMessage] = useState("");
  const [maxAttempts, setMaxAttempts] = useState(1);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const [whimResult, setWhimResult] = useState<{
    id: string;
    otp: string;
  } | null>(null);
  const [copiedStates, setCopiedStates] = useState({ otp: false, url: false });

  function handleCreateSecret() {
    if (!message.trim()) return;
    setIsConfirmDialogOpen(true);
  }

  function handleConfirmCreate() {
    setIsConfirmDialogOpen(false);

    newWhim(
      { message, maxAttempts },
      {
        onSuccess: (data: { id: string; otp: string }) => {
          setWhimResult(data);
          setIsDialogOpen(true);
          setMessage("");
          setMaxAttempts(1);
        },
      }
    );
  }

  function copyToClipboard(text: string, type: "otp" | "url") {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedStates(prev => ({ ...prev, [type]: true }));
      setTimeout(() => {
        setCopiedStates(prev => ({ ...prev, [type]: false }));
      }, 2000);
    });
  }

  function handleDialogClose() {
    setIsDialogOpen(false);
    setWhimResult(null);
    setCopiedStates({ otp: false, url: false });
  }

  const isFormValid = !!message.trim();
  const whimUrl = whimResult
    ? `${window.location.origin}/${whimResult.id}`
    : "";

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card className="border border-slate-200/50 dark:border-slate-800/50 shadow-xs bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm">
        <CardHeader className="space-y-1 pb-6">
          <div className="flex items-center justify-center mb-2">
            <div className="p-2 rounded-full bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-950 dark:to-purple-950">
              <Lock className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            </div>
          </div>
          <CardTitle className="text-2xl font-light text-center text-slate-800 dark:text-slate-100">
            Create a Secret Whim
          </CardTitle>
          <CardDescription className="text-center text-slate-600 dark:text-slate-400">
            Ephemeral secrets that vanish after viewing
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Secret Input */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
              Your Secret
            </label>
            <Textarea
              placeholder="Enter your confidential message..."
              value={message}
              onChange={e => setMessage(e.target.value)}
              className="min-h-[140px] resize-none outline-none border-slate-200 dark:border-slate-700 focus:border-indigo-400 dark:focus:border-indigo-500 bg-transparent placeholder:text-slate-400 dark:placeholder:text-slate-500 transition-colors"
              disabled={isPending}
            />
          </div>

          {/* Access Limit */}
          <div className="space-y-3">
            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
              View Limit
            </label>
            <div className="flex gap-2">
              {[1, 2, 3, 5, 10].map(num => (
                <button
                  key={num}
                  type="button"
                  onClick={() => setMaxAttempts(num)}
                  disabled={isPending}
                  className={`
                    flex-1 py-2.5 px-3 rounded-lg text-sm font-medium transition-all
                    ${maxAttempts === num
                      ? "bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-sm"
                      : "bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700"
                    }
                    disabled:opacity-50 disabled:cursor-not-allowed
                  `}
                >
                  {num}
                </button>
              ))}
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1">
              <Eye className="w-3 h-3" />
              Self-destructs after {maxAttempts} {maxAttempts === 1 ? 'view' : 'views'}
            </p>
          </div>

          {/* Info Banner */}
          <div className="rounded-lg bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-950/30 dark:to-purple-950/30 p-4 border border-indigo-100 dark:border-indigo-900">
            <div className="flex gap-3">
              <Shield className="w-4 h-4 text-indigo-600 dark:text-indigo-400 mt-0.5 flex-shrink-0" />
              <div className="space-y-1">
                <p className="text-sm font-medium text-indigo-900 dark:text-indigo-200">
                  End-to-End Encrypted
                </p>
                <p className="text-xs text-indigo-700 dark:text-indigo-300">
                  Your secret is encrypted before storage and requires an OTP to access
                </p>
              </div>
            </div>
          </div>

          {/* Create Button */}
          <Button
            onClick={handleCreateSecret}
            disabled={!isFormValid || isPending}
            className="w-full h-11 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-sm hover:shadow-md transition-all disabled:from-slate-400 disabled:to-slate-400"
          >
            {isPending ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Creating...
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                Create Whim
              </div>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Confirmation Dialog */}
      <AlertDialog
        open={isConfirmDialogOpen}
        onOpenChange={setIsConfirmDialogOpen}
      >
        <AlertDialogContent className="max-w-md">
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-amber-600" />
              Confirm Creation
            </AlertDialogTitle>
            <AlertDialogDescription className="pt-2">
              This secret will self-destruct after {maxAttempts} {maxAttempts === 1 ? 'view' : 'views'}.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <div className="my-4 p-4 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
            <p className="text-sm text-slate-700 dark:text-slate-300 line-clamp-3">
              {message}
            </p>
          </div>

          <AlertDialogFooter>
            <AlertDialogCancel className="border-slate-200 dark:border-slate-700">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirmCreate}
              className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white"
            >
              Create Whim
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Success Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={handleDialogClose}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <div className="flex items-center justify-center mb-4">
              <div className="p-3 rounded-full bg-green-50 dark:bg-green-950">
                <CheckCircle2 className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
            </div>
            <DialogTitle className="text-center">
              Whim Created
            </DialogTitle>
            <DialogDescription className="text-center">
              Share these credentials securely with the recipient
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 mt-6">
            {/* OTP */}
            <div className="space-y-2">
              <label className="text-xs font-medium text-slate-600 dark:text-slate-400 uppercase tracking-wider">
                Access Code
              </label>
              <div className="relative group">
                <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 font-mono text-xl text-center tracking-widest font-semibold text-slate-900 dark:text-slate-100">
                  {whimResult?.otp}
                </div>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => whimResult && copyToClipboard(whimResult.otp, "otp")}
                  className="absolute right-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  {copiedStates.otp ? (
                    <CheckCircle2 className="w-4 h-4 text-green-600" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </Button>
              </div>
            </div>

            {/* URL */}
            <div className="space-y-2">
              <label className="text-xs font-medium text-slate-600 dark:text-slate-400 uppercase tracking-wider">
                Secret URL
              </label>
              <div className="relative group">
                <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 font-mono text-xs break-all text-slate-700 dark:text-slate-300">
                  {whimUrl}
                </div>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => copyToClipboard(whimUrl, "url")}
                  className="absolute right-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  {copiedStates.url ? (
                    <CheckCircle2 className="w-4 h-4 text-green-600" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </Button>
              </div>
            </div>

            {/* Notice */}
            <div className="p-3 bg-amber-50 dark:bg-amber-950/30 rounded-lg border border-amber-200 dark:border-amber-800">
              <p className="text-xs text-amber-800 dark:text-amber-200 text-center">
                This secret will be permanently deleted after {maxAttempts} {maxAttempts === 1 ? 'access' : 'accesses'}
              </p>
            </div>

            <Button
              onClick={handleDialogClose}
              variant="outline"
              className="w-full border-slate-200 dark:border-slate-700"
            >
              Create Another
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}