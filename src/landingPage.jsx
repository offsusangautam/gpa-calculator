import React from 'react';

const LandingPage = ({ onStart }) => {
  return (
    <section className="relative bg-gradient-to-br from-blue-600 via-indigo-700 to-purple-700 text-white min-h-screen flex flex-col justify-center items-center px-6 md:px-20 text-center">
      {/* Decorative circles */}
      <div className="absolute top-10 left-10 w-40 h-40 bg-purple-400 rounded-full opacity-20 animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-60 h-60 bg-indigo-400 rounded-full opacity-15 animate-pulse"></div>

      <h1 className="text-5xl md:text-6xl font-extrabold mb-6 drop-shadow-lg">
        NEB GPA Calculator 2082
      </h1>

      <p className="max-w-3xl text-lg md:text-xl mb-10 drop-shadow-md">
        Easily calculate your GPA for Class 10, 11, and 12 according to the latest NEB grading system. Enter your grades and get instant results with theory and practical weightage taken into account.
      </p>

      <button
        onClick={onStart}
        className="bg-white text-blue-700 font-semibold px-8 py-4 rounded-full shadow-lg hover:scale-105 transform transition duration-300"
        aria-label="Start GPA Calculator"
      >
        Start Calculating
      </button>

      <footer className="absolute bottom-8 text-sm opacity-50">
        Developed by <span className="font-semibold">Susan Gautam</span>
      </footer>
    </section>
  );
};

export default LandingPage;
