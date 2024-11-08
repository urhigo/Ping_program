package com.example.demo.service.exception;

import org.apache.el.stream.Stream;

import java.util.Arrays;

public class IpWrongFormException extends Throwable {

    public void controlParam(String ip) throws CustomException {
        String[] arrayParam = ip.split("\\.");
        try {
            Arrays.stream(arrayParam).forEach(param -> {
                Integer.parseInt(param);
            });
        } catch (NumberFormatException e){
            throw new CustomException("Write ip again. You create exception!");
        }


        Arrays.stream(arrayParam).forEach(param -> {
            if(Integer.parseInt(param) < 0 || Integer.parseInt(param) > 255){
                try {
                    throw new CustomException("Write ip again. You create exception!");
                } catch (CustomException e) {
                    throw new RuntimeException(e);
                }
            }
        });

    }
}

