import React, { useState } from "react";
import axios from "axios";
import Cookies from "universal-cookie";
import toast from "react-hot-toast";
import { leaves } from "../../../constants/APIs";
import { useTheme } from "../../../context/ThemeContext";

const LeaveModal = ({ isOpen, onClose, refreshLeaveData }) => {
  const { theme } = useTheme();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    StartDate: "",
    LeaveType: "Full Day",
    EndDate: "",
    Reason: "",
  });

  const cookies = new Cookies();

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const applyForLeave = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const token = cookies.get("token");
      if (!token) throw new Error("User is not authenticated");

      const response = await axios.post(`${leaves}`, formData, {
        headers: {
          authorization: token,
        },
      });
      toast.success("Leave request submitted successfully!");
      onClose(); // Close modal after successful submission
      refreshLeaveData(); // Refresh parent component's leave data
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to apply for leave");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50"
      role="dialog"
    >
      <div
        className="rounded-lg shadow-lg w-full max-w-lg"
        style={{ background: theme.backgroundColor }}
      >
        {/* Modal Header */}
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg font-semibold">Apply for Leave</h2>
          <button onClick={onClose} className=" focus:outline-none text-[24px]">
            &times;
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4">
          <form onSubmit={applyForLeave}>
            {/* Start Date */}
            <div className="mb-4">
              <label
                htmlFor="StartDate"
                className="block text-sm font-medium mb-1"
              >
                Start Date
              </label>
              <input
                type="date"
                id="StartDate"
                name="StartDate"
                value={formData.StartDate}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border text-black rounded focus:outline-none focus:ring focus:ring-blue-500"
                required
              />
            </div>

            {/* End Date */}
            <div className="mb-4">
              <label
                htmlFor="EndDate"
                className="block text-sm font-medium  mb-1"
              >
                End Date
              </label>
              <input
                type="date"
                id="EndDate"
                name="EndDate"
                value={formData.EndDate}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border text-black rounded focus:outline-none focus:ring focus:ring-blue-500"
                required
              />
            </div>

            {/* Leave Type */}
            <div className="mb-4">
              <label
                htmlFor="LeaveType"
                className="block text-sm font-medium mb-1"
              >
                Leave Type
              </label>
              <select
                id="LeaveType"
                name="LeaveType"
                value={formData.LeaveType}
                onChange={handleInputChange}
                className="w-full px-3 py-2 text-black border rounded focus:outline-none focus:ring focus:ring-blue-500"
                required
              >
                <option value="" disabled>
                  Select Leave Type
                </option>
                <option value="Short">Short</option>
                <option value="Half Day">Half Day</option>
                <option value="Full Day">Full Day</option>
              </select>
            </div>

            {/* Reason */}
            <div className="mb-4">
              <label
                htmlFor="Reason"
                className="block text-sm font-medium  mb-1"
              >
                Reason
              </label>
              <textarea
                id="Reason"
                name="Reason"
                value={formData.Reason}
                onChange={handleInputChange}
                rows="3"
                className="w-full px-3 py-2 border text-black rounded focus:outline-none focus:ring focus:ring-blue-500"
                placeholder="Enter your reason for leave"
                required
              ></textarea>
            </div>

            {/* Modal Footer */}
            <div className="flex justify-end mt-4 gap-4">
              <div className="btn_cont">
                <button className="btn-5" onClick={onClose}>
                  <span
                    className={`p-0 m-0 flex items-center justify-start py-1 bg-gradient-to-r from-blue-400 to-[#405494] text-white pr-2 pl-2 w-[80px]`}
                    // style={{ color: theme.textColor }}
                  >
                    <span className="responsive-sm-text uppercase">
                      {" "}
                      Cancel
                    </span>
                  </span>
                </button>
              </div>

              <div className="btn_cont">
                <button className="btn-5" type="submit" disabled={loading}>
                  <span
                    className={`p-0 m-0 flex items-center justify-start py-1 bg-gradient-to-r from-blue-400 to-[#405494] text-white pr-2 pl-2 w-[80px]`}
                    // style={{ color: theme.textColor }}
                  >
                    <span className="responsive-sm-text uppercase">
                      {" "}
                      {loading ? "Submitting..." : "Submit"}
                    </span>
                  </span>
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LeaveModal;
