import toast from "react-hot-toast";
import Cookies from "universal-cookie";

const cookies = new Cookies();

const logoutHandler = async () => {
  try {
    await cookies.remove("token");
    await localStorage.removeItem("employeePicture");
    window.location.href = "/";
    toast.success("Logged out successfully!");
  } catch (error) {
    console.error(error);
  }
};


function formatDateForInput(dateString) {
  if (!dateString) return ""; // Return an empty string if the input is invalid
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return ""; // Check if the date is valid

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

const formatDateToDDMMYYYY = (dateString) => {
  if (!dateString) return ""; // Handle empty or undefined dates
  const date = new Date(dateString);

  // Check for an invalid date
  if (isNaN(date)) {
    console.error("Invalid date:", dateString);
    return "";
  }

  const day = String(date.getDate()).padStart(2, "0"); // Add leading zero if needed
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
};

// Export both functions as named exports
export {
  logoutHandler,
  formatDateForInput,
  formatDateToDDMMYYYY,
};
