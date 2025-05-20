package test;

import java.sql.SQLException;

import javax.swing.text.BadLocationException;

import services.AdministradorService;


public class GetAdministradorTest {
    public static void main( String[] args ) throws BadLocationException, SQLException
    {
        //Datos (Nada)
        AdministradorService admin = new AdministradorService();
        //Procedimiento
        String data = admin.GetAdministradores();
        //Reporte
        System.out.println(data);

    }
}
