package com.nations.api.models;

import lombok.*;
import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Country {
    private Integer countryId;
    private String name;
    private Double area;
    private LocalDate nationalDay;
    private String countryCode2;
    private String countryCode3;
    private Integer regionId;
}