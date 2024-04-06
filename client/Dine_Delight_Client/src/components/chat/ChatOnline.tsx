import { dummyUserImg } from "../../assets/images";

const ChatOnline = () => {
  return (
    <div className="flex items-center gap-2 font-semibold cursor-pointer">
      <div className="relative h-10 w-10 rounded-full border border-white">
        <img
          src={dummyUserImg}
          alt=""
          className="w-full rounded-full object-cover"
        />
        <div className="absolute top-0 right-1 bg-green-500 h-3 w-3 rounded-full"></div>
      </div>
      <span>name</span>
    </div>
  );
};

export default ChatOnline;
