package com.nations.api.service;


import com.nations.api.dto.PageResponse;
import com.nations.api.mappers.CountryMapper;
import com.nations.api.models.*;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CountryService {

    @Autowired
    CountryMapper countryMapper;

    public List<Country> getAllCountries() {
        return countryMapper.findAll();
    }

    public List<Language> getLanguagesByCountry(Integer id) {
        return countryMapper.findLanguagesByCountry(id);
    }

    public List<CountryStats> getMaxGdpPerPopulation() {
        return countryMapper.findMaxGdpPerPopulation();
    }

    public PageResponse<CountryStats> getCountriesMaxGdpRatioPaginated(int page, int size) {

        int offset = page * size;

        long totalElements = countryMapper.countCountriesMaxGdpRatio();

        List<CountryStats> content = countryMapper.findMaxGdpPerPopulation(offset, size);

        return new PageResponse<>(content, page, size, totalElements);
    }

    public List<CountryData> getFiltered(Integer regionId, Integer yearFrom, Integer yearTo) {
        return countryMapper.findFiltered(regionId, yearFrom, yearTo);
    }

    public List<Region> getRegions() {
        return countryMapper.getRegions();
    }

    public PageResponse<CountryData> getFilteredCountryData(
            Integer regionId,
            Integer yearFrom,
            Integer yearTo,
            int page,
            int size) {
        int offset = page * size;

        long totalElements = countryMapper.countFilteredCountryData(
                regionId, yearFrom, yearTo);

        List<CountryData> content = countryMapper.getFilteredCountryData(
                regionId, yearFrom, yearTo, offset, size);

        return new PageResponse<>(content, page, size, totalElements);
    }
}
