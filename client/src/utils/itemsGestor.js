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

const items = [
  getItem(
    "Personas",
    "1",
    <NavLink to={"/persona"}>
      {" "}
      <UserOutlined />{" "}
    </NavLink>,
  ),
  getItem(
    "Hospitales",
    "2",
    <NavLink to={"/hospital"}>
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
    "Administradores",
    "4",
    <NavLink to={"/administrador"}>
      {" "}
      <SmileOutlined />{" "}
    </NavLink>,
  ), 
  getItem(
    "Especialidad",
    "5",
    <NavLink to={"/especialidad"}>
      {" "}
      <ExperimentOutlined />{" "}
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
    "6",
    <NavLink onClick={logout} style={{ color: 'red' }}> 
      <LogoutOutlined style={{ color: 'red' }} /> 
    </NavLink>,
  ),
];

export default items;