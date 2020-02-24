package src.json;

import java.io.FileWriter;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

import org.json.simple.JSONObject;
import org.json.simple.JSONArray;

public class CreateJson {

    public CreateJson(HashMap<Integer, ArrayList<String>> flow) {
        JSONArray nodes = new JSONArray();
        JSONArray edges = new JSONArray();
        JSONArray nodeList = new JSONArray();
        JSONObject currentNode;
        for (Map.Entry<Integer, ArrayList<String>> entry : flow.entrySet()) {
            currentNode = new JSONObject();
            currentNode.put("id:", entry.getKey());
            nodes.add(currentNode);
        }
        writeFile(nodes);
    }

    public void writeFile(JSONArray finished) {
        try (FileWriter file = new FileWriter("webDisplay.json")) {
            file.write("cytoscape({\n");
            file.write("  container: document.getElementById('cy'),\n");
            file.write("  elements {");
            file.write(finished.toJSONString());
            file.write("}, \nlayout: {\n" +
                    "    name: 'grid',\n" +
                    "    rows: 1\n" +
                    "  },\n" +
                    "\n");
            file.write("style: [\n" +
                    "    {\n" +
                    "      selector: 'node',\n" +
                    "      style: {\n" +
                    "        'label': 'data(id)'\n" +
                    "      }\n" +
                    "    }\n" +
                    "  ]\n" +
                    "});");
            file.flush();

        } catch (IOException e) {
            e.printStackTrace();
        }
    }

}