import React from "react";
import { useNavigate } from "react-router-dom";

const NotFound: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center px-4 text-center">
      <div className="w-full max-w-lg">
        <div className="relative mb-8">
          <h1 className="text-9xl font-bold text-purple-400 opacity-20">404</h1>
          <h1 className="text-9xl font-bold text-purple-500 absolute top-0 left-0 right-0 animate-pulse">
            404
          </h1>
        </div>

        <h2 className="text-3xl font-semibold text-white mb-6">
          Page Not Found
        </h2>

        <p className="text-slate-400 mb-8 text-lg">
          Oops! It seems like you've ventured into uncharted territory. The page
          you're looking for has vanished into the digital void.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => navigate(-1)}
            className="px-6 py-3 rounded-md bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white transition-colors duration-300 border border-slate-700"
          >
            Go Back
          </button>

          <button
            onClick={() => navigate("/home")}
            className="px-6 py-3 rounded-md bg-purple-700 text-white hover:bg-purple-600 transition-colors duration-300"
          >
            Return Home
          </button>
        </div>
      </div>

      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 -left-16 w-64 h-64 bg-purple-900 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob"></div>
        <div className="absolute bottom-1/4 -right-16 w-64 h-64 bg-indigo-900 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000"></div>
      </div>
    </div>
  );
};

export default NotFound;
