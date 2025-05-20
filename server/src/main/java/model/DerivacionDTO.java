package model;

public class DerivacionDTO {
    String idCama;
    String hosNombre;
    String perCedula;
    String devEstado;
    String devFechaEntrada;
    String devFechaSalida;

    public DerivacionDTO(String idCama, String hosNombre, String perCedula, String devEstado, String devFechaEntrada, String devFechaSalida) {
        this.idCama = idCama;
        this.hosNombre = hosNombre;
        this.perCedula = perCedula;
        this.devEstado = devEstado;
        this.devFechaEntrada = devFechaEntrada;
        this.devFechaSalida = devFechaSalida;
    }

    public DerivacionDTO() {
    }

    public String getIdCama() {
        return idCama;
    }

    public void setIdCama(String idCama) {
        this.idCama = idCama;
    }

    public String getHosNombre() {
        return hosNombre;
    }

    public void setHosNombre(String hosNombre) {
        this.hosNombre = hosNombre;
    }

    public String getPerCedula() {
        return perCedula;
    }

    public void setPerCedula(String perCedula) {
        this.perCedula = perCedula;
    }

    public String getDevEstado() {
        return devEstado;
    }

    public void setDevEstado(String devEstado) {
        this.devEstado = devEstado;
    }

    public String getDevFechaEntrada() {
        return devFechaEntrada;
    }

    public void setDevFechaEntrada(String devFechaEntrada) {
        this.devFechaEntrada = devFechaEntrada;
    }

    public String getDevFechaSalida() {
        return devFechaSalida;
    }

    public void setDevFechaSalida(String devFechaSalida) {
        this.devFechaSalida = devFechaSalida;
    }
}
