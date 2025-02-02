"use client";
import { useSnackbarContext } from "@/components/snackbar/SnackbarProvider";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CircularProgress, IconButton } from "@mui/material";
import { motion } from "framer-motion";
import { ArrowLeftCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { loginUser } from "../api/auth/login/route";
import ChangingRoute from "@/components/changingRoute";

export default function Login() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const { addSnackbar } = useSnackbarContext();
  const [backLoading, setBackLoading] = useState(false);

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await loginUser({ email, password });
      if (result) {
        addSnackbar({
          header: "Login Successful",
          description: "You have successfully logged in.",
          status: "success",
          timeout: 5000,
        });
        router.push("/dashboard");
      }
    } catch (error: any) {
      addSnackbar({
        header: "Login Failed",
        description: error.message,
        expandedContent: JSON.stringify(error),
        status: "error",
        timeout: 5000,
      });
    }
    setLoading(false);
  };

  const handleBack = () => {
    setBackLoading(true);
    router.push("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-300 dark:from-gray-900 dark:to-black">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card>
          {backLoading ? (
            <ChangingRoute changingRoute={backLoading} />
          ) : (
            <>
              <CardHeader className="flex-row space-x-2">
                <div className="flex justify-center items-center">
                  <IconButton onClick={handleBack}>
                    <ArrowLeftCircle color="white" size={"35px"} />
                  </IconButton>
                </div>
                <div>
                  <CardTitle>Login</CardTitle>
                  <CardDescription>
                    Enter your credentials to access the dashboard
                  </CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleEmailLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      password
                    />
                  </div>
                  <Button type="submit" className="w-full">
                    {loading ? "Logging in..." : "Login"}
                  </Button>
                </form>
                <Button
                  type="submit"
                  className="w-full mt-5 bg-gray-900 text-white hover:bg-black hover:text-white hover:border"
                  onClick={() => {
                    setBackLoading(true);
                    router.push("/reset-password");
                  }}
                >
                  {"Reset Password"}
                </Button>
              </CardContent>
            </>
          )}
        </Card>
      </motion.div>
    </div>
  );
}
