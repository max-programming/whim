import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useParams } from "@tanstack/react-router";
import {
  Shield,
  Key,
  Zap,
  Eye,
  Copy,
  CheckCircle,
  AlertTriangle,
} from "lucide-react";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardAction,
} from "~/components/ui/card";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "~/components/ui/input-otp";
import { useGetWhim } from "~/hooks/use-get-whim";

export const Route = createFileRoute("/$whimId")({
  component: RouteComponent,
});

function RouteComponent() {
  const { whimId } = useParams({ from: "/$whimId" });
  const [otp, setOtp] = useState("");
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const handleOtpSubmit = () => {
    if (otp.length === 4) {
      setHasSubmitted(true);
    }
  };

  const handleOtpChange = (value: string) => {
    setOtp(value);
    // Auto-submit when OTP is complete
    if (value.length === 4) {
      setHasSubmitted(true);
    }
  };

  // Only fetch when we have both whimId and complete OTP, and user has submitted
  const shouldFetch = hasSubmitted && otp.length === 4;

  if (shouldFetch) {
    return <WhimDisplay whimId={whimId} otp={otp} />;
  }

  return (
    <OtpEntry
      whimId={whimId}
      otp={otp}
      onOtpChange={handleOtpChange}
      onSubmit={handleOtpSubmit}
    />
  );
}

interface OtpEntryProps {
  whimId: string;
  otp: string;
  onOtpChange: (value: string) => void;
  onSubmit: () => void;
}

function OtpEntry({ whimId, otp, onOtpChange, onSubmit }: OtpEntryProps) {
  const isComplete = otp.length === 4;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-indigo-50 px-3 py-1.5 rounded-full text-indigo-700 font-medium text-sm border border-indigo-100 mb-4">
            <Zap className="w-4 h-4" />
            Whim
          </div>
          <h1 className="text-2xl font-bold text-slate-900 mb-2">
            Access Secret Whim
          </h1>
          <p className="text-slate-600">
            Enter the 4-digit OTP to decrypt and view this secret
          </p>
        </div>

        <Card className="border-2 border-slate-200 shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="flex items-center justify-center gap-2 text-lg">
              <Key className="w-5 h-5 text-indigo-600" />
              Whim ID: {whimId}
            </CardTitle>
            <CardDescription>
              This secret will self-destruct after viewing
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            <div className="space-y-3">
              <label className="block text-sm font-medium text-slate-700 text-center">
                Enter 4-Digit OTP
              </label>
              <div className="flex justify-center">
                <InputOTP
                  maxLength={4}
                  value={otp}
                  onChange={onOtpChange}
                  onComplete={onOtpChange}
                >
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                  </InputOTPGroup>
                </InputOTP>
              </div>
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
              <div className="flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
                <div className="text-sm text-amber-800">
                  <p className="font-medium mb-1">⚠️ One-Time Access</p>
                  <p className="text-amber-700">
                    This secret will be permanently destroyed after viewing.
                    Make sure you're ready to access it now.
                  </p>
                </div>
              </div>
            </div>

            <Button
              onClick={onSubmit}
              disabled={!isComplete}
              className="w-full h-12 text-lg font-semibold bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-300 disabled:text-slate-500"
            >
              {isComplete ? (
                <>
                  <Eye className="w-5 h-5 mr-2" />
                  Access Secret
                </>
              ) : (
                <>Enter Complete OTP</>
              )}
            </Button>
          </CardContent>
        </Card>

        <div className="text-center mt-6 text-sm text-slate-500">
          <Shield className="w-4 h-4 inline mr-1" />
          End-to-end encrypted • Zero-knowledge • Self-destructing
        </div>
      </div>
    </div>
  );
}

interface WhimDisplayProps {
  whimId: string;
  otp: string;
}

function WhimDisplay({ whimId, otp }: WhimDisplayProps) {
  const { data, isLoading, error } = useGetWhim(whimId, otp);
  const [hasCopied, setHasCopied] = useState(false);

  const copyToClipboard = () => {
    if (data?.message) {
      navigator.clipboard.writeText(data.message).then(() => {
        setHasCopied(true);
        setTimeout(() => setHasCopied(false), 2000);
      });
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-slate-600">Decrypting your secret...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md border-2 border-red-200">
          <CardContent className="text-center p-8">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertTriangle className="w-8 h-8 text-red-600" />
            </div>
            <h2 className="text-xl font-bold text-red-900 mb-2">
              Access Failed
            </h2>
            <p className="text-red-700 mb-4">{error.message}</p>
            <Button
              onClick={() => window.location.reload()}
              variant="outline"
              className="border-red-300 text-red-700 hover:bg-red-50"
            >
              Try Again
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Success Header */}
        <div className="text-center mb-8 pt-8">
          <div className="inline-flex items-center gap-2 bg-green-50 px-3 py-1.5 rounded-full text-green-700 font-medium text-sm border border-green-200 mb-4">
            <CheckCircle className="w-4 h-4" />
            Secret Retrieved
          </div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">
            Your Secret Message
          </h1>
          <p className="text-slate-600">
            This message has been permanently destroyed and cannot be accessed
            again
          </p>
        </div>

        {/* Message Display */}
        <Card className="border-2 border-green-200 shadow-xl mb-8 pt-0">
          <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-t-xl p-6">
            <CardTitle className="text-lg text-green-800">
              Secret Content
            </CardTitle>
            <CardDescription className="text-green-600">
              Whim ID: {whimId} • Accessed once • Now destroyed
            </CardDescription>
            <CardAction>
              <Button
                onClick={copyToClipboard}
                variant="outline"
                size="sm"
                className="border-green-300 text-green-700 hover:bg-green-50"
              >
                {hasCopied ? (
                  <CheckCircle className="w-4 h-4" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </Button>
            </CardAction>
          </CardHeader>

          <CardContent>
            <div className="bg-white border border-slate-200 rounded-lg p-6 min-h-[200px]">
              <pre className="whitespace-pre-wrap break-words text-slate-800 leading-relaxed font-mono text-sm">
                {data?.message}
              </pre>
            </div>
          </CardContent>
        </Card>

        {/* Destruction Notice */}
        <Card className="border-2 border-red-200 bg-red-50">
          <CardContent>
            <div className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-red-900 mb-1">
                  🔥 Secret Destroyed
                </h3>
                <p className="text-red-800 text-sm leading-relaxed">
                  This secret has been permanently deleted from our servers and
                  cannot be recovered. The encryption keys have been destroyed,
                  ensuring complete privacy and security. If you need to share
                  another secret, create a new whim.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center mt-8 pb-8">
          <Button
            onClick={() => (window.location.href = "/")}
            className="bg-indigo-600 hover:bg-indigo-700"
          >
            Create New Whim
          </Button>
        </div>
      </div>
    </div>
  );
}
