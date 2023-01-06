import React, { useState } from "react";
import axios from "axios";
import Cookies from "universal-cookie";
import { Link } from "react-router-dom";
import ".././styles/login.css";
import {
  Box,
  Button,
  Container,
  InputAdornment,
  TextField,
} from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";
import LockIcon from "@mui/icons-material/Lock";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import PersonIcon from "@mui/icons-material/Person";

import "../App.css";

const SignUp = ({ setIsAuth }) => {
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const cookies = new Cookies();
  const [user, setUser] = useState(null);

  const signUp = () => {
    axios.post("http://localhost:3001/signup", user).then((res) => {
      const { token, userId, firstName, lastName, username, hashedPassword } =
        res.data;

      cookies.set("token", token);
      cookies.set("userId", userId);
      cookies.set("username", username);
      cookies.set("firstName", firstName);
      cookies.set("lastName", lastName);
      cookies.set("hashedPassword", hashedPassword);
      setIsAuth(true);
    });
  };

  return (
    <div className="auth">
      <Container maxWidth="sm">
        <div className="position">
          <label className="heading-size"> Sign Up</label>
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
                placeholder="First Name"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonIcon />
                    </InputAdornment>
                  ),
                }}
                onChange={(event) => {
                  setUser({ ...user, firstName: event.target.value });
                }}
              />
            </div>
            <div>
              <TextField
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonIcon />
                    </InputAdornment>
                  ),
                }}
                placeholder="Last Name"
                onChange={(event) => {
                  setUser({ ...user, lastName: event.target.value });
                }}
              />
            </div>
            <div>
              <TextField
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AccountCircle />
                    </InputAdornment>
                  ),
                }}
                placeholder="Username"
                onChange={(event) => {
                  setUser({ ...user, username: event.target.value });
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
                  setUser({ ...user, password: event.target.value });
                }}
              />
            </div>
          </Box>
          <Button onClick={signUp} variant="contained">
            SignUp
          </Button>
        </div>
        <div>
          Need to Login? <Link to="/">Login</Link>
        </div>
      </Container>
    </div>
  );
};

export default SignUp;
