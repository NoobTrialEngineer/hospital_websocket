package services;

import java.io.Console;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.Vector;

import javax.swing.text.BadLocationException;

import db.ConexionDB;
import model.AdministradorDTO;

public class AdministradorService {

    private ConexionDB C = new ConexionDB();
    private Connection CC;
    private ConversionService CS = new ConversionService();

    public AdministradorService() throws BadLocationException, SQLException {
        this.CC = C.conex();
    }

    public void Close() {
        try {
            CC.close();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }
   

    public Boolean ExisteAdministrador(AdministradorDTO admin) {
        
        try {
            String consulta = "SELECT COUNT(*) AS count FROM ADMINISTRADOR WHERE PER_CEDULA = ?";
            PreparedStatement st = CC.prepareStatement(consulta);
            st.setString(1, admin.getPerCedula());
            ResultSet rs = st.executeQuery();
            
            if (rs.next()) {
                int count = rs.getInt("count");
                return count > 0;
            }
        } catch (SQLException e) {
            System.out.println("Error al verificar si el administrador existe" + e.getMessage());
            return false;
        }
        return false;
    }
    
    public String GetAdministradores() {
        Vector<Vector<String>> administradores = new Vector<Vector<String>>();

        try {
            String consulta = "SELECT PER_CEDULA, ADM_USUARIO, ADM_CONTRASENA, ADM_CARGO, HOS_NOMBRE FROM ADMINISTRADOR";
            Statement st = CC.createStatement();
            ResultSet rs = st.executeQuery(consulta);

            while (rs.next()) {
                Vector<String> administrador = new Vector<String>();
                administrador.addElement(rs.getString("PER_CEDULA"));
                administrador.addElement(rs.getString("ADM_USUARIO"));
                administrador.addElement(rs.getString("ADM_CONTRASENA"));
                administrador.addElement(rs.getString("ADM_CARGO"));
                administrador.addElement(rs.getString("HOS_NOMBRE"));
                administradores.addElement(administrador);
            }

        } catch (SQLException e) {
            e.printStackTrace();
        }
        return CS.VectorToString(administradores);
    }
    
    public String AddAdministrador(AdministradorDTO admin) {
        try {
            if(ExisteAdministrador(admin)) {
                return "error";
            }
            String insertQuery = "INSERT INTO ADMINISTRADOR (PER_CEDULA, HOS_NOMBRE, ADM_USUARIO, ADM_CONTRASENA, ADM_CARGO) VALUES (?, ?, ?, ?, ?)";
            PreparedStatement ps = CC.prepareStatement(insertQuery);
            ps.setString(1, admin.getPerCedula());
            ps.setString(2, admin.getHosNombre());
            ps.setString(3, admin.getAdmUsuario());
            ps.setString(4, admin.getAdmContrasena());
            ps.setString(5, admin.getAdmCargo()); 
            ps.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
            return "{\"error\":\"Error al agregar el administrador\"}";
        }
        return GetAdministradores();
    }
    
    public String UpdateAdministrador(AdministradorDTO admin) {
        try {
            String updateQuery = "UPDATE ADMINISTRADOR SET HOS_NOMBRE = ?, ADM_USUARIO = ?, ADM_CONTRASENA = ?, ADM_CARGO = ? WHERE PER_CEDULA = ?";
            PreparedStatement ps = CC.prepareStatement(updateQuery);
            ps.setString(1, admin.getHosNombre());
            ps.setString(2, admin.getAdmUsuario());
            ps.setString(3, admin.getAdmContrasena());
            ps.setString(4, admin.getAdmCargo());
            ps.setString(5, admin.getPerCedula());
            ps.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
            return "{\"error\":\"" + e.getMessage() + "\"}";
        }

        return GetAdministradores();
    }
    
    public String DeleteAdministrador(AdministradorDTO admin) {
        try {
            if(!ExisteAdministrador(admin)) {
                return "{\"error\":\"El administrador no existe\"}";
            }
            String deleteQuery = "DELETE FROM ADMINISTRADOR WHERE PER_CEDULA = ?";
            PreparedStatement ps = CC.prepareStatement(deleteQuery);
            ps.setString(1, admin.getPerCedula());
            ps.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
            return "{\"error\":\"Error al eliminar el administrador\"}";
        }
        return GetAdministradores();
    }
}
