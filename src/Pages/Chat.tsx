import { useParams } from "react-router-dom";
import { useSessions } from "../Contexts/SessionsContext";

interface Message {
  id: number;
  action: string;
  content: string;
  timestamp: string;
}

function Chat() {
  const { id } = useParams();
  const { sessions } = useSessions();
  const currentSession = sessions?.find(
    (session) => Number(session?.id) === Number(id)
  );
  console.log("crnt: ", currentSession);
  return (
    <div className="h-screen flex flex-col w-full">
      <h1 className="text-lg py-6 max-md:text-center px-10 font-medium ">
        {currentSession?.name}
      </h1>
      <div className="flex-grow bg-slate-100 overflow-auto">
        {currentSession?.messages.map((message: Message) => {
          const date = new Date(message.timestamp);
          const formattedDateTime = `${String(date.getDate()).padStart(
            2,
            "0"
          )}-${String(date.getMonth() + 1).padStart(
            2,
            "0"
          )}-${date.getFullYear()} ${String(date.getHours()).padStart(
            2,
            "0"
          )}:${String(date.getMinutes()).padStart(2, "0")}`;
          return (
            <div
              key={message.id}
              className={`m-8 flex flex-col ${
                message.action === "USER" ? "items-start" : "items-end"
              }`}
            >
              <p
                className={`${
                  message?.action === "USER"
                    ? "bg-slate-900 rounded-b-lg rounded-e-xl"
                    : "bg-sky-900 rounded-b-lg rounded-s-xl"
                } text-white py-2 px-4 my-2 max-w-80`}
              >
                {message?.content}
              </p>
              <span className="text-xs text-gray-400">{formattedDateTime}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Chat;
