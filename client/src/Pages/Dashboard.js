import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import toast from "react-hot-toast";

function Dashboard() {
  const [showForm, setShowForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [formData, setFormData] = useState({ name: "", email: "", mobile: "" });
  const [data, setData] = useState([]);

  const navigate = useNavigate();

  // Fetch data from backend
  const fetchData = async () => {
    try {
      const response = await axios.get("https://contactx-cdi6.onrender.com/api/contacts", {
        withCredentials: true  // Ensure cookies are sent
      });
      setData(response.data);
    } catch (error) {
      console.error("Error fetching contacts:", error.response?.data || error.message);
    }
  };

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission (add/edit)
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate mobile number (must be 10 digits)
    if (formData.mobile.length !== 10) {
      toast.error("Mobile number should be exactly 10 digits.");
      return;
    }

    try {
      if (isEditing) {
        await axios.put(`https://contactx-cdi6.onrender.com/api/contacts/${editId}`, formData, {
          withCredentials: true
        });
        toast.success("Contact updated successfully!");
      } else {
        await axios.post("https://contactx-cdi6.onrender.com/api/contacts", formData, {
          withCredentials: true
        });
        toast.success("Contact added successfully!");
      }
      fetchData();
      setShowForm(false);
      setFormData({ name: "", email: "", mobile: "" });
      setIsEditing(false);
      navigate("/dashboard");
    } catch (error) {
      toast.error("Error submitting contact!");
    }
  };

  // Handle delete
  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://contactx-cdi6.onrender.com/api/contacts/${id}`, {
        withCredentials: true
      });
      toast.success("Contact deleted successfully!");
      fetchData();
    } catch (error) {
      toast.error("Error deleting contact!");
    }
  };

  // Handle edit
  const handleEdit = (id, entry) => {
    setIsEditing(true);
    setEditId(id);
    setFormData(entry);
    setShowForm(true);
  };

  useEffect(() => {
    fetchData(); 
  }, []); 


  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gray-900 text-white">
      <h1 className="text-4xl font-bold mb-8">Manage Entries</h1>

      <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-3/4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">Entries</h2>
          <button
            className="bg-blue-500 px-4 py-2 rounded text-white hover:bg-blue-700"
            onClick={() => {
              setShowForm(true);
              setFormData({ name: "", email: "", mobile: "" });
              setIsEditing(false);
            }}
          >
            Add Entry
          </button>
        </div>
        <table className="table-auto w-full text-center">
          <thead>
            <tr className="text-gray-400">
              <th className="px-6 py-4">#</th> {/* Added for number column */}
              <th className="px-6 py-4">Name</th>
              <th className="px-6 py-4">Email</th>
              <th className="px-6 py-4">Mobile</th>
              <th className="px-6 py-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((entry, index) => (
              <tr key={entry._id} className="border-t border-gray-700">
                <td className="px-6 py-4 text-lg">{index + 1}</td> {/* Dynamic number based on index */}
                <td className="px-6 py-4 text-lg">{entry.name}</td>
                <td className="px-6 py-4 text-lg">{entry.email}</td>
                <td className="px-6 py-4 text-lg">{entry.mobile}</td>
                <td className="px-6 py-4">
                  <button
                    className="bg-green-500 px-4 py-2 rounded text-white mr-2 hover:bg-green-700"
                    onClick={() => handleEdit(entry._id, entry)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-500 px-4 py-2 rounded text-white hover:bg-red-700"
                    onClick={() => handleDelete(entry._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add/Edit Form */}
      {showForm && (
        <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
          <form
            className="bg-gray-800 p-6 rounded-lg shadow-lg"
            onSubmit={handleSubmit}
          >
            <h2 className="text-2xl font-semibold mb-4">
              {isEditing ? "Edit Entry" : "Add Entry"}
            </h2>
            <div className="mb-4">
              <label className="block text-gray-400 mb-2">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded bg-gray-700 text-white"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-400 mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded bg-gray-700 text-white"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-400 mb-2">Mobile</label>
              <input
                type="text"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded bg-gray-700 text-white"
                required
              />
            </div>
            <div className="flex justify-between">
              <button
                type="submit"
                className="bg-blue-500 px-4 py-2 rounded text-white hover:bg-blue-700"
              >
                {isEditing ? "Update" : "Add"}
              </button>
              <button
                type="button"
                className="bg-gray-500 px-4 py-2 rounded text-white hover:bg-gray-700"
                onClick={() => setShowForm(false)}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
