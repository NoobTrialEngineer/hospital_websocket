package model;

public class AdministradorDTO {
    String perCedula;
    String hosNombre;
    String admUsuario;
    String admContrasena;
    String admCargo;

    public AdministradorDTO(String perCedula, String hosNombre, String admUsuario, String admContrasena, String admCargo) {
        this.perCedula = perCedula;
        this.hosNombre = hosNombre;
        this.admUsuario = admUsuario;
        this.admContrasena = admContrasena;
        this.admCargo = admCargo;
    }

    public AdministradorDTO() {
    }

    public String getPerCedula() {
        return perCedula;
    }

    public void setPerCedula(String perCedula) {
        this.perCedula = perCedula;
    }

    public String getHosNombre() {
        return hosNombre;
    }

    public void setHosNombre(String hosNombre) {
        this.hosNombre = hosNombre;
    }

    public String getAdmUsuario() {
        return admUsuario;
    }

    public void setAdmUsuario(String admUsuario) {
        this.admUsuario = admUsuario;
    }

    public String getAdmContrasena() {
        return admContrasena;
    }

    public void setAdmContrasena(String admContrasena) {
        this.admContrasena = admContrasena;
    }

    public String getAdmCargo() {
        return admCargo;
    }

    public void setAdmCargo(String admCargo) {
        this.admCargo = admCargo;
    }
}
