package model;

public class PacienteDTO {
    String cedula;
    String idZona;
    String historial;

    public PacienteDTO(String cedula, String idZona, String historial) {
        this.cedula = cedula;
        this.idZona = idZona;
        this.historial = historial;
    }

    public PacienteDTO() {
    }

    public String getCedula() {
        return cedula;
    }

    public void setCedula(String cedula) {
        this.cedula = cedula;
    }

    public String getIdZona() {
        return idZona;
    }

    public void setIdZona(String idZona) {
        this.idZona = idZona;
    }

    public String getHistorial() {
        return historial;
    }

    public void setHistorial(String historial) {
        this.historial = historial;
    }

    
}
