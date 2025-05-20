package Server;

import java.io.IOException;
import java.security.Key;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.List;
import java.util.Vector;
import java.util.concurrent.CopyOnWriteArrayList;

import javax.swing.text.BadLocationException;
import javax.websocket.server.ServerEndpoint;

import org.json.JSONArray;
import org.json.JSONObject;

import db.ConexionDB;

import javax.websocket.OnClose;
import javax.websocket.OnMessage;
import javax.websocket.OnOpen;
import javax.websocket.Session;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;


@ServerEndpoint("/users")
public class WebSocketUsuarios {

	    private static List<Session> sessions = new CopyOnWriteArrayList<>();
	    private static final Key key = Keys.secretKeyFor(SignatureAlgorithm.HS256);
	    private ConexionDB C = new ConexionDB();
	    private Connection CC;

	    public WebSocketUsuarios() throws BadLocationException {
	        try 
	        {
	        	this.CC = C.conex();
	        } catch (SQLException e)
	        {
                e.printStackTrace();
            }
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
	        String name = json.has("per_cedula") ? json.getString("per_cedula") : null;
	        String token = json.has("token") ? json.getString("token") : null;

	        String response = "";
	        switch(method) {
	            case "ExistUser":
	                response = ExistUser(name);
	                break;
	            case "getRole":
	                response = getRole(name);
	                break;
	            case "getHospital":
	                response = getHospital(name);
	                break;
	            case "IsOnlineAndTakeAnToken":
	                response = TakeAnToken(name);
	                break;
	            case "IsTokenValid":
	                response = IsTokenValid(token);
	                break;
	            case "GetUsers":
	                response = GetUsers();
	                break;
	        }
	        
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
    
    
    
    public String getRole(String adm_usuario) {     
    	try{
    	String exist = "SELECT ADM_CARGO FROM ADMINISTRADOR WHERE TRIM(PER_CEDULA) = TRIM(?)";
    	PreparedStatement st = CC.prepareStatement(exist);
    	st.setString(1, adm_usuario);
	    ResultSet rs = st.executeQuery();
	    if (rs.next()) { 
	        String adm_cargo = rs.getString("ADM_CARGO");
	            return adm_cargo;
	    }
    } catch (SQLException ex) {
         System.out.println(""+ex.getMessage());
         ex.printStackTrace();
         return "No se pudo obtener el cargo";
    }
    return "No se logro obtener el cargo";
    }
    
    public String getHospital(String adm_usuario) {     
    	try{
    	String exist = "SELECT HOS_NOMBRE FROM ADMINISTRADOR WHERE TRIM(PER_CEDULA) = TRIM(?)";
    	PreparedStatement st = CC.prepareStatement(exist);
    	st.setString(1, adm_usuario);
	    ResultSet rs = st.executeQuery();
	    if (rs.next()) { 
	        String adm_cargo = rs.getString("HOS_NOMBRE");
	            return adm_cargo;
	    }
    } catch (SQLException ex) {
         System.out.println(""+ex.getMessage());
         ex.printStackTrace();
         return "No se pudo obtener el hospital";
    }
    return "No se logro obtener el hospital";
    }
    
    public String ExistUser(String adm_usuario) {     
    	try{
    	String exist = "SELECT COUNT(*) AS login, \r\n"
    			+ "       GROUP_CONCAT(ADM_CONTRASENA ORDER BY ADM_CONTRASENA SEPARATOR '') AS password \r\n"
    			+ "FROM ADMINISTRADOR \r\n"
    			+ "WHERE TRIM(PER_CEDULA) = TRIM(?)";
    	PreparedStatement st = CC.prepareStatement(exist);
    	st.setString(1, adm_usuario);
	    ResultSet rs = st.executeQuery();
	    if (rs.next()) { 
	        int count = rs.getInt("LOGIN");
	        String password = rs.getString("password");
	        if (count > 0) {
	            return password;
	        } else if (count == 0) {
	        	return "Correo incorrecto";
	        }
	    }
    } catch (SQLException ex) {
         System.out.println(""+ex.getMessage());
         ex.printStackTrace();
         return "No se obtener el usuario";
    }
    return "No se logro obtener el usuario";
    }
    
    public String TakeAnToken(String email) {     
	    String token = GenerateJWT(email);
	    return token;
    }
    
    public static String GenerateJWT(String subject) {
        String jwt = Jwts.builder()
                    .setSubject(subject)
                    .signWith(key)
                    .compact();

        return jwt;
    }
    
    public static String IsTokenValid(String token) {
        System.out.println("\n\nToken: " + token);
        try {
            Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token);
            return "true";
        } catch (MalformedJwtException e) {
            System.out.println("El token está mal formado.");
            e.printStackTrace();
        } catch (Exception e) {
            System.out.println("Error al validar el token.");
            e.printStackTrace();
        }
        return "false";
    }

    
    public String GetUsers() {
        Vector<Vector<String>> users = new Vector<Vector<String>>();

        try {
            String consulta = "SELECT name, lastname, email, online FROM Users";
            Statement st = CC.createStatement();
            ResultSet rs = st.executeQuery(consulta);

            while (rs.next()) {
                Vector<String> user = new Vector<String>();
                user.addElement(rs.getString("name"));
                user.addElement(rs.getString("lastname"));
                user.addElement(rs.getString("email"));
                user.addElement(rs.getString("online"));
                users.addElement(user);
            }

        } catch (Exception e) {
            e.printStackTrace();
        }
        String usersParsed = VectorToString(users);
        broadcastMessage(usersParsed);
        return usersParsed;
    }
    
    public String VectorToString(Vector<Vector<String>> data) {
    	JSONArray jsonArray = new JSONArray();

        for (Vector<String> fila : data) {
            JSONArray filaArray = new JSONArray();
            for (String valor : fila) {
                filaArray.put(valor);
            }
            jsonArray.put(filaArray);
        }
        JSONObject jsonObject = new JSONObject();
        jsonObject.put("data", jsonArray);

        String response = jsonObject.toString();
        return response;
    }
    
}