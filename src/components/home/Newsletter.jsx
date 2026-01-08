import { useState } from "react";
import toast from "react-hot-toast";

function Newsletter() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);

    setTimeout(() => {
      toast.success("Thanks for subscribing! 🎉");
      setEmail("");
      setLoading(false);
    }, 1000);
  };

  return (
    <section className="py-12 bg-linear-to-r from-orange-500 to-rose-500 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute top-4 left-4 text-4xl">🐾</div>
        <div className="absolute bottom-4 right-4 text-4xl">🐾</div>
      </div>

      <div className="container mx-auto relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-left md:max-w-md">
            <h2 className="text-2xl md:text-3xl font-black text-white leading-tight mb-2">
              Stay Updated!
            </h2>
            <p className="text-white/80 text-sm md:text-base font-medium">
              Join 5,000+ pet lovers for exclusive deals and care tips.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="w-full md:max-w-md flex flex-col sm:flex-row gap-2"
          >
            <div className="flex-1 relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email address"
                className="w-full h-12 pl-4 pr-4 bg-base-100/10 backdrop-blur-md border border-white/20 rounded-xl text-white placeholder-white/60 focus:outline-none focus:bg-base-100 focus:text-base-content transition-all text-sm"
                required
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="h-12 px-6 bg-gray-900 text-white font-bold rounded-xl hover:bg-black transition-all active:scale-95 disabled:opacity-70 flex items-center justify-center gap-2 text-sm whitespace-nowrap"
            >
              {loading ? (
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
              ) : (
                "Subscribe →"
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Newsletter;
