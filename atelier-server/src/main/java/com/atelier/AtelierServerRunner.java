package com.atelier;

import spark.Request;
import spark.Response;

import static spark.Spark.get;

public class AtelierServerRunner {

    public static void main(String[] args) {
        get("/", AtelierServerRunner::hello);
    }

    public static String hello(Request request, Response response) {
        return "hello =)";
    }

}
