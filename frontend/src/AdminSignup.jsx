import React, { useState } from "react";

export default function AdminSignup({ onSignupSuccess, onBack }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);
    const res = await fetch("http://localhost:5000/api/admin/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    if (res.ok) {
      setSuccess(true);
      setTimeout(() => onSignupSuccess(username, password), 1000);
    } else {
      const data = await res.json();
      setError(data.error || "Signup failed");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 via-white to-blue-200">
      <form
        onSubmit={handleSubmit}
        className="bg-white bg-opacity-90 rounded-xl shadow-2xl p-10 max-w-md w-full space-y-4"
      >
        <h2 className="text-2xl font-bold text-blue-700 mb-4">Admin Sign Up</h2>
        {error && <div className="text-red-500">{error}</div>}
        {success && <div className="text-green-600">Account created! Logging in...</div>}
        <input
          className="w-full border p-2 rounded"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          className="w-full border p-2 rounded"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <div className="flex justify-between items-center">
          <button
            type="button"
            onClick={onBack}
            className="text-blue-600 hover:underline"
          >
            &larr; Back
          </button>
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded-full font-semibold shadow hover:bg-blue-700 transition"
          >
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
}