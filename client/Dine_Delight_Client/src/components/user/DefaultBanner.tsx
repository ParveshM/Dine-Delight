import { dineinVector } from "../../assets/images";

const DefaultBanner = () => {
  return (
    <div className="container py-6 mt-20  flex flex-col md:flex-row items-center justify-center mx-auto px-4 md:px-12">
      <div className="lg:w-1/2">
        <h1 className="max-w-xl text-4xl md:text-5xl text-gray-800 font-bold lg:max-w-md mb-6 md:mb-8 leading-tight">
          Welcome to
          <span className="text-red-500 font-bold">Dine Delight</span>
        </h1>
        <p className="max-w-xl text-lg text-gray-600 font-medium mb-8 leading-relaxed md:text-xl lg:max-w-md">
          Discover the easiest way to make reservations at your favorite
          restaurants. Whether it's for a special occasion or a casual meal,
          we've got you covered.
        </p>
      </div>
      <div className="lg:w-1/2 mt-8 md:mt-0 md:ml-8">
        <img
          className="w-full md:w-auto rounded-lg"
          src={dineinVector}
          alt="Illustration of people dining in"
        />
      </div>
    </div>
  );
};
export default DefaultBanner;
