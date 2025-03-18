import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

interface Chapter {
  chapter: number;
  title: string;
  content: string;
}

interface BookData {
  _id: string;
  id: string;
  creatorId: string;
  prompt: string;
  title: string;
  content: Chapter[];
  progress: "pending" | "complete" | "failed";
  createdAt: string;
  __v: number;
}

function Book() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState<BookData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);
  const [currentChapter, setCurrentChapter] = useState(0);

  async function getBook() {
    try {
      setLoading(true);
      const response = await axios.get(
        `http://localhost:3000/api/v1/book/getbook/${id}`
      );
      setBook(response.data.book);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching book:", error);
      setError(error);
      setLoading(false);
    }
  }

  useEffect(() => {
    getBook();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white text-lg">Loading your book...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-slate-800 p-8 rounded-lg shadow-lg text-center">
          <div className="text-red-500 text-5xl mb-4">⚠️</div>
          <h2 className="text-white text-2xl font-bold mb-4">
            Something went wrong
          </h2>
          <p className="text-slate-300 mb-6">
            We couldn't retrieve this book. Please try again later.
          </p>
          <button
            onClick={() => navigate("/library")}
            className="px-6 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
          >
            Return to Library
          </button>
        </div>
      </div>
    );
  }

  if (!book) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-slate-800 p-8 rounded-lg shadow-lg text-center">
          <div className="text-yellow-500 text-5xl mb-4">📚</div>
          <h2 className="text-white text-2xl font-bold mb-4">Book Not Found</h2>
          <p className="text-slate-300 mb-6">
            This book doesn't exist or may have been removed.
          </p>
          <button
            onClick={() => navigate("/library")}
            className="px-6 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
          >
            Browse Library
          </button>
        </div>
      </div>
    );
  }

  if (book.progress === "pending") {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-slate-800 p-8 rounded-lg shadow-lg text-center">
          <div className="text-yellow-500 text-5xl mb-4">⏳</div>
          <h2 className="text-white text-2xl font-bold mb-4">
            Creating Your Book
          </h2>
          <p className="text-slate-300 mb-6">
            Your book "{book.title}" is currently being generated. This might
            take a few minutes.
          </p>
          <div className="w-full bg-slate-700 h-2 rounded-full overflow-hidden mb-6">
            <div className="bg-purple-500 h-full w-1/2 animate-pulse"></div>
          </div>
          <button
            onClick={() => navigate("/library")}
            className="px-6 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
          >
            Back to Library
          </button>
        </div>
      </div>
    );
  }

  if (book.progress === "failed") {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-slate-800 p-8 rounded-lg shadow-lg text-center">
          <div className="text-red-500 text-5xl mb-4">❌</div>
          <h2 className="text-white text-2xl font-bold mb-4">
            Generation Failed
          </h2>
          <p className="text-slate-300 mb-6">
            Unfortunately, we couldn't generate "{book.title}". This could be
            due to content restrictions or a technical issue.
          </p>
          <div className="space-y-3">
            <button
              onClick={() => navigate("/library")}
              className="w-full px-6 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
            >
              Back to Library
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 text-slate-200">
      {/* Book Header */}
      <div className="bg-slate-800 shadow-md py-6 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div className="mb-4 sm:mb-0">
              <h1 className="text-xl sm:text-2xl font-bold text-white">
                {book.title}
              </h1>
              <p className="text-sm text-slate-400">ID: {book.id}</p>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate("/library")}
                className="px-4 py-2 bg-slate-700 text-slate-200 rounded hover:bg-slate-600 transition-colors text-sm"
              >
                Back to Library
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-slate-800 border-t border-slate-700 overflow-x-auto">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-1 py-2">
            {book.content.map((chapter, index) => (
              <button
                key={index}
                className={`px-3 py-1 text-sm rounded-md whitespace-nowrap ${
                  currentChapter === index
                    ? "bg-purple-700 text-white"
                    : "bg-slate-700 text-slate-300 hover:bg-slate-600"
                }`}
                onClick={() => setCurrentChapter(index)}
              >
                Ch. {chapter.chapter}: {chapter.title}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {book.content && book.content[currentChapter] && (
          <div>
            <h2 className="text-3xl font-bold mb-6 text-white">
              Chapter {book.content[currentChapter].chapter}:{" "}
              {book.content[currentChapter].title}
            </h2>
            <div className="prose prose-slate prose-invert max-w-none">
              {book.content[currentChapter].content
                .split("\n\n")
                .map((paragraph, index) => (
                  <p key={index} className="mb-6 leading-relaxed">
                    {paragraph}
                  </p>
                ))}
            </div>
          </div>
        )}

        <div className="mt-12 flex justify-between">
          <button
            onClick={() => setCurrentChapter((prev) => Math.max(0, prev - 1))}
            disabled={currentChapter === 0}
            className={`px-4 py-2 rounded ${
              currentChapter === 0
                ? "bg-slate-700 text-slate-500 cursor-not-allowed"
                : "bg-slate-700 text-white hover:bg-slate-600"
            }`}
          >
            Previous Chapter
          </button>
          <button
            onClick={() =>
              setCurrentChapter((prev) =>
                Math.min(book.content.length - 1, prev + 1)
              )
            }
            disabled={currentChapter === book.content.length - 1}
            className={`px-4 py-2 rounded ${
              currentChapter === book.content.length - 1
                ? "bg-slate-700 text-slate-500 cursor-not-allowed"
                : "bg-purple-700 text-white hover:bg-purple-600"
            }`}
          >
            Next Chapter
          </button>
        </div>
      </div>
    </div>
  );
}

export default Book;
