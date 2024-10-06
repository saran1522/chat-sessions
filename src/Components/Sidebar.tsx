import SessionCard from "./SessionCard";
import { useSessions } from "../Contexts/SessionsContext";
import { useNavigate } from "react-router-dom";
import { useCallback, useRef, useState } from "react";
import { Riple } from "react-loading-indicators";

interface Session {
  id: string;
  name: string;
}

function Sidebar() {
  const [query, setQuery] = useState("");
  const { sessions, loading, hasMore, loadMore, error } = useSessions();
  const observer = useRef<IntersectionObserver | null>(null);
  const navigate = useNavigate();
  console.log("sidebar: ", sessions);
  let filteredSessions = sessions;
  if (query !== "") {
    filteredSessions = filteredSessions?.filter((session: Session) =>
      session?.name?.toLowerCase().includes(query.toLowerCase())
    );
  }

  const lastSessionElementRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          loadMore();
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore, loadMore]
  );

  if (error) {
    return (
      <p className="min-w-[305px] font-bold text-red-600">
        Error fetching chat sessions :|
      </p>
    );
  }

  return (
    <div className="flex flex-col min-w-[305px] h-screen">
      <h2
        className="text-2xl text-center cursor-pointer p-2 pt-6 font-semibold"
        onClick={() => navigate("/")}
      >
        Chat Sessions Dashboard
      </h2>
      <input
        type="text"
        className=" mx-5 border border-gray-400 rounded-xl py-2 px-2 bg-transparent focus-visible:outline-none"
        placeholder="Search..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      <div className="flex flex-col p-4 gap-1 flex-grow overflow-auto">
        {filteredSessions?.map((session: Session, index: number) => (
          <div
            key={index}
            ref={index === sessions.length / 2 ? lastSessionElementRef : null}
          >
            <SessionCard id={session.id} name={session.name} />
          </div>
        ))}
        {loading && (
          <div className="fixed flex top-0 left-0 h-screen lg:w-[305px] max-md:w-full bg-[#2c2c2c8e] justify-center items-center">
            <Riple color="#0077b6" size="medium" text="" textColor="blue" />
          </div>
        )}
      </div>
    </div>
  );
}

export default Sidebar;
