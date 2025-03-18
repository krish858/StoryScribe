import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Feather, BookOpen, Users } from "lucide-react";

export function Landing() {
  const features = [
    {
      icon: <Feather className="w-6 h-6" />,
      title: "Write Your Story",
      description:
        "Create and share your stories with our intuitive writing tools",
    },
    {
      icon: <BookOpen className="w-6 h-6" />,
      title: "Read & Discover",
      description: "Explore a vast library of stories from writers worldwide",
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Join the Community",
      description: "Connect with passionate writers and readers",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        <Link to="/" className="flex flex-row items-center space-x-2">
          <Feather className="w-8 h-8 text-purple-400" />
          <span className="md:text-2xl font-bold">StoryScribe</span>
        </Link>
        <div className=" flex flex-row items-center space-x-4">
          <Link to="/signin">
            <button className="border-purple-400 text-purple-400 hover:bg-white rounded-lg md:p-3 p-2 font-semibold border-2 hover:text-gray-900 hover:border-white cursor-pointer">
              Sign In
            </button>
          </Link>
          <Link to="/signup">
            <button className="bg-purple-500 rounded-lg p-2 md:p-3 font-semibold cursor-pointer">
              Get Started
            </button>
          </Link>
        </div>
      </nav>

      <main className="container mx-auto px-6">
        <div className="py-20 text-center max-w-3xl mx-auto">
          <h1 className=" text-5xl font-bold mb-6 leading-tight">
            Where Words Come
            <span className="text-purple-400"> to Life</span>
          </h1>
          <br />
          <br />
          <p className="text-xl text-white mb-8">
            StoryScribe is your creative sanctuary for writing, sharing, and
            discovering amazing stories. Join our community of storytellers
            today.
          </p>
          <div>
            <Link to="/signup">
              <button className="text-lg px-8 py-4 bg-purple-500 hover:bg-purple-600 rounded-full cursor-pointer">
                Start Writing Today
              </button>
            </Link>
          </div>
        </div>

        {/* Features Section */}
        <div className="py-20">
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="bg-gray-800 p-6 rounded-lg hover:bg-gray-800/50 transition-colors"
              >
                <div className="text-purple-400 mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="py-20 text-center">
          <div className="bg-gray-800 p-12 rounded-lg">
            <h2 className="text-3xl font-bold mb-4">
              Ready to start your writing journey?
            </h2>
            <Link to="/signup">
              <button className="text-lg px-8 py-4 bg-purple-500 hover:bg-purple-600 rounded-md font-semibold hover:px-9 hover:py-5 cursor-pointer transition-all duration-300 ease-in-out">
                Join StoryScribe Today
              </button>
            </Link>
          </div>
        </div>
      </main>

      <footer className="border-t border-gray-800 py-8">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-center text-gray-400">
            <Feather className="w-5 h-5 mr-2" />
            <span>© 2025 StoryScribe. All rights reserved.</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
