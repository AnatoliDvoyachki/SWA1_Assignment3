const model = (weatherData, forecastData) => {
    let weatherDataMap = {}
    let forecastDataMap = {}

    let latestDataOfEachType = []
    let minimumTemperatureData = []
    let maximumTemperatureData = []
    let totalPrecipitation
    let averageWindSpeed 
    let averageCloudCoverage
    let dominantWindDirection
    let weatherPredictions = []

    weatherData.forEach(wData => addValueToKey(weatherDataMap, wData.place, wData))
    forecastData.forEach(forecast => addValueToKey(forecastDataMap, forecast.place, forecast))

    latestDataOfEachType = getLatestDataOfEachType(weatherData)
    minimumTemperatureData = getMinTemperature(weatherData)
    maximumTemperatureData = getMaxTemperature(weatherData)
    totalPrecipitation = getTotalPrecipitation(weatherData)
    averageWindSpeed = getAverageWindSpeed(weatherData)
    averageCloudCoverage = getAverageCloudCoverage(weatherData)
    dominantWindDirection = getDominantWindDirection(weatherData)
   
    function getLatestDataOfEachType(weatherDataArray) {
        // First as baseline
        let latestPrecipitation = weatherDataArray.find(weatherData => is(weatherData, "precipitation"))
        let latestTemperature = weatherDataArray.find(weatherData => is(weatherData, "temperature"))
        let latestWindSpeed = weatherDataArray.find(weatherData => is(weatherData, "wind speed"))
        let latestCloudCoverage = weatherDataArray.find(weatherData => is(weatherData, "cloud coverage"))

        // Seperate the data
        weatherDataArray.forEach(weatherData => {
            if (is(weatherData, "precipitation") && latestPrecipitation.time < weatherData.time) {
                latestPrecipitation = weatherData
            } else if (is(weatherData, "temperature") && latestTemperature.time < weatherData.time) {
                latestTemperature = weatherData
            } else if (is(weatherData, "wind speed") && latestWindSpeed.time < weatherData.time) {
                latestWindSpeed = weatherData     
            } else if (is(weatherData, "cloud coverage") && latestCloudCoverage.time < weatherData.time) {
                latestCloudCoverage = weatherData     
            }
        })
        
        return { latestPrecipitation, latestTemperature, latestWindSpeed, latestCloudCoverage }
    }

    function getDaysBetween(d1, d2) {
		var diff = Math.abs(d1.getTime() - d2.getTime());
		return diff / (1000 * 60 * 60 * 24);
    };

    function isFromLast5Days(weatherData) {
        let now = new Date()
        let weatherDataDate = new Date(weatherData.time)
        let daysBetween = getDaysBetween(now, weatherDataDate)
        return daysBetween <= 5
    }

    /*function intervalOverlaps(weatherData, fromDate, toDate) {
        let wdDate = weatherData.time
        let d1 = fromDate
        let d2 = toDate
        
        console.log(wdDate)
        console.log(d1)
        console.log(d2)

        console.log(wdDate >= d1 && wdDate <= d2)

        return wdDate >= d1 && wdDate <= d2
*/
        /*fromDate = fromDate == null ? new Date() : new Date(fromDate)
        toDate = toDate == null ? new Date() : new Date(toDate)

        let weatherDataDateTime = new Date(weatherData.time)*/
      /*  let d1 = new Date()
        let d2 = new Date()

        console.log(d1)
        console.log(d2)

        console.log(d1 < d2)

        return d1 > d2*/

   /*     console.log(fromDate)
        console.log(toDate)
*/
        /*let now = new Date()
        let weatherDataDate = new Date(weatherData.time)
        let daysBetween = getDaysBetween(fromDate, toDate)*/
        /*console.log(weatherDataDateTime >= fromDate && weatherDataDateTime <= toDate)
        return weatherDataDateTime >= fromDate && weatherDataDateTime <= toDate*/
        //return daysBetween <= 5
    

    /*function getDaysBetween(d1, d2) {
		var diff = Math.abs(d1.getTime() - d2.getTime());
		return diff / (1000 * 60 * 60 * 24);
    };*/

    function is(weatherData, type) {
        return weatherData["type"] == type
    } 

    function getMinTemperature(weatherDataArray, fromDate, toDate) {
        let temperatureFromLast5Days = weatherDataArray.filter(wd => is(wd, "temperature") && isFromLast5Days(wd))
        
        if (temperatureFromLast5Days.length == 0) {
            return { temperatureFromLast5Days }
        }

        let weatherDataWithMinTemperature = temperatureFromLast5Days.reduce((pre, cur) => {
            let t1 = pre["value"]
            let t2 = cur["value"]

            return t1 < t2 ? pre : cur
        })
        return { weatherDataWithMinTemperature }
    }

    function getMaxTemperature(weatherDataArray) {
        // Find max temperature within last 5 days
        let temperatureFromLast5Days = weatherDataArray.filter(wd => is(wd, "temperature") && isFromLast5Days(wd))
        let maxTemperature =  temperatureFromLast5Days.reduce((pre, cur) => {
            let t1 = pre["value"]
            let t2 = cur["value"]

            return t1 > t2 ? pre : cur
        })

        return { maxTemperature }
    }

    function getTotalPrecipitation(weatherDataArray) {
        // Calculate total precipitaiton
        let totalPrecipitation = weatherDataArray.filter(wd => is(wd, "precipitation") && isFromLast5Days(wd))
                                                 .map(wd => wd["value"])
                                                 .reduce((previousPrecipitation, currentPrecipitation) => previousPrecipitation + currentPrecipitation, 0)
        return totalPrecipitation.toFixed(1)
    }

    function getAverageWindSpeed(weatherDataArray) {
        // Calculate average wind speed
        let averageWindSpeed = weatherDataArray.filter(wd => is(wd, "wind speed") && isFromLast5Days(wd))
                                               .map(wd => wd["value"])
                                               .reduce((previousWindSpeed, currentWindSpeed) => previousWindSpeed + currentWindSpeed, 0) / weatherDataArray.length
        return averageWindSpeed.toFixed(1);
    }

    function getAverageCloudCoverage(weatherDataArray) {
        // Calculate average wind speed
        let averageCloudCoverage = weatherDataArray.filter(wd => is(wd, "cloud coverage") && isFromLast5Days(wd))
                                                   .map(wd => wd["value"])
                                                   .reduce((previousCloudCoverage, currentCloudCoverage) => previousCloudCoverage + currentCloudCoverage, 0) / weatherDataArray.length
        return averageCloudCoverage.toFixed(1)
    }

    function getDominantWindDirection(weatherDataArray) {
        // Estimate dominant wind direction
        let windDirectionsFromLast5Days = weatherDataArray.filter(wd => is(wd, "wind speed") && isFromLast5Days(wd))
                                                          .map(wd => wd["direction"])
        let mostDominantWindDirection = getHighestOccuringElement(windDirectionsFromLast5Days)
        return mostDominantWindDirection
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

    function showLatestWeatherData(cityName = "", fromDate, toDate) {
        latestDataOfEachType = cityName != ""
                               ? getLatestDataOfEachType(weatherDataMap[cityName])
                               : getLatestDataOfEachType(weatherDataMap[Object.keys(weatherDataMap)[0]])

        return latestDataOfEachType
    }

    function showMinimumTemperatureWeatherData(cityName = "", fromDate, toDate) {
        minimumTemperatureData = cityName != ""
                                 ? getMinTemperature(weatherDataMap[cityName], fromDate, toDate)
                                 : getMinTemperature(weatherDataMap[Object.keys(weatherDataMap)[0]])

        return minimumTemperatureData
    }

    function showMaxTemperatureWeatherData(cityName = "") {
        maximumTemperatureData = cityName != ""
                                 ? getMaxTemperature(weatherDataMap[cityName])
                                 : getMaxTemperature(weatherDataMap[Object.keys(weatherDataMap)[0]])

        return maximumTemperatureData
    }

    function showTotalPrecipitation(cityName = "") {
        totalPrecipitation = cityName != ""
                             ? getTotalPrecipitation(weatherDataMap[cityName])
                             : getTotalPrecipitation(weatherDataMap[Object.keys(weatherDataMap)[0]])

        return totalPrecipitation
    }

    function showAverageWindSpeed(cityName = "") {
        averageWindSpeed = cityName != ""
                           ? getAverageWindSpeed(weatherDataMap[cityName])
                           : getAverageWindSpeed(weatherDataMap[Object.keys(weatherDataMap)[0]])

        return averageWindSpeed
    }

    function showAverageCloudCoverage(cityName = "") {
        averageCloudCoverage = cityName != ""
                               ? getAverageCloudCoverage(weatherDataMap[cityName])
                               : getAverageCloudCoverage(weatherDataMap[Object.keys(weatherDataMap)[0]])

        return averageCloudCoverage
    }

    function showDominantWindDirection(cityName = "") {
        dominantWindDirection = cityName != ""
                                ? getDominantWindDirection(weatherDataMap[cityName])
                                : getDominantWindDirection(weatherDataMap[Object.keys(weatherDataMap)[0]])

        return dominantWindDirection
    }

    function showWeatherForecastData(cityName = "") {
        weatherPredictions = cityName != "" 
                            ? forecastDataMap[cityName]
                            : forecastDataMap[Object.keys(forecastDataMap)[0]]

        return weatherPredictions
    }

    function addWeatherDataReport(newWeatherData) {
        addValueToKey(weatherDataMap, newWeatherData.place, newWeatherData)
    }

    return { showLatestWeatherData, showMinimumTemperatureWeatherData, showMaximumTemperatureWeatherData: showMaxTemperatureWeatherData, 
             showTotalPrecipitation, showAverageWindSpeed, showAverageCloudCoverage, 
             showDominantWindDirection, showWeatherForecastData, addWeatherDataReport }
}

export default model
