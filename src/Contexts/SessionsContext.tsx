import { useState, useContext, createContext, useEffect } from "react";

interface Session {
  id: string;
  name: string;
  messages: [];
}

interface SessionData {
  sessions: Session[];
  loading: boolean;
  hasMore: boolean;
  loadMore: () => void;
  error: boolean;
  currentSession: string;
  handleCurrentSession: (id: string) => void;
}

const ChatContext = createContext({});

export default function ChatProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sessions, setSessions] = useState<Session[]>();
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [currentSession, setCurrentSession] = useState<string>();
  const [error, setError] = useState<boolean>(false);
  const perPage = 20;

  function handleCurrentSession(id: string) {
    setCurrentSession(id);
  }

  const fetchSessions = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://admin-backend-docker-india-306034828043.asia-south2.run.app/nlp/api/chat_sessions?page=${page}&per_page=${perPage}`
      );
      const data = await response.json();
      setSessions((prevSessions) =>
        [...(prevSessions || []), data.chat_sessions].flat()
      );
      setHasMore(data.chat_sessions.length === perPage);
      setPage((prevPage) => prevPage + 1);
      console.log(data.chat_sessions);
    } catch (error) {
      console.error("Error fetching sessions:", error);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const loadMore = () => {
    if (!loading && hasMore) {
      fetchSessions();
    }
  };

  useEffect(() => {
    fetchSessions();
  }, []);

  const value = {
    sessions,
    loading,
    hasMore,
    loadMore,
    error,
    currentSession,
    handleCurrentSession,
  };
  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
}

export function useSessions(): SessionData {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error("useChat must be used within ChatProvider");
  }
  return context;
}
