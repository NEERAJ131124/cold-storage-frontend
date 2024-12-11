import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";

const Ulogin = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState(1); 
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate()
  const cookies = new Cookies();

  const handleEmailSubmit = async () => {
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:8888/login/login-or-signup", { Email:email });
      setMessage(response.data.message);
      setStep(2); // Move to OTP entry
    } catch (error) {
      setMessage(
        error.response?.data?.message || "Something went wrong. Try again."
      );
    } finally {
      setLoading(false);
    }
  };

  // const sendRequest = async()=>{
  //   try {
  //     const response = axios.post(api,{
  //       headers:{
  //         authorization:cookies.get('token')
  //       }
  //     })
  //     console.log(response)
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }

  const handleOtpSubmit = async () => {
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:8888/login/verify-otp", { Email:email, Otp:otp });
      setMessage(response.data.message);
cookies.set('token', response.data.token, { path: "/" });
      console.log(response)
      navigate( "/dashboard");
    } catch (error) {
      setMessage(
        error.response?.data?.message || "Invalid OTP. Try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          {step === 1 ? "Login/Signup" : "Enter OTP"}
        </h2>
        {message && (
          <div
            className="mb-4 p-2 text-sm rounded-lg text-center"
            style={{
              backgroundColor: message.includes("successfully")
                ? "lightgreen"
                : "lightcoral",
            }}
          >
            {message}
          </div>
        )}
        {step === 1 ? (
          <>
            <label
              htmlFor="email"
              className="block text-gray-700 font-medium mb-2"
            >
              Email Address
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
            <button
              onClick={handleEmailSubmit}
              disabled={loading}
              className={`mt-4 w-full py-2 px-4 text-white font-semibold rounded-lg ${
                loading
                  ? "bg-blue-300 cursor-not-allowed"
                  : "bg-blue-500 hover:bg-blue-600"
              }`}
            >
              {loading ? "Sending OTP..." : "Send OTP"}
            </button>
          </>
        ) : (
          <>
            <label
              htmlFor="otp"
              className="block text-gray-700 font-medium mb-2"
            >
              Enter OTP
            </label>
            <input
              id="otp"
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Enter the OTP"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
            <button
              onClick={handleOtpSubmit}
              disabled={loading}
              className={`mt-4 w-full py-2 px-4 text-white font-semibold rounded-lg ${
                loading
                  ? "bg-blue-300 cursor-not-allowed"
                  : "bg-blue-500 hover:bg-blue-600"
              }`}
            >
              {loading ? "Verifying OTP..." : "Verify OTP"}
            </button>
          </>
        )}
        <p className="mt-4 text-sm text-gray-600 text-center">
          Didn’t receive an OTP?{" "}
          <span
            onClick={handleEmailSubmit}
            className="text-blue-500 cursor-pointer hover:underline"
          >
            Resend
          </span>
        </p>
      </div>
    </div>
  );
};

export default Ulogin;
