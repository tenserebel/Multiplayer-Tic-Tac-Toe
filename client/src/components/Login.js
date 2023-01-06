import React, { useState } from "react";
import axios from "axios";
import Cookies from "universal-cookie";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import AccountCircle from "@mui/icons-material/AccountCircle";
import InputAdornment from "@mui/material/InputAdornment";
import LockIcon from "@mui/icons-material/Lock";
import { Button, Container } from "@mui/material";
import ".././styles/login.css";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

import "../App.css";

const Login = ({ setIsAuth }) => {
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const cookies = new Cookies();
  const login = () => {
    axios
      .post("http://localhost:3001/login", {
        username,
        password,
      })
      .then((res) => {
        const { firstName, lastName, username, token, userId } = res.data;
        cookies.set("token", token);
        cookies.set("userId", userId);
        cookies.set("username", username);
        cookies.set("firstName", firstName);
        cookies.set("lastName", lastName);
        setIsAuth(true);
      });
  };
  return (
    <div className="auth">
      <Container maxWidth="sm">
        <div className="position">
          <label className="heading-size"> Login</label>
          <Box
            component="form"
            sx={{
              "& .MuiTextField-root": { m: 1, width: "35ch" },
            }}
            noValidate
            autoComplete="off"
          >
            <div>
              <TextField
                fullWidth
                placeholder="Username"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AccountCircle />
                    </InputAdornment>
                  ),
                }}
                onChange={(event) => {
                  setUsername(event.target.value);
                }}
              />
            </div>
            <div>
              <TextField
                placeholder="Password"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockIcon />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                type={showPassword ? "text" : "password"}
                onChange={(event) => {
                  setPassword(event.target.value);
                }}
              />
            </div>
          </Box>

          <Button onClick={login} variant="contained">
            Login
          </Button>
        </div>
        <div>
          Need to Signup? <Link to="/signup">SignUp</Link>
        </div>
      </Container>
    </div>
  );
};

export default Login;
