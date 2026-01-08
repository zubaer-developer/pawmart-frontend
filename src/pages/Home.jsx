import { useEffect } from "react";
import Lenis from "lenis"; // Import Lenis
import Hero from "../components/home/Hero";
import Categories from "../components/home/Categories";
import RecentListings from "../components/home/RecentListings";
import Statistics from "../components/home/Statistics";
import WhyAdopt from "../components/home/WhyAdopt";
import PetHeroes from "../components/home/PetHeroes";
import Testimonials from "../components/home/Testimonials";
import Newsletter from "../components/home/Newsletter";
import useTitle from "../hooks/useTitle";

function Home() {
  useTitle("Home");

  // Setup Lenis Smooth Scroll
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2, // Scroll duration (higher = smoother)
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Custom easing
      direction: "vertical",
      gestureDirection: "vertical",
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Cleanup when leaving the page
    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <div className="overflow-hidden">
      {" "}
      {/* Optional: prevents unwanted scrollbars during animation */}
      {/* Section 1: Hero Banner */}
      <Hero />
      {/* Section 2: Categories */}
      <Categories />
      {/* Section 3: Recent Listings */}
      <RecentListings />
      {/* Section 4: Statistics */}
      <Statistics />
      {/* Section 5: Why Adopt */}
      <WhyAdopt />
      {/* Section 6: Pet Heroes */}
      <PetHeroes />
      {/* Section 7: Testimonials */}
      <Testimonials />
      {/* Section 8: Newsletter */}
      <Newsletter />
    </div>
  );
}

export default Home;
