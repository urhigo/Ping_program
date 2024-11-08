package com.example.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class PingForWorkApplication {

	public static void main(String[] args) {
		SpringApplication.run(PingForWorkApplication.class, args);
		try {
			Thread.sleep(60000); // Задержка на 60 секунд
		} catch (InterruptedException e) {
			e.printStackTrace();
		}
	}

}
