import { useNavigate } from "react-router-dom";
import { Feather } from "lucide-react";

function Navbar() {
  const navigate = useNavigate();

  async function signOut() {
    localStorage.clear();
    navigate("/");
  }

  return (
    <nav className="w-full bg-slate-900 shadow-lg border-b border-purple-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <div
              className="flex items-center space-x-2 cursor-pointer transition-all duration-200 hover:opacity-80"
              onClick={() => navigate("/home")}
            >
              <Feather className="w-6 h-6 md:w-7 md:h-7 text-purple-400" />
              <span className="text-lg md:text-xl font-bold text-white tracking-tight">
                StoryScribe
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-6">
            <button
              className="text-sm md:text-base font-medium text-slate-300 hover:text-white transition-colors duration-200 relative group"
              onClick={() => navigate("/library")}
            >
              Library
              <span className="absolute inset-x-0 -bottom-1 h-0.5 bg-purple-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200"></span>
            </button>

            <button
              className="text-sm md:text-base px-4 py-2 rounded-md bg-slate-800 font-medium text-slate-300 hover:text-white hover:bg-slate-700 transition-colors duration-200 border border-slate-700"
              onClick={signOut}
            >
              Sign out
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
