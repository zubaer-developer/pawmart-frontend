function About() {
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
    {
      name: "Nusrat Jahan",
      role: "Customer Support",
      image: "https://i.pravatar.cc/150?img=9",
    },
  ];

  return (
    <div style={{ padding: "20px" }}>
      {/* Hero Section */}
      <section
        style={{
          textAlign: "center",
          padding: "40px",
          backgroundColor: "#f5f5f5",
        }}
      >
        <h1>About PawMart</h1>
        <p style={{ maxWidth: "600px", margin: "20px auto" }}>
          PawMart is Bangladesh's leading pet adoption and supply platform,
          connecting pet lovers with their perfect companions since 2023.
        </p>
      </section>

      {/* Mission Section */}
      <section style={{ padding: "40px" }}>
        <h2>Our Mission</h2>
        <div
          style={{
            display: "flex",
            gap: "40px",
            marginTop: "20px",
            flexWrap: "wrap",
          }}
        >
          <div style={{ flex: 1, minWidth: "250px" }}>
            <h3>🎯 Vision</h3>
            <p>
              To create a world where every pet finds a loving home and every
              pet owner has access to quality care products.
            </p>
          </div>
          <div style={{ flex: 1, minWidth: "250px" }}>
            <h3>❤️ Values</h3>
            <p>
              We believe in compassion, transparency, and community. Every
              animal deserves love and proper care.
            </p>
          </div>
          <div style={{ flex: 1, minWidth: "250px" }}>
            <h3>🌟 Goal</h3>
            <p>
              To reduce the number of homeless pets in Bangladesh by promoting
              adoption over buying from breeders.
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section style={{ padding: "40px", backgroundColor: "#f9f9f9" }}>
        <h2>Our Story</h2>
        <p style={{ maxWidth: "800px", lineHeight: "1.8" }}>
          PawMart started in 2023 with a simple idea: make pet adoption easier
          and more accessible for everyone in Bangladesh. Our founder, Rahim
          Khan, adopted his first dog from a local shelter and realized how
          difficult the process was. There was no central platform where people
          could find pets for adoption or quality pet supplies.
        </p>
        <p style={{ maxWidth: "800px", lineHeight: "1.8", marginTop: "15px" }}>
          Today, PawMart has helped hundreds of pets find their forever homes
          and connected thousands of pet owners with trusted suppliers. We are
          proud to be part of the growing pet-loving community in Bangladesh.
        </p>
      </section>

      {/* Stats Section */}
      <section style={{ padding: "40px", textAlign: "center" }}>
        <h2>Our Impact</h2>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "40px",
            marginTop: "30px",
            flexWrap: "wrap",
          }}
        >
          <div>
            <h3 style={{ fontSize: "36px", margin: "0" }}>500+</h3>
            <p>Pets Adopted</p>
          </div>
          <div>
            <h3 style={{ fontSize: "36px", margin: "0" }}>1000+</h3>
            <p>Happy Customers</p>
          </div>
          <div>
            <h3 style={{ fontSize: "36px", margin: "0" }}>50+</h3>
            <p>Partner Shelters</p>
          </div>
          <div>
            <h3 style={{ fontSize: "36px", margin: "0" }}>8</h3>
            <p>Divisions Covered</p>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section style={{ padding: "40px", backgroundColor: "#f5f5f5" }}>
        <h2 style={{ textAlign: "center" }}>Meet Our Team</h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "20px",
            marginTop: "30px",
            maxWidth: "900px",
            margin: "30px auto",
          }}
        >
          {teamMembers.map((member) => (
            <div key={member.name} style={{ textAlign: "center" }}>
              <img
                src={member.image}
                alt={member.name}
                style={{ width: "100px", height: "100px", borderRadius: "50%" }}
              />
              <h4 style={{ margin: "10px 0 5px" }}>{member.name}</h4>
              <p style={{ color: "#666", margin: "0" }}>{member.role}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section style={{ padding: "40px", textAlign: "center" }}>
        <h2>Join Our Community</h2>
        <p>Whether you want to adopt, sell, or volunteer - we welcome you!</p>
        <div style={{ marginTop: "20px" }}>
          <a href="/register">
            <button style={{ padding: "10px 30px", marginRight: "10px" }}>
              Get Started
            </button>
          </a>
          <a href="/contact">
            <button style={{ padding: "10px 30px" }}>Contact Us</button>
          </a>
        </div>
      </section>
    </div>
  );
}

export default About;
