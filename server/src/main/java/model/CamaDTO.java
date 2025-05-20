package model;

public class CamaDTO {
    String idCama;
    String espeNombre;
    String hosNombre;

    public CamaDTO(String idCama, String espeNombre, String hosNombre) {
        this.idCama = idCama;
        this.espeNombre = espeNombre;
        this.hosNombre = hosNombre;
    }

    public CamaDTO() {
    }

    public String getIdCama() {
        return idCama;
    }

    public void setIdCama(String idCama) {
        this.idCama = idCama;
    }

    public String getEspeNombre() {
        return espeNombre;
    }

    public void setEspeNombre(String espeNombre) {
        this.espeNombre = espeNombre;
    }

    public String getHosNombre() {
        return hosNombre;
    }

    public void setHosNombre(String hosNombre) {
        this.hosNombre = hosNombre;
    }

    
}
