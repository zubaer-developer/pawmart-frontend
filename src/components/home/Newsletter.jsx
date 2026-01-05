import { useState } from "react";
import toast from "react-hot-toast";

function Newsletter() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      toast.success("Thanks for subscribing! 🎉");
      setEmail("");
      setLoading(false);
    }, 1000);
  };

  return (
    <section className="py-20 bg-gradient-to-r from-orange-500 via-rose-500 to-pink-500 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 text-8xl">🐾</div>
        <div className="absolute bottom-10 right-10 text-8xl">🐾</div>
        <div className="absolute top-1/2 left-1/4 text-6xl">🐕</div>
        <div className="absolute bottom-1/3 right-1/4 text-6xl">🐈</div>
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          {/* Icon */}
          <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center text-4xl mx-auto mb-6">
            📬
          </div>

          {/* Content */}
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Stay Updated!
          </h2>
          <p className="text-white/80 text-lg mb-8 max-w-xl mx-auto">
            Subscribe to our newsletter for the latest pets, exclusive deals,
            and pet care tips delivered straight to your inbox.
          </p>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-4 justify-center max-w-lg mx-auto"
          >
            <div className="flex-1 relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                📧
              </span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="w-full pl-12 pr-4 py-4 bg-white rounded-2xl text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-white/30 transition-all"
                required
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="px-8 py-4 bg-gray-900 text-white font-bold rounded-2xl hover:bg-gray-800 transition-all duration-300 hover:-translate-y-1 shadow-lg disabled:opacity-70 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                  <span>Subscribing...</span>
                </>
              ) : (
                <>
                  <span>Subscribe</span>
                  <span>→</span>
                </>
              )}
            </button>
          </form>

          {/* Trust Text */}
          <p className="text-white/60 text-sm mt-6">
            🔒 No spam, unsubscribe anytime. Join 5,000+ pet lovers!
          </p>
        </div>
      </div>
    </section>
  );
}

export default Newsletter;
