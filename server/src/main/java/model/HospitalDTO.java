package model;

public class HospitalDTO {
    String nombre;
    String idZona;
    String telefono;
    String correo;
    String sitioWeb;

    public HospitalDTO(String nombre, String idZona, String telefono, String correo, String sitioWeb) {
        this.nombre = nombre;
        this.idZona = idZona;
        this.telefono = telefono;
        this.correo = correo;
        this.sitioWeb = sitioWeb;
    }

    public HospitalDTO() {
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getIdZona() {
        return idZona;
    }

    public void setIdZona(String idZona) {
        this.idZona = idZona;
    }

    public String getTelefono() {
        return telefono;
    }

    public void setTelefono(String telefono) {
        this.telefono = telefono;
    }

    public String getCorreo() {
        return correo;
    }

    public void setCorreo(String correo) {
        this.correo = correo;
    }

    public String getSitioWeb() {
        return sitioWeb;
    }

    public void setSitioWeb(String sitioWeb) {
        this.sitioWeb = sitioWeb;
    }

}
