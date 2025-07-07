import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, Mail } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState<string>("");
  const loading = false;

  return (
    <div className="flex justify-center items-center min-h-screen w-full">
      <form className="md:border flex flex-col border-gray-400 md:p-4 rounded-lg gap-5 w-full max-w-md mx-14">
        <div className="text-center">
          <h1 className="text-2xl font-semibold mb-1">Forgot password?</h1>
          <h2 className="text-sm text-gray-600">
            No worries! Enter your email and we'll send you a reset link
          </h2>
        </div>

        <div className="relative w-full">
          <Input
            type="text"
            value={email}
            name="email"
            onChange={(e) => setEmail(e.target.value)}
            className=" pl-10"
            placeholder="Enter your registered email"
          />
          <Mail className="absolute inset-y-2 left-2 text-gray-600 pointer-events-none" />
        </div>
        {!loading ? (
          <Button
            disabled
            className="bg-gray-700 hover:bg-gray-800 cursor-pointer"
          >
            <Loader2 className="animate-spin mr-2 h-4 w-4 " />
            Please Wait
          </Button>
        ) : (
          <Button className="bg-gray-700 hover:bg-gray-800 cursor-pointer">
            Send Reset Link
          </Button>
        )}

        <span className="text-center">
          Back to{" "}
          <Link
            to="/login"
            className="hover:underline text-blue-500 cursor-pointer"
          >
            Login
          </Link>
        </span>
      </form>
    </div>
  );
};

export default ForgotPassword;
