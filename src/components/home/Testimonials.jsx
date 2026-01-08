import React from "react";

function Testimonials() {
  const testimonials = [
    {
      name: "Rina Begum",
      location: "Dhaka",
      rating: 5,
      text: "Adopted a beautiful cat from PawMart. The process was so smooth and the owner was very helpful. My whole family loves her!",
      image: "https://i.pravatar.cc/150?img=9",
      pet: "Cat",
    },
    {
      name: "Jahid Hasan",
      location: "Chittagong",
      rating: 5,
      text: "Great platform for finding quality pet food. Delivery was fast and products are genuine. Will definitely shop again!",
      image: "https://i.pravatar.cc/150?img=12",
      pet: "Dog",
    },
    {
      name: "Nusrat Jahan",
      location: "Sylhet",
      rating: 5,
      text: "Found an amazing dog bed for my puppy. The variety of accessories is impressive and prices are reasonable.",
      image: "https://i.pravatar.cc/150?img=16",
      pet: "Dog",
    },
  ];

  return (
    <section className="py-12 bg-base-100 dark:bg-gray-950 transition-colors duration-300">
      <div className="container mx-auto ">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div className="text-left">
            <span className="text-orange-500 text-xs font-bold uppercase tracking-widest mb-2 block">
              Success Stories
            </span>
            <h2 className="text-2xl md:text-3xl font-black text-base-content dark:text-white leading-none">
              Community Feedback
            </h2>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400 max-w-xs">
            Real stories from our happy community members and pet owners.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.name}
              className="group relative p-6 rounded-2xl bg-base-200 dark:bg-gray-900 border border-transparent hover:border-orange-200 dark:hover:border-orange-900/30 transition-all duration-300 hover:shadow-md active:scale-[0.98]"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="flex gap-0.5 mb-3">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <span key={i} className="text-amber-400 text-sm">
                    ★
                  </span>
                ))}
              </div>

              <p className="text-sm text-base-content/70 dark:text-gray-300 leading-relaxed mb-6 italic line-clamp-3">
                "{testimonial.text}"
              </p>

              <div className="flex items-center gap-3">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-10 h-10 rounded-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                />
                <div className="min-w-0">
                  <p className="text-sm font-bold text-base-content dark:text-white truncate">
                    {testimonial.name}
                  </p>
                  <p className="text-[10px] text-gray-500 dark:text-gray-400 flex items-center gap-1">
                    <span className="text-orange-500">
                      {testimonial.pet} Owner
                    </span>
                    <span>•</span>
                    <span className="truncate">{testimonial.location}</span>
                  </p>
                </div>
              </div>

              <div className="absolute top-6 right-6 text-gray-200 dark:text-gray-800 font-serif text-4xl leading-none opacity-50 group-hover:text-orange-200 transition-colors select-none">
                ”
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Testimonials;
