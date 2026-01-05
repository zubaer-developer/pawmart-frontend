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
    <section className="py-10 bg-white">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-10">
          <span className="inline-block px-4 py-2 bg-purple-100 text-purple-600 rounded-full text-sm font-semibold mb-4">
            🦸 Community Heroes
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Meet Our Pet Heroes
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            These amazing individuals have made a real difference in the lives
            of pets
          </p>
        </div>

        {/* Heroes Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {heroes.map((hero, index) => (
            <div
              key={hero.name}
              className="group bg-gray-50 rounded-3xl p-6 text-center hover:bg-white hover:shadow-xl transition-all duration-500 hover:-translate-y-2"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Avatar */}
              <div className="relative inline-block mb-4">
                <img
                  src={hero.image}
                  alt={hero.name}
                  className="w-24 h-24 rounded-full object-cover ring-4 ring-white shadow-lg group-hover:ring-orange-100 transition-all duration-300"
                />
                <div className="absolute -bottom-2 -right-2 bg-linear-to-r from-orange-400 to-rose-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                  {hero.pets}+ 🐾
                </div>
              </div>

              {/* Info */}
              <h3 className="font-bold text-gray-900 text-lg mb-1">
                {hero.name}
              </h3>
              <p className="text-orange-500 text-sm font-medium mb-4">
                {hero.role}
              </p>

              {/* Quote */}
              <p className="text-gray-600 text-sm italic leading-relaxed">
                "{hero.quote}"
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default PetHeroes;
