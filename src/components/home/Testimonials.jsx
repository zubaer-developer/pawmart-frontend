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
    <section className="py-10 bg-linear-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 bg-amber-100 text-amber-600 rounded-full text-sm font-semibold mb-4">
            ⭐ Testimonials
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            What Our Users Say
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Real stories from our happy community members
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.name}
              className="group bg-white rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-2 relative"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Quote Icon */}
              <div className="absolute -top-4 right-8 w-10 h-10 bg-linear-to-r from-orange-400 to-rose-500 rounded-full flex items-center justify-center text-white text-xl">
                "
              </div>

              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <span key={i} className="text-amber-400 text-xl">
                    ⭐
                  </span>
                ))}
              </div>

              {/* Text */}
              <p className="text-gray-600 leading-relaxed mb-6">
                "{testimonial.text}"
              </p>

              {/* User Info */}
              <div className="flex items-center gap-4">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-14 h-14 rounded-full object-cover ring-2 ring-gray-100"
                />
                <div>
                  <p className="font-bold text-gray-900">{testimonial.name}</p>
                  <p className="text-gray-500 text-sm flex items-center gap-2">
                    <span>📍</span> {testimonial.location}
                    <span className="text-orange-500">
                      • {testimonial.pet} Owner
                    </span>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Testimonials;
