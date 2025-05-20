package services;

import java.util.Vector;

import org.json.JSONArray;
import org.json.JSONObject;

public class ConversionService {

     public String VectorToString(Vector<Vector<String>> data) {
        JSONArray jsonArray = new JSONArray();

        for (Vector<String> fila : data) {
            JSONArray filaArray = new JSONArray();
            for (String valor : fila) {
                filaArray.put(valor.trim());
            }
            jsonArray.put(filaArray);
        }
        JSONObject jsonObject = new JSONObject();
        jsonObject.put("data", jsonArray);

        return jsonObject.toString();
    }


}
