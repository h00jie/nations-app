package com.nations.api.controller;

import com.nations.api.dto.PageResponse;
import com.nations.api.models.Country;
import com.nations.api.models.CountryData;
import com.nations.api.models.Language;
import com.nations.api.models.Region;
import com.nations.api.service.CountryService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/api/countries")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class CountryController {

    private final CountryService countryService;

    // Task 1: all countries
    @GetMapping
    public List<Country> getAllCountries() {
        return countryService.getAllCountries();
    }

    // Task 1b: languages by country
    @GetMapping("/{id}/languages")
    public List<Language> getLanguages(@PathVariable Integer id) {
        return countryService.getLanguagesByCountry(id);
    }

    @GetMapping("/stats/max-gdp-ratio")
    public Object getCountriesMaxGdpRatio(
            @RequestParam(defaultValue = "0") Integer page,
            @RequestParam(defaultValue = "10") Integer size) {
        return countryService.getCountriesMaxGdpRatioPaginated(page, size);    }

    @GetMapping("/regions")
    public  List<Region> getRegionsList() {
        return countryService.getRegions();
    }

    @GetMapping("/filter")
    public List<CountryData> filter(
            @RequestParam(required = false) Integer regionId,
            @RequestParam(required = false) Integer yearFrom,
            @RequestParam(required = false) Integer yearTo
    ) {
        return countryService.getFiltered(regionId, yearFrom, yearTo);
    }


    @GetMapping("/country-data")
    public PageResponse<CountryData> getFilteredCountryData(
            @RequestParam(required = false) Integer regionId,
            @RequestParam(required = false) Integer yearFrom,
            @RequestParam(required = false) Integer yearTo,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {

        return countryService.getFilteredCountryData(
                regionId, yearFrom, yearTo, page, size);
    }
}
