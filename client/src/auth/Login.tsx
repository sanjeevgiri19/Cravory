import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { userLoginSchema, type loginInputState } from "@/schema/userSchema";
import { useUserStore } from "@/store/useUserStore";
import { Loader2, LockKeyhole, Mail } from "lucide-react";
import { useState, type ChangeEvent, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [input, setInput] = useState<loginInputState>({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<Partial<loginInputState>>({});
  const navigate = useNavigate();

  const { login } = useUserStore();
  const loading = false;

  const changeEventHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  const loginSubmitHandler = async (e: FormEvent) => {
    e.preventDefault();
    const result = userLoginSchema.safeParse(input);
    if (!result.success) {
      const fieldErrors = result.error.formErrors.fieldErrors;
      setErrors(fieldErrors as Partial<loginInputState>);
      return;
    }
    try {
      await login(input);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <form
        onSubmit={loginSubmitHandler}
        className="w-full max-w-md md:border border-gray-200 md:p-8 rounded-lg"
      >
        <div className="mb-3">
          <h1 className=" font-semibold text-2xl">Welcome Back</h1>
          <h2 className="text-sm text-gray-600">
            Enter your credentials to access your account
          </h2>
        </div>
        <div className="relative mb-4">
          <Input
            type="email"
            name="email"
            value={input.email}
            onChange={changeEventHandler}
            placeholder="Enter Your Email"
            className="pl-10 focus-visible:ring-1"
          />
          <Mail className="absolute left-2  inset-y-2 text-gray-300 pointer-events-none" />
          {errors && (
            <span className="text-sm text-red-500">{errors.email}</span>
          )}
        </div>
        <div className="relative mb-4">
          <Input
            type="password"
            name="password"
            value={input.password}
            onChange={changeEventHandler}
            placeholder="Enter Your Password"
            className="pl-10 focus-visible:ring-1"
          />
          <LockKeyhole className="absolute left-2  inset-y-2 text-gray-300 pointer-events-none" />
          {errors && (
            <span className="text-sm text-red-500">{errors.password}</span>
          )}
        </div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <input
              id="remember-me"
              name="remember-me"
              type="checkbox"
              className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
            />
            <label
              htmlFor="remember-me"
              className="ml-2 block text-sm text-gray-900"
            >
              Remember me
            </label>
          </div>
          <Link
            to="/forgot_password"
            className="text-sm text-orange-600 hover:text-orange-500"
          >
            Forgot password?
          </Link>
        </div>
        <div className=" mb-8">
          {loading ? (
            <Button disabled type="submit" className="bg-gray-900 w-full ">
              <Loader2 className=" animate-spin w-4 h-4 mt-1" /> Please Wait
            </Button>
          ) : (
            <Button
              type="submit"
              className="bg-gray-700 hover:bg-gray-800 w-full "
            >
              Login
            </Button>
          )}
        </div>
        <Separator />
        <p className="mt-4">
          Don't have an Account ?{" "}
          <Link to="/signup" className="text-blue-600 font-semibold">
            Signup
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
