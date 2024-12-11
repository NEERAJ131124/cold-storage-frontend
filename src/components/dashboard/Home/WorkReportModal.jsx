import React from "react";
import { useTheme } from "../../../context/ThemeContext";

const WorkReportModal = ({ onClose, onSubmit, workReport, setWorkReport }) => {
  const { theme } = useTheme();
  return (
    <div
      className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50"
      style={{
        background:
          theme.name === "light" ? "rgba(0, 0, 0, 0.5)" : "rgba(0, 0, 0, 0.5)",
      }}
    >
      <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6">
        <div className="modal-header flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-gray-700">Add Work Report</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </button>
        </div>

        <div className="modal-body mb-6">
          <textarea
            rows="4"
            placeholder="Enter your work report (up to 300 words)..."
            maxLength={300}
            required
            minLength={5}
            value={workReport}
            onChange={(e) => setWorkReport(e.target.value)}
            className="w-full p-3 border rounded-md focus:outline-none focus:ring text-black focus:ring-blue-300"
          />
        </div>

        <div className="modal-footer flex justify-end gap-4">
          <div className="btn_cont">
            <button className="btn-4" onClick={onClose}>
              <span
                className={`p-0 m-0 flex items-center justify-start py-1 bg-gradient-to-r from-[#405494] to-blue-300 text-white pr-2 pl-2 w-[80px]`}
                // style={{ color: theme.textColor }}
              >
                <span className="responsive-sm-text uppercase">Cancel</span>
              </span>
            </button>
          </div>

          <div className="btn_cont">
            <button className="btn-5" onClick={onSubmit}>
              <span
                className={`p-0 m-0 flex items-center justify-start py-1 bg-gradient-to-r from-blue-400 to-[#405494] text-white pr-2 pl-2 w-[80px]`}
                // style={{ color: theme.textColor }}
              >
                <span className="responsive-sm-text uppercase">Submit</span>
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkReportModal;
