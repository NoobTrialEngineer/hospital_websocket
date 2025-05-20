package services;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.Vector;

import javax.swing.text.BadLocationException;

import db.ConexionDB;
import model.CamaDTO;

public class CamaService {

    private ConexionDB C = new ConexionDB();
    private Connection CC;
    private ConversionService CS = new ConversionService();

    public CamaService() throws BadLocationException, SQLException {
        this.CC = C.conex();
    }

    public void Close() {
        try {
            CC.close();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

     public String GetCamas() {
    	Vector<Vector<String>> relaciones = new Vector<Vector<String>>();
        try {
            String consulta = "SELECT ID_CAMA, ESPE_NOMBRE, CAM_ESTADO, HOS_NOMBRE FROM CAMA";
            Statement st = CC.createStatement();
            ResultSet rs = st.executeQuery(consulta);

            while (rs.next()) {
            	Vector<String> obj = new Vector<String>();
                obj.addElement(rs.getString("ID_CAMA").trim());
                obj.addElement(rs.getString("ESPE_NOMBRE").trim());
                obj.addElement(rs.getString("CAM_ESTADO").trim());
                obj.addElement(rs.getString("HOS_NOMBRE").trim());
                relaciones.addElement(obj);
            }

        } catch (Exception e) {
            e.printStackTrace();
            return "{\"error\":\"Error al recuperar las camas\"}";
        }
        return CS.VectorToString(relaciones);
    }

    public String AddCama(CamaDTO cama) {
        try {
        	if(Existe(cama)) {
        		return "error";
        	}
            String insertQuery = "INSERT INTO CAMA (ID_CAMA, ESPE_NOMBRE, CAM_ESTADO, HOS_NOMBRE) VALUES (?, ?, 'Libre', ?)";
            PreparedStatement ps = CC.prepareStatement(insertQuery);
            ps.setString(1, cama.getIdCama());
            ps.setString(2, cama.getEspeNombre());
            ps.setString(3, cama.getHosNombre());
            ps.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
            return "{\"error\":\"Error al agregar la cama\"}";
        }
        return GetCamas(); // Retorna la lista actualizada de camas
    }

    public String UpdateCama(CamaDTO cama) {
        try {
            String updateQuery = "UPDATE CAMA SET ESPE_NOMBRE = ? WHERE ID_CAMA = ?";
            PreparedStatement ps = CC.prepareStatement(updateQuery);
            ps.setString(1, cama.getEspeNombre());
            ps.setString(2, cama.getIdCama());
            ps.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
            return "{\"error\":\"Error al actualizar la cama\"}";
        }
        return GetCamas();
    }

    public String DeleteCama(CamaDTO cama) {
        try {
            String deleteQuery = "DELETE FROM CAMA WHERE ID_CAMA = ?";
            PreparedStatement ps = CC.prepareStatement(deleteQuery);
            ps.setString(1, cama.getIdCama());
            ps.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
            return "{\"error\":\"Error al eliminar la cama\"}";
        }
        return GetCamas();
    }
    
    public Boolean Existe(CamaDTO cama) {
        try {
            String consulta = "SELECT COUNT(*) AS count FROM CAMA WHERE ID_CAMA = ?";
            PreparedStatement st = CC.prepareStatement(consulta);
            st.setString(1, cama.getIdCama());
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
