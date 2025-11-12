package com.nations.api.models;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CountryStats {
    private String countryCode3;
    private String countryName;
    private Integer year;
    private Long population;
    private Double gdp;
}