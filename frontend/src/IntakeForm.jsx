import React, { useState } from "react";

export default function IntakeForm({ adminUsername, adminPassword, onBack }) {
  const [form, setForm] = useState({
    fullName: "",
    spouseName: "",
    county: "",
    hasChildren: false,
    email: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await fetch("http://localhost:5000/api/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "Basic " + btoa(`${adminUsername}:${adminPassword}`),
        },
        body: JSON.stringify(form),
      });
      if (res.ok) setSubmitted(true);
      else {
        const data = await res.json();
        setError(data.error || "Submission failed");
      }
    } catch {
      setError("Network error");
    }
  };

  if (submitted)
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 via-white to-blue-200">
        <div className="bg-green-100 rounded-xl shadow-2xl p-10 max-w-md w-full text-center">
          <h2 className="text-2xl font-bold text-green-700 mb-2">
            Thanks, we'll be in touch
          </h2>
          <button
            onClick={onBack}
            className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition"
          >
            Back to Home
          </button>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 via-white to-blue-200">
      <form
        onSubmit={handleSubmit}
        className="bg-white bg-opacity-90 rounded-xl shadow-2xl p-10 max-w-md w-full space-y-4"
      >
        <h2 className="text-2xl font-bold text-blue-700 mb-4">Intake Form</h2>
        {error && <div className="text-red-500">{error}</div>}
        <input
          className="w-full border p-2 rounded"
          name="fullName"
          placeholder="Full Name"
          value={form.fullName}
          onChange={handleChange}
          required
        />
        <input
          className="w-full border p-2 rounded"
          name="spouseName"
          placeholder="Spouse’s Full Name"
          value={form.spouseName}
          onChange={handleChange}
        />
        <input
          className="w-full border p-2 rounded"
          name="county"
          placeholder="County of Filing"
          value={form.county}
          onChange={handleChange}
          required
        />
        <label className="flex items-center">
          <input
            type="checkbox"
            name="hasChildren"
            checked={form.hasChildren}
            onChange={handleChange}
            className="mr-2"
          />
          There are children
        </label>
        <input
          className="w-full border p-2 rounded"
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
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
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}