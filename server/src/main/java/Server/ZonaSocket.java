package Server;

import java.io.IOException;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.List;
import java.util.Vector;
import java.util.concurrent.CopyOnWriteArrayList;

import javax.swing.text.BadLocationException;
import javax.websocket.OnClose;
import javax.websocket.OnMessage;
import javax.websocket.OnOpen;
import javax.websocket.Session;
import javax.websocket.server.ServerEndpoint;

import org.json.JSONArray;
import org.json.JSONObject;

import db.ConexionDB;

@ServerEndpoint("/zona")
public class ZonaSocket {
	private static List<Session> sessions = new CopyOnWriteArrayList<>();
    private ConexionDB C = new ConexionDB();
    private Connection CC;

    public ZonaSocket() throws BadLocationException, SQLException {
        this.CC = C.conex();
    }
    
    @OnOpen
    public void onOpen(Session session) {
        sessions.add(session);
        System.out.println("WebSocket opened: " + session.getId());
    }

    @OnMessage
    public void handleMessage(String message, Session session) throws IOException {
        System.out.println("Received message: " + message);

        JSONObject json = new JSONObject(message);
        String method = json.has("method") ? json.getString("method") : null;
        String idZona = json.has("ID_ZONA") ? json.getString("ID_ZONA") : null;
        String callePrincipal = json.has("ZONA_CALLE_PRINCIPAL") ? json.getString("ZONA_CALLE_PRINCIPAL") : null;
        String calleSecundaria = json.has("ZONA_CALLE_SECUNDARIA") ? json.getString("ZONA_CALLE_SECUNDARIA") : null;
        String referencia = json.has("ZONA_REFERENCIA") ? json.getString("ZONA_REFERENCIA") : null;
        String parroquia = json.has("ZONA_PARROQUIA") ? json.getString("ZONA_PARROQUIA") : null;

        String response = "";
        switch(method) {
            case "Get":
                response = GetZonas();
                break;
            case "Post":
                response = AddZona(idZona, callePrincipal, calleSecundaria, referencia, parroquia);
                break;
            case "Update":
            	System.out.println("PASA");
                response = UpdateZona(idZona, callePrincipal, calleSecundaria, referencia, parroquia);
                break;
            case "Delete":
                response = DeleteZona(idZona);
                break;
        }
        
        broadcastMessage(response);
        session.getBasicRemote().sendText(response);
    }

    @OnClose
    public void onClose(Session session) {
        sessions.remove(session);
        System.out.println("WebSocket closed: " + session.getId());
    }

    public static void broadcastMessage(String message) {
        for (Session session : sessions) {
            try {
                session.getBasicRemote().sendText(message);
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }
    
 // Método para obtener todas las zonas
    public String GetZonas() {
        Vector<Vector<String>> zonas = new Vector<Vector<String>>();

        try {
            String consulta = "SELECT ID_ZONA, ZONA_CALLE_PRINCIPAL, ZONA_CALLE_SECUNDARIA, ZONA_REFERENCIA, ZONA_PARROQUIA FROM ZONA";
            Statement st = CC.createStatement();
            ResultSet rs = st.executeQuery(consulta);

            while (rs.next()) {
                Vector<String> zona = new Vector<String>();
                zona.addElement(rs.getString("ID_ZONA"));
                zona.addElement(rs.getString("ZONA_CALLE_PRINCIPAL"));
                zona.addElement(rs.getString("ZONA_CALLE_SECUNDARIA"));
                zona.addElement(rs.getString("ZONA_REFERENCIA"));
                zona.addElement(rs.getString("ZONA_PARROQUIA"));
                zonas.addElement(zona);
            }

        } catch (Exception e) {
            e.printStackTrace();
        }
        return VectorToString(zonas);
    }

    // Método para agregar una nueva zona
    public String AddZona(String idZona, String callePrincipal, String calleSecundaria, String referencia, String parroquia) {
        try {
            if(ExisteZona(idZona)) {
                return "error";
            }
            String insertQuery = "INSERT INTO ZONA (ID_ZONA, ZONA_CALLE_PRINCIPAL, ZONA_CALLE_SECUNDARIA, ZONA_REFERENCIA, ZONA_PARROQUIA) VALUES (?, ?, ?, ?, ?)";
            PreparedStatement ps = CC.prepareStatement(insertQuery);
            ps.setString(1, idZona);
            ps.setString(2, callePrincipal);
            ps.setString(3, calleSecundaria);
            ps.setString(4, referencia);
            ps.setString(5, parroquia);
            ps.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
            return "{\"error\":\"Error al agregar la zona\"}";
        }
        return GetZonas(); // Retorna la lista actualizada de zonas
    }

    // Método para actualizar los datos de una zona
    public String UpdateZona(String idZona, String callePrincipal, String calleSecundaria, String referencia, String parroquia) {
        try {
            String updateQuery = "UPDATE ZONA SET ZONA_CALLE_PRINCIPAL = ?, ZONA_CALLE_SECUNDARIA = ?, ZONA_REFERENCIA = ?, ZONA_PARROQUIA = ? WHERE ID_ZONA = TRIM(?)";
            PreparedStatement ps = CC.prepareStatement(updateQuery);
            ps.setString(1, callePrincipal);
            ps.setString(2, calleSecundaria);
            ps.setString(3, referencia);
            ps.setString(4, parroquia);
            ps.setString(5, idZona);
            ps.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
            return "{\"error\":\"Error al actualizar la zona\"}";
        }
        return GetZonas(); 
    }

    // Método para eliminar una zona
    public String DeleteZona(String idZona) {
        try {
            String deleteQuery = "DELETE FROM ZONA WHERE ID_ZONA = ?";
            PreparedStatement ps = CC.prepareStatement(deleteQuery);
            ps.setString(1, idZona);
            ps.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
            return "{\"error\":\"Error al eliminar la zona\"}";
        }
        return GetZonas(); 
    }

    // Método auxiliar para verificar la existencia de una zona por ID
    public Boolean ExisteZona(String idZona) {
        try {
            String consulta = "SELECT COUNT(*) AS count FROM ZONA WHERE ID_ZONA = ?";
            PreparedStatement st = CC.prepareStatement(consulta);
            st.setString(1, idZona);
            ResultSet rs = st.executeQuery();
            
            if (rs.next()) {
                return rs.getInt("count") > 0;
            }
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }

        return false;
    }
    
    public String VectorToString(Vector<Vector<String>> data) {
        JSONArray jsonArray = new JSONArray();

        for (Vector<String> fila : data) {
            JSONArray filaArray = new JSONArray();
            for (String valor : fila) {
                filaArray.put(valor.trim());
            }
            jsonArray.put(filaArray);
        }
        JSONObject jsonObject = new JSONObject();
        jsonObject.put("data", jsonArray);

        return jsonObject.toString();
    }


}

