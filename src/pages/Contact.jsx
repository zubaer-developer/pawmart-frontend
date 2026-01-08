import { useState } from "react";
import useTitle from "../hooks/useTitle";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";

function Contact() {
  useTitle("Contact Us");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
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
    setFormData({ name: "", email: "", phone: "", message: "" });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="w-full max-w-6xl">
        {/* Header Title */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-base-content mb-2">
            Contact Us
          </h1>
          <p className="text-base-content/60">
            Any question or remarks? Just write us a message!
          </p>
        </div>

        {/* Main Card Container */}
        <div className="bg-base-100 rounded-3xl shadow-2xl overflow-hidden flex flex-col lg:flex-row min-h-[600px]">
          {/* Left Side: Contact Info (Dark Purple/Black) */}
          <div className="lg:w-2/5 bg-[#1A1C29] p-10 flex flex-col justify-between text-white relative overflow-hidden">
            {/* Background Circles Decoration */}
            <div className="absolute bottom-[-50px] right-[-50px] w-48 h-48 bg-white/10 rounded-full"></div>
            <div className="absolute bottom-[50px] right-[50px] w-24 h-24 bg-orange-500 rounded-full opacity-80"></div>

            <div>
              <h2 className="text-3xl font-bold mb-4">Contact Information</h2>
              <p className="text-gray-400 mb-12 text-sm">
                Fill up the form and our Team will get back to you within 24
                hours.
              </p>

              <div className="space-y-8">
                <div className="flex items-center gap-4 group cursor-pointer">
                  <span className="w-10 h-10 rounded-full border border-gray-600 flex items-center justify-center group-hover:bg-orange-500 group-hover:border-orange-500 transition-all">
                    📞
                  </span>
                  <span className="text-sm tracking-wide group-hover:text-orange-400 transition-colors">
                    +880 1738-305766
                  </span>
                </div>
                <div className="flex items-center gap-4 group cursor-pointer">
                  <span className="w-10 h-10 rounded-full border border-gray-600 flex items-center justify-center group-hover:bg-orange-500 group-hover:border-orange-500 transition-all">
                    📧
                  </span>
                  <span className="text-sm tracking-wide group-hover:text-orange-400 transition-colors">
                    zubaer.developer@gmail.com
                  </span>
                </div>
                <div className="flex items-center gap-4 group cursor-pointer">
                  <span className="w-10 h-10 rounded-full border border-gray-600 flex items-center justify-center group-hover:bg-orange-500 group-hover:border-orange-500 transition-all">
                    📍
                  </span>
                  <span className="text-sm tracking-wide group-hover:text-orange-400 transition-colors">
                    Dhaka, Bangladesh
                  </span>
                </div>
              </div>
            </div>

            {/* Social Icons */}
            <div className="flex gap-6 mt-12 lg:mt-0 relative z-10">
              {[
                {
                  icon: <FaFacebookF />,
                  link: "https://www.facebook.com/zubaer.hossain/",
                },
                { icon: <FaTwitter />, link: "#" },
                { icon: <FaInstagram />, link: "#" },
                { icon: <FaLinkedinIn />, link: "#" },
              ].map((social, index) => (
                <a
                  key={index}
                  href={social.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-white hover:bg-orange-500 hover:scale-110 transition-all cursor-pointer"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Right Side: Form  */}
          <div className="lg:w-3/5 p-10 lg:p-16 bg-base-100 relative">
            {submitted ? (
              <div className="h-full flex flex-col items-center justify-center text-center">
                <div className="w-20 h-20 bg-green-100 text-green-500 rounded-full flex items-center justify-center text-4xl mb-6">
                  ✓
                </div>
                <h3 className="text-2xl font-bold text-base-content mb-2">
                  Message Sent!
                </h3>
                <p className="text-base-content/60 mb-8">
                  Thank you for contacting us. We'll be in touch shortly.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-8 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-all"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Row 1 */}
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="relative">
                    <label className="text-xs font-semibold text-base-content/60 uppercase tracking-wider mb-2 block">
                      Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="John Doe"
                      required
                      className="w-full pb-2 border-b-2 border-base-300 bg-transparent focus:border-black focus:outline-none text-base-content transition-colors placeholder:text-base-content/30"
                    />
                  </div>
                  <div className="relative">
                    <label className="text-xs font-semibold text-base-content/60 uppercase tracking-wider mb-2 block">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="john@example.com"
                      required
                      className="w-full pb-2 border-b-2 border-base-300 bg-transparent focus:border-black focus:outline-none text-base-content transition-colors placeholder:text-base-content/30"
                    />
                  </div>
                </div>

                {/* Row 2 */}
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="relative">
                    <label className="text-xs font-semibold text-base-content/60 uppercase tracking-wider mb-2 block">
                      Phone
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+880 1XXX XXXXXX"
                      className="w-full pb-2 border-b-2 border-base-300 bg-transparent focus:border-black focus:outline-none text-base-content transition-colors placeholder:text-base-content/30"
                    />
                  </div>
                  <div className="relative">
                    <label className="text-xs font-semibold text-base-content/60 uppercase tracking-wider mb-2 block">
                      Subject
                    </label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="Inquiry about..."
                      className="w-full pb-2 border-b-2 border-base-300 bg-transparent focus:border-black focus:outline-none text-base-content transition-colors placeholder:text-base-content/30"
                    />
                  </div>
                </div>

                {/* Message Box */}
                <div className="relative mt-8">
                  <label className="text-xs font-semibold text-base-content/60 uppercase tracking-wider mb-2 block">
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="4"
                    placeholder="Write your message here..."
                    required
                    className="w-full pb-2 border-b-2 border-base-300 bg-transparent focus:border-black focus:outline-none text-base-content transition-colors placeholder:text-base-content/30 resize-none"
                  ></textarea>
                </div>

                {/* Submit Button */}
                <div className="flex justify-end pt-4">
                  <button
                    type="submit"
                    className="px-10 py-4 bg-black text-white font-bold rounded-lg shadow-lg hover:bg-gray-800 hover:-translate-y-1 transition-all duration-300 text-sm tracking-wide uppercase"
                  >
                    Send Message
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
