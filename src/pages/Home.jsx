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
