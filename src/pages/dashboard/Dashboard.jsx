import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "universal-cookie";


const Dashboard = () => {
  const navigate = useNavigate();
  const cookies = new Cookies()

  // useEffect(() => {    
  //   const authCode = cookies.get('loginToken')

  //   if (authCode) {
  //       console.log(authCode)
  //     // Send the code to the backend for validation
  //     axios
  //       .post("http://localhost:8888/validate", { code: authCode })
  //       .then((response) => {
  //         console.log("Tokens received:", response.data);
  //       //   navigate("/dashboar");
  //       })
  //       .catch((error) => {
  //         console.error("Error during token validation:", error);
  //       //   navigate("/login");
  //       });
  //   } else {
  //     console.error("No authorization code found");
  //   //   navigate("/login");
  //   }
  // }, []);

  return <div>Loading...</div>;
};

export default Dashboard;
