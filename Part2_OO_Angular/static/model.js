const model = (weatherData, forecastData) => {

    function getLatestDataOfEachType(fromDate, toDate) {
        // First as baseline
        let latestPrecipitation = weatherData.find(wd => is(wd, "precipitation"))
        let latestTemperature = weatherData.find(wd => is(wd, "temperature"))
        let latestWindSpeed = weatherData.find(wd => is(wd, "wind speed"))
        let latestCloudCoverage = weatherData.find(wd => is(wd, "cloud coverage"))

        // Seperate the data
        weatherData.forEach(wd => {
            let inDateInterval = intervalOverlaps(wd, fromDate, toDate)      
            if (is(wd, "precipitation") && latestPrecipitation.time < wd.time && inDateInterval) {
                latestPrecipitation = wd
            } else if (is(wd, "temperature") && latestTemperature.time < wd.time && inDateInterval) {
                latestTemperature = wd
            } else if (is(wd, "wind speed") && latestWindSpeed.time < wd.time && inDateInterval) {
                latestWindSpeed = wd     
            } else if (is(wd, "cloud coverage") && latestCloudCoverage.time < wd.time && inDateInterval) {
                latestCloudCoverage = wd     
            }
        })
        
        return { latestPrecipitation, latestTemperature, latestWindSpeed, latestCloudCoverage }
    }

    function getMinTemperature(fromDate, toDate) {
        let minTemperature = weatherData.filter(wd => is(wd, "temperature") && intervalOverlaps(wd, fromDate, toDate))
        
        if (minTemperature.length == 0) {
            return { minTemperature: "" }
        }

        let weatherDataWithMinTemperature = minTemperature.reduce((pre, cur) => {
            let t1 = pre["value"]
            let t2 = cur["value"]

            return t1 < t2 ? pre : cur
        })
        return { weatherDataWithMinTemperature }
    }

    function getMaxTemperature(fromDate, toDate) {
        let temperatureFromLast5Days = weatherData.filter(wd => is(wd, "temperature") && intervalOverlaps(wd, fromDate, toDate))
        
        if (temperatureFromLast5Days.length == 0) {
            return { maxTemperature: "" }
        }
        
        let maxTemperature =  temperatureFromLast5Days.reduce((pre, cur) => {
            let t1 = pre["value"]
            let t2 = cur["value"]

            return t1 > t2 ? pre : cur
        })

        return { maxTemperature }
    }

    function getTotalPrecipitation(fromDate, toDate) {
        let totalPrecipitation = weatherData.filter(wd => is(wd, "precipitation") && intervalOverlaps(wd, fromDate, toDate))
                                            .map(wd => wd["value"])
                                            .reduce((previousPrecipitation, currentPrecipitation) => previousPrecipitation + currentPrecipitation, 0)
        return totalPrecipitation.toFixed(1)
    }

    function getAverageWindSpeed(fromDate, toDate) {
        let averageWindSpeed = weatherData.filter(wd => is(wd, "wind speed") && intervalOverlaps(wd, fromDate, toDate))
                                          .map(wd => wd["value"])
                                          .reduce((previousWindSpeed, currentWindSpeed) => previousWindSpeed + currentWindSpeed, 0) / weatherData.length
        return averageWindSpeed.toFixed(1);
    }

    function getAverageCloudCoverage(fromDate, toDate) {
        let averageCloudCoverage = weatherData.filter(wd => is(wd, "cloud coverage") && intervalOverlaps(wd, fromDate, toDate))
                                              .map(wd => wd["value"])
                                              .reduce((previousCloudCoverage, currentCloudCoverage) => previousCloudCoverage + currentCloudCoverage, 0) / weatherData.length
        return averageCloudCoverage.toFixed(1)
    }

    function getDominantWindDirection(fromDate, toDate) {
        let windDirectionsFromLast5Days = weatherData.filter(wd => is(wd, "wind speed") && intervalOverlaps(wd, fromDate, toDate))
                                                     .map(wd => wd["direction"])
        let mostDominantWindDirection = getHighestOccuringElement(windDirectionsFromLast5Days)
        return mostDominantWindDirection
    }

    function getWeatherForecastData(fromDate, toDate) {
        return forecastData.filter(forecast => intervalOverlaps(forecast, fromDate, toDate))
    }

    function addWeatherDataReport(newWeatherData) {
        /*addValueToKey(weatherDataMap, newWeatherData.place, newWeatherData)
        if (is(weatherData, "temperature")) {
            minimumTemperatureData.push(weatherData)
        } */
    }

    function getHighestOccuringElement(weatherDataArray) {
        if (weatherDataArray.length == 0) {
            return null;
        }

        let occuranceMap = { };
        let mostCommonElement = weatherDataArray[0], maxCount = 1;
        for (let i = 0; i < weatherDataArray.length; i++)
        {
            let currentWeatherData = weatherDataArray[i];
        
            if (occuranceMap[currentWeatherData] == null) {
                occuranceMap[currentWeatherData] = 1;
            } else {
                occuranceMap[currentWeatherData]++; 
            }  
            if (occuranceMap[currentWeatherData] > maxCount) {
                mostCommonElement = currentWeatherData;
                maxCount = occuranceMap[currentWeatherData];
            }
        }
        
        return mostCommonElement;
    }

    function addValueToKey(map, key, value) {
        map[key] = map[key] || [];
        map[key].push(value);
    }

    function intervalOverlaps(data, fromDate, toDate) {
        let weatherDataDate = new Date(data.time)
        return weatherDataDate >= fromDate && weatherDataDate <= toDate
    }

    function is(weatherData, type) {
        return weatherData["type"] == type
    } 

    return { getLatestDataOfEachType, getMinTemperature, getMaxTemperature, 
             getTotalPrecipitation, getAverageWindSpeed, getAverageCloudCoverage, 
             getDominantWindDirection, getWeatherForecastData, addWeatherDataReport }
}

export default model
