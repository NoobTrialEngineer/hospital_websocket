import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import MainPage from "./pages/MainPage";
import PersonaPage from "./pages/PersonaPage";
import ZonaPage from "./pages/ZonaPage";
import HospitalPage from "./pages/HospitalPage";
import AdministradorPage from "./pages/AdministradorPage";
import Header from "./components/Header";
import { Layout, theme } from "antd";
import Footer from "./components/Footer";
import Sider from "./components/Sider";
import items from "./utils/itemsGestor";
import EspecialidadPage from "./pages/EspecialidadPage";
import PacientePage from "./pages/PacientePage";
import CamaPage from "./pages/CamaPage";
import DerivarPage from "./pages/DerivarPage";
import NuestrosPacientesPage from "./pages/NuestrosPacientesPage";
import HistoriaPage from "./pages/HistoriaPage";
import itemsAdmin from "./utils/itemsAdmin";

function App() {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const [isLogin, setIsLogin] = useState("");

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:666/websocket/users");
    ws.onopen = () => {
      console.log("Connected to WebSocket server", "message");
      if (ws.readyState === WebSocket.OPEN) {
        ws.send(
          JSON.stringify({
            method: "IsTokenValid",
            token: window.localStorage.getItem("token"),
          })
        );
      } else {
        console.error("La conexión WebSocket no está abierta aún.");
      }
    };

    ws.onmessage = (event) => {
      console.log("Token correcto: ", event.data);
      setIsLogin(event.data);
    };

    return () => {};
  }, []);

  return (
    <BrowserRouter>
      {isLogin === "true" ? (
        window.localStorage.getItem("rol") === "GESTOR" ? (
          // Layout para GESTOR
          <Layout style={{ minHeight: "100vh" }}>
            <Sider items={items} />
            <Layout>
              <Header />
              <Layout.Content style={{ margin: "0 0px" }}>
                <div
                  style={{
                    padding: 24,
                    minHeight: 360,
                    background: colorBgContainer,
                  }}
                >
                  <Routes>
                    <Route path="/persona" element={<PersonaPage />} />
                    <Route path="/zona" element={<ZonaPage />} />
                    <Route path="/hospital" element={<HospitalPage />} />
                    <Route
                      path="/administrador"
                      element={<AdministradorPage />}
                    />
                    <Route
                      path="/especialidad"
                      element={<EspecialidadPage />}
                    />
                  </Routes>
                </div>
              </Layout.Content>
              <Footer />
            </Layout>
          </Layout>
        ) : (
          <Layout style={{ minHeight: "100vh" }}>
            <Sider items={itemsAdmin} />
            <Layout>
              <Header />
              <Layout.Content style={{ margin: "0 0px" }}>
                <div
                  style={{
                    padding: 24,
                    minHeight: 360,
                    background: colorBgContainer,
                  }}
                >
                  <Routes>
                    <Route path="/persona" element={<PersonaPage />} />
                    <Route path="/zona" element={<ZonaPage />} />
                    <Route path="/paciente" element={<PacientePage />} />
                    <Route path="/cama" element={<CamaPage />} />
                    <Route path="/derivar" element={<DerivarPage />} />
                    <Route
                      path="/nuestrospacientes"
                      element={<NuestrosPacientesPage />}
                    />
                    <Route path="/historia" element={<HistoriaPage />} />
                    {/* Otros posibles Route que sean accesibles para roles que no sean GESTOR */}
                  </Routes>
                </div>
              </Layout.Content>
              <Footer />
            </Layout>
          </Layout>
        )
      ) : (
        // Rutas para usuarios no logueados
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          {/* Otros posibles Route accesibles sin estar logueado */}
        </Routes>
      )}
    </BrowserRouter>
  );
}

export default App;
