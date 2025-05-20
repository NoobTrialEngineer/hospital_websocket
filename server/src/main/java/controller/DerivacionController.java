package controller;

import java.io.IOException;
import java.sql.SQLException;
import java.text.ParseException;
import java.util.List;
import java.util.concurrent.CopyOnWriteArrayList;

import javax.swing.text.BadLocationException;
import javax.websocket.OnClose;
import javax.websocket.OnMessage;
import javax.websocket.OnOpen;
import javax.websocket.Session;
import javax.websocket.server.ServerEndpoint;

import org.json.JSONObject;

import model.DerivacionDTO;
import services.DerivacionService;


@ServerEndpoint("/derivacion")
public class DerivacionController {
    private static List<Session> sessions = new CopyOnWriteArrayList<>();

    @OnOpen
    public void onOpen(Session session) {
        sessions.add(session);
        System.out.println("WebSocket opened: " + session.getId());
    }

    @OnMessage
    public void handleMessage(String message, Session session) throws IOException, ParseException, BadLocationException, SQLException {
        System.out.println("Received message: " + message);

        JSONObject json = new JSONObject(message);
        DerivacionService SC = new DerivacionService();
        DerivacionDTO derivacion = new DerivacionDTO();
        String method = json.has("method") ? json.getString("method") : null;
        derivacion.setIdCama(json.has("idCama") ? json.getString("idCama") : null);
        derivacion.setHosNombre(json.has("hosNombre") ? json.getString("hosNombre") : null);
        derivacion.setPerCedula(json.has("perCedula") ? json.getString("perCedula") : null);
        derivacion.setDevEstado(json.has("devEstado") ? json.getString("devEstado") : null);
        derivacion.setDevFechaEntrada(json.has("devFechaEntrada") ? json.getString("devFechaEntrada") : null);
        derivacion.setDevFechaSalida(json.has("devFechaSalida") ? json.getString("devFechaSalida") : null);

        String response = "";
        switch(method) {
            case "Get":
                response = SC.GetDerivanPorHospital(derivacion);
                break;
            case "Post":
                response = SC.AddDerivan(derivacion);
                break;
            case "Update":
                response = SC.UpdateDerivan(derivacion);
                break;
            case "Delete":
                response = SC.DeleteDerivan(derivacion);
                break;
            case "DarAlta":
            	response = SC.DarAlta(derivacion);
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
