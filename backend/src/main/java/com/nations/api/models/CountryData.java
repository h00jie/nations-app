package com.nations.api.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CountryData {
    private String continentName ;
    private String regionName;
    private String countryName;
    private Integer year;
    private Integer population;
    private Double gdp;
}
