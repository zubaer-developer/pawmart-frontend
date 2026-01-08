import React from "react";

function PetHeroes() {
  const heroes = [
    {
      name: "Sarah Rahman",
      role: "Pet Rescuer",
      image: "https://i.pravatar.cc/150?img=1",
      quote:
        "I've rescued over 50 pets through PawMart. It's an amazing platform!",
      pets: 52,
    },
    {
      name: "Karim Ahmed",
      role: "First-time Adopter",
      image: "https://i.pravatar.cc/150?img=3",
      quote:
        "Found my best friend Bruno here. Couldn't be happier with my decision!",
      pets: 1,
    },
    {
      name: "Fatima Khan",
      role: "Volunteer",
      image: "https://i.pravatar.cc/150?img=5",
      quote:
        "Helping animals find homes is my passion. PawMart makes it so easy!",
      pets: 30,
    },
    {
      name: "Rafiq Islam",
      role: "Pet Shop Owner",
      image: "https://i.pravatar.cc/150?img=8",
      quote:
        "PawMart helped grow my business. The community here is wonderful!",
      pets: 100,
    },
  ];

  return (
    <section className="py-12 bg-base-100 dark:bg-gray-950 transition-colors duration-300">
      <div className="container mx-auto ">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div className="text-left">
            <span className="text-purple-500 text-xs font-bold uppercase tracking-widest mb-2 block">
              Community Heroes
            </span>
            <h2 className="text-2xl md:text-3xl font-black text-base-content dark:text-white leading-none">
              Meet Our Pet Heroes
            </h2>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400 max-w-xs">
            Amazing individuals making a real difference in the lives of pets.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {heroes.map((hero, index) => (
            <div
              key={hero.name}
              className="group relative p-5 rounded-2xl bg-base-200 dark:bg-gray-900 border border-transparent hover:border-purple-200 dark:hover:border-purple-900/30 transition-all duration-300 hover:shadow-md active:scale-95"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="flex flex-col items-center text-center">
                <div className="relative mb-3">
                  <img
                    src={hero.image}
                    alt={hero.name}
                    className="w-16 h-16 rounded-full object-cover ring-2 ring-white dark:ring-gray-800 shadow-md group-hover:ring-purple-400 transition-all duration-300"
                  />
                  <div className="absolute -bottom-1 -right-1 bg-gradient-to-r from-orange-400 to-rose-500 text-white text-[9px] font-black px-1.5 py-0.5 rounded-full shadow-sm">
                    {hero.pets}+
                  </div>
                </div>

                <h3 className="font-bold text-base-content dark:text-white text-sm mb-0.5 truncate w-full">
                  {hero.name}
                </h3>
                <p className="text-purple-500 text-[10px] font-bold uppercase tracking-tighter mb-2">
                  {hero.role}
                </p>

                <p className="text-base-content/70 dark:text-gray-400 text-xs italic leading-snug line-clamp-2">
                  "{hero.quote}"
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default PetHeroes;
