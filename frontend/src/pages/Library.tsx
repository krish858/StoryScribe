import { useState, useEffect } from "react";
import { Search, BookOpen, Download } from "lucide-react"; // Added Download icon
import Navbar from "../components/Navbar";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface Book {
  _id: string;
  id: string;
  creatorId: string;
  title: string;
  content: Array<any>;
  progress: "complete" | "pending" | "failed";
  createdAt: string;
  __v: number;
}

function Library() {
  const [books, setBooks] = useState<Book[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const username = localStorage.getItem("username") || "John";
  const navigate = useNavigate();

  async function getLibrary() {
    try {
      setLoading(true);
      const id = localStorage.getItem("userId");
      console.log(id);
      const response = await axios.get(
        `https://storyscribe.onrender.com/api/v1/book/getbooks/${id}`
      );
      if (response.data.msg === "Internal server error") {
        toast.error("Some error occurred");
      } else {
        setBooks(response.data.book);
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      toast.error("Some error occurred");
    }
  }

  useEffect(() => {
    getLibrary();
  }, []);

  const filteredBooks = books.filter((book) => {
    return (
      book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.id.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  const getStatusColor = (status: string): string => {
    switch (status) {
      case "complete":
        return "text-green-500";
      case "pending":
        return "text-gray-500";
      case "failed":
        return "text-red-500";
      default:
        return "bg-gray-500";
    }
  };

  const handleDownload = (bookId: string) => {
    toast(`Currently Downloading is not available`, {
      duration: 4000,
      position: "top-right",
      style: {
        background: "#101828",
        color: "#ffffff",
        padding: "16px 20px",
        borderRadius: "12px",
        boxShadow: "0 10px 25px rgba(0, 0, 0, 0.3)",
        border: "1px solid rgba(255, 255, 255, 0.08)",
        fontSize: "15px",
        fontWeight: "500",
        maxWidth: "350px",
        display: "flex",
        alignItems: "center",
        gap: "12px",
      },
      icon: "📥",
      className: "toast-with-shadow",
    });
    console.log(bookId);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <div>
          <h1 className="text-3xl font-bold mb-6">{username}'s Library</h1>
        </div>
        {loading ? (
          <div className="h-[50vh] w-full flex justify-center items-center">
            <Box sx={{ display: "flex" }}>
              <CircularProgress />
            </Box>
          </div>
        ) : (
          <>
            <div className="mb-8">
              <div className="relative">
                <Search
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <input
                  type="text"
                  placeholder="Search by title or ID..."
                  className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500 text-gray-100"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            <div className="bg-gray-800 rounded-lg shadow-xl">
              <div className="grid grid-cols-12 gap-4 p-4 border-b border-gray-700 font-semibold">
                <div className="col-span-2">ID</div>
                <div className="col-span-7">Title</div>
                <div className="col-span-3">Status</div>
              </div>

              <div className="divide-y divide-gray-700">
                {filteredBooks.length > 0 ? (
                  filteredBooks.map((book) => (
                    <div
                      key={book.id}
                      className="grid grid-cols-12 gap-4 p-4 items-center hover:bg-gray-700 transition-colors cursor-pointer"
                      onClick={() => {
                        navigate(`/book/${book.id}`);
                      }}
                    >
                      <div className="col-span-2 font-mono text-gray-400">
                        {book.id}
                      </div>
                      <div className="col-span-7 flex items-center gap-2">
                        <BookOpen size={18} className="text-blue-400" />
                        {book.title}
                      </div>
                      <div className="col-span-3 flex items-center justify-between">
                        <span
                          className={`px-3 py-1  text-sm ${getStatusColor(
                            book.progress
                          )} bg-opacity-20  ${getStatusColor(book.progress)}`}
                        >
                          {book.progress.charAt(0).toUpperCase() +
                            book.progress.slice(1)}
                        </span>
                        {book.progress === "complete" && (
                          <button
                            onClick={() => handleDownload(book.id)}
                            className="text-gray-100 hover:text-blue-500 cursor-pointer"
                          >
                            <Download size={20} />
                          </button>
                        )}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-8 text-center text-gray-500">
                    No books found matching your search criteria
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
}

export default Library;
