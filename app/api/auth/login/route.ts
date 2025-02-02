import axios from "axios";

export const NEXT_PUBLIC_BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export async function loginUser({
  email,
  password,
}: {
  email: string;
  password: string;
}): Promise<boolean> {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/login`,
      { email, password },
      {
        headers: { "Content-Type": "application/json" },
      }
    );

    if (response.status === 200 && response.data.token) {
      localStorage.setItem("token", response.data.token); // Store token in localStorage
      return true;
    }
    throw new Error("Login failed");
  } catch (error) {
    console.error("Login error:", error);
    return false;
  }
}

export async function sendResetPasswordOTP(email: string) {
  try {
    const response = await axios.post(
      `${NEXT_PUBLIC_BACKEND_URL}/auth/send-reset-password-mail`,
      { email },
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );

    if (response.status === 200) {
      return true;
    }
    throw new Error(`OTP sending failed : ${JSON.stringify(response.data)}`);
  } catch (error) {
    throw error;
  }
}

export async function submitOTP(email: string, otp: string) {
  try {
    const response = await axios.post(
      `${NEXT_PUBLIC_BACKEND_URL}/auth/verify-otp`,
      { email, otp },
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
    if (response.status === 200) {
      return true;
    }
    throw new Error(`OTP submission failed : ${JSON.stringify(response.data)}`);
  } catch (error) {
    throw error;
  }
}

export async function resetPassword({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  try {
    const response = await axios.post(
      `${NEXT_PUBLIC_BACKEND_URL}/users/reset-password`,
      { email, password },
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );

    if (response.status === 200) {
      return true;
    }
    throw new Error(`Password reset failed : ${JSON.stringify(response.data)}`);
  } catch (error) {
    throw error;
  }
}
