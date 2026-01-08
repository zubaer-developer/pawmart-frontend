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
    <section className="py-12  bg-base-100 dark:bg-gray-950 transition-colors duration-300 relative">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div className="text-left">
            <h2 className="text-2xl md:text-3xl font-black text-base-content dark:text-white leading-none mb-3">
              Why Adopt from <span className="text-orange-500">PawMart?</span>
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 max-w-xl font-medium">
              Join thousands of happy families who found their best friends
              through a rewarding adoption experience.
            </p>
          </div>
          <div className="hidden md:block w-20 h-1 bg-orange-500 rounded-full mb-2"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {reasons.map((reason, index) => (
            <div
              key={reason.title}
              className="group relative p-6 rounded-3xl bg-base-200 dark:bg-gray-900 border border-transparent hover:border-orange-200 dark:hover:border-orange-900/30 transition-all duration-300 hover:shadow-lg active:scale-95"
            >
              <div className="relative z-10 flex flex-col items-start text-left">
                <div
                  className={`w-12 h-12 mb-4 rounded-2xl bg-linear-to-tr ${reason.color} flex items-center justify-center text-2xl shadow-md group-hover:scale-110 transition-transform duration-300`}
                >
                  {reason.icon}
                </div>

                <h3 className="text-base font-bold text-base-content dark:text-white mb-2 group-hover:text-orange-500 transition-colors">
                  {reason.title}
                </h3>

                <p className="text-xs text-base-content/70 dark:text-gray-400 leading-relaxed line-clamp-2">
                  {reason.description}
                </p>
              </div>

              <div className="absolute top-4 right-6 opacity-[0.03] text-3xl font-black italic select-none dark:text-white">
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
