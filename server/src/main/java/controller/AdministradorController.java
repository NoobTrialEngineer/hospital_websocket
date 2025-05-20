package controller;

import java.io.IOException;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;
import java.util.concurrent.CopyOnWriteArrayList;

import javax.websocket.server.ServerEndpoint;
import javax.swing.text.BadLocationException;
import javax.websocket.OnClose;
import javax.websocket.OnMessage;
import javax.websocket.OnOpen;
import javax.websocket.Session;

import org.json.JSONObject;

import db.ConexionDB;
import model.AdministradorDTO;
import services.AdministradorService;

@ServerEndpoint("/administrador")
public class AdministradorController {
    private static List<Session> sessions = new CopyOnWriteArrayList<>();
    private ConexionDB C = new ConexionDB();
    private Connection CC;
    
    
    @OnOpen
    public void onOpen(Session session) {
        sessions.add(session);
        System.out.println("WebSocket opened: " + session.getId());
    }

    @OnMessage
    public void handleMessage(String message, Session session) throws IOException, SQLException, BadLocationException {

        System.out.println("Mensaje obtenido: " + message + " de " + session.getId());
        JSONObject json = new JSONObject(message);
        AdministradorDTO admin = new AdministradorDTO();
        String method = json.has("method") ? json.getString("method") : null;
        admin.setPerCedula(json.has("PER_CEDULA") ? json.getString("PER_CEDULA") : null);
        admin.setHosNombre(json.has("HOS_NOMBRE") ? json.getString("HOS_NOMBRE") : null);
        admin.setAdmUsuario(json.has("ADM_USUARIO") ? json.getString("ADM_USUARIO") : null);
        admin.setAdmContrasena(json.has("ADM_CONTRASENA") ? json.getString("ADM_CONTRASENA") : null);
        admin.setAdmCargo(json.has("ADM_CARGO") ? json.getString("ADM_CARGO") : null);

        AdministradorService AS = new AdministradorService();

        String response = "";
        switch(method) {
            case "Get":
                response = AS.GetAdministradores();
                break;
            case "Post":
                response = AS.AddAdministrador(admin);
                break;
            case "Update":
                response = AS.UpdateAdministrador(admin);
                break;
            case "Delete":
                response = AS.DeleteAdministrador(admin);
                break;
            default:
                response = "Método no válido";
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

    public boolean hospitalExists(String hosNombre) {
        String query = "SELECT COUNT(*) FROM HOSPITAL WHERE HOS_NOMBRE = TRIM(?)";
        try (PreparedStatement ps = CC.prepareStatement(query)) {
            ps.setString(1, hosNombre);
            ResultSet rs = ps.executeQuery();
            if (rs.next()) {
                return rs.getInt(1) > 0;
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return false;
    }
}
