import React from "react";
import logo from '../../assets/images/ticketa.png';
import '../../App.css';
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="flex flex-col min-h-screen  text-gray-800">
      {/* Hero Section */}
       <nav className="p-6 flex justify-between w-full bg-blue-700">
          <img src={logo} className="h-7 w-auto cursor-pointer" alt="" />
        </nav>
      <section className="relative pt-32 bg-blue-700 flex flex-col justify-center items-center text-center py-20 overflow-hidden">
       {/* Left Decorative Circle */}
        <div className="absolute top-20 left-10 w-40 h-60 border-[2px] border-blue-200/35 rounded-full"></div>

        {/* right Decorative Circle */}
        <div className="absolute top-20 right-5 md:right-48 w-40 h-40 border-dotted border-[2px] border-blue-200/35 rounded-full"></div>

        

        {/* Content */}
        <div className="z-10 max-w-[1440px] px-6">
          <h1 className="text-[24px] md:text-5xl font-bold mb-6 text-white">
             Manage <span className="italic">Tickets</span> with Ease
          </h1>
          <p className="max-w-2xl mx-auto md:text-lg text-white mb-8">
            Streamline your support workflow, track progress, and resolve tickets effortlessly across teams — all in one dashboard.
          </p>

          <div className="flex justify-center gap-4">
            <Link
              to="/auth/login"
              className="bg-white text-[13px] md:text-[16px] text-blue-700 border-white border-[1px] px-6 py-2 rounded-full shadow hover:bg-blue-700 hover:text-white hover:border-white transition"
            >
              Login
            </Link>
            <Link
              to="/auth/signup"
              className="border border-white text-[13px] md:text-[16px] text-white px-6 py-2 rounded-full hover:bg-black hover:text-white hover:border-black transition"
            >
              Get Started &#8250;
            </Link>
          </div>
        </div>
      </section>
      {/* Wave SVG */}
        <div className="w-full -mt-2 overflow-hidden leading-none">
         <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#1d4ed8" fill-opacity="1" d="M0,288L18.5,277.3C36.9,267,74,245,111,208C147.7,171,185,117,222,101.3C258.5,85,295,107,332,117.3C369.2,128,406,128,443,117.3C480,107,517,85,554,101.3C590.8,117,628,171,665,197.3C701.5,224,738,224,775,213.3C812.3,203,849,181,886,197.3C923.1,213,960,267,997,256C1033.8,245,1071,171,1108,138.7C1144.6,107,1182,117,1218,112C1255.4,107,1292,85,1329,74.7C1366.2,64,1403,64,1422,64L1440,64L1440,0L1421.5,0C1403.1,0,1366,0,1329,0C1292.3,0,1255,0,1218,0C1181.5,0,1145,0,1108,0C1070.8,0,1034,0,997,0C960,0,923,0,886,0C849.2,0,812,0,775,0C738.5,0,702,0,665,0C627.7,0,591,0,554,0C516.9,0,480,0,443,0C406.2,0,369,0,332,0C295.4,0,258,0,222,0C184.6,0,148,0,111,0C73.8,0,37,0,18,0L0,0Z"></path></svg>
        </div>

      {/* Features Section */}
      <section className="max-w-[1440px] mx-auto  px-16 md:px-24 py-16 grid gap-8 md:grid-cols-3 bg-white ">
        {[
          {
            title: "Create & Manage",
            text: "Add new tickets, edit or delete existing ones in seconds.",
          },
          {
            title: "Track Progress",
            text: "Monitor open, in-progress, and resolved tickets in one place.",
          },
          {
            title: "Stay Organized",
            text: "Keep your support workflow streamlined and transparent.",
          },
        ].map((feature, i) => (
          <div
            key={i}
            className="bg-white rounded-2xl  p-7 border-[1px] border-blue-700 text-center shadow-lg transition"
          >
            <h3 className="text-[16px] md:text-xl font-semibold mb-3 text-blue-700">{feature.title}</h3>
            <p className="text-[14px] text-gray-600">{feature.text}</p>
          </div>
        ))}
      </section>

      {/* Footer */}
      <footer className="mt-auto bg-blue-700 text-white py-6 text-center">
        <p className="text-sm">
          © {new Date().getFullYear()} Ticketa. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default Home;
