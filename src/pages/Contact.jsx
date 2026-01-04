import { useState } from "react";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Contact form submitted:", formData);
    setSubmitted(true);
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <div style={{ padding: "20px" }}>
      {/* Header */}
      <section
        style={{
          textAlign: "center",
          padding: "40px",
          backgroundColor: "#f5f5f5",
        }}
      >
        <h1>Contact Us</h1>
        <p>Have questions? We'd love to hear from you!</p>
      </section>

      <div
        style={{
          display: "flex",
          gap: "40px",
          padding: "40px",
          maxWidth: "1000px",
          margin: "0 auto",
          flexWrap: "wrap",
        }}
      >
        {/* Contact Form */}
        <div style={{ flex: 2, minWidth: "300px" }}>
          <h2>Send us a Message</h2>

          {submitted ? (
            <div
              style={{
                padding: "20px",
                backgroundColor: "#d4edda",
                color: "#155724",
                borderRadius: "5px",
                marginTop: "20px",
              }}
            >
              <p> Thank you for your message! We'll get back to you soon.</p>
              <button
                onClick={() => setSubmitted(false)}
                style={{ marginTop: "10px", padding: "8px 15px" }}
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ marginTop: "20px" }}>
              <div style={{ marginBottom: "15px" }}>
                <label>Your Name *</label>
                <br />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  style={{ width: "100%", padding: "10px", marginTop: "5px" }}
                />
              </div>

              <div style={{ marginBottom: "15px" }}>
                <label>Your Email *</label>
                <br />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  style={{ width: "100%", padding: "10px", marginTop: "5px" }}
                />
              </div>

              <div style={{ marginBottom: "15px" }}>
                <label>Subject *</label>
                <br />
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  placeholder="e.g., Question about adoption"
                  style={{ width: "100%", padding: "10px", marginTop: "5px" }}
                />
              </div>

              <div style={{ marginBottom: "15px" }}>
                <label>Message *</label>
                <br />
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="5"
                  placeholder="Write your message here..."
                  style={{ width: "100%", padding: "10px", marginTop: "5px" }}
                ></textarea>
              </div>

              <button
                type="submit"
                style={{ padding: "10px 30px", width: "100%" }}
              >
                Send Message
              </button>
            </form>
          )}
        </div>

        {/* Contact Info */}
        <div style={{ flex: 1, minWidth: "250px" }}>
          <h2>Contact Information</h2>

          <div style={{ marginTop: "20px" }}>
            <div style={{ marginBottom: "20px" }}>
              <h4>📍 Address</h4>
              <p>
                123 Pet Street, Dhanmondi
                <br />
                Dhaka 1205, Bangladesh
              </p>
            </div>

            <div style={{ marginBottom: "20px" }}>
              <h4>📞 Phone</h4>
              <p>+880 1712-345678</p>
              <p>+880 1812-345678</p>
            </div>

            <div style={{ marginBottom: "20px" }}>
              <h4>📧 Email</h4>
              <p>support@pawmart.com</p>
              <p>info@pawmart.com</p>
            </div>

            <div style={{ marginBottom: "20px" }}>
              <h4>🕐 Business Hours</h4>
              <p>Saturday - Thursday: 9AM - 8PM</p>
              <p>Friday: 10AM - 6PM</p>
            </div>
          </div>

          {/* Social Links */}
          <div style={{ marginTop: "30px" }}>
            <h4>Follow Us</h4>
            <div style={{ display: "flex", gap: "15px", marginTop: "10px" }}>
              <a href="https://facebook.com" target="_blank" rel="noreferrer">
                Facebook
              </a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer">
                Twitter
              </a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer">
                Instagram
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Quick Links */}
      <section
        style={{
          padding: "40px",
          backgroundColor: "#f5f5f5",
          textAlign: "center",
        }}
      >
        <h2>Frequently Asked Questions</h2>
        <p>Find quick answers to common questions</p>
        <div style={{ marginTop: "20px" }}>
          <p>
            <strong>Q: How do I adopt a pet?</strong>
          </p>
          <p>
            Browse our listings, click on a pet, and use the Adopt Now button.
          </p>

          <p style={{ marginTop: "15px" }}>
            <strong>Q: Is listing a pet free?</strong>
          </p>
          <p>Yes, listing pets for adoption is completely free!</p>

          <p style={{ marginTop: "15px" }}>
            <strong>Q: How do I contact a seller?</strong>
          </p>
          <p>
            Each listing shows the owner's email. You can also use the order
            form.
          </p>
        </div>
      </section>
    </div>
  );
}

export default Contact;
