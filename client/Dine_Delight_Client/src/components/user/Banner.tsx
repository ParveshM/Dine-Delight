import { dineinVector } from "../../assets/images";

const Banner: React.FC = () => {
  return (
    <section className="home py-6 mt-20  bg-gray-50  ">
      <div className="container flex flex-col md:flex-row items-center justify-center mx-auto px-4 md:px-12">
        <div className="lg:w-1/2">
          <h1 className="max-w-xl text-4xl md:text-5xl text-gray-800 font-bold lg:max-w-md mb-6 md:mb-8 leading-tight">
            Welcome to Our Restaurant
          </h1>
          <p className="max-w-xl text-lg text-gray-600 font-medium mb-8 leading-relaxed md:text-xl lg:max-w-md">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis ut
            magna quis nulla volutpat pharetra. Proin quis tristique lorem.
          </p>
          <button className="inline-block px-6 py-3 text-lg font-medium text-white bg-gradient-to-r from-pink-500 to-orange-400 rounded-md transition duration-300 ease-in-out hover:from-pink-600 hover:to-orange-500 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2">
            Reserve Now
          </button>
        </div>
        <div className="lg:w-1/2 mt-8 md:mt-0 md:ml-8">
          <img
            className="w-full md:w-auto rounded-lg"
            src={dineinVector}
            alt="Banner image"
          />
        </div>
      </div>
    </section>
  );
};

export default Banner;
