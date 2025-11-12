package com.nations.api.mappers;

import com.nations.api.models.*;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

import java.util.List;

@Mapper
public interface CountryMapper {
    List<Country> findAll();
    List<Language> findLanguagesByCountry(Integer countryId);

    /**
     * Count total countries for pagination
     * XML query id: countCountriesMaxGdpRatio
     *
     * @return Total number of countries
     */
    long countCountriesMaxGdpRatio();

    /**
     * Get countries with maximum GDP per population ratio
     * XML query id: findMaxGdpPerPopulation
     *
     * Returns one record per country - the year with the highest GDP/population ratio
     */
    List<CountryStats> findMaxGdpPerPopulation();

    /**
     * Get countries with maximum GDP per population ratio (paginated)
     * XML query id: findMaxGdpPerPopulation
     *
     * @param offset Starting record for pagination
     * @param size Number of records to return
     * @return List of country stats
     */
    List<CountryStats> findMaxGdpPerPopulation(
            @Param("offset") Integer offset,
            @Param("size") Integer size
    );    List<CountryData> findFiltered(Integer regionId, Integer yearFrom, Integer yearTo);

    @Select("SELECT region_id as regionId, name, continent_id as continentId " +
            "FROM regions " +
            "ORDER BY name")
    List<Region> getRegions();

    /**
     * Get filtered and paginated country data
     * XML query id: getFilteredCountryData
     *
     * @param regionId Filter by region (optional)
     * @param yearFrom Filter by minimum year (optional)
     * @param yearTo Filter by maximum year (optional)
     * @param offset Starting record for pagination
     * @param size Number of records to return
     * @return List of country data rows
     */
    List<CountryData> getFilteredCountryData(
            @Param("regionId") Integer regionId,
            @Param("yearFrom") Integer yearFrom,
            @Param("yearTo") Integer yearTo,
            @Param("offset") Integer offset,
            @Param("size") Integer size
    );

    /**
     * Count total records matching the filters
     * XML query id: countFilteredCountryData
     * Used for pagination metadata
     *
     * @param regionId Filter by region (optional)
     * @param yearFrom Filter by minimum year (optional)
     * @param yearTo Filter by maximum year (optional)
     * @return Total number of records
     */
    long countFilteredCountryData(
            @Param("regionId") Integer regionId,
            @Param("yearFrom") Integer yearFrom,
            @Param("yearTo") Integer yearTo
    );
}
