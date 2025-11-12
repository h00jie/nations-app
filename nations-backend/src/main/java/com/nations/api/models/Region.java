package com.nations.api.models;


import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Region {
    private Integer regionId;
    private String name;
    private Integer continentId;
}