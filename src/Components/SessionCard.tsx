import { Link } from "react-router-dom";
import { useSessions } from "../Contexts/SessionsContext";

function SessionCard({ id, name }: { id: string; name: string }) {
  const { currentSession, handleCurrentSession } = useSessions();
  return (
    <div className="flex flex-col items-center">
      <Link
        className={`rounded-xl px-4 py-2 ${
          Number(currentSession) === Number(id) && "bg-[#bec1fb]"
        }`}
        to={`/${id}`}
        onClick={() => handleCurrentSession(id)}
      >
        <p className="text-base font-medium">{name}</p>
      </Link>
      <span className="border-b border-gray-300 mt-1 w-[85%]"></span>
    </div>
  );
}

export default SessionCard;
