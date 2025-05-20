package test;

import java.sql.SQLException;

import javax.swing.text.BadLocationException;

import services.HospitalService;



public class GetHospitalTest {
    public static void main( String[] args ) throws BadLocationException, SQLException
    {
        //Datos (Nada)
        HospitalService admin = new HospitalService();
        //Procedimiento
        String data = admin.GetHospitales();
        //Reporte
        System.out.println(data);
    }
}
