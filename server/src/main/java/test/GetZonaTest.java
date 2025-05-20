package test;

import java.sql.SQLException;

import javax.swing.text.BadLocationException;

import Server.ZonaSocket;

public class GetZonaTest {
    public static void main( String[] args ) throws BadLocationException, SQLException
    {
        //Datos (Nada)
        ZonaSocket admin = new ZonaSocket();
        //Procedimiento
        String data = admin.GetZonas();
        //Reporte
        System.out.println(data);
    }
}
