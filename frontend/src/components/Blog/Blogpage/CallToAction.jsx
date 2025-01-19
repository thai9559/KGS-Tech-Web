import React from "react";

const CallToAction = () => {
  return (
    <section className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 py-12 px-6">
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row justify-between items-center gap-6 text-center lg:text-left">
        {/* Text Content */}
        <div className="flex-1">
          <h2 className="text-3xl lg:text-4xl font-bold text-white">
            Ready to transform your business?
          </h2>
          <p className="text-white text-lg mt-4">
            Join thousands of businesses already achieving their goals with our
            innovative solutions.
          </p>
        </div>
        {/* Call to Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <button className="bg-white text-blue-600 font-semibold py-3 px-6 rounded-lg hover:bg-blue-100 transition duration-300">
            Get Started
          </button>
          <button className="bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg hover:bg-blue-800 transition duration-300">
            Learn More
          </button>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
