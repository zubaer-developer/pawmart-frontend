import Hero from "../components/home/Hero";
import Categories from "../components/home/Categories";
import RecentListings from "../components/home/RecentListings";
import Statistics from "../components/home/Statistics";
import WhyAdopt from "../components/home/WhyAdopt";
import HowItWorks from "../components/home/HowItWorks";
import PetHeroes from "../components/home/PetHeroes";
import Testimonials from "../components/home/Testimonials";
import Newsletter from "../components/home/Newsletter";
import FAQ from "../components/home/FAQ";

function Home() {
  return (
    <div>
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

      {/* Section 6: How It Works */}
      <HowItWorks />

      {/* Section 7: Pet Heroes */}
      <PetHeroes />

      {/* Section 8: Testimonials */}
      <Testimonials />

      {/* Section 9: Newsletter */}
      <Newsletter />

      {/* Section 10: FAQ */}
      <FAQ />
    </div>
  );
}

export default Home;
