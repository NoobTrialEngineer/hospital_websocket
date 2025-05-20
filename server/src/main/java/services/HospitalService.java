package services;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.Vector;

import javax.swing.text.BadLocationException;

import db.ConexionDB;
import model.HospitalDTO;

public class HospitalService {
    private ConexionDB C = new ConexionDB();
    private Connection CC;
    private ConversionService CS = new ConversionService();

    public HospitalService() throws BadLocationException, SQLException {
        this.CC = C.conex();
    }

    public void Close() {
        try {
            CC.close();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    public String GetHospitales() {
        Vector<Vector<String>> hospitales = new Vector<Vector<String>>();

        try {
            String consulta = "SELECT HOS_NOMBRE, ID_ZONA, HOS_TELEFONO, HOS_CORREO, HOS_SITIO_WEB FROM HOSPITAL";
            Statement st = CC.createStatement();
            ResultSet rs = st.executeQuery(consulta);

            while (rs.next()) {
                Vector<String> hospital = new Vector<String>();
                hospital.addElement(rs.getString("HOS_NOMBRE"));
                hospital.addElement(rs.getString("ID_ZONA"));
                hospital.addElement(rs.getString("HOS_TELEFONO"));
                hospital.addElement(rs.getString("HOS_CORREO"));
                hospital.addElement(rs.getString("HOS_SITIO_WEB"));
                hospitales.addElement(hospital);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return CS.VectorToString(hospitales);
    }

    public String AddHospital(HospitalDTO hospital) {
        try {
        	if(ExisteHospital(hospital)) {
                return "error";
            }
            String insertQuery = "INSERT INTO HOSPITAL (HOS_NOMBRE, ID_ZONA, HOS_TELEFONO, HOS_CORREO, HOS_SITIO_WEB) VALUES (?, ?, ?, ?, ?)";
            PreparedStatement ps = CC.prepareStatement(insertQuery);
            ps.setString(1, hospital.getNombre());
            ps.setString(2, hospital.getIdZona());
            ps.setString(3, hospital.getTelefono());
            ps.setString(4, hospital.getCorreo());
            ps.setString(5, hospital.getSitioWeb());
            ps.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
            return "{\"error\":\"Error al agregar el hospital\"}";
        }
        return GetHospitales();
    }

    public String UpdateHospital(HospitalDTO hospital) {
        try {
            String updateQuery = "UPDATE HOSPITAL SET ID_ZONA = ?, HOS_TELEFONO = ?, HOS_CORREO = ?, HOS_SITIO_WEB = ? WHERE HOS_NOMBRE = ?";
            PreparedStatement ps = CC.prepareStatement(updateQuery);
            ps.setString(1, hospital.getIdZona());
            ps.setString(2, hospital.getTelefono());
            ps.setString(3, hospital.getCorreo());
            ps.setString(4, hospital.getSitioWeb());
            ps.setString(5, hospital.getNombre());
            ps.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
            return "{\"error\":\"Error al actualizar el hospital\"}";
        }
        return GetHospitales();
    }

    public String DeleteHospital(HospitalDTO hospital) {
        try {
            String deleteQuery = "DELETE FROM HOSPITAL WHERE HOS_NOMBRE = ?";
            PreparedStatement ps = CC.prepareStatement(deleteQuery);
            ps.setString(1, hospital.getNombre());
            ps.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
            return "{\"error\":\"Error al eliminar el hospital\"}";
        }
        return GetHospitales();
    }
    
    public Boolean ExisteHospital(HospitalDTO hospital) {
        try {
            String consulta = "SELECT COUNT(*) AS count FROM HOSPITAL WHERE HOS_NOMBRE = ?";
            PreparedStatement st = CC.prepareStatement(consulta);
            st.setString(1, hospital.getNombre());
            ResultSet rs = st.executeQuery();
            
            if (rs.next()) {
                int count = rs.getInt("count");
                return count > 0;
            }
        } catch (SQLException e) {
            e.printStackTrace();
            return false;
        }

        return false;
    }
}
