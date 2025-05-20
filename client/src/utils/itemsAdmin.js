import React from "react";
import { NavLink } from "react-router-dom";
import {
  UserOutlined,
  FontColorsOutlined,
  SmileOutlined,
  HeartOutlined,
  BookOutlined,
  HomeOutlined,
  AntDesignOutlined,
  LogoutOutlined,
  ExperimentOutlined,
  SisternodeOutlined,
  SendOutlined,
  TeamOutlined,
  DatabaseOutlined,
} from "@ant-design/icons";
import { Button } from "antd";

function getItem(label, key, icon) {
  return {
    icon,
    key,
    label,
  };
}

const logout = () => {
  localStorage.removeItem("token");
  window.location.href = "/";
};

const itemsAdmin = [
  getItem(
    "Personas",
    "1",
    <NavLink to={"/persona"}>
      {" "}
      <UserOutlined />{" "}
    </NavLink>,
  ),
  getItem(
    "Pacientes",
    "2",
    <NavLink to={"/paciente"}>
      {" "}
      <HeartOutlined />{" "}
    </NavLink>,
  ),
  /*getItem(
    "Ganadores",
    "3",
    <NavLink to={"/winner"}>
      {" "}
      <SmileOutlined />{" "}
    </NavLink>,
  ),*/
  getItem(
    "Zonas",
    "3",
    <NavLink to={"/zona"}>
      {" "}
      <HomeOutlined />{" "}
    </NavLink>,
  ),
  getItem(
    "Camas",
    "4",
    <NavLink to={"/cama"}>
      {" "}
      <SisternodeOutlined />{" "}
    </NavLink>,
  ), 
  getItem(
    "Derivar",
    "5",
    <NavLink to={"/derivar"}>
      {" "}
      <SendOutlined />{" "}
    </NavLink>,
  ),

  getItem(
    "Nuestros Pacientes",
    "6",
    <NavLink to={"/nuestrospacientes"}>
      {" "}
      <TeamOutlined />{" "}
    </NavLink>,
  ),

  getItem(
    "Historial",
    "7",
    <NavLink to={"/historia"}>
      {" "}
      <DatabaseOutlined />{" "}
    </NavLink>,
  ),
  /*getItem(
    "Acceso",
    "6",
    <NavLink to={"/admin"}>
      {" "}
      <AntDesignOutlined />{" "}
    </NavLink>,
  ),*/
  getItem(
    "Salir",
    "8",
    <NavLink onClick={logout} style={{ color: 'red' }}> 
      <LogoutOutlined style={{ color: 'red' }} /> 
    </NavLink>,
  ),
];

export default itemsAdmin;