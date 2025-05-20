import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import { Link } from "react-router-dom";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Snackbar, Alert } from "@mui/material";
import { verifyPassword } from "../../utils/SecurePass";
import { useNavigate } from "react-router-dom";
import loginImage from "../../images/loginImage.jpg";

const theme = createTheme();

export default function LoginForm() {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  const changeForm = (e) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  };

  const login = async (e) => {
    e.preventDefault();
    registerWithSockets("ExistUser", "", "", inputs.email, "", "");
  };

  const [full, setFull] = useState(false);
  const [wrg, setWrg] = useState();
  const [rol, setRol] = useState("");
  const navigate = useNavigate();

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setFull(false);
  };

  const registerWithSockets = (
    method,
    nameVal,
    lastVal,
    emailVal,
    hashed,
    online
  ) => {
    const ws = new WebSocket("ws://localhost:666/websocket/users");

    ws.onopen = () => {
      console.log("Connected to WebSocket server", "message");
      if (ws.readyState === WebSocket.OPEN) {
        ws.send(
          JSON.stringify({
            method: method,
            per_cedula: emailVal,
            adm_usuario: emailVal,
            adm_contrasena: hashed,
          })
        );
      } else {
        console.error("La conexión WebSocket no está abierta aún.");
      }
    };

    ws.onmessage = (event) => {
      if (method === "ExistUser") {
        handleExistUser(event);
      } else if (method === "IsOnlineAndTakeAnToken") {
        handleIsOnlineAndTakeAnToken(event);
      } else if (method === "getRole") {
        handleSetRole(event);
      } else if (method === "getHospital") {
        handleSetHospital(event);
      } else {
        console.error("Método no reconocido: ", method);
      }
    };

    ws.onclose = () => {
      console.log("Disconnected from WebSocket server");
    };

    const handleExistUser = async (message) => {
      if (message.data.trim() === inputs.password) {
        registerWithSockets("getRole", "", inputs.email, inputs.email, "", "");
      } else {
        setFull(true);
        setWrg("Los datos ingresados no son correctos");
      }
      //const isMatch = await verifyPassword(inputs.password, message.data);
      /*if (isMatch) {
        registerWithSockets(
          "IsOnlineAndTakeAnToken",
          "",
          "",
          inputs.email,
          "",
          ""
        );
      } else {
        setFull(true);
        setWrg("Los datos ingresados no son correctos");
      }*/
    };

    const handleSetRole = (message) => {
      if (message.data.trim() === "GESTOR") {
        window.localStorage.setItem("rol", "GESTOR");
      } else {
        window.localStorage.setItem("rol", "ADMIN");
      }
      registerWithSockets(
        "getHospital",
        "",
        inputs.email,
        inputs.email,
        "",
        ""
      );
    };

    const handleSetHospital = (message) => {
      window.localStorage.setItem("Hospital", message.data.trim());

      registerWithSockets(
        "IsOnlineAndTakeAnToken",
        "",
        "",
        inputs.email,
        "",
        ""
      );
    };

    const handleIsOnlineAndTakeAnToken = (message) => {
      window.localStorage.setItem("token", message.data.trim());
      window.localStorage.setItem("user", inputs.email);
      console.log(rol);
      if (window.localStorage.getItem("rol") === "GESTOR") {
        navigate("/persona");
        window.location.reload();
      } else {
        navigate("/persona");
        window.location.reload();
      }
    };
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid container sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage:
              `url(${loginImage})`,
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
            component="form"
            onSubmit={login}
            onChange={changeForm}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Iniciar Sesion
            </Typography>
            <Box sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Cedula"
                name="email"
                autoComplete="email"
                inputProps={{ maxLength: 40 }}
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Contraseña"
                type="password"
                id="password"
                inputProps={{ maxLength: 20 }}
                autoComplete="current-password"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Iniciar
              </Button>
              <Grid container>
                <Grid item xs>
                </Grid>
                <Grid item xs>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>

      <Snackbar open={full} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} variant="filled" severity="error">
          {wrg}
        </Alert>
      </Snackbar>
    </ThemeProvider>
  );
}
