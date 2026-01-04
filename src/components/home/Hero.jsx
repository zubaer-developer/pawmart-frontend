import { Link } from "react-router-dom";

function Hero() {
  return (
    <section
      style={{
        padding: "40px",
        textAlign: "center",
        backgroundColor: "#f5f5f5",
      }}
    >
      <h1>Find Your Furry Friend Today!</h1>
      <p>
        PawMart connects local pet owners and buyers for adoption and pet care
        products.
      </p>

      <div style={{ marginTop: "20px" }}>
        <Link to="/pets-and-supplies">
          <button style={{ padding: "10px 20px", marginRight: "10px" }}>
            Browse Pets
          </button>
        </Link>
        <Link to="/register">
          <button style={{ padding: "10px 20px" }}>Join PawMart</button>
        </Link>
      </div>

      <div style={{ marginTop: "30px" }}>
        <p>
          <em>"Adopt, Don't Shop — Give a Pet a Home."</em>
        </p>
      </div>
    </section>
  );
}

export default Hero;
