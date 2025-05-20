package test;

import java.sql.SQLException;

import db.ConexionDB;

public class ConectionTest {
    public static void main( String[] args ) throws SQLException
    {
        //Datos
        ConexionDB C = new ConexionDB();
        //Procedimiento
        C.conex();
        //Reporte ([Servidor BD] Conexión establecida)
        
    }
}
