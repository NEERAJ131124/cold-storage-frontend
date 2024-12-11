import React from "react";
import { color1, color3 } from "../../../constants/Colors";
import { formatDateToDDMMYYYY } from "../../../constants/Functions";

const TodayCheckoutDetails = ({ checkintime, checkouttime }) => {
  // Function to subtract 5:30 hours (5.5 hours)
  const subtractISTOffset = (date) => {
    if (!date) return null;
    const dateObj = new Date(date);
    dateObj.setHours(dateObj.getHours() - 5); // Subtract 5 hours
    dateObj.setMinutes(dateObj.getMinutes() - 30); // Subtract 30 minutes
    return dateObj;
  };

  // Subtract IST offset for both checkin and checkout times
  const checkinDate = checkintime ? subtractISTOffset(checkintime) : null;
  const checkoutDate = checkouttime ? subtractISTOffset(checkouttime) : null;

  // Format times if available, else show 'Haven't checked in'
  const weekday = checkinDate
    ? checkinDate.toLocaleString("en-US", { weekday: "long" })
    : null;
  const weekdayout = checkoutDate
    ? checkoutDate.toLocaleString("en-US", { weekday: "long" })
    : null;
  const date = checkinDate
    ? checkinDate.toLocaleString("en-US", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      })
    : "Haven't checked in";
  const time = checkinDate
    ? checkinDate.toLocaleString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false, // Use 24-hour format
      })
    : "Haven't checked in";

  const dateout = checkoutDate
    ? checkoutDate.toLocaleString("en-US", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      })
    : "Haven't checked out";
  const timeout = checkoutDate
    ? checkoutDate.toLocaleString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      })
    : "Haven't checked out";

  return (
    <div
      className="h-[180px] w-[200px] rounded-md"
      style={{
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        background: `linear-gradient(15deg, ${color3}, ${color1})`,
      }}
    >
      <div className="card-header text-[#fff] p-4 rounded-md">
        <h5 className="responsive-md-text font-bold uppercase">
          Other Details
        </h5>
      </div>
      <div className="card-body p-4 text-[#fff] rounded-md">
        <p className="mb-2">
          <span className="responsive-sm-text font-bold mr-2">
            Check In Time:
          </span>
          {/* <br /> */}
          {/* Check if user has checked in */}
          {checkintime === null ? (
            "Haven't checked in"
          ) : (
            <span className="responsive-sm-text ">
              {/* {weekday ? ` ${formatDateToDDMMYYYY(date)}` : "Checked in"} at{" "} */}
              {time}
            </span>
          )}
        </p>

        {/* Render Check Out Time only if user has checked in */}
        {checkintime !== null && (
          <p className="mb-2 responsive-sm-text">
            <span className="responsive-sm-text font-bold">
              Check Out Time:
            </span>
            {/* <br /> */}
            {checkouttime === null ? (
              " Haven't checked out"
            ) : (
              <span className="responsive-sm-text">
                {/* {weekdayout
                  ? ` ${formatDateToDDMMYYYY(dateout)}`
                  : "Checked out"}{" "}
                at  */}
                {timeout}
              </span>
            )}
          </p>
        )}
      </div>
    </div>
  );
};

export default TodayCheckoutDetails;
