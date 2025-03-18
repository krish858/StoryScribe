import { Routes, Route } from "react-router-dom";
import { Landing } from "./pages/Landing";
import { SignIn } from "./pages/Signin";
import { SignUp } from "./pages/Signup";
import Library from "./pages/Library";
import Home from "./pages/Home";
import { Toaster } from "react-hot-toast";
//import PDFGenerator from "./pages/Train";
import NotFound from "./pages/NotFound";
import Book from "./pages/Book";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/home" element={<Home />} />
        <Route path="/library" element={<Library />} />
        {/* <Route path="/trail" element={<PDFGenerator />} /> */}
        <Route path="/*" element={<NotFound />} />
        <Route path="/book/:id" element={<Book />} />
      </Routes>
      <Toaster />
    </>
  );
}

export default App;
