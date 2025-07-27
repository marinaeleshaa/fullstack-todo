"use client"; // Error boundaries must be Client Components

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <head>
        <title>Something went wrong - TodoApp</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 font-inter antialiased">
        <div className="min-h-screen flex items-center justify-center p-6">
          <div className="max-w-md w-full">
            {/* Main Error Card */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8 text-center">
              {/* Icon */}
              <div className="mx-auto w-16 h-16 bg-gradient-to-br from-red-400 to-red-600 rounded-full flex items-center justify-center mb-6">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.314 16.5c-.77.833.192 2.5 1.732 2.5z"
                  />
                </svg>
              </div>

              {/* Error Message */}
              <h1 className="text-2xl font-semibold text-gray-900 mb-3">
                Oops! Something went wrong
              </h1>

              <p className="text-gray-600 mb-8 leading-relaxed">
                We encountered an unexpected error while loading your todos.
                Don&apos;t worry, your data is safe.
              </p>

              {/* Action Buttons */}
              <div className="space-y-3">
                <button
                  onClick={() => reset()}
                  className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-medium py-3 px-6 rounded-xl transition-all duration-200 transform hover:scale-105 hover:shadow-lg active:scale-95"
                >
                  Try Again
                </button>

                <button
                  onClick={() => (window.location.href = "/")}
                  className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-3 px-6 rounded-xl transition-all duration-200"
                >
                  Go to Homepage
                </button>
              </div>

              {/* Error Details (for development) */}
              {process.env.NODE_ENV === "development" && error.message && (
                <details className="mt-6 text-left">
                  <summary className="cursor-pointer text-sm text-gray-500 hover:text-gray-700 transition-colors">
                    Error Details
                  </summary>
                  <div className="mt-3 p-4 bg-red-50 rounded-lg border border-red-100">
                    <code className="text-xs text-red-800 break-all">
                      {error.message}
                    </code>
                    {error.digest && (
                      <p className="text-xs text-red-600 mt-2">
                        Error ID: {error.digest}
                      </p>
                    )}
                  </div>
                </details>
              )}
            </div>

            {/* Footer */}
            <div className="text-center mt-6">
              <p className="text-sm text-gray-500">
                Need help? Contact our{" "}
                <a
                  href="/support"
                  className="text-blue-600 hover:text-blue-700 underline"
                >
                  support team
                </a>
              </p>
            </div>
          </div>
        </div>

        <style jsx>{`
          .font-inter {
            font-family: "Inter", -apple-system, BlinkMacSystemFont, sans-serif;
          }
        `}</style>
      </body>
    </html>
  );
}
