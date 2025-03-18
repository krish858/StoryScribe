import type React from "react";
import { useState } from "react";
import { Button } from "./ui/Button";
import { Input } from "./ui/Input";
import { Textarea } from "./ui/Textarea";
import { Card } from "./ui/Card";
import axios from "axios";
import toast from "react-hot-toast";

export function BookGenerator() {
  const [bookDescription, setBookDescription] = useState("");
  const [numChapters, setNumChapters] = useState("");
  const len = "50";
  const [isGenerating, setIsGenerating] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookDescription.trim()) return;
    try {
      setIsGenerating(true);
      const id = await localStorage.getItem("userId");
      const data = {
        prompt: bookDescription,
        ChNo: numChapters,
        Chlen: len,
        user_id: id,
      };
      console.log(data);
      const response = await axios.post(
        "https://storyscribe.onrender.com/api/v1/book/create",
        data
      );
      console.log(response.data);
      if ((response.data.msg = "Book created")) {
        toast.success(
          `Book generated successfully with ID: ${response.data.id}`,
          {
            duration: 800,
            position: "top-right",
            style: {
              background: "#101828",
              color: "#ffffff",
              padding: "16px",
              borderRadius: "8px",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              fontWeight: "500",
              maxWidth: "320px",
            },
            icon: "🎉",
            iconTheme: {
              primary: "#8b5cf6",
              secondary: "#ffffff",
            },
          }
        );
      } else {
        toast.error("Something failed in our end. Please try again later.");
      }
      setIsGenerating(false);
    } catch (error) {
      toast.error("Failed to generate book. Please try again later.");
      setIsGenerating(false);
    }
  };

  return (
    <div className="grid grid-cols-1 gap-8">
      <Card className="p-6 bg-gray-800 border-gray-700">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="description" className="text-sm font-medium mb-1">
              Book Description
            </label>
            <Textarea
              id="description"
              placeholder="Describe your book idea in detail..."
              className="min-h-[150px] bg-gray-900 border-gray-700 text-gray-100"
              value={bookDescription}
              onChange={(e) => setBookDescription(e.target.value)}
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 ">
            <div className="space-y-2">
              <label
                htmlFor="chapters"
                className="text-sm font-medium flex items-center gap-2"
              >
                <BookIcon className="h-4 w-4" />
                Number of Chapters
              </label>
              <Input
                id="chapters"
                type="number"
                min="1"
                max="50"
                className="bg-gray-900 border-gray-700 text-gray-100"
                value={numChapters}
                onChange={(e) => setNumChapters(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <label
                htmlFor="pages"
                className="text-sm font-medium flex items-center gap-2"
              >
                <FileIcon className="h-4 w-4" />
                Pages per Chapter
              </label>
              <Input
                id="pages"
                type="text"
                min="1"
                max="100"
                className="bg-gray-900 border-gray-700 text-gray-100"
                value="Auto"
              />
            </div>
          </div>

          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
            disabled={isGenerating || !bookDescription.trim()}
          >
            {isGenerating ? (
              <>
                <LoaderIcon className="mr-2 h-4 w-4 animate-spin" />
                Generating Your Book...
              </>
            ) : (
              <>
                <SparklesIcon className="mr-2 h-4 w-4" />
                Generate Book
              </>
            )}
          </Button>
        </form>
      </Card>
    </div>
  );
}

// Simple icon components
function BookIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
    </svg>
  );
}

function FileIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
      <polyline points="14 2 14 8 20 8" />
    </svg>
  );
}

function LoaderIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
    </svg>
  );
}

function SparklesIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
      <path d="M5 3v4" />
      <path d="M19 17v4" />
      <path d="M3 5h4" />
      <path d="M17 19h4" />
    </svg>
  );
}
