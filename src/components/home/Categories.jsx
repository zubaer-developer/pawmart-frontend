import { Link } from "react-router-dom";

function Categories() {
  const categories = [
    {
      name: "Pets",
      icon: "🐕",
      description: "Find adorable pets for adoption",
      color: "from-orange-400 to-rose-500",
      bgColor: "bg-orange-50",
      link: "/category/Pets",
      count: "50+",
    },
    {
      name: "Food",
      icon: "🍖",
      description: "Premium quality pet food",
      color: "from-green-400 to-emerald-500",
      bgColor: "bg-green-50",
      link: "/category/Food",
      count: "100+",
    },
    {
      name: "Accessories",
      icon: "🎾",
      description: "Toys, beds, collars & more",
      color: "from-blue-400 to-indigo-500",
      bgColor: "bg-blue-50",
      link: "/category/Accessories",
      count: "75+",
    },
    {
      name: "Care Products",
      icon: "💊",
      description: "Health & grooming supplies",
      color: "from-purple-400 to-pink-500",
      bgColor: "bg-purple-50",
      link: "/category/Care Products",
      count: "60+",
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 bg-orange-100 text-orange-600 rounded-full text-sm font-semibold mb-4">
            🏷️ Categories
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Browse by Category
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore our wide range of pets and pet products organized for your
            convenience
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <Link
              key={category.name}
              to={category.link}
              className="group relative overflow-hidden rounded-3xl p-8 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Background */}
              <div
                className={`absolute inset-0 ${category.bgColor} transition-all duration-500 group-hover:scale-105`}
              ></div>

              {/* Gradient Overlay on Hover */}
              <div
                className={`absolute inset-0 bg-linear-to-br ${category.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
              ></div>

              {/* Content */}
              <div className="relative z-10">
                {/* Icon */}
                <div
                  className={`w-20 h-20 bg-linear-to-br ${category.color} rounded-2xl flex items-center justify-center text-4xl mb-6 shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-500`}
                >
                  {category.icon}
                </div>

                {/* Text */}
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-gray-800">
                  {category.name}
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  {category.description}
                </p>

                {/* Count Badge */}
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-gray-500">
                    {category.count} Items
                  </span>
                  <span className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md group-hover:bg-gray-900 group-hover:text-white transition-all duration-300">
                    →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Categories;
