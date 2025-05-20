package services;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.TimeZone;
import java.util.Vector;

import javax.swing.text.BadLocationException;

import db.ConexionDB;
import model.DerivacionDTO;

public class DerivacionService {
    private ConexionDB C = new ConexionDB();
    private Connection CC;
    private ConversionService CS = new ConversionService();

    public DerivacionService() throws BadLocationException, SQLException {
        this.CC = C.conex();
    }

    public void Close() {
        try {
            CC.close();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

     public String GetDerivan() {
        Vector<Vector<String>> relaciones = new Vector<>();
        try {
            String consulta = "SELECT * FROM DERIVAN";
            PreparedStatement st = CC.prepareStatement(consulta);
            ResultSet rs = st.executeQuery();

            while (rs.next()) {
                Vector<String> obj = new Vector<>();
                obj.addElement(rs.getString("ID_CAMA"));
                obj.addElement(rs.getString("PER_CEDULA"));
                obj.addElement(rs.getString("DEV_ESTADO"));
                obj.addElement(rs.getString("DEV_FECHA_ENTRADA"));
                obj.addElement(rs.getString("DEV_FECHA_SALIDA"));
                relaciones.addElement(obj);
            }
        } catch (Exception e) {
            e.printStackTrace();
            return "{\"error\":\"Error al recuperar derivaciones\"}";
        }
        return CS.VectorToString(relaciones);
    }
    
    public String GetDerivanPorHospital(DerivacionDTO derivacion) {
        Vector<Vector<String>> relaciones = new Vector<>();
        try {
            String consulta = "SELECT d.* FROM DERIVAN d JOIN CAMA c ON d.ID_CAMA = c.ID_CAMA JOIN HOSPITAL h ON c.HOS_NOMBRE = h.HOS_NOMBRE WHERE h.HOS_NOMBRE = ?";
            PreparedStatement st = CC.prepareStatement(consulta);
            st.setString(1, derivacion.getHosNombre());
            ResultSet rs = st.executeQuery();

            while (rs.next()) {
                Vector<String> obj = new Vector<>();
                
                obj.addElement(rs.getString("ID_CAMA"));
                obj.addElement(rs.getString("PER_CEDULA"));
                obj.addElement(rs.getString("DEV_ESTADO"));
                obj.addElement(rs.getString("DEV_FECHA_ENTRADA"));
                obj.addElement(rs.getString("DEV_FECHA_SALIDA"));
                relaciones.addElement(obj);
            }
        } catch (Exception e) {
            e.printStackTrace();
            return "{\"error\":\"Error al recuperar derivaciones\"}";
        }

        return CS.VectorToString(relaciones);
    }


    public String AddDerivan(DerivacionDTO derivacion) {
        try {
            SimpleDateFormat isoFormat = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'");
            isoFormat.setTimeZone(TimeZone.getTimeZone("UTC"));
            Date date = isoFormat.parse(derivacion.getDevFechaEntrada());
            
            SimpleDateFormat dbFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm");
            String formattedDate = dbFormat.format(date);

            String insertQuery = "INSERT INTO DERIVAN (ID_CAMA, PER_CEDULA, DEV_ESTADO, DEV_FECHA_ENTRADA) \r\n"
            		+ "VALUES (?, ?, ?, STR_TO_DATE(?, '%Y-%m-%d %H:%i'))\r\n"
            		+ "";
            PreparedStatement ps = CC.prepareStatement(insertQuery);
            ps.setString(1, derivacion.getIdCama());
            ps.setString(2, derivacion.getPerCedula());
            ps.setString(3, derivacion.getDevEstado());
            ps.setString(4, formattedDate);
            ps.executeUpdate();
            
            String updateCamaState = "UPDATE CAMA SET CAM_ESTADO = 'Ocupada' WHERE ID_CAMA = ?";
            PreparedStatement psUpdate = CC.prepareStatement(updateCamaState);
            psUpdate.setString(1, derivacion.getIdCama());
            psUpdate.executeUpdate();
            
        } catch (Exception e) {
            e.printStackTrace();
            return "{\"error\":\"Error al agregar derivación\"}";
        }
        return GetDerivan();
    }


    public String UpdateDerivan(DerivacionDTO derivacion) {
        try {
            String updateQuery = "UPDATE DERIVAN SET DEV_ESTADO = ?, DEV_FECHA_ENTRADA = TO_DATE(?, 'YYYY-MM-DD HH24:MI'), DEV_FECHA_SALIDA = TO_DATE(?, 'YYYY-MM-DD HH24:MI') WHERE ID_CAMA = ? AND PER_CEDULA = ?";
            PreparedStatement ps = CC.prepareStatement(updateQuery);
            ps.setString(1, derivacion.getDevEstado());
            ps.setString(2, derivacion.getDevFechaEntrada());
            ps.setString(3, derivacion.getDevFechaSalida());
            ps.setString(4, derivacion.getIdCama());
            ps.setString(5, derivacion.getPerCedula());
            ps.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
            return "{\"error\":\"Error al actualizar derivación\"}";
        }
        return GetDerivan();
    }

    public String DeleteDerivan(DerivacionDTO derivacion) {
        try {
            String deleteQuery = "DELETE FROM DERIVAN WHERE ID_CAMA = ? AND PER_CEDULA = ?";
            PreparedStatement ps = CC.prepareStatement(deleteQuery);
            ps.setString(1, derivacion.getIdCama());
            ps.setString(2, derivacion.getPerCedula());
            ps.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
            return "{\"error\":\"Error al eliminar derivación\"}";
        }
        return GetDerivan(); 
    }
    
    public String DarAlta(DerivacionDTO derivacion) {
        try {

            SimpleDateFormat isoFormat = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'");
            isoFormat.setTimeZone(TimeZone.getTimeZone("UTC"));
            Date dateSalida = isoFormat.parse(derivacion.getDevFechaSalida());

            SimpleDateFormat dbFormat = new SimpleDateFormat("yyyy-MM-dd");
            Date dateEntrada = dbFormat.parse(derivacion.getDevFechaEntrada());

            SimpleDateFormat dbFormatHora = new SimpleDateFormat("yyyy-MM-dd HH:mm");
            String formattedDateSalida = dbFormatHora.format(dateSalida);
            String formattedDateEntrada = dbFormatHora.format(dateEntrada);

            String updateQuery = "UPDATE DERIVAN " +
                    "SET DEV_FECHA_SALIDA = STR_TO_DATE(?, '%Y-%m-%d %H:%i') " + 
                    "WHERE ID_CAMA = ? " +
                    "  AND PER_CEDULA = ? " +
                    "  AND DEV_FECHA_ENTRADA = STR_TO_DATE(?, '%Y-%m-%d %H:%i')";

            PreparedStatement ps = CC.prepareStatement(updateQuery);
            ps.setString(1, formattedDateSalida);
            ps.setString(2, derivacion.getIdCama());
            ps.setString(3, derivacion.getPerCedula());
            ps.setString(4, formattedDateEntrada); 
            ps.executeUpdate();

            String updateCamaState = "UPDATE CAMA SET CAM_ESTADO = 'Libre' WHERE ID_CAMA = ?";
            PreparedStatement psUpdate = CC.prepareStatement(updateCamaState);
            psUpdate.setString(1, derivacion.getIdCama());
            psUpdate.executeUpdate();

        } catch (SQLException | ParseException e) {
            e.printStackTrace();
            return "{\"error\":\"Error al dar alta\"}";
        }
        return GetDerivan();
    }


    public Boolean Existe(DerivacionDTO derivacion) {
        try {
            String consulta = "SELECT COUNT(*) AS count FROM DERIVAN WHERE ID_CAMA = ? AND PER_CEDULA = ? AND DEV_FECHA_ENTRADA = TO_DATE(?, 'YYYY-MM-DD HH24:MI')";
            PreparedStatement st = CC.prepareStatement(consulta);
            st.setString(1, derivacion.getIdCama());
            st.setString(2, derivacion.getPerCedula());
            st.setString(4, derivacion.getDevFechaEntrada());
            ResultSet rs = st.executeQuery();
            
            if (rs.next()) {
                int count = rs.getInt("count");
                if (count > 0) {
                    return true;
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }

        return false;
    }


}
