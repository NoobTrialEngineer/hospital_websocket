package controller;

import java.io.IOException;
import java.sql.SQLException;
import java.util.List;
import java.util.concurrent.CopyOnWriteArrayList;

import javax.swing.text.BadLocationException;
import javax.websocket.OnClose;
import javax.websocket.OnMessage;
import javax.websocket.OnOpen;
import javax.websocket.Session;
import javax.websocket.server.ServerEndpoint;

import org.json.JSONObject;

import model.EspecialidadDTO;
import services.EspecialidadService;

@ServerEndpoint("/especialidad")
public class EspecialidadController {
    private static List<Session> sessions = new CopyOnWriteArrayList<>();

    @OnOpen
    public void onOpen(Session session) {
        sessions.add(session);
        System.out.println("WebSocket opened: " + session.getId());
    }

    @OnMessage
    public void handleMessage(String message, Session session) throws IOException, BadLocationException, SQLException {
        System.out.println("Received message: " + message);

        JSONObject json = new JSONObject(message);
        EspecialidadService ES = new EspecialidadService();
        EspecialidadDTO especialidad = new EspecialidadDTO();
        String method = json.has("method") ? json.getString("method") : null;
        especialidad.setNombre(json.has("nombre") ? json.getString("nombre") : null);
        especialidad.setDescripcion(json.has("descripcion") ? json.getString("descripcion") : null);

        String response = "";
        switch(method) {
            case "Get":
                response = ES.GetEspecialidades();
                break;
            case "Post":
                response = ES.AddEspecialidad(especialidad);
                break;
            case "Update":
                response = ES.UpdateEspecialidad(especialidad);
                break;
            case "Delete":
                response = ES.DeleteEspecialidad(especialidad);
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

    
}
