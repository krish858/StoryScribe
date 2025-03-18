import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Feather, ArrowLeft } from "lucide-react";
import * as yup from "yup";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const signInSchema = yup.object().shape({
  email: yup
    .string()
    .email("Please enter a valid email")
    .required("Email is required"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
});

export function SignIn() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    try {
      await signInSchema.validate(formData, { abortEarly: false });
      const data = { email: formData.email, password: formData.password };
      const response = await axios.post(
        "https://storyscribe.onrender.com/api/v1/auth/login",
        data
      );
      if (response.data.msg === "Logged in") {
        toast.dismiss();
        toast.success("Logged in successfully");
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("username", response.data.username);
        localStorage.setItem("userId", response.data.id);
        navigate("/home");
      } else if (response.data.msg === "User not found") {
        toast.dismiss();
        toast.error("User not found");
      } else if (response.data.msg === "Wrong Password") {
        toast.dismiss();
        toast.error("Invalid password");
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
              Welcome back
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
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
                Sign In
              </Button>
            </form>
            <p className="mt-6 text-center text-gray-400">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="text-purple-400 hover:text-purple-300 font-medium"
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
