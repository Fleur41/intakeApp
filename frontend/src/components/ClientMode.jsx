import { useState } from 'react';

export default function ClientMode() {
  const [formData, setFormData] = useState({
    fullName: '',
    spouseName: '',
    county: '',
    hasChildren: false,
    email: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        setSubmitted(true);
      }
    } catch (error) {
      console.error('Submission error:', error);
    }
  };

  if (submitted) {
    return (
      <div className="max-w-md mx-auto mt-10 p-6 bg-green-50 rounded-lg">
        <h2 className="text-2xl font-bold text-green-800 mb-4">Thank You!</h2>
        <p className="text-green-600">We'll be in touch soon.</p>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Client Intake Form</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="fullName" className="block mb-1">Full Name</label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            required
            className="w-full border rounded px-3 py-2"
            value={formData.fullName}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="spouseName" className="block mb-1">Spouse Name</label>
          <input
            type="text"
            id="spouseName"
            name="spouseName"
            className="w-full border rounded px-3 py-2"
            value={formData.spouseName}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="county" className="block mb-1">County</label>
          <input
            type="text"
            id="county"
            name="county"
            required
            className="w-full border rounded px-3 py-2"
            value={formData.county}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <input
            type="checkbox"
            id="hasChildren"
            name="hasChildren"
            className="mr-2"
            checked={formData.hasChildren}
            onChange={handleChange}
          />
          <label htmlFor="hasChildren">Do you have children?</label>
        </div>
        <div className="mb-6">
          <label htmlFor="email" className="block mb-1">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            required
            className="w-full border rounded px-3 py-2"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
