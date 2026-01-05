import React from "react";

function WhyAdopt() {
  const reasons = [
    {
      icon: "❤️",
      title: "Save a Life",
      description: "Every pet adopted means one less animal in a shelter.",
      color: "from-red-400 to-pink-500",
    },
    {
      icon: "💰",
      title: "Cost Effective",
      description: "Adoption fees are much lower than buying from breeders.",
      color: "from-green-400 to-emerald-500",
    },
    {
      icon: "🏥",
      title: "Healthy Pets",
      description: "Adopted pets are usually vaccinated and health-checked.",
      color: "from-blue-400 to-cyan-500",
    },
    {
      icon: "🌍",
      title: "Fight Puppy Mills",
      description: "Reduce demand for unethical breeding operations.",
      color: "from-orange-400 to-amber-500",
    },
  ];

  return (
    <section className="py-10 px-6 lg:px-20 bg-white dark:bg-gray-950 transition-colors duration-300 overflow-hidden relative">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-6 tracking-tight">
            Why Adopt from <span className="text-orange-500">PawMart?</span>
          </h2>
          <div className="w-24 h-1.5 bg-orange-500 mx-auto rounded-full mb-6"></div>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Adoption is a rewarding experience for both you and your new pet.
            Join thousands of happy families who found their best friends.
          </p>
        </div>

        {/* Grid Container */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {reasons.map((reason, index) => (
            <div
              key={reason.title}
              className="group relative p-8 rounded-[2.5rem] bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 hover:border-orange-200 dark:hover:border-orange-900/30 transition-all duration-500 hover:shadow-2xl hover:shadow-orange-200/20 dark:hover:shadow-none hover:-translate-y-2"
            >
              {/* Animated Gradient Background on Hover */}
              <div className="absolute inset-0 bg-linear-to-b from-white to-transparent dark:from-gray-800/50 opacity-0 group-hover:opacity-100 rounded-[2.5rem] transition-opacity"></div>

              <div className="relative z-10 text-center">
                {/* Icon Circle */}
                <div
                  className={`w-20 h-20 mx-auto mb-6 rounded-3xl bg-gradient-to-tr ${reason.color} flex items-center justify-center text-4xl shadow-lg transform group-hover:rotate-12 transition-transform duration-500`}
                >
                  {reason.icon}
                </div>

                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 group-hover:text-orange-500 transition-colors">
                  {reason.title}
                </h3>

                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                  {reason.description}
                </p>
              </div>

              {/* Decorative Number or Tag */}
              <div className="absolute top-6 right-8 opacity-5 text-4xl font-black italic select-none">
                0{index + 1}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default WhyAdopt;
