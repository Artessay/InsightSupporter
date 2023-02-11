package edu.rihong;

import org.apache.http.HttpResponse;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.HttpClientBuilder;
import org.apache.http.util.EntityUtils;
import org.json.JSONObject;

public class Chatbot {
    private static final String API_KEY = System.getenv("OPENAI_API_KEY");

    public static void main(String[] args) {
        String prompt = "What is the capital of France?";
        String response = chatbotResponse(prompt);
        System.out.println("Chatbot: " + response);
    }

    private static String chatbotResponse(String prompt) {
        try {
            HttpClient httpClient = HttpClientBuilder.create().build();
            HttpPost request = new HttpPost("https://api.openai.com/v1/engines/text-davinci-002/completions");
            request.addHeader("Content-Type", "application/json");
            request.addHeader("Authorization", "Bearer " + API_KEY);

            JSONObject requestParams = new JSONObject();
            requestParams.put("prompt", prompt);
            requestParams.put("max_tokens", 1024);
            requestParams.put("n", 1);
            // requestParams.put("stop", null);
            requestParams.put("temperature", 0.5);

            request.setEntity(new StringEntity(requestParams.toString()));

            HttpResponse response = httpClient.execute(request);
            String responseString = EntityUtils.toString(response.getEntity());
            JSONObject responseJson = new JSONObject(responseString);
            return responseJson.getJSONArray("choices").getJSONObject(0).getString("text");
        } catch (Exception e) {
            e.printStackTrace();
            return "Error Occurred";
        }
    }
}
