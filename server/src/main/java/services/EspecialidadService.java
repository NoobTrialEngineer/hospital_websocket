package services;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.Vector;

import javax.swing.text.BadLocationException;

import db.ConexionDB;
import model.EspecialidadDTO;

public class EspecialidadService {
    
    private ConexionDB C = new ConexionDB();
    private Connection CC;
    private ConversionService CS = new ConversionService();

    public EspecialidadService() throws BadLocationException, SQLException {
        this.CC = C.conex();
    }

    public void Close() {
        try {
            CC.close();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }


    public String GetEspecialidades() {
    	Vector<Vector<String>> relaciones = new Vector<Vector<String>>();
        try {
            String consulta = "SELECT ESPE_NOMBRE, ESPE_DESCRIPCION FROM ESPECIALIDAD";
            Statement st = CC.createStatement();
            ResultSet rs = st.executeQuery(consulta);

            while (rs.next()) {
            	Vector<String> obj = new Vector<String>();
                obj.addElement(rs.getString("ESPE_NOMBRE").trim());
                obj.addElement(rs.getString("ESPE_DESCRIPCION").trim());
                relaciones.addElement(obj);
            }

        } catch (Exception e) {
            e.printStackTrace();
            return "{\"error\":\"Error al recuperar las especialidades\"}";
        }
        return CS.VectorToString(relaciones);
    }

    public String AddEspecialidad(EspecialidadDTO especialidad) {
        try {
        	if(Existe(especialidad)) {
        		return "error";
        	}
            String insertQuery = "INSERT INTO ESPECIALIDAD (ESPE_NOMBRE, ESPE_DESCRIPCION) VALUES (?, ?)";
            PreparedStatement ps = CC.prepareStatement(insertQuery);
            ps.setString(1, especialidad.getNombre());
            ps.setString(2, especialidad.getDescripcion());
            ps.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
            return "{\"error\":\"Error al agregar la especialidad\"}";
        }
        return GetEspecialidades(); // Retorna la lista actualizada de especialidades
    }

    public String UpdateEspecialidad(EspecialidadDTO especialidad) {
        try {
            String updateQuery = "UPDATE ESPECIALIDAD SET ESPE_DESCRIPCION = ? WHERE ESPE_NOMBRE = ?";
            PreparedStatement ps = CC.prepareStatement(updateQuery);
            ps.setString(1, especialidad.getDescripcion());
            ps.setString(2, especialidad.getNombre());
            ps.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
            return "{\"error\":\"Error al actualizar la especialidad\"}";
        }
        return GetEspecialidades();
    }

    public String DeleteEspecialidad(EspecialidadDTO especialidad) {
        try {
            String deleteQuery = "DELETE FROM ESPECIALIDAD WHERE ESPE_NOMBRE = ?";
            PreparedStatement ps = CC.prepareStatement(deleteQuery);
            ps.setString(1, especialidad.getNombre());
            ps.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
            return "{\"error\":\"Error al eliminar la especialidad\"}";
        }
        return GetEspecialidades();
    }

    public Boolean Existe(EspecialidadDTO especialidad) {
        try {
            String consulta = "SELECT COUNT(*) AS count FROM ESPECIALIDAD WHERE ESPE_NOMBRE = ?";
            PreparedStatement st = CC.prepareStatement(consulta);
            st.setString(1, especialidad.getNombre());
            ResultSet rs = st.executeQuery();
            
            if (rs.next()) {
                int count = rs.getInt("count");
                if (count > 0) {
                    return true;
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
            return true;
        }

        return false;
    }
}
