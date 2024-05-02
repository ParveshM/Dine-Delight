import Footer from "../components/user/Footer/Footer";
import Navbar from "../components/user/Header/Navbar";

const AboutPage = () => {
  return (
    <>
      <Navbar />
      <div className="bg-gray-100 mt-16 py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl md:text-4xl font-bold text-center mb-8 text-gray-800">
            About Dine Delight
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex justify-center items-center">
              <img
                src="https://media.istockphoto.com/id/1335052543/photo/waitress-serving-food-to-a-group-of-customers-at-a-restaurant.jpg?s=612x612&w=0&k=20&c=cJGmAEOWeUw93TnVDJ2M1YjvG2RQkFFGoSmmagO22Tg="
                alt="About"
                className="rounded-lg shadow-lg mb-4"
              />
            </div>
            <div className="flex flex-col justify-center">
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                Welcome to Dine Delight! We're passionate about providing an
                exceptional dining experience for our customers.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                Our mission is to connect people with delicious food and great
                ambiance. Whether you're celebrating a special occasion or
                simply craving a fantastic meal, we're here to serve you.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                Our team is dedicated to ensuring every aspect of your dining
                experience is memorable. From our carefully crafted menu to our
                attentive service, we strive for excellence in everything we do.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                Thank you for choosing Dine Delight. We look forward to
                welcoming you soon!
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AboutPage;
