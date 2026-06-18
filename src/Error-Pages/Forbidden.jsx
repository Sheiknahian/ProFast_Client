import { FaLock } from "react-icons/fa";
import { Link } from "react-router";

const Forbidden = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center">
      <FaLock className="text-6xl mb-4" />

      <h1 className="text-5xl font-bold mb-2">403</h1>

      <h2 className="text-2xl font-semibold mb-4">
        Access Forbidden
      </h2>

      <p className="max-w-md text-gray-500 mb-6">
        You don't have permission to access this page.
      </p>

      <Link
        to="/dashboard"
        className="px-6 py-3 rounded-lg bg-[#CAEB66] font-medium hover:opacity-90 transition"
      >
        Back to Home
      </Link>
    </div>
  );
};

export default Forbidden;