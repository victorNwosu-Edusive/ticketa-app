import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Toast from "../../components/Toast";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [toast, setToast] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    let validationErrors = {};

    if (!email.trim()) validationErrors.email = "Email is required";
    if (!password.trim()) validationErrors.password = "Password is required";

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const storedUsers = JSON.parse(localStorage.getItem("ticketapp_users")) || [];
    const user = storedUsers.find((u) => u.email === email && u.password === password);

    if (!user) {
      setToast({ message: "⚠ Invalid credentials. Try again.", type: "error" });
      return;
    }

    localStorage.setItem(
      "ticketapp_session",
      JSON.stringify({ token: "fake-token", user })
    );
    setToast({ message: "☑ Login successful!", type: "success" });

    setTimeout(() => navigate("/dashboard"), 1000);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-white md:bg-gray-100">
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      <div className="bg-white shadow-none md:shadow-lg rounded-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-blue-700">Login</h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email */}
          <div>
            <label className="block mb-1 font-medium">Email</label>
            <input
              type="email"
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-blue-600"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && (
              <p className="text-sm text-red-500 mt-1">{errors.email}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block mb-1 font-medium">Password</label>
            <input
              type="password"
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-blue-600"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {errors.password && (
              <p className="text-sm text-red-500 mt-1">{errors.password}</p>
            )}
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
          >
            Login
          </button>

          <p className="text-center text-sm mt-3">
            Don’t have an account?{" "}
            <Link to="/auth/signup" className="text-blue-600 hover:underline">
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
