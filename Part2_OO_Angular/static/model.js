const model = (weatherData, forecastData) => {

    const getLatestDataOfEachType = (fromDate, toDate) => {
        // First as baseline
        let latestPrecipitation = weatherData.find(wd => is(wd, "precipitation"))
        let latestTemperature = weatherData.find(wd => is(wd, "temperature"))
        let latestWindSpeed = weatherData.find(wd => is(wd, "wind speed"))
        let latestCloudCoverage = weatherData.find(wd => is(wd, "cloud coverage"))

        weatherData.forEach(wd => {
            let overlaps = intervalOverlaps(wd, fromDate, toDate)      
            if (is(wd, "precipitation") && latestPrecipitation.time < wd.time && overlaps) {
                latestPrecipitation = wd
            } else if (is(wd, "temperature") && latestTemperature.time < wd.time && overlaps) {
                latestTemperature = wd
            } else if (is(wd, "wind speed") && latestWindSpeed.time < wd.time && overlaps) {
                latestWindSpeed = wd     
            } else if (is(wd, "cloud coverage") && latestCloudCoverage.time < wd.time && overlaps) {
                latestCloudCoverage = wd     
            }
        })
        
        return { latestPrecipitation, latestTemperature, latestWindSpeed, latestCloudCoverage }
    }

    const getMinTemperature = (fromDate, toDate) => {
        let temperatureValues = weatherData.filter(wd => is(wd, "temperature") && intervalOverlaps(wd, fromDate, toDate))
        
        if (temperatureValues.length === 0) {
            return {  }
        }

        let weatherDataWithMinTemperature = temperatureValues.reduce((pre, cur) => {
            let t1 = pre["value"]
            let t2 = cur["value"]

            return t1 < t2 ? pre : cur
        })

        return { weatherDataWithMinTemperature }
    }

    const getMaxTemperature = (fromDate, toDate) => {
        let temperatures = weatherData.filter(wd => is(wd, "temperature") && intervalOverlaps(wd, fromDate, toDate))
        
        if (temperatures.length === 0) {
            return { }
        }

        let maxTemperature = temperatures.reduce((pre, cur) => {
            let t1 = pre["value"]
            let t2 = cur["value"]

            return t1 > t2 ? pre : cur
        })

        return { maxTemperature }
    }

    const getTotalPrecipitation = (fromDate, toDate) => {
        let precipitationValues = weatherData.filter(wd => is(wd, "precipitation") && intervalOverlaps(wd, fromDate, toDate))
                                             .map(wd => wd["value"])

        if (precipitationValues.length == 0) {
            return ""
        }

        let totalPrecipitation = precipitationValues.reduce((previousPrecipitation, currentPrecipitation) => previousPrecipitation + currentPrecipitation, 0)
        return totalPrecipitation.toFixed(1)
    }

    const getAverageWindSpeed = (fromDate, toDate) => {
        let windSpeedValues = weatherData.filter(wd => is(wd, "wind speed") && intervalOverlaps(wd, fromDate, toDate))
                                         .map(wd => wd["value"])
                       
        if (windSpeedValues.length === 0) {
            return ""
        }

        let averageWindSpeed = windSpeedValues.reduce((previousWindSpeed, currentWindSpeed) => previousWindSpeed + currentWindSpeed, 0) / weatherData.length
                                          
        return averageWindSpeed.toFixed(1);
    }

    const getAverageCloudCoverage = (fromDate, toDate) => {
        let cloudCoverageValues = weatherData.filter(wd => is(wd, "cloud coverage") && intervalOverlaps(wd, fromDate, toDate))
                                             .map(wd => wd["value"])
             
        if (cloudCoverageValues.length == 0) {
            return ""
        }

        let averageCloudCoverage = cloudCoverageValues.reduce((previousCloudCoverage, currentCloudCoverage) => previousCloudCoverage + currentCloudCoverage, 0) / weatherData.length
        return averageCloudCoverage.toFixed(1)
    }

    const getDominantWindDirection = (fromDate, toDate) => {
        let windDirectionsFromLast5Days = weatherData.filter(wd => is(wd, "wind speed") && intervalOverlaps(wd, fromDate, toDate))
                                                     .map(wd => wd["direction"])
        return getHighestOccuringElement(windDirectionsFromLast5Days)
    }

    const getWeatherForecastData = (fromDate, toDate) => {
        return forecastData.filter(forecast => intervalOverlaps(forecast, fromDate, toDate))
    }

    const getHighestOccuringElement = weatherDataArray => {
        if (weatherDataArray.length === 0) {
            return null;
        }

        let occuranceMap = { };
        let mostCommonElement = weatherDataArray[0], maxCount = 1;
        for (let i = 0; i < weatherDataArray.length; i++)
        {
            let currentWeatherData = weatherDataArray[i];
        
            if (occuranceMap[currentWeatherData] === null) {
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

    const intervalOverlaps = (data, fromDate, toDate) => {
        let weatherDataDate = new Date(data.time)
        return weatherDataDate >= fromDate && weatherDataDate <= toDate
    }

    const is = (weatherData, type) => {
        return weatherData["type"] === type
    } 

    return { getLatestDataOfEachType, getMinTemperature, getMaxTemperature, 
             getTotalPrecipitation, getAverageWindSpeed, getAverageCloudCoverage, 
             getDominantWindDirection, getWeatherForecastData }
}

export default model
