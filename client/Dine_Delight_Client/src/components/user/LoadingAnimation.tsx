const LoadingAnimation: React.FC = () => {
  return (
    <div className="flex justify-center items-end mt-10">
      <div className="flex items-center space-x-1 ">
        <div
          className="h-2.5 w-2.5 bg-gray-600 rounded-full animate-bounce"
          style={{ animationDelay: "-0.32s" }}
        ></div>
        <div
          className="h-2.5 w-2.5 bg-gray-600 rounded-full animate-bounce"
          style={{ animationDelay: "-0.16s" }}
        ></div>
        <div className="h-2.5 w-2.5 bg-gray-600 rounded-full animate-bounce"></div>
      </div>
    </div>
  );
};
export default LoadingAnimation;
