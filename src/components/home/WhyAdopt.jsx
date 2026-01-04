function WhyAdopt() {
  const reasons = [
    {
      icon: "❤️",
      title: "Save a Life",
      description: "Every pet adopted means one less animal in a shelter.",
    },
    {
      icon: "💰",
      title: "Cost Effective",
      description: "Adoption fees are much lower than buying from breeders.",
    },
    {
      icon: "🏥",
      title: "Healthy Pets",
      description: "Adopted pets are usually vaccinated and health-checked.",
    },
    {
      icon: "🌍",
      title: "Fight Puppy Mills",
      description: "Reduce demand for unethical breeding operations.",
    },
  ];

  return (
    <section style={{ padding: "40px" }}>
      <h2 style={{ textAlign: "center" }}>Why Adopt from PawMart?</h2>
      <p style={{ textAlign: "center" }}>
        Adoption is a rewarding experience for both you and your new pet
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "20px",
          marginTop: "30px",
          maxWidth: "1000px",
          margin: "30px auto",
        }}
      >
        {reasons.map((reason) => (
          <div
            key={reason.title}
            style={{ textAlign: "center", padding: "20px" }}
          >
            <span style={{ fontSize: "40px" }}>{reason.icon}</span>
            <h3>{reason.title}</h3>
            <p>{reason.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default WhyAdopt;
