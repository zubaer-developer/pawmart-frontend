function Loading() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-base-100 via-base-200 to-base-300">
      {/* Animated Paw Prints */}
      <div className="relative">
        <div className="flex gap-4 mb-8">
          <span className="text-5xl animate-bounce">🐾</span>
          <span className="text-5xl animate-bounce animation-delay-200">
            🐾
          </span>
          <span className="text-5xl animate-bounce animation-delay-400">
            🐾
          </span>
        </div>
      </div>

      {/* Loading Bar */}
      <div className="w-64 h-2 bg-base-300 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-primary-500 via-orange-500 to-amber-500 rounded-full animate-pulse"
          style={{
            width: "60%",
            animation: "loading 1.5s ease-in-out infinite",
          }}
        ></div>
      </div>

      <p className="mt-6 text-gray-500 font-medium animate-pulse">
        Loading amazing pets...
      </p>

      <style>{`
        @keyframes loading {
          0% { width: 0%; margin-left: 0; }
          50% { width: 60%; margin-left: 20%; }
          100% { width: 0%; margin-left: 100%; }
        }
      `}</style>
    </div>
  );
}

export default Loading;
