"use client";

import { useSnackbarContext } from "@/components/snackbar/SnackbarProvider";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Check, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { sendResetPasswordOTP, submitOTP } from "../api/auth/login/route";
import OTPInput from "./otp-input";
import Timer from "./timer";
import ResetPasswordComponent from "./resetPassword";

export default function ResetPassword() {
  const router = useRouter();
  const { addSnackbar } = useSnackbarContext();
  const [sendingOTP, setSendingOTP] = useState(false);
  const [email, setEmail] = useState("");
  const [isOTPSent, setIsOTPSent] = useState(false);
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [otp, setOTP] = useState("");
  const [invalidEmail, setInvalidEmail] = useState(false);
  const [otpSubmissionLoading, setOTPSubmissionLoading] = useState(false);
  const [otpSubmitted, setOTPSubmitted] = useState(false);

  const handleSubmitOTP = async () => {
    setOTPSubmissionLoading(true);
    try {
      const result = await submitOTP(email, otp);
      if (result) {
        addSnackbar({
          header: "OTP Submitted",
          description: "OTP has been submitted successfully!",
          status: "success",
          prefixIcon: <Check />,
          position: "top-right",
          timeout: 5000,
        });
        setOTPSubmissionLoading(false);
        setOTPSubmitted(true);
      }
    } catch (error) {
      addSnackbar({
        header: "Error while submitting OTP!",
        description: "Sending OTP Failed!",
        status: "error",
        expandedContent: JSON.stringify(error),
        prefixIcon: <X />,
        position: "top-right",
        timeout: 5000,
      });
    }
    setOTPSubmissionLoading(false);
  };

  const validateEmail = () => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      setInvalidEmail(true);
    } else {
      setInvalidEmail(false);
    }
  };

  const handleSendOTP = async () => {
    setOTP("");
    validateEmail();
    if (invalidEmail) return; // Ensure no API call is made for invalid email
    setSendingOTP(true);
    try {
      const result = await sendResetPasswordOTP(email);
      if (result) {
        addSnackbar({
          header: "OTP Sent",
          description: "OTP has been sent to your email!",
          status: "success",
          prefixIcon: <Check />,
          position: "top-right",
          timeout: 5000,
        });
      }
      setIsOTPSent(true);
      setIsTimerActive(true);
    } catch (error) {
      addSnackbar({
        header: "Error",
        description: "Sending OTP Failed!",
        status: "error",
        expandedContent: JSON.stringify(error),
        prefixIcon: <X />,
        position: "top-right",
        timeout: 5000,
      });
    }
    setSendingOTP(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-black text-white">
      {otpSubmitted ? (
        <ResetPasswordComponent email={email} />
      ) : (
        <Card className="bg-black border border-white border-solid">
          <CardHeader>
            <CardTitle className="text-white">Reset Password</CardTitle>
            <CardDescription className="text-gray-400">
              Enter your email to reset your password
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSendOTP}>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="email" className="text-white">
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={isOTPSent}
                    className="bg-gray-800 text-white border-gray-700"
                  />
                  {invalidEmail && (
                    <h5 className="text-red-500">Invalid Email</h5>
                  )}
                </div>
                {isOTPSent && (
                  <>
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="otp" className="text-white">
                        OTP
                      </Label>
                      <OTPInput value={otp} onChange={setOTP} />
                    </div>
                    <div className="flex justify-center">
                      <Timer
                        duration={120}
                        isActive={isTimerActive}
                        onFinish={() => setIsTimerActive(false)}
                      />
                    </div>
                  </>
                )}
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col gap-2">
            <div className="flex justify-between w-full gap-2">
              <Button
                variant="outline"
                onClick={() => router.push("/login")}
                className="bg-gray-800 text-white border-gray-700 hover:bg-gray-700 w-full"
              >
                Cancel
              </Button>
              {sendingOTP ? (
                <Button disabled className="hover:bg-gray-200 w-full">
                  {"Sending OTP ..."}
                </Button>
              ) : (
                <Button
                  onClick={handleSendOTP}
                  disabled={isTimerActive || invalidEmail || email.length === 0}
                  className="bg-white text-black hover:bg-gray-200 w-full"
                >
                  {isOTPSent ? "Resend OTP" : "Send OTP"}
                </Button>
              )}
            </div>
            {isOTPSent && (
              <Button
                variant="outline"
                disabled={otp.length !== 6}
                onClick={handleSubmitOTP}
                className="bg-white text-black border-gray-700 hover:bg-black hover:text-white w-full"
              >
                {otpSubmissionLoading
                  ? "Submitting OTP ..."
                  : otpSubmitted
                  ? "OTP Submitted"
                  : "Submit OTP"}
              </Button>
            )}
          </CardFooter>
        </Card>
      )}
    </div>
  );
}
