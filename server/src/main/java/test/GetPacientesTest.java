package test;

import java.sql.SQLException;

import javax.swing.text.BadLocationException;

import Server.PacienteSocket;

public class GetPacientesTest {
    public static void main( String[] args ) throws BadLocationException, SQLException
    {
        //Datos (Nada)
        PacienteSocket admin = new PacienteSocket();
        //Procedimiento
        String data = admin.GetPacientes();
        //Reporte
        System.out.println(data);
    }
}
