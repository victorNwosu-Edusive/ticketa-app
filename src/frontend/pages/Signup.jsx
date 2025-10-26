import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Toast from "../../components/Toast";

const Signup = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [toast, setToast] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let validationErrors = {};

    if (!form.name.trim()) validationErrors.name = "Name is required";
    if (!form.email.trim()) validationErrors.email = "Email is required";
    if (!form.password.trim()) validationErrors.password = "Password is required";
    else if (form.password.length < 6)
      validationErrors.password = "Password must be at least 6 characters";

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const users = JSON.parse(localStorage.getItem("ticketapp_users")) || [];
    const exists = users.some((u) => u.email === form.email);

    if (exists) {
      setToast({ message: "⚠ Email already exists!", type: "error" });
      return;
    }

    users.push(form);
    localStorage.setItem("ticketapp_users", JSON.stringify(users));
    setToast({ message: "☑ Signup successful! Redirecting to login...", type: "success" });

    setTimeout(() => navigate("/auth/login"), 1500);
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
        <h2 className="text-2xl font-bold mb-6 text-center text-blue-700">Sign Up</h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Name */}
          <div>
            <label className="block mb-1 font-medium">Name</label>
            <input
              type="text"
              name="name"
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-blue-600"
              value={form.name}
              onChange={handleChange}
            />
            {errors.name && <p className="text-sm text-red-500 mt-1">{errors.name}</p>}
          </div>

          {/* Email */}
          <div>
            <label className="block mb-1 font-medium">Email</label>
            <input
              type="email"
              name="email"
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-blue-600"
              value={form.email}
              onChange={handleChange}
            />
            {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email}</p>}
          </div>

          {/* Password */}
          <div>
            <label className="block mb-1 font-medium">Password</label>
            <input
              type="password"
              name="password"
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-blue-600"
              value={form.password}
              onChange={handleChange}
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
            Create Account
          </button>

          <p className="text-center text-sm mt-3">
            Already have an account?{" "}
            <Link to="/auth/login" className="text-blue-600 hover:underline">
              Log in
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
