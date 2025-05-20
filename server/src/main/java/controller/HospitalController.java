package controller;

import java.io.IOException;
import java.sql.Connection;
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

import db.ConexionDB;
import model.HospitalDTO;
import services.HospitalService;

@ServerEndpoint("/hospital")
public class HospitalController {
	private static List<Session> sessions = new CopyOnWriteArrayList<>();
    private ConexionDB C = new ConexionDB();
    private Connection CC;

    public HospitalController() throws BadLocationException, SQLException {
        this.CC = C.conex();
    }
    
    @OnOpen
    public void onOpen(Session session) {
        sessions.add(session);
        System.out.println("WebSocket opened: " + session.getId());
    }

    @OnMessage
    public void handleMessage(String message, Session session) throws IOException, BadLocationException, SQLException {
        System.out.println("Received message: " + message);
        HospitalDTO hospital = new HospitalDTO();
        JSONObject json = new JSONObject(message);
        HospitalService service = new HospitalService();
        String method = json.has("method") ? json.getString("method") : null;
        hospital.setNombre(json.has("HOS_NOMBRE") ? json.getString("HOS_NOMBRE") : null);
        hospital.setIdZona(json.has("ID_ZONA") ? json.getString("ID_ZONA") : null);
        hospital.setTelefono(json.has("HOS_TELEFONO") ? json.getString("HOS_TELEFONO") : null);
        hospital.setCorreo(json.has("HOS_CORREO") ? json.getString("HOS_CORREO") : null);
        hospital.setSitioWeb(json.has("HOS_SITIO_WEB") ? json.getString("HOS_SITIO_WEB") : null);

        String response = "";
        switch(method) {
            case "Get":
                response = service.GetHospitales();
                break;
            case "Post":
                response = service.AddHospital(hospital);
                break;
            case "Update":
                response = service.UpdateHospital(hospital);
                break;
            case "Delete":
                response = service.DeleteHospital(hospital);
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

