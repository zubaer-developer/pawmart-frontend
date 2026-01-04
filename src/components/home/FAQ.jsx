import { useState } from "react";

function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "How do I adopt a pet from PawMart?",
      answer:
        "Browse our listings, click on a pet you like, and use the 'Adopt Now' button to contact the owner and complete the adoption process.",
    },
    {
      question: "Is it free to list a pet for adoption?",
      answer:
        "Yes! Listing pets for adoption is completely free. We believe every pet deserves a loving home.",
    },
    {
      question: "How do I sell pet products on PawMart?",
      answer:
        "Create an account, go to your dashboard, and click 'Add Listing'. You can list food, accessories, and care products.",
    },
    {
      question: "Is PawMart available in my city?",
      answer:
        "PawMart is available across Bangladesh. Check the location on each listing to find pets and products near you.",
    },
    {
      question: "How do I contact the seller?",
      answer:
        "Each listing shows the owner's email. You can also use the order form to express your interest.",
    },
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section style={{ padding: "40px" }}>
      <h2 style={{ textAlign: "center" }}>Frequently Asked Questions</h2>

      <div style={{ maxWidth: "700px", margin: "30px auto" }}>
        {faqs.map((faq, index) => (
          <div
            key={index}
            style={{
              borderBottom: "1px solid #eee",
              padding: "15px 0",
              cursor: "pointer",
            }}
            onClick={() => toggleFAQ(index)}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <h4 style={{ margin: 0 }}>{faq.question}</h4>
              <span>{openIndex === index ? "−" : "+"}</span>
            </div>
            {openIndex === index && (
              <p style={{ marginTop: "10px", color: "#666" }}>{faq.answer}</p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

export default FAQ;
