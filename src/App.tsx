import { BrowserRouter, Route, Routes } from "react-router-dom";
import Sidebar from "./Components/Sidebar";
import Home from "./Pages/Home";
import Chat from "./Pages/Chat";
import ChatProvider from "./Contexts/SessionsContext";

function App() {
  return (
    <ChatProvider>
      <BrowserRouter>
        <main className="flex max-md:flex-col h-screen w-full text-gray-800">
          <div className="max-md:hidden">
            <Sidebar />
          </div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/:id" element={<Chat />} />
          </Routes>
        </main>
      </BrowserRouter>
    </ChatProvider>
  );
}

export default App;
