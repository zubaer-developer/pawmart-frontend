import useTitle from "../hooks/useTitle";
import { Link } from "react-router-dom";

function About() {
  useTitle("About Us");

  const teamMembers = [
    {
      name: "Rahim Khan",
      role: "Founder & CEO",
      image: "https://i.pravatar.cc/150?img=11",
    },
    {
      name: "Fatima Ahmed",
      role: "Operations Manager",
      image: "https://i.pravatar.cc/150?img=5",
    },
    {
      name: "Karim Hossain",
      role: "Lead Developer",
      image: "https://i.pravatar.cc/150?img=12",
    },
  ];

  return (
    <div className="font-sans bg-base-100 text-base-content transition-colors duration-300">
      <section className="relative bg-[#2E0249] text-white py-24 px-4 overflow-hidden rounded-b-[50px] shadow-lg">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>

        <div className="container mx-auto text-center relative z-10">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">About Us</h1>
          <p className="text-gray-300 max-w-2xl mx-auto text-lg">
            Read more about us. Our mission, vision, success and many other
            stories you might love.
          </p>
          <div className="mt-6 text-sm breadcrumbs justify-center flex text-gray-400">
            <ul>
              <li>
                <Link to="/" className="hover:text-white">
                  Home
                </Link>
              </li>
              <li>
                <span className="text-white">About</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-bold text-base-content mb-6 leading-tight">
              We help on creating <br />
              <span className="text-primary">PawMart stories</span>
            </h2>
            <p className="text-base-content/70 mb-8 leading-relaxed text-lg">
              PawMart is Bangladesh's leading pet adoption and supply platform.
              We recognize the importance of finding a loving home for every
              pet. Our team of dedicated experts is always available to ensure
              the best care.
            </p>

            {/* Visual Tabs */}
            <div className="flex flex-wrap gap-4 mb-8">
              <span className="px-6 py-2 bg-primary text-primary-content rounded-full font-medium shadow-lg">
                Mission
              </span>
              <span className="px-6 py-2 bg-base-200 text-base-content/70 rounded-full font-medium">
                Vision
              </span>
              <span className="px-6 py-2 bg-base-200 text-base-content/70 rounded-full font-medium">
                Our Value
              </span>
            </div>

            <div className="border-l-4 border-primary pl-6 py-2 bg-base-200/50 rounded-r-xl">
              <p className="text-base-content/80 italic">
                "To reduce the number of homeless pets in Bangladesh by
                promoting adoption over buying from breeders. We believe in
                compassion, transparency, and community."
              </p>
            </div>
          </div>

          {/* Image Side */}
          <div className="relative mt-8 lg:mt-0">
            <div className="bg-gradient-to-tr from-primary to-secondary rounded-[3rem] p-1 shadow-2xl transform rotate-2 hover:rotate-0 transition-transform duration-500">
              <img
                src="https://images.unsplash.com/photo-1556910103-1c02745a30bf?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                alt="Team"
                className="rounded-[3rem] w-full h-[400px] object-cover border-[6px] border-base-100"
              />
            </div>

            {/* Floating Card */}
            <div className="absolute -bottom-10 -left-4 md:-left-10 bg-base-100 p-5 rounded-2xl shadow-xl flex items-center gap-4 max-w-xs animate-float border border-base-200">
              <div className="avatar-group -space-x-4">
                <div className="avatar border-2 border-base-100">
                  <div className="w-10">
                    <img src="https://i.pravatar.cc/150?img=1" />
                  </div>
                </div>
                <div className="avatar border-2 border-base-100">
                  <div className="w-10">
                    <img src="https://i.pravatar.cc/150?img=2" />
                  </div>
                </div>
                <div className="avatar border-2 border-base-100">
                  <div className="w-10">
                    <img src="https://i.pravatar.cc/150?img=3" />
                  </div>
                </div>
              </div>
              <div>
                <p className="font-bold text-base-content">1k+ People</p>
                <p className="text-xs text-base-content/60">
                  Connected with us
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 mb-20">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-base-content">
            Take A Vital Look At Our Work
          </h2>
          <p className="text-base-content/60 mt-2">
            Connecting thousands of pets with loving owners across the country.
          </p>
        </div>
        <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl h-[400px] md:h-[500px] group cursor-pointer border-4 border-base-200">
          <img
            src="https://images.unsplash.com/photo-1548199973-03cce0bbc87b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80"
            alt="Video Cover"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-black/30 flex items-center justify-center group-hover:bg-black/20 transition-colors">
            <div className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center cursor-pointer hover:scale-110 transition-transform ring-4 ring-white/10">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg">
                <svg
                  className="w-6 h-6 text-primary ml-1"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-base-200/50 py-16 border-y border-base-200">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x-0 md:divide-x divide-base-300">
            {[
              { num: "500+", label: "Pets Adopted" },
              { num: "99%", label: "Satisfaction Rate" },
              { num: "1000+", label: "Happy Customers" },
              { num: "50+", label: "Trusted Partners" },
            ].map((stat, idx) => (
              <div key={idx} className="p-4">
                <h3 className="text-4xl md:text-5xl font-bold text-primary mb-2">
                  {stat.num}
                </h3>
                <p className="text-base-content/70 font-medium uppercase tracking-wide text-sm">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#2E0249] py-24 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-2">Lets Meet Our Team</h2>
            <p className="text-gray-300">
              The passionate people behind PawMart's success
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="group text-center">
                <div className="relative overflow-hidden rounded-3xl mb-6 bg-gray-800 aspect-[3/4] border-4 border-white/10 shadow-xl">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#2E0249] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center p-6">
                    <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                      <p className="text-primary font-bold mb-2">Connect</p>
                      <div className="flex gap-4 justify-center">
                        {["FB", "LN", "TW"].map((social) => (
                          <span
                            key={social}
                            className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-xs hover:bg-primary cursor-pointer transition-colors"
                          >
                            {social}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                <h3 className="text-2xl font-bold">{member.name}</h3>
                <p className="text-gray-400">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-base-200">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="bg-base-100 p-10 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-base-200">
              <div className="w-20 h-20 bg-purple-100 dark:bg-purple-900/30 rounded-3xl flex items-center justify-center text-4xl mb-8 text-purple-600 dark:text-purple-400">
                🐶
              </div>
              <h3 className="text-2xl font-bold text-base-content mb-4">
                Pet Adoption
              </h3>
              <p className="text-base-content/60 leading-relaxed">
                We connect homeless pets with loving families through a
                transparent and easy process.
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-base-100 p-10 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-base-200">
              <div className="w-20 h-20 bg-orange-100 dark:bg-orange-900/30 rounded-3xl flex items-center justify-center text-4xl mb-8 text-orange-600 dark:text-orange-400">
                📦
              </div>
              <h3 className="text-2xl font-bold text-base-content mb-4">
                Quality Supplies
              </h3>
              <p className="text-base-content/60 leading-relaxed">
                Find the best food, toys, and accessories for your furry friends
                from trusted sellers.
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-base-100 p-10 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-base-200">
              <div className="w-20 h-20 bg-pink-100 dark:bg-pink-900/30 rounded-3xl flex items-center justify-center text-4xl mb-8 text-pink-600 dark:text-pink-400">
                📄
              </div>
              <h3 className="text-2xl font-bold text-base-content mb-4">
                Verified Listings
              </h3>
              <p className="text-base-content/60 leading-relaxed">
                Every listing on our platform is verified to ensure safety and
                authenticity for everyone.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#2E0249] py-24 text-center text-white relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-primary/20 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary/20 rounded-full blur-[100px] translate-x-1/2 translate-y-1/2"></div>

        <div className="container mx-auto px-4 relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            The future of <br /> Pet Care
          </h2>
          <p className="text-gray-300 mb-10 max-w-lg mx-auto text-lg leading-relaxed">
            Join our community today and make a difference in a pet's life.
            Whether you want to adopt or sell, we are here for you.
          </p>
          <Link
            to="/register"
            className="inline-block px-10 py-4 bg-gradient-to-r from-orange-500 to-pink-500 text-white font-bold text-lg rounded-full shadow-lg hover:shadow-orange-500/50 hover:-translate-y-1 transition-all duration-300"
          >
            Get Started Now
          </Link>
        </div>
      </section>
    </div>
  );
}

export default About;
