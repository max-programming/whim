import { useState } from "react";
import {
  Shield,
  Zap,
  Eye,
  Copy,
  CheckCircle,
  AlertTriangle,
} from "lucide-react";
import { Button } from "~/components/ui/button";
import { Textarea } from "~/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
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
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "~/components/ui/tooltip";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
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
          setMessage(""); // Clear the form
          setMaxAttempts(1); // Reset to default
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
    <div className="lg:pl-4">
      <TooltipProvider>
        <Card className="border-2 border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 shadow-md hover:border-indigo-200 dark:hover:border-indigo-700 transition-colors">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-xl text-slate-900 dark:text-slate-100">
              Create Your Secret Whim
            </CardTitle>
            <CardDescription className="text-slate-500 dark:text-slate-400">
              Share on a whim, vanish without a trace
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-5 px-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Your Secret
              </label>
              <Textarea
                placeholder="Type your secret on a whim... API keys, passwords, private notes, or anything confidential"
                value={message}
                onChange={e => setMessage(e.target.value)}
                className="min-h-[120px] resize-none bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-600 focus:border-indigo-300 dark:focus:border-indigo-500 focus:ring-indigo-200 dark:focus:ring-indigo-500/20 text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-500 dark:placeholder:text-slate-400"
                disabled={isPending}
              />
            </div>

            {/* Max Attempts Selection */}
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">
                Access Limit
              </label>
              <div className="grid grid-cols-5 gap-2">
                {[1, 2, 3, 5, 10].map(num => (
                  <Button
                    key={num}
                    type="button"
                    variant={maxAttempts === num ? "default" : "outline"}
                    size="sm"
                    onClick={() => setMaxAttempts(num)}
                    disabled={isPending}
                    className={`text-xs ${
                      maxAttempts === num
                        ? "bg-indigo-600 hover:bg-indigo-700 text-white"
                        : "hover:bg-slate-50 dark:hover:bg-slate-700"
                    }`}
                  >
                    {num}
                  </Button>
                ))}
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
                Number of times this whim can be accessed before
                self-destructing
              </p>
            </div>

            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-3">
              <div className="flex items-start gap-2">
                <Eye className="w-4 h-4 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                <div className="text-sm text-blue-800 dark:text-blue-200">
                  <p className="font-medium mb-1">
                    {maxAttempts === 1
                      ? "One-Time Access"
                      : `${maxAttempts}-Time Access`}
                  </p>
                  <p className="text-blue-700 dark:text-blue-300">
                    Your secret will be permanently destroyed after being
                    accessed{" "}
                    {maxAttempts === 1 ? "once" : `${maxAttempts} times`}, even
                    if it hasn't reached the expiry time.
                  </p>
                </div>
              </div>
            </div>

            {/* Create Button */}
            <Tooltip>
              <TooltipTrigger asChild>
                <div>
                  <Button
                    onClick={handleCreateSecret}
                    disabled={!isFormValid || isPending}
                    className="w-full h-12 text-lg font-semibold bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-600 dark:hover:bg-indigo-700 disabled:bg-slate-300 dark:disabled:bg-slate-600 disabled:text-slate-500 dark:disabled:text-slate-400 transition-all duration-200 transform hover:scale-[1.02] shadow-md hover:shadow-lg text-white"
                  >
                    {isPending ? (
                      <>
                        <div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full" />
                        Creating...
                      </>
                    ) : (
                      <>
                        <Zap className="size-5" />
                        Share This Whim
                      </>
                    )}
                  </Button>
                </div>
              </TooltipTrigger>
              {!isFormValid && !isPending && (
                <TooltipContent>
                  <p>Enter a message to create your whim</p>
                </TooltipContent>
              )}
            </Tooltip>
          </CardContent>

          <CardFooter className="justify-center -mb-2 -mt-3 text-slate-500 dark:text-slate-400">
            <Shield className="size-3 mr-1" />
            <p className="text-sm">
              Your whim is encrypted • OTP protected • Limited access
            </p>
          </CardFooter>
        </Card>

        {/* Confirmation Dialog */}
        <AlertDialog
          open={isConfirmDialogOpen}
          onOpenChange={setIsConfirmDialogOpen}
        >
          <AlertDialogContent className="sm:max-w-lg">
            <AlertDialogHeader>
              <AlertDialogTitle className="flex items-center gap-2 text-amber-700">
                <AlertTriangle className="w-5 h-5" />
                Confirm Your Secret
              </AlertDialogTitle>
              <AlertDialogDescription className="text-left">
                You're about to create a whim with the following message. This
                secret will be encrypted and will <strong>self-destruct</strong>{" "}
                after being accessed{" "}
                {maxAttempts === 1 ? "once" : `${maxAttempts} times`}.
              </AlertDialogDescription>
            </AlertDialogHeader>

            <div className="my-4">
              <div className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-600 rounded-lg p-4 max-h-32 overflow-y-auto">
                <p className="text-sm text-slate-800 dark:text-slate-200 whitespace-pre-wrap break-words">
                  {message}
                </p>
              </div>
            </div>

            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-3 mb-4">
              <div className="flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-red-600 dark:text-red-400 mt-0.5 flex-shrink-0" />
                <div className="text-sm text-red-800 dark:text-red-200">
                  <p className="font-medium mb-1">⚠️ Important Warning</p>
                  <p className="text-red-700 dark:text-red-300">
                    Once created, this secret will be destroyed forever after
                    the first person opens the link. Make sure you really want
                    to share this information.
                  </p>
                </div>
              </div>
            </div>

            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={handleConfirmCreate}
                className="bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-600 dark:hover:bg-indigo-700 text-white"
              >
                Yes, Create Whim
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        {/* Success Dialog */}
        <Dialog open={isDialogOpen} onOpenChange={handleDialogClose}>
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2 text-green-700">
                <CheckCircle className="w-5 h-5" />
                Whim Created Successfully!
              </DialogTitle>
              <DialogDescription>
                Your secret is now encrypted and ready to share. Save these
                details securely.
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 mt-4">
              {/* OTP Section */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  One-Time Password (OTP)
                </label>
                <div className="flex items-center gap-2">
                  <div className="flex-1 p-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-600 rounded-md font-mono text-lg font-bold text-center tracking-wider text-slate-900 dark:text-slate-100">
                    {whimResult?.otp}
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() =>
                      whimResult && copyToClipboard(whimResult.otp, "otp")
                    }
                    className="px-3"
                  >
                    {copiedStates.otp ? (
                      <CheckCircle className="w-4 h-4 text-green-600 dark:text-green-400" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </Button>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  The recipient will need this OTP to access the secret.
                </p>
              </div>

              {/* URL Section */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  Share URL
                </label>
                <div className="flex items-center gap-2">
                  <div className="flex-1 p-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-600 rounded-md font-mono text-sm break-all text-slate-900 dark:text-slate-100">
                    {whimUrl}
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => copyToClipboard(whimUrl, "url")}
                    className="px-3"
                  >
                    {copiedStates.url ? (
                      <CheckCircle className="w-4 h-4 text-green-600 dark:text-green-400" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </Button>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Share this URL with the intended recipient.
                </p>
              </div>

              {/* Warning */}
              <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-3">
                <div className="flex items-start gap-2">
                  <Eye className="w-4 h-4 text-amber-600 dark:text-amber-400 mt-0.5 flex-shrink-0" />
                  <div className="text-sm text-amber-800 dark:text-amber-200">
                    <p className="font-medium mb-1">Important</p>
                    <p className="text-amber-700 dark:text-amber-300">
                      The secret will be permanently destroyed after the first
                      access or when the link expires. Make sure to share both
                      the URL and OTP securely.
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-center pt-2">
                <Button
                  onClick={handleDialogClose}
                  className="bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-600 dark:hover:bg-indigo-700 text-white"
                >
                  Create Another
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </TooltipProvider>
    </div>
  );
}
