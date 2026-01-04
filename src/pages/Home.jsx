import useAuth from "../hooks/useAuth";

function Home() {
  const { user } = useAuth();

  return (
    <div>
      <h1>Welcome to PawMart</h1>
      <p>Pet Adoption and Supply Portal</p>

      {user ? (
        <div>
          <h3>User Info:</h3>
          <p>Name: {user.displayName || "Guest"}</p>
          <p>Email: {user.email}</p>
          {user.photoURL && (
            <img src={user.photoURL} alt={user.displayName} width="100" />
          )}
        </div>
      ) : (
        <p>Please login to see your profile</p>
      )}
    </div>
  );
}

export default Home;
