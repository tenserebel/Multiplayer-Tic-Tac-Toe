import "./App.css";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import { StreamChat } from "stream-chat";
import { Chat } from "stream-chat-react";
import Cookies from "universal-cookie";
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import JoinGame from "./components/JoinGame";

import { Button } from "@mui/material";

function App() {
  const cookies = new Cookies();
  const token = cookies.get("token");
  // Use the stream key here.
  const api_key = "";

  const client = StreamChat.getInstance(api_key);
  const [isAuth, setIsAuth] = useState(false);

  const logOut = () => {
    cookies.remove("token");
    cookies.remove("userId");
    cookies.remove("firstName");
    cookies.remove("lastName");
    cookies.remove("hashedPassword");
    cookies.remove("channelName");
    cookies.remove("username");
    client.disconnectUser();
    setIsAuth(false);
  };

  if (token) {
    client
      .connectUser(
        {
          id: cookies.get("userId"),
          name: cookies.get("username"),
          firstName: cookies.get("firstName"),
          lastName: cookies.get("lastName"),
          hashedPassword: cookies.get("hashedPassword"),
        },
        token
      )
      .then((user) => {
        setIsAuth(true);
      });
  }

  return (
    <div className="App">
      {isAuth ? (
        <Chat client={client}>
          <div>
            <JoinGame />
          </div>
          <div className="logout">
            <Button variant="contained" onClick={logOut}>
              Logout
            </Button>
          </div>
        </Chat>
      ) : (
        <>
          <Router>
            <Routes>
              <Route path="/" element={<Login setIsAuth={setIsAuth} />}></Route>
              <Route
                path="/signup"
                element={<SignUp setIsAuth={setIsAuth} />}
              ></Route>
            </Routes>
          </Router>
        </>
      )}
    </div>
  );
}

export default App;
