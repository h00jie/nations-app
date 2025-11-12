package com.nations.api.models;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Language {
    private Integer languageId;
    private String language;
    private Integer countryId;
}