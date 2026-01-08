import useAuth from "../../hooks/useAuth";
import useTitle from "../../hooks/useTitle";

function Profile() {
  useTitle("My Profile");

  const { user } = useAuth();

  const profileInfo = [
    { label: "Full Name", value: user?.displayName || "Not set", icon: "👤" },
    { label: "Email", value: user?.email, icon: "📧" },

    {
      label: "Account Created",
      value: user?.metadata?.creationTime || "N/A",
      icon: "📅",
    },
    {
      label: "Last Sign In",
      value: user?.metadata?.lastSignInTime || "N/A",
      icon: "🕐",
    },
  ];

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-base-content">My Profile</h1>
        <p className="text-gray-500">Manage your account information</p>
      </div>

      {/* Profile Card */}
      <div className="bg-base-100 rounded-3xl shadow-sm overflow-hidden">
        {/* Cover */}
        <div className="h-32 bg-linear-to-r from-orange-400 via-rose-500 to-pink-500 relative">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-4 left-10 text-4xl">🐾</div>
            <div className="absolute bottom-4 right-10 text-4xl">🐾</div>
          </div>
        </div>

        {/* Avatar & Name */}
        <div className="px-8 pb-8">
          <div className="flex flex-col sm:flex-row items-center sm:items-end gap-6 -mt-16 mb-8">
            <div className="relative">
              <div className="w-32 h-32 rounded-2xl overflow-hidden ring-4 ring-white shadow-xl bg-base-100">
                <img
                  src={user?.photoURL || "https://i.pravatar.cc/150?img=1"}
                  alt={user?.displayName || "User"}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full border-4 border-white"></div>
            </div>

            <div className="text-center sm:text-left pb-2">
              <h2 className="text-2xl font-bold text-base-content">
                {user?.displayName || "User Name"}
              </h2>
              <p className="text-gray-500">{user?.email}</p>
            </div>
          </div>

          {/* Profile Info */}
          <div className="grid md:grid-cols-2 gap-4">
            {profileInfo.map((info) => (
              <div
                key={info.label}
                className="flex items-center gap-4 p-4 bg-base-200 rounded-2xl hover:bg-base-300 transition-colors"
              >
                <div className="w-12 h-12 bg-base-100 rounded-xl flex items-center justify-center text-xl shadow-sm">
                  {info.icon}
                </div>
                <div>
                  <p className="text-sm text-gray-500">{info.label}</p>
                  <p className="font-medium text-gray-800 break-all">
                    {info.value}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
