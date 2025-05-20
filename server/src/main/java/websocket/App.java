package websocket;

import org.glassfish.tyrus.server.Server;

import Server.PacienteSocket;
import Server.PersonaSocket;
import Server.WebSocketUsuarios;
import Server.ZonaSocket;
import controller.AdministradorController;
import controller.CamaController;
import controller.DerivacionController;
import controller.EspecialidadController;
import controller.HospitalController;

/**
 * Hello world!
 *
 */
public class App 
{
    public static void main( String[] args )
    {
    	final int PORT = 666;

        final String PATH = "/websocket";

        Server server = new Server(null, PORT, PATH, null, WebSocketUsuarios.class,
        		                                           ZonaSocket.class, 
        		                                           PersonaSocket.class, 
        		                                           HospitalController.class, 
        		                                           AdministradorController.class,
        		                                           CamaController.class,
        		                                           DerivacionController.class,
        		                                           EspecialidadController.class,
        		                                           PacienteSocket.class);

        try {
            server.start();
            System.out.println("Servidor WebSocket iniciado en ws://localhost:" + PORT + PATH);
            System.out.println("Presiona ENTER para detener el servidor...");
            System.in.read();
        } catch (Exception e) {
            System.err.println("Error al iniciar el servidor WebSocket: " + e.getMessage());
        } finally {
            server.stop();
            System.out.println("Servidor WebSocket detenido.");
        }
    }
}
