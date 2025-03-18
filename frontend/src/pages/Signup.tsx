import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Feather, ArrowLeft } from "lucide-react";
import * as yup from "yup";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const signUpSchema = yup.object().shape({
  username: yup
    .string()
    .min(3, "Username must be at least 3 characters")
    .max(20, "Username must be less than 20 characters")
    .matches(
      /^[a-zA-Z0-9_-]+$/,
      "Username can only contain letters, numbers, underscores, and hyphens"
    )
    .required("Username is required"),
  email: yup
    .string()
    .email("Please enter a valid email")
    .required("Email is required"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(/[0-9]/, "Password must contain at least one number")
    .matches(
      /[^A-Za-z0-9]/,
      "Password must contain at least one special character"
    )
    .required("Password is required"),
});

export function SignUp() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    try {
      await signUpSchema.validate(formData, { abortEarly: false });
      const data = {
        username: formData.username,
        email: formData.email,
        password: formData.password,
      };
      const response = await axios.post(
        "https://storyscribe.onrender.com/api/v1/auth/signup",
        data
      );
      if (response.data.msg === "User with this Email already exists") {
        toast.dismiss();
        toast.error("User with this Email already exists");
      } else if (response.data.msg === "User created") {
        toast.dismiss();
        toast.success("User created");
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("username", response.data.username);
        localStorage.setItem("userId", response.data.id);
        navigate("/home");
      }
    } catch (err) {
      if (err instanceof yup.ValidationError) {
        const validationErrors: { [key: string]: string } = {};
        err.inner.forEach((error) => {
          if (error.path) {
            validationErrors[error.path] = error.message;
          }
        });
        setErrors(validationErrors);
      } else {
        console.log(err);
        toast.error("An error occurred. Please try again later.");
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <div className="container mx-auto px-4 py-8">
        <Link
          to="/"
          className="inline-flex items-center text-gray-400 hover:text-purple-400 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to home
        </Link>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="container mx-auto px-4 flex flex-col items-center justify-center min-h-[calc(100vh-120px)]"
      >
        <div className="w-full max-w-md">
          <div className="flex items-center justify-center mb-8">
            <Feather className="w-10 h-10 text-purple-400" />
            <span className="text-2xl font-bold ml-2">StoryScribe</span>
          </div>

          <div className="bg-gray-800 p-8 rounded-lg shadow-xl">
            <h2 className="text-3xl font-bold mb-6 text-center">
              Create your account
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <Input
                label="Username"
                type="text"
                placeholder="johndoe"
                value={formData.username}
                onChange={(e: any) =>
                  setFormData({ ...formData, username: e.target.value })
                }
                error={errors.username}
                className="bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400"
              />
              <Input
                label="Email address"
                type="text"
                placeholder="you@example.com"
                value={formData.email}
                onChange={(e: any) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                error={errors.email}
                className="bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400"
              />
              <Input
                label="Password"
                type="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={(e: any) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                error={errors.password}
                className="bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400"
              />
              <Button
                type="submit"
                className="w-full bg-purple-500 hover:bg-purple-600 transition-colors"
              >
                Create Account
              </Button>
            </form>
            <p className="mt-6 text-center text-gray-400">
              Already have an account?{" "}
              <Link
                to="/signin"
                className="text-purple-400 hover:text-purple-300 font-medium"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
