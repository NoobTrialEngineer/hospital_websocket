import React from "react";
import { Layout, theme } from "antd";

const Header = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <Layout.Header
  style={{
    padding: '0 24px', // Espacio horizontal para no pegar el contenido a los bordes.
    background: '#002041', // Un gris claro, suave para la vista.
    boxShadow: '0 2px 8px #011429', // Sombra sutil para profundidad.
    lineHeight: '64px', // Altura de línea para centrar verticalmente el texto.
    fontSize: '40px', // Tamaño del texto para mejorar legibilidad.
    color: '#CFD4DB', // Color de texto para contraste.
    fontFamily: '"Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif', // Fuente moderna y legible.
    letterSpacing: '0.01em', // Espaciado entre letras.
    display: 'flex', // Habilita flexbox para el contenedor.
    justifyContent: 'center', // Centra el contenido horizontalmente.
    alignItems: 'center', // Centra el contenido verticalmente (combinado con lineHeight).
    height: '64px', // Asegura una altura consistente del header.
  }}
>
  {window.localStorage.getItem("Hospital")}
</Layout.Header>

  );
};

export default Header;