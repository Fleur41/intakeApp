import { useState, useEffect } from 'react';

export default function AdminMode() {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({ county: '', hasChildren: '' });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const params = new URLSearchParams();
        if (filters.county) params.append('county', filters.county);
        if (filters.hasChildren) params.append('hasChildren', filters.hasChildren);

        const res = await fetch(`/api/submissions?${params}`, {
          headers: {
            'Authorization': 'Basic ' + btoa('admin:password')  // Replace in prod
          }
        });
        const data = await res.json();
        setSubmissions(data);
      } catch (err) {
        console.error('Error loading submissions:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [filters]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  if (loading) return <div className="text-center py-10">Loading...</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Admin Panel - Submissions</h1>

      <div className="bg-white p-4 rounded shadow mb-6">
        <h2 className="text-xl font-semibold mb-4">Filter</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="text"
            name="county"
            placeholder="Filter by county"
            className="border rounded px-3 py-2"
            value={filters.county}
            onChange={handleFilterChange}
          />
          <select
            name="hasChildren"
            className="border rounded px-3 py-2"
            value={filters.hasChildren}
            onChange={handleFilterChange}
          >
            <option value="">All</option>
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
          <button
            className="bg-gray-300 rounded px-4 py-2 hover:bg-gray-400"
            onClick={() => setFilters({ county: '', hasChildren: '' })}
          >
            Reset
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow rounded">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="py-2 px-4">Name</th>
              <th className="py-2 px-4">Spouse</th>
              <th className="py-2 px-4">County</th>
              <th className="py-2 px-4">Children</th>
              <th className="py-2 px-4">Email</th>
              <th className="py-2 px-4">Submitted</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {submissions.map(sub => (
              <tr key={sub.id}>
                <td className="py-2 px-4">{sub.fullName}</td>
                <td className="py-2 px-4">{sub.spouseName || '-'}</td>
                <td className="py-2 px-4">{sub.county}</td>
                <td className="py-2 px-4">{sub.hasChildren ? 'Yes' : 'No'}</td>
                <td className="py-2 px-4">{sub.email}</td>
                <td className="py-2 px-4">{new Date(sub.createdAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
