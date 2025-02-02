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
import { CheckCircle, CheckCircle2, XCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { resetPassword } from "../api/auth/login/route";

function ResetPasswordComponent(options: { email: string }) {
  const router = useRouter();
  const { addSnackbar } = useSnackbarContext();
  const [password, setPassword] = useState("");
  const [retypePassword, setRetypePassword] = useState("");
  const [loading, setLoading] = useState(false);

  // Password validation rules
  const validations = {
    length: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    number: /\d/.test(password),
    specialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    match: password === retypePassword && password !== "",
  };

  // Check if all validations pass
  const allValid = Object.values(validations).every(Boolean);

  const handleResetPassword = async () => {
    try {
      setLoading(true);
      const result = await resetPassword({ email: options.email, password });
      if (result) {
        addSnackbar({
          prefixIcon: <CheckCircle className="text-green-600" />,
          header: "Password Reset Successful",
          description: "You have successfully reset your password.",
          status: "success",
          timeout: 5000,
        });
        router.push("/login");
      }
      setLoading(false);
    } catch (error) {
      addSnackbar({
        header: "Error",
        description: "Reset Password Failed!",
        status: "error",
        expandedContent: JSON.stringify(error),
        prefixIcon: <XCircle className="text-red-600" />,
        position: "top-right",
        timeout: 5000,
      });
    }
    setLoading(false);
  };

  return (
    <>
      <Card className="bg-black border border-gray-500 border-solid">
        <CardHeader>
          <CardTitle className="text-white">Reset Password</CardTitle>
          <CardDescription className="text-gray-400">
            Enter your email to reset your password
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="password" className="text-white">
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter New Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-gray-800 text-white border-gray-700"
                  password
                />
              </div>

              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="retypePassword" className="text-white">
                  Re-type Password
                </Label>
                <Input
                  id="retypePassword"
                  type="password"
                  placeholder="Re-Enter New Password"
                  value={retypePassword}
                  onChange={(e) => setRetypePassword(e.target.value)}
                  className="bg-gray-800 text-white border-gray-700"
                  password
                />
              </div>

              {/* Password validation rules */}
              <div className="mt-4">
                <Label className="text-white mb-2">
                  Password must contain:
                </Label>
                <ul className="space-y-1">
                  {Object.entries(validations).map(([key, valid]) => (
                    <li
                      key={key}
                      className="flex items-center space-x-2 text-gray-400"
                    >
                      {valid ? (
                        <CheckCircle2 className="w-5 h-5 text-green-400" />
                      ) : (
                        <XCircle className="w-5 h-5 text-gray-400" />
                      )}
                      <span>
                        {key === "length"
                          ? "At least 8 characters"
                          : key === "uppercase"
                          ? "An uppercase letter"
                          : key === "lowercase"
                          ? "A lowercase letter"
                          : key === "number"
                          ? "A number"
                          : key === "specialChar"
                          ? "A special character"
                          : "Passwords must match"}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col gap-2">
          <div className="flex justify-between w-full gap-2">
            <Button
              variant="outline"
              onClick={handleResetPassword}
              className="bg-white text-black border-gray-700 hover:bg-gray-700 w-full"
              disabled={!allValid}
            >
              {loading ? "Working on it ..." : "Reset Password"}
            </Button>
          </div>
        </CardFooter>
      </Card>
    </>
  );
}

export default ResetPasswordComponent;
