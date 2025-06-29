import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { userSignupSchema, type signupInputState } from "@/schema/userSchema";
import { useUserStore } from "@/store/useUserStore";
import { Loader2, LockKeyhole, Mail, PhoneIcon, User } from "lucide-react";
import { useState, type ChangeEvent, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const [input, setInput] = useState<signupInputState>({
    username: "",
    email: "",
    password: "",
    contact: "",
  });

  const [errors, setErrors] = useState<Partial<signupInputState>>({});
  const { signup, loading } = useUserStore();

  const navigate = useNavigate();

  const changeEventHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  const signupSubmitHandler = async (e: FormEvent) => {
    e.preventDefault();

    const result = userSignupSchema.safeParse(input);
    if (!result.success) {
      const fieldErrors = result.error.formErrors.fieldErrors;
      setErrors(fieldErrors as Partial<signupInputState>);
      return;
    }

    try {
      await signup(input);
      navigate("/verify-email");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <form
        onSubmit={signupSubmitHandler}
        className="w-full max-w-md md:border border-gray-200 md:p-8 rounded-lg"
      >
        <div className="mb-3">
          <h1 className=" font-semibold text-2xl">Sign Up</h1>
          <h2 className="text-sm text-gray-600">
            Create a new account to get started
          </h2>
        </div>
        <div className="relative mb-4">
          <Input
            type="text"
            name="username"
            value={input.username}
            onChange={changeEventHandler}
            placeholder="Enter Your Name"
            className="pl-10 focus-visible:ring-1"
          />
          <User className="absolute left-2  inset-y-2 text-gray-300 pointer-events-none" />
          {errors && (
            <span className="text-red-600 text-sm">{errors.username}</span>
          )}
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
            <span className="text-red-600 text-sm">{errors.email}</span>
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
            <span className="text-red-600 text-sm">{errors.password}</span>
          )}
        </div>
        <div className="relative mb-4">
          <Input
            type="text"
            name="contact"
            value={input.contact}
            onChange={changeEventHandler}
            placeholder="Enter Your Contact Number"
            className="pl-10 focus-visible:ring-1"
          />
          <PhoneIcon className="absolute left-2  inset-y-2 text-gray-300 pointer-events-none" />
          {errors && (
            <span className="text-red-600 text-sm">{errors.contact}</span>
          )}
        </div>
        <div className=" mb-8">
          {loading ? (
            <Button disabled type="submit" className="bg-gray-900 w-[90%] ">
              <Loader2 className=" animate-spin w-4 h-4 mt-1" /> Please Wait
            </Button>
          ) : (
            <Button
              type="submit"
              className="bg-gray-700 hover:bg-gray-800 w-[90%] "
            >
              Signup
            </Button>
          )}
        </div>
        <Separator />
        <p className="mt-4">
          Already have an Account ?{" "}
          <Link to="/login" className="text-blue-600 font-semibold">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;
