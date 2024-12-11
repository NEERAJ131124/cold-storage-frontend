import React from "react";
import { color1, color3 } from "../../../constants/Colors";

const LeaveDetails = ({ leavedetails }) => {
  return (
    <div
      className=" h-[180px] w-[200px] rounded-md"
      style={{
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        background: `linear-gradient(135deg, ${color1}, ${color3})`,
      }}
    >
      <header className="card-header text-[#fff] p-4">
        <h5 className="responsive-md-text font-bold uppercase">
          Leave Details
        </h5>
      </header>
      <div className="card-body p-4 text-[#fff]">
        <p className="mb-2 responsive-sm-text">
          <span className="responsive-sm-text font-bold">Total Leaves:</span>{" "}
          {leavedetails.totalLeaves + Number(2)}
        </p>
        <p className="mb-2 responsive-sm-text">
          <span className="responsive-sm-text font-bold ">Taken Leaves:</span>{" "}
          {leavedetails.takenLeaves}
        </p>
        <p className="mb-2 responsive-sm-text">
          <span className="responsive-sm-text font-bold ">
            Pending Requests:
          </span>{" "}
          {leavedetails.pendingRequests}
        </p>
      </div>
    </div>
  );
};

export default LeaveDetails;
