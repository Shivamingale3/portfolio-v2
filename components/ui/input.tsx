import * as React from "react";
import { cn } from "@/lib/utils";
import { Eye, EyeClosed } from "lucide-react";

const Input = React.forwardRef<
  HTMLInputElement,
  React.ComponentProps<"input"> & { password?: boolean }
>(({ className, type, password, ...props }, ref) => {
  const [showPassword, setShowPassword] = React.useState(false);

  const handleTogglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="relative flex items-center">
      <input
        type={password && showPassword ? "text" : type}
        className={cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          password && "pr-10", // Add space for the toggle button
          className
        )}
        ref={ref}
        {...props}
      />
      {password && (
        <button
          type="button"
          onClick={handleTogglePassword}
          className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground focus:outline-none"
        >
          {showPassword ? <Eye /> : <EyeClosed />}
        </button>
      )}
    </div>
  );
});

Input.displayName = "Input";

export { Input };
