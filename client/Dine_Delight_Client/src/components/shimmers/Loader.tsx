import "./loader.scss";
const Loader = () => {
  return (
    <div className="loading-container ">
      <div className="loading-wave">
        <div className="loading-bar"></div>
        <div className="loading-bar"></div>
        <div className="loading-bar"></div>
        <div className="loading-bar"></div>
      </div>
    </div>
  );
};

export default Loader;
