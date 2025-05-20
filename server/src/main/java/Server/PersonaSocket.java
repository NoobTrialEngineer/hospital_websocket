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

@ServerEndpoint("/persona")
public class PersonaSocket {
	private static List<Session> sessions = new CopyOnWriteArrayList<>();
    private ConexionDB C = new ConexionDB();
    private Connection CC;

    public PersonaSocket() throws BadLocationException, SQLException {
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
        String nombres = json.has("nombres") ? json.getString("nombres") : null;
        String apellidos = json.has("apellidos") ? json.getString("apellidos") : null;
        String telefono = json.has("telefono") ? json.getString("telefono") : null;
        String correo = json.has("correo") ? json.getString("correo") : null;
        String genero = json.has("genero") ? json.getString("genero") : null;

        String response = "";
        switch(method) {
            case "Get":
                response = GetPersonas();
                break;
            case "Post":
                response = AddPersona(cedula, nombres, apellidos, telefono, correo, genero);
                break;
            case "Update":
                response = UpdatePersona(cedula, nombres, apellidos, telefono, correo, genero);
                break;
            case "Delete":
                response = DeletePersona(cedula);
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
    
    public String GetPersonas() {
        Vector<Vector<String>> personas = new Vector<Vector<String>>();

        try {
            String consulta = "SELECT PER_CEDULA, PER_NOMBRES, PER_APELLIDOS, PER_TELEFONO, PER_CORREO, PER_GENERO FROM PERSONA";
            Statement st = CC.createStatement();
            ResultSet rs = st.executeQuery(consulta);

            while (rs.next()) {
                Vector<String> persona = new Vector<String>();
                persona.addElement(rs.getString("PER_CEDULA"));
                persona.addElement(rs.getString("PER_NOMBRES"));
                persona.addElement(rs.getString("PER_APELLIDOS"));
                persona.addElement(rs.getString("PER_TELEFONO"));
                persona.addElement(rs.getString("PER_CORREO"));
                persona.addElement(rs.getString("PER_GENERO"));
                personas.addElement(persona);
            }

        } catch (Exception e) {
            e.printStackTrace();
        }
        return VectorToString(personas);
    }

    public String AddPersona(String cedula, String nombres, String apellidos, String telefono, String correo, String genero) {
        try {
        	if(ExistePersona(cedula)) {
        		return "error";
        	}
            String insertQuery = "INSERT INTO PERSONA (PER_CEDULA, PER_NOMBRES, PER_APELLIDOS, PER_TELEFONO, PER_CORREO, PER_GENERO) VALUES (?, ?, ?, ?, ?, ?)";
            PreparedStatement ps = CC.prepareStatement(insertQuery);
            ps.setString(1, cedula);
            ps.setString(2, nombres);
            ps.setString(3, apellidos);
            ps.setString(4, telefono);
            ps.setString(5, correo);
            ps.setString(6, genero);
            ps.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
            return "{\"error\":\"Error al agregar la persona\"}";
        }
        return GetPersonas(); // Retorna la lista actualizada de personas
    }

    // Método para actualizar los datos de una persona
    public String UpdatePersona(String cedula, String nombres, String apellidos, String telefono, String correo, String genero) {
        try {
            String updateQuery = "UPDATE PERSONA SET PER_NOMBRES = ?, PER_APELLIDOS = ?, PER_TELEFONO = ?, PER_CORREO = ?, PER_GENERO = ? WHERE PER_CEDULA = ?";
            PreparedStatement ps = CC.prepareStatement(updateQuery);
            ps.setString(1, nombres);
            ps.setString(2, apellidos);
            ps.setString(3, telefono);
            ps.setString(4, correo);
            ps.setString(5, genero);
            ps.setString(6, cedula);
            ps.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
            return "{\"error\":\"Error al actualizar la persona\"}";
        }
        return GetPersonas(); 
    }

    // Método para eliminar una persona
    public String DeletePersona(String cedula) {
        try {
            String deleteQuery = "DELETE FROM PERSONA WHERE PER_CEDULA = ?";
            PreparedStatement ps = CC.prepareStatement(deleteQuery);
            ps.setString(1, cedula);
            ps.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
            return "{\"error\":\"Error al eliminar la persona\"}";
        }
        return GetPersonas(); 
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

    public Boolean ExistePersona(String cedula) {
        try {
            String consulta = "SELECT COUNT(*) AS count FROM PERSONA WHERE PER_CEDULA = ?";
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
            return true;
        }

        return false;
    }


    
}

