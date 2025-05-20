package controller;

import java.io.IOException;
import java.sql.SQLException;
import java.util.List;
import java.util.Vector;
import java.util.concurrent.CopyOnWriteArrayList;

import javax.swing.text.BadLocationException;
import javax.swing.text.html.CSS;
import javax.websocket.OnClose;
import javax.websocket.OnMessage;
import javax.websocket.OnOpen;
import javax.websocket.Session;
import javax.websocket.server.ServerEndpoint;

import org.json.JSONObject;

import model.CamaDTO;
import services.CamaService;

@ServerEndpoint("/cama")
public class CamaController {
    private static List<Session> sessions = new CopyOnWriteArrayList<>();


    @OnOpen
    public void onOpen(Session session) {
        sessions.add(session);
        System.out.println("WebSocket opened: " + session.getId());
    }

    @OnMessage
    public void handleMessage(String message, Session session) throws IOException, BadLocationException, SQLException {
        System.out.println("Received message: " + message);
        CamaDTO cama = new CamaDTO();
        JSONObject json = new JSONObject(message);
        String method = json.has("method") ? json.getString("method") : null;
        cama.setIdCama(json.has("idCama") ? json.getString("idCama") : null);
        cama.setEspeNombre(json.has("espeNombre") ? json.getString("espeNombre") : null);
        cama.setHosNombre(json.has("hosNombre") ? json.getString("hosNombre") : null);

        CamaService CS = new CamaService();

        String response = "";
        switch(method) {
            case "Get":
                response = CS.GetCamas();
                break;
            case "Post":
                response = CS.AddCama(cama);
                break;
            case "Update":
                response = CS.UpdateCama(cama);
                break;
            case "Delete":
                response = CS.DeleteCama(cama);
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
