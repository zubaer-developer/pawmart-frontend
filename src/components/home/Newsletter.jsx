import { useState } from "react";

function Newsletter() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <section
      style={{
        padding: "40px",
        backgroundColor: "#333",
        color: "white",
        textAlign: "center",
      }}
    >
      <h2>Stay Updated!</h2>
      <p>Subscribe to our newsletter for the latest pets and deals</p>

      {subscribed ? (
        <p style={{ color: "#4CAF50", marginTop: "20px" }}>
          Thank you for subscribing!
        </p>
      ) : (
        <form onSubmit={handleSubmit} style={{ marginTop: "20px" }}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
            style={{ padding: "10px", width: "250px", marginRight: "10px" }}
          />
          <button type="submit" style={{ padding: "10px 20px" }}>
            Subscribe
          </button>
        </form>
      )}
    </section>
  );
}

export default Newsletter;
