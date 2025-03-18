import { BookGenerator } from "../components/BookGenerator";
import Navbar from "../components/Navbar";

function Home() {
  return (
    <main className="min-h-screen w-screen bg-gray-900 text-gray-100">
      <Navbar />
      <div className="h-full  mx-auto px-4 py-8 flex flex-col items-center justify-center w-full">
        <header className="mb-8 text-center">
          <h1 className="text-4xl font-bold tracking-tight mb-2 bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
            StoryScribe
          </h1>
          <p className="text-gray-400">
            AI-powered book generation at your fingertips
          </p>
        </header>
        <br />
        <BookGenerator />
      </div>
    </main>
  );
}

export default Home;
