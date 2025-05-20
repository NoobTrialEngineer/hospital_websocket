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

@ServerEndpoint("/paciente")
public class PacienteSocket {
    private static List<Session> sessions = new CopyOnWriteArrayList<>();
    private ConexionDB C = new ConexionDB();
    private Connection CC;

    public PacienteSocket() throws  BadLocationException, SQLException {
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
        String cedula = json.has("cedula") ? json.getString("cedula") : null;
        String idZona = json.has("idZona") ? json.getString("idZona") : null;
        String historial = json.has("historial") ? json.getString("historial") : null;

        String response = "";
        switch(method) {
            case "Get":
                response = GetPacientes();
                break;
            case "Post":
                response = AddPaciente(cedula, idZona, historial);
                break;
            case "Update":
                response = UpdatePaciente(cedula, idZona, historial);
                break;
            case "Delete":
                response = DeletePaciente(cedula);
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
    
    public String GetPacientes() {
        Vector<Vector<String>> pacientes = new Vector<Vector<String>>();
        try {
            String consulta = "SELECT PER_CEDULA, ID_ZONA, PAC_HISTORIAL FROM PACIENTE";
            Statement st = CC.createStatement();
            ResultSet rs = st.executeQuery(consulta);

            while (rs.next()) {
                Vector<String> paciente = new Vector<String>();
                paciente.addElement(rs.getString("PER_CEDULA"));
                paciente.addElement(rs.getString("ID_ZONA"));
                paciente.addElement(rs.getString("PAC_HISTORIAL"));
                pacientes.addElement(paciente);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return VectorToString(pacientes);
    }

    public String AddPaciente(String cedula, String idZona, String historial) {
        try {
        	if(Existe(cedula)) {
                return "error";
            }
            String insertQuery = "INSERT INTO PACIENTE (PER_CEDULA, ID_ZONA, PAC_HISTORIAL) VALUES (?, ?, ?)";
            PreparedStatement ps = CC.prepareStatement(insertQuery);
            ps.setString(1, cedula);
            ps.setString(2, idZona);
            ps.setString(3, historial);
            ps.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
            return "{\"error\":\"Error al agregar el paciente\"}";
        }
        return GetPacientes(); 
    }

    public String UpdatePaciente(String cedula, String idZona, String historial) {
        try {
            String updateQuery = "UPDATE PACIENTE SET ID_ZONA = ?, PAC_HISTORIAL = ? WHERE PER_CEDULA = ?";
            PreparedStatement ps = CC.prepareStatement(updateQuery);
            ps.setString(1, idZona);
            ps.setString(2, historial);
            ps.setString(3, cedula);
            ps.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
            return "{\"error\":\"Error al actualizar el paciente\"}";
        }
        return GetPacientes(); 
    }

    public String DeletePaciente(String cedula) {
        try {
            String deleteQuery = "DELETE FROM PACIENTE WHERE PER_CEDULA = ?";
            PreparedStatement ps = CC.prepareStatement(deleteQuery);
            ps.setString(1, cedula);
            ps.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
            return "{\"error\":\"Error al eliminar el paciente\"}";
        }
        return GetPacientes(); 
    }
    
    public String VectorToString(Vector<Vector<String>> data) {
        JSONArray jsonArray = new JSONArray();

        for (Vector<String> fila : data) {
            JSONArray filaArray = new JSONArray();
            for (String valor : fila) {
                if (valor != null) {
                    filaArray.put(valor.trim());
                } else {
                    // Opción 1: Insertar una cadena vacía si el valor es null
                    filaArray.put("");
                    // Opción 2: Insertar un objeto JSON null si prefieres mantener la representación del null
                    // filaArray.put(JSONObject.NULL);
                }
            }
            jsonArray.put(filaArray);
        }
        JSONObject jsonObject = new JSONObject();
        jsonObject.put("data", jsonArray);

        return jsonObject.toString();
    }
    
    public Boolean Existe(String cedula) {
        try {
            String consulta = "SELECT COUNT(*) AS count FROM PACIENTE WHERE PER_CEDULA = ?";
            PreparedStatement st = CC.prepareStatement(consulta);
            st.setString(1, cedula);
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
