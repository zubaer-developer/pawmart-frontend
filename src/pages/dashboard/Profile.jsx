import useAuth from "../../hooks/useAuth";
import useTitle from "../../hooks/useTitle";

function Profile() {
  useTitle("My Profile");
  const { user } = useAuth();

  return (
    <div>
      <h1>My Profile</h1>

      {user?.photoURL && (
        <img
          src={user.photoURL}
          alt={user.displayName}
          style={{ width: "100px", height: "100px", borderRadius: "50%" }}
        />
      )}

      <table border="1" cellPadding="10" style={{ marginTop: "20px" }}>
        <tbody>
          <tr>
            <td>
              <strong>Name</strong>
            </td>
            <td>{user?.displayName || "Not set"}</td>
          </tr>
          <tr>
            <td>
              <strong>Email</strong>
            </td>
            <td>{user?.email}</td>
          </tr>
          <tr>
            <td>
              <strong>Email Verified</strong>
            </td>
            <td>{user?.emailVerified ? "Yes" : "No"}</td>
          </tr>
          <tr>
            <td>
              <strong>Account Created</strong>
            </td>
            <td>{user?.metadata?.creationTime}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default Profile;
