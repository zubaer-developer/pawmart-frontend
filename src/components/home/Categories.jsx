import { Link } from "react-router-dom";

function Categories() {
  const categories = [
    {
      name: "Pets",
      icon: "🐕",
      description: "Find pets for adoption",
      link: "/category/Pets",
    },
    {
      name: "Food",
      icon: "🍖",
      description: "Premium pet food",
      link: "/category/Food",
    },
    {
      name: "Accessories",
      icon: "🎾",
      description: "Toys, beds, collars & more",
      link: "/category/Accessories",
    },
    {
      name: "Care Products",
      icon: "💊",
      description: "Health & grooming supplies",
      link: "/category/Care Products",
    },
  ];

  return (
    <section style={{ padding: "40px" }}>
      <h2 style={{ textAlign: "center" }}>Browse by Category</h2>

      <div
        style={{
          display: "flex",
          gap: "20px",
          justifyContent: "center",
          marginTop: "20px",
          flexWrap: "wrap",
        }}
      >
        {categories.map((category) => (
          <Link
            key={category.name}
            to={category.link}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <div
              style={{
                border: "1px solid #ccc",
                padding: "30px",
                textAlign: "center",
                minWidth: "180px",
                cursor: "pointer",
              }}
            >
              <span style={{ fontSize: "40px" }}>{category.icon}</span>
              <h3>{category.name}</h3>
              <p>{category.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

export default Categories;
