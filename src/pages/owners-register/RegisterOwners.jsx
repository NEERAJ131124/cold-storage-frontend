import React, { useState } from "react";

const RegisterOwner = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    pincode: "",
    storageCapacity: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    // Add API call logic here
  };

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg p-6 rounded-lg w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-4">Register as Store Owner</h2>
        <input
          type="text"
          name="name"
          placeholder="Name"
          onChange={handleChange}
          className="border p-2 rounded-lg w-full mb-4"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          className="border p-2 rounded-lg w-full mb-4"
        />
        <input
          type="text"
          name="phone"
          placeholder="Phone"
          onChange={handleChange}
          className="border p-2 rounded-lg w-full mb-4"
        />
        <textarea
          name="address"
          placeholder="Complete Address"
          onChange={handleChange}
          className="border p-2 rounded-lg w-full mb-4"
        />
        <input
          type="text"
          name="pincode"
          placeholder="Pincode"
          onChange={handleChange}
          className="border p-2 rounded-lg w-full mb-4"
        />
        <input
          type="number"
          name="storageCapacity"
          placeholder="Storage Capacity (in tons)"
          onChange={handleChange}
          className="border p-2 rounded-lg w-full mb-4"
        />
        <button
          type="submit"
          className="bg-cyan-600 text-white px-4 py-2 rounded-lg w-full"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default RegisterOwner;
