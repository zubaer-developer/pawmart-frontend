function PetHeroes() {
  const heroes = [
    {
      name: "Sarah Rahman",
      role: "Pet Rescuer",
      image: "https://i.pravatar.cc/150?img=1",
      quote: "I've rescued over 50 pets through PawMart!",
    },
    {
      name: "Karim Ahmed",
      role: "First-time Adopter",
      image: "https://i.pravatar.cc/150?img=2",
      quote: "Found my best friend here. Couldn't be happier!",
    },
    {
      name: "Fatima Khan",
      role: "Volunteer",
      image: "https://i.pravatar.cc/150?img=3",
      quote: "Helping animals find homes is my passion.",
    },
    {
      name: "Rafiq Islam",
      role: "Pet Shop Owner",
      image: "https://i.pravatar.cc/150?img=4",
      quote: "PawMart helped grow my business tremendously.",
    },
  ];

  return (
    <section style={{ padding: "40px" }}>
      <h2 style={{ textAlign: "center" }}>Meet Our Pet Heroes</h2>
      <p style={{ textAlign: "center" }}>
        People who make a difference in pets' lives
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
        {heroes.map((hero) => (
          <div
            key={hero.name}
            style={{
              textAlign: "center",
              padding: "20px",
              border: "1px solid #eee",
            }}
          >
            <img
              src={hero.image}
              alt={hero.name}
              style={{ width: "80px", height: "80px", borderRadius: "50%" }}
            />
            <h3>{hero.name}</h3>
            <p style={{ color: "#666", fontSize: "14px" }}>{hero.role}</p>
            <p>
              <em>"{hero.quote}"</em>
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default PetHeroes;
