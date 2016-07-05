package com.atelier;

import com.google.common.io.CharStreams;
import com.google.gson.Gson;
import spark.Request;
import spark.Response;

import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;

import static spark.Spark.get;
import static spark.Spark.staticFileLocation;

public class AtelierServerRunner {

    public static void main(String[] args) throws IOException {
        new AtelierServerRunner();
    }

    private final String language = "en";
    private final String bundleSrc = "http://localhost:3000/bundles/main.js";

    private final List<String> data = Arrays.asList("113.7", "131.92307692307693", "113.16666666666667",
            "219.52380952380952", "68.17391304347827", "136.5", "164.57894736842104", "50.8235294117647",
            "106.77777777777777", "145.13333333333333", "103.78260869565217", "99.6842105263158", "243.66666666666666",
            "63.111111111111114", "96.8695652173913", "919.4166666666666", "1060.4074074074074", "157.1578947368421",
            "218.04347826086956", "777.95", "51.0", "130.11111111111111", "745.7391304347826", "124.63157894736842",
            "68.70588235294117", "164.1818181818182", "231.25", "83.76470588235294", "72.88888888888889",
            "166.83333333333334", "228.27777777777777", "525.4444444444445", "591.6315789473684", "349.0",
            "134.91304347826087", "182.33333333333334", "182.11764705882354", "67.3", "203.95652173913044",
            "332.89285714285717", "157.22727272727272", "82.43478260869566", "240.8", "174.0", "1277.121951219512",
            "236.80645161290323", "195.15384615384616", "244.34146341463415", "2416.9545454545455", "276.375",
            "293.27536231884056", "179.62295081967213", "222.22058823529412", "664.953125", "1979.25",
            "944.952380952381", "919.2962962962963", "881.2545454545455", "784.8979591836735", "277.40425531914894",
            "198.76", "1180.8648648648648", "91.42857142857143", "266.125", "194.6216216216216", "123.64516129032258",
            "154.65853658536585", "782.9714285714285", "150.1818181818182", "124.91176470588235", "203.82142857142858",
            "192.93617021276594", "176.33333333333334", "190.12962962962962", "901.6052631578947", "107.37837837837837",
            "190.5", "180.88888888888889", "115.39024390243902", "342.77777777777777", "640.8333333333334",
            "88.16666666666667", "105.1875", "175.86363636363637", "32.0", "127.08", "144.0", "177.41176470588235",
            "140.82051282051282", "272.64864864864865", "187.12", "163.13333333333333", "253.2", "135.27777777777777",
            "235.4", "1190.248888888889");

    private final Gson gson = new Gson();

    private final String indexHtml;

    private AtelierServerRunner() throws IOException {
        InputStream indexInputStream = AtelierServerRunner.class.getClassLoader().getResourceAsStream("index.html");
        indexHtml = CharStreams.toString(new InputStreamReader(indexInputStream))
                .replace("${bundleSrc}", bundleSrc)
                .replace("${language}", language);
        staticFileLocation("/public");
        get("/", (request, response) -> indexHtml);
        get("/home", (request, response) -> indexHtml);
        get("/histogram", (request, response) -> indexHtml);
        get("/data", this::data);
    }

    private String data(Request request, Response response) {
        response.type("application/json; charset=utf-8");
        Collections.shuffle(data);
        return gson.toJson(data.subList(0, 32));
    }

}
