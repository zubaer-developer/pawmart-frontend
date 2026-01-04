function Testimonials() {
  const testimonials = [
    {
      name: "Rina Begum",
      location: "Dhaka",
      rating: 5,
      text: "Adopted a beautiful cat from PawMart. The process was so smooth and the owner was very helpful!",
    },
    {
      name: "Jahid Hasan",
      location: "Chittagong",
      rating: 5,
      text: "Great platform for finding quality pet food. Delivery was fast and products are genuine.",
    },
    {
      name: "Nusrat Jahan",
      location: "Sylhet",
      rating: 4,
      text: "Found an amazing dog bed for my puppy. Will definitely shop again!",
    },
  ];

  return (
    <section style={{ padding: "40px", backgroundColor: "#f9f9f9" }}>
      <h2 style={{ textAlign: "center" }}>What Our Users Say</h2>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "20px",
          marginTop: "30px",
          flexWrap: "wrap",
        }}
      >
        {testimonials.map((testimonial, index) => (
          <div
            key={index}
            style={{
              backgroundColor: "white",
              padding: "20px",
              maxWidth: "300px",
              border: "1px solid #eee",
            }}
          >
            <div>{"⭐".repeat(testimonial.rating)}</div>
            <p style={{ margin: "15px 0" }}>"{testimonial.text}"</p>
            <p>
              <strong>{testimonial.name}</strong>
            </p>
            <p style={{ color: "#666", fontSize: "14px" }}>
              {testimonial.location}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Testimonials;
