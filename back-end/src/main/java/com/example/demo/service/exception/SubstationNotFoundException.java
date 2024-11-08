package com.example.demo.service.exception;

public class SubstationNotFoundException extends RuntimeException {
    public SubstationNotFoundException(long id) {
        super("Could not found the substation with id: " + id);
    }
}
