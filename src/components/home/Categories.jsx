import { Link } from "react-router-dom";

function Categories() {
  const categories = [
    {
      name: "Pets",
      icon: "🐕",
      color: "from-orange-400 to-rose-500",
      bgColor: "bg-orange-50 dark:bg-orange-950/20",
      link: "/category/Pets",
      count: "50+",
    },
    {
      name: "Food",
      icon: "🍖",
      color: "from-green-400 to-emerald-500",
      bgColor: "bg-green-50 dark:bg-green-950/20",
      link: "/category/Food",
      count: "100+",
    },
    {
      name: "Accessories",
      icon: "🎾",
      color: "from-blue-400 to-indigo-500",
      bgColor: "bg-blue-50 dark:bg-blue-950/20",
      link: "/category/Accessories",
      count: "75+",
    },
    {
      name: "Care",
      icon: "💊",
      color: "from-purple-400 to-pink-500",
      bgColor: "bg-purple-50 dark:bg-purple-950/20",
      link: "/category/Care Products",
      count: "60+",
    },
  ];

  return (
    <section className="py-12 bg-base-100 dark:bg-gray-950 transition-colors">
      <div className="container mx-auto ">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-orange-500 text-xs font-bold uppercase tracking-widest mb-2 block">
              Quick Browse
            </span>
            <h2 className="text-2xl md:text-3xl font-black text-base-content dark:text-white leading-none">
              Top Categories
            </h2>
          </div>
          <Link
            to="/pets-and-supplies"
            className="text-sm font-bold text-orange-500 hover:underline"
          >
            View All Categories →
          </Link>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {categories.map((category, index) => (
            <Link
              key={category.name}
              to={category.link}
              className="group relative flex items-center gap-4 p-4 rounded-2xl bg-base-200 dark:bg-gray-900 border border-transparent hover:border-orange-200 dark:hover:border-orange-900/30 transition-all duration-300 hover:shadow-lg active:scale-95"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              {/* Icon */}
              <div
                className={`shrink-0 w-12 h-12 bg-linear-to-br ${category.color} rounded-xl flex items-center justify-center text-2xl shadow-sm group-hover:scale-110 transition-transform duration-300`}
              >
                {category.icon}
              </div>

              {/* Text Info */}
              <div className="min-w-0">
                <h3 className="text-sm md:text-base font-bold text-base-content dark:text-white truncate">
                  {category.name}
                </h3>
                <p className="text-[10px] md:text-xs text-gray-500 dark:text-gray-400 font-medium">
                  {category.count} Items
                </p>
              </div>

              {/* Hidden Arrow on Mobile, visible on hover */}
              <span className="absolute right-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all text-orange-500 hidden md:block">
                →
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Categories;
