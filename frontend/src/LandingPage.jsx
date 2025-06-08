import React from "react";

export default function LandingPage({ onStart }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-tr from-blue-200 via-white to-blue-400">
      <div className="bg-white/90 rounded-2xl shadow-2xl p-8 max-w-sm w-full text-center border border-blue-100">
        <div className="flex justify-center mb-4">
          <div className="bg-blue-100 rounded-full p-3 shadow-inner">
            <img
              src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
              alt="Intake"
              className="w-12 h-12"
            />
          </div>
        </div>
        <h1 className="text-3xl font-extrabold text-blue-700 mb-2 tracking-tight">
          Welcome to Intake Portal
        </h1>
        <p className="text-gray-600 mb-6 text-sm leading-relaxed">
          Securely submit your case details.<br />
          <span className="text-blue-600 font-medium">Admins</span> can log in to manage all submissions.
        </p>
        <button
          onClick={onStart}
          className="w-full py-2 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-full font-semibold shadow-md hover:from-blue-700 hover:to-blue-600 transition-all duration-200"
        >
          Get Started
        </button>
      </div>
      <footer className="mt-8 text-gray-400 text-xs">
        &copy; {new Date().getFullYear()} IntakeApp. All rights reserved.
      </footer>
    </div>
  );
}