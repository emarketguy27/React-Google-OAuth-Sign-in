import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import "./App.css";
import { useState } from "react";

function App() {
  const [userData, setUserData] = useState(null);

  return (
    <div className="App">
      <h2>React Google Sign-In</h2>
      {!userData && (
        <GoogleLogin
          className="sign"
          onSuccess={(credentialResponse) => {
            const details = jwtDecode(credentialResponse.credential);
            console.log(details);
            const userData = {
              picture: details.picture,
              name: details.name,
              email: details.email,
            };
            setUserData(userData);
          }}
          onError={() => {
            console.log("Login Failed");
          }}
        />
      )}
      {userData && (
        <div>
          <h3>Logged in</h3>
          <div className="flex border b-r">
            <img src={userData.picture} className="profile-pic" alt="Profile" />
            <div className="column">
              <h3>{userData.name}</h3>
              <p>Email: {userData.email}</p>
            </div>
            
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
