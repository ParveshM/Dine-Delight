import { MessageInterface } from "../../types/ChatInterface";
import { convertTimeFormat } from "../../utils/timeConverter";
import LoadingAnimation from "../user/LoadingAnimation";
import { IoCheckmarkDone } from "react-icons/io5";

const Message: React.FC<MessageInterface> = ({
  createdAt,
  text,
  isRead,
  own,
  isTyping,
}) => {
  let time = new Date(createdAt).getHours().toString();
  time += `: ${new Date(createdAt).getMinutes()}`;
  return (
    <div
      className={`flex items-start  ${
        own ? "justify-end" : "justify-start"
      } gap-2.5  `}
    >
      <div className="flex flex-col gap-1 w-full max-w-[320px]">
        <div className="flex items-center space-x-2 rtl:space-x-reverse"></div>
        <div
          className={`flex flex-col leading-1.5 p-4 border-gray-200 ${
            own
              ? "bg-indigo-100 rounded-s-xl rounded-ee-xl"
              : "bg-gray-100 rounded-e-xl rounded-es-xl"
          }  dark:bg-gray-700 break-words  `}
        >
          {isTyping ? (
            <LoadingAnimation className="flex " />
          ) : (
            <p className="text-sm font-normal text-gray-900 dark:text-white">
              {text}
            </p>
          )}
        </div>
        <div className="flex justify-end gap-2 mr-2">
          <span
            className={`text-xs text-end font-normal text-gray-500 dark:text-gray-400`}
          >
            {createdAt && convertTimeFormat(time)}
          </span>
          {own ? (
            <IoCheckmarkDone
              className={`${isRead ? "text-blue-500" : "text-gray-500"}`}
            />
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Message;
