function HowItWorks() {
  const steps = [
    {
      step: "1",
      title: "Browse Listings",
      description: "Explore our wide range of pets and pet products.",
    },
    {
      step: "2",
      title: "Contact Owner",
      description: "Reach out to the pet owner or seller directly.",
    },
    {
      step: "3",
      title: "Meet & Adopt",
      description: "Meet the pet, complete the adoption process.",
    },
    {
      step: "4",
      title: "Welcome Home",
      description: "Bring your new family member home!",
    },
  ];

  return (
    <section style={{ padding: "40px", backgroundColor: "#f5f5f5" }}>
      <h2 style={{ textAlign: "center" }}>How It Works</h2>
      <p style={{ textAlign: "center" }}>Getting your new pet is easy!</p>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "30px",
          marginTop: "30px",
          flexWrap: "wrap",
        }}
      >
        {steps.map((item) => (
          <div
            key={item.step}
            style={{ textAlign: "center", maxWidth: "200px" }}
          >
            <div
              style={{
                width: "50px",
                height: "50px",
                borderRadius: "50%",
                backgroundColor: "#333",
                color: "white",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto",
                fontSize: "24px",
                fontWeight: "bold",
              }}
            >
              {item.step}
            </div>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default HowItWorks;
