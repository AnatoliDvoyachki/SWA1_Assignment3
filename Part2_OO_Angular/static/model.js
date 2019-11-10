const model = (weatherData) => {
    let weatherDataMap = {}

    let latestDataOfEachType = []
    let minimumTemperatureData = []
    let maximumTemperatureData = []
    let totalPrecipitation
    let averageWindSpeed 
    let averageCloudCoverage
    let dominantWindDirection

    weatherData.forEach(wd => addValueToKey(wd.place, wd))

    latestDataOfEachType = findLatestDataOfEachType(weatherData)
    minimumTemperatureData = findMinimumTemperature(weatherData)
    maximumTemperatureData = findMaximumTemperature(weatherData)
    totalPrecipitation = getTotalPrecipitation(weatherData)
    averageWindSpeed = getAverageWindSpeed(weatherData)
    averageCloudCoverage = getAverageCloudCoverage(weatherData)
    dominantWindDirection = getDominantWindDirection(weatherData)

    function findLatestDataOfEachType(weatherDataArray) {
        // First as baseline
        let latestPrecipitation = weatherDataArray.find(weatherData => weatherData.type == 'precipitation')
        let latestTemperature = weatherDataArray.find(weatherData => weatherData.type == 'temperature')
        let latestWindSpeed = weatherDataArray.find(weatherData => weatherData.type == 'wind speed')
        let latestCloudCoverage = weatherDataArray.find(weatherData => weatherData.type == 'cloud coverage')

        // Seperate the data
        weatherDataArray.forEach(weatherData => {
            if (weatherData.type == 'precipitation' && latestPrecipitation.time < weatherData.time) {
                latestPrecipitation = weatherData
            } else if (weatherData.type == 'temperature' && latestTemperature.time < weatherData.time) {
                latestTemperature = weatherData
            } else if (weatherData.type == 'wind speed' && latestWindSpeed.time < weatherData.time) {
                latestWindSpeed = weatherData     
            } else if (weatherData.type == 'cloud coverage' && latestCloudCoverage.time < weatherData.time) {
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

    function is(weatherData, type) {
        return weatherData['type'] == type
    } 

    function findMinimumTemperature(weatherDataArray) {
        let temperatureFromLast5Days = weatherDataArray.filter(wd => is(wd, 'temperature') && isFromLast5Days(wd))
        let weatherDataWithMinTemperature = temperatureFromLast5Days.reduce((pre, cur) => {
            let t1 = pre['value']
            let t2 = cur['value']

            return t1 < t2 ? pre : cur
        })
        return { weatherDataWithMinTemperature }
    }

    function findMaximumTemperature(weatherDataArray) {
        // Find max temperature within last 5 days
        let temperatureFromLast5Days = weatherDataArray.filter(wd => is(wd, 'temperature') && isFromLast5Days(wd))
        let weatherDataWithMaxTemperature = temperatureFromLast5Days.reduce((pre, cur) => {
            let t1 = pre['value']
            let t2 = cur['value']

            return t1 > t2 ? pre : cur
        })
        return { weatherDataWithMaxTemperature }
    }

    function getTotalPrecipitation(weatherDataArray) {
        // Calculate total precipitaiton
        let totalPrecipitation = weatherDataArray.filter(wd => is(wd, 'precipitation') && isFromLast5Days(wd))
                                                 .map(wd => wd['value'])
                                                 .reduce((previousPrecipitation, currentPrecipitation) => previousPrecipitation + currentPrecipitation, 0)
        return totalPrecipitation.toFixed(1)
    }

    function getAverageWindSpeed(weatherDataArray) {
        // Calculate average wind speed
        let averageWindSpeed = weatherDataArray.filter(wd => is(wd, 'wind speed') && isFromLast5Days(wd))
                                               .map(wd => wd['value'])
                                               .reduce((previousWindSpeed, currentWindSpeed) => previousWindSpeed + currentWindSpeed, 0) / weatherDataArray.length
        return averageWindSpeed.toFixed(1);
    }

    function getAverageCloudCoverage(weatherDataArray) {
        // Calculate average wind speed
        let averageCloudCoverage = weatherDataArray.filter(wd => is(wd, 'cloud coverage') && isFromLast5Days(wd))
                                                   .map(wd => wd['value'])
                                                   .reduce((previousCloudCoverage, currentCloudCoverage) => previousCloudCoverage + currentCloudCoverage, 0) / weatherDataArray.length
        return averageCloudCoverage.toFixed(1)
    }

    function getDominantWindDirection(weatherDataArray) {
        // Calculate average wind speed
        let windDirectionsFromLast5Days = weatherDataArray.filter(wd => is(wd, 'wind speed') && isFromLast5Days(wd))
                                                          .map(wd => wd['direction'])
        let mostDominantWindDirection = getHighestOccuringElement(windDirectionsFromLast5Days)
        return mostDominantWindDirection
    }

  /*  function getHourlyPredictions(weatherPredictionArray) {
        let table;

        if (cityName == 'Aarhus')
        {
            table = document.getElementById('aarhus_hourly_predictions_table')
        } else if (cityName == 'Copenhagen') {
            table = document.getElementById('copenhagen_hourly_predictions_table')
        } else if (cityName == 'Horsens') {
            table = document.getElementById('horsens_hourly_predictions_table')    
        }

        weatherPredictions.forEach(prediction => appendPredictionToTable(table, prediction))
    }*/

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

    function addValueToKey(key, value) {
        weatherDataMap[key] = weatherDataMap[key] || [];
        weatherDataMap[key].push(value);
    }

    const showLatestWeatherData = (cityName = "") => {
        if (cityName != "") {
            latestDataOfEachType = findLatestDataOfEachType(weatherDataMap[cityName]) 
        } else {
            latestDataOfEachType = findLatestDataOfEachType(weatherDataMap[Object.keys(weatherDataMap)[0]]) 
        }
        return latestDataOfEachType
    }

    const showMinimumTemperatureWeatherData = (cityName = "") => {
        if (cityName != "") {
            minimumTemperatureData = findMinimumTemperature(weatherDataMap[cityName]) 
        } else {
            minimumTemperatureData = findMinimumTemperature(weatherDataMap[Object.keys(weatherDataMap)[0]]) 
        }
        return minimumTemperatureData
    }

    const showMaximumTemperatureWeatherData = (cityName = "") => {
        if (cityName != "") {
            maximumTemperatureData = findMaximumTemperature(weatherDataMap[cityName]) 
        } else {
            maximumTemperatureData = findMaximumTemperature(weatherDataMap[Object.keys(weatherDataMap)[0]]) 
        }
        return maximumTemperatureData
    }

    const showTotalPrecipitation = (cityName = "") => {
        if (cityName != "") {
            totalPrecipitation = getTotalPrecipitation(weatherDataMap[cityName]) 
        } else {
            totalPrecipitation = getTotalPrecipitation(weatherDataMap[Object.keys(weatherDataMap)[0]]) 
        }
        return totalPrecipitation
    }

    const showAverageWindSpeed = (cityName = "") => {
        if (cityName != "") {
            averageWindSpeed = getAverageWindSpeed(weatherDataMap[cityName]) 
        } else {
            averageWindSpeed = getAverageWindSpeed(weatherDataMap[Object.keys(weatherDataMap)[0]]) 
        }
        return averageWindSpeed
    }

    const showAverageCloudCoverage = (cityName = "") => {
        if (cityName != "") {
            averageCloudCoverage = getAverageCloudCoverage(weatherDataMap[cityName]) 
        } else {
            averageCloudCoverage = getAverageCloudCoverage(weatherDataMap[Object.keys(weatherDataMap)[0]]) 
        }
        return averageCloudCoverage
    }

    const showDominantWindDirection = (cityName = "") => {
        if (cityName != "") {
            dominantWindDirection = getDominantWindDirection(weatherDataMap[cityName]) 
        } else {
            dominantWindDirection = getDominantWindDirection(weatherDataMap[Object.keys(weatherDataMap)[0]]) 
        }
        return dominantWindDirection
    }

    return { showLatestWeatherData, showMinimumTemperatureWeatherData, showMaximumTemperatureWeatherData, 
             showTotalPrecipitation, showAverageWindSpeed, showAverageCloudCoverage, 
             showDominantWindDirection }
}

export default model
