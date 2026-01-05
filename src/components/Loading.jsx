function Loading() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-orange-50 via-white to-amber-50">
      {/* Animated Paw Prints */}
      <div className="flex gap-4 mb-8">
        <span className="text-5xl animate-bounce">🐾</span>
        <span
          className="text-5xl animate-bounce"
          style={{ animationDelay: "150ms" }}
        >
          🐾
        </span>
        <span
          className="text-5xl animate-bounce"
          style={{ animationDelay: "300ms" }}
        >
          🐾
        </span>
      </div>

      {/* Loading Bar */}
      <div className="w-64 h-2 bg-gray-200 rounded-full overflow-hidden">
        <div className="h-full bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-500 rounded-full animate-loading-bar"></div>
      </div>

      <p className="mt-6 text-gray-500 font-medium animate-pulse">
        Loading amazing pets...
      </p>
    </div>
  );
}

export default Loading;
