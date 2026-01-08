import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, EffectFade } from "swiper/modules";

// Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

function Hero() {
  const slides = [
    {
      title: "Find Your Furry Friend Today!",
      description: "Connecting local pet owners for adoption and quality care.",
      image:
        "https://images.unsplash.com/photo-1450778869180-41d0601e046e?q=80&w=2000",
    },
    {
      title: "Quality Care for Your Pets",
      description:
        "Discover premium supplies and healthy food for your companions.",
      image:
        "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?q=80&w=2000",
    },
    {
      title: "Join Our Pet Community",
      description:
        "Connect with thousands of pet lovers and share experiences.",
      image:
        "https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?q=80&w=2000",
    },
  ];

  return (
    // Height আরও কমিয়েছি (h-[400px] md:h-[450px]) যাতে এটি একটি ব্যানার স্টাইল পায়
    <section className="relative h-[400px] md:h-[480px] w-full overflow-hidden bg-gray-900">
      <Swiper
        modules={[Pagination, Autoplay, EffectFade]}
        effect="fade"
        pagination={{ clickable: true }}
        autoplay={{ delay: 4500 }}
        loop={true}
        className="h-full w-full"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="relative h-full w-full flex items-center">
              {/* Background with Dark Gradient Overlay */}
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${slide.image})` }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/40 to-transparent"></div>
              </div>

              {/* Compact Content */}
              <div className="relative z-10 container mx-auto ">
                <div className="max-w-xl space-y-3">
                  <h1 className="text-2xl md:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
                    {slide.title}
                  </h1>

                  <p className="text-sm md:text-base text-gray-300 max-w-md leading-snug">
                    {slide.description}
                  </p>

                  <div className="flex items-center gap-3 pt-2">
                    <Link to="/pets-and-supplies">
                      <button className="px-5 py-2.5 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-lg shadow-md transition-all active:scale-95 text-sm">
                        Browse Pets
                      </button>
                    </Link>
                    <Link to="/register">
                      <button className="px-5 py-2.5 bg-base-100/10 hover:bg-base-100/20 backdrop-blur-md text-white border border-white/20 font-bold rounded-lg transition-all active:scale-95 text-sm">
                        Join Us
                      </button>
                    </Link>
                  </div>

                  {/* Minimalist Quote */}
                  <div className="pt-4 flex items-center gap-2 opacity-60">
                    <div className="h-px w-8 bg-orange-500"></div>
                    <p className="text-[10px] md:text-xs text-white uppercase tracking-widest font-semibold">
                      Adopt, Don't Shop
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Very Compact Pagination Dots */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
        .swiper-pagination-bullet { background: #fff !important; width: 6px; height: 6px; margin: 0 4px !important; }
        .swiper-pagination-bullet-active { background: #f97316 !important; width: 16px; border-radius: 3px; }
        .swiper-pagination { bottom: 15px !important; }
      `,
        }}
      />
    </section>
  );
}

export default Hero;
