package com.nations.api;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@MapperScan("com.nations.api.mappers") // Replace with your actual package
public class NationsApplication {

	public static void main(String[] args) {
		SpringApplication.run(NationsApplication.class, args);
	}

}
