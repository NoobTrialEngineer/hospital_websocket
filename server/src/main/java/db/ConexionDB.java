package db;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

/**
 * Clase para establecer una conexión con una base de datos Oracle.
 * 
 */
public class ConexionDB {
    Connection con = null;

    public Connection conex() throws SQLException {
        try {
            // Cargar el driver JDBC de MySQL
            Class.forName("com.mysql.cj.jdbc.Driver");
            // Establecer la conexión con la base de datos
            con = DriverManager.getConnection(
                "jdbc:mysql://localhost:3306/hospital", "root", );
            System.out.print("[Servidor BD] Conexión establecida");
        } catch (ClassNotFoundException e) {
            System.out.print("[Servidor BD] No se encontró el controlador JDBC: " + e.getMessage());
            e.printStackTrace();
        } catch (SQLException e) {
            System.out.print("[Servidor BD] No se pudo establecer la conexión: " + e.getMessage());
            throw e;
        }
        return con;
    }
}

