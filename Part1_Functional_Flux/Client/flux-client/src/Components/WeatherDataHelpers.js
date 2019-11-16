const findLatestDataOfEachType = (weatherDataArray) => {
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

const getDaysBetween = (d1, d2) => {
    var diff = Math.abs(d1.getTime() - d2.getTime());
    return diff / (1000 * 60 * 60 * 24);
};

const isFromLast5Days = (weatherData) => {
    let now = new Date()
    let weatherDataDate = new Date(weatherData.time)
    let daysBetween = getDaysBetween(now, weatherDataDate)
    return daysBetween <= 5
}

const is = (weatherData, type) => {
    return weatherData['type'] == type
} 

const findMinimumTemperature = (weatherDataArray) => {
    let temperatureFromLast5Days = weatherDataArray.filter(wd => is(wd, 'temperature') && isFromLast5Days(wd))
    let weatherDataWithMinTemperature = temperatureFromLast5Days.reduce((pre, cur) => {
        let t1 = pre['value']
        let t2 = cur['value']

        return t1 < t2 ? pre : cur
    })
    return { weatherDataWithMinTemperature }
}

const findMaximumTemperature = (weatherDataArray) => {
    // Find max temperature within last 5 days
    let temperatureFromLast5Days = weatherDataArray.filter(wd => is(wd, 'temperature') && isFromLast5Days(wd))
    let weatherDataWithMaxTemperature = temperatureFromLast5Days.reduce((pre, cur) => {
        let t1 = pre['value']
        let t2 = cur['value']

        return t1 > t2 ? pre : cur
    })
    return { weatherDataWithMaxTemperature }
}

const getTotalPrecipitation = (weatherDataArray) => {
    // Calculate total precipitaiton
    let totalPrecipitation = weatherDataArray.filter(wd => is(wd, 'precipitation') && isFromLast5Days(wd))
                                             .map(wd => wd['value'])
                                             .reduce((previousPrecipitation, currentPrecipitation) => previousPrecipitation + currentPrecipitation, 0)
    return totalPrecipitation.toFixed(1)
}

const getAverageWindSpeed = (weatherDataArray) => {
    // Calculate average wind speed
    let averageWindSpeed = weatherDataArray.filter(wd => is(wd, 'wind speed') && isFromLast5Days(wd))
                                           .map(wd => wd['value'])
                                           .reduce((previousWindSpeed, currentWindSpeed) => previousWindSpeed + currentWindSpeed, 0) / weatherDataArray.length
    return averageWindSpeed.toFixed(1);
}

const getAverageCloudCoverage = (weatherDataArray) => {
    // Calculate average wind speed
    let averageCloudCoverage = weatherDataArray.filter(wd => is(wd, 'cloud coverage') && isFromLast5Days(wd))
                                               .map(wd => wd['value'])
                                               .reduce((previousCloudCoverage, currentCloudCoverage) => previousCloudCoverage + currentCloudCoverage, 0) / weatherDataArray.length
    return averageCloudCoverage.toFixed(1)
}

const getDominantWindDirection = (weatherDataArray) => {
    // Calculate average wind speed
    let windDirectionsFromLast5Days = weatherDataArray.filter(wd => is(wd, 'wind speed') && isFromLast5Days(wd))
                                                      .map(wd => wd['direction'])
    let mostDominantWindDirection = getHighestOccuringElement(windDirectionsFromLast5Days)
    return mostDominantWindDirection
}

const  getHighestOccuringElement = (weatherDataArray) => {
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

const addValueToKey = (map, key, value) => {
    map[key] = map[key] || [];
    map[key].push(value);
}

const showLatestWeatherData = (cityName = "", weatherDataMap) => {
    if (cityName != "") {
        latestDataOfEachType = findLatestDataOfEachType(weatherDataMap[cityName]) 
    } else {
        latestDataOfEachType = findLatestDataOfEachType(weatherDataMap[Object.keys(weatherDataMap)[0]]) 
    }
    return latestDataOfEachType
}

const showMinimumTemperatureWeatherData = (cityName = "", weatherDataMap) => {
    if (cityName != "") {
        minimumTemperatureData = findMinimumTemperature(weatherDataMap[cityName]) 
    } else {
        minimumTemperatureData = findMinimumTemperature(weatherDataMap[Object.keys(weatherDataMap)[0]]) 
    }
    return minimumTemperatureData
}

const showMaximumTemperatureWeatherData = (cityName = "", weatherDataMap) => {
    if (cityName != "") {
        maximumTemperatureData = findMaximumTemperature(weatherDataMap[cityName]) 
    } else {
        maximumTemperatureData = findMaximumTemperature(weatherDataMap[Object.keys(weatherDataMap)[0]]) 
    }
    return maximumTemperatureData
}

const showTotalPrecipitation = (cityName = "", weatherDataMap) => 
    getTotalPrecipitation(weatherDataMap[Object.keys(weatherDataMap)[0]]) 


const showAverageWindSpeed = (cityName = "", weatherDataMap) => {
    if (cityName != "") {
        averageWindSpeed = getAverageWindSpeed(weatherDataMap[cityName]) 
    } else {
        averageWindSpeed = getAverageWindSpeed(weatherDataMap[Object.keys(weatherDataMap)[0]]) 
    }
    return averageWindSpeed
}

const showAverageCloudCoverage = (cityName = "", weatherDataMap) => {
    if (cityName != "") {
        averageCloudCoverage = getAverageCloudCoverage(weatherDataMap[cityName]) 
    } else {
        averageCloudCoverage = getAverageCloudCoverage(weatherDataMap[Object.keys(weatherDataMap)[0]]) 
    }
    return averageCloudCoverage
}

const showDominantWindDirection = (cityName = "", weatherDataMap) => {
    if (cityName != "") {
        dominantWindDirection = getDominantWindDirection(weatherDataMap[cityName]) 
    } else {
        dominantWindDirection = getDominantWindDirection(weatherDataMap[Object.keys(weatherDataMap)[0]]) 
    }
    return dominantWindDirection
}

const showWeatherForecastData = (cityName = "", forecastDataMap) => {
    if (cityName != "") {
        console.log(cityName)
        console.log(forecastDataMap[cityName])
        weatherPredictions = forecastDataMap[cityName]
    } else {
        console.log(cityName)
        console.log(weatherPredictions[Object.keys(forecastDataMap)[0]])
        weatherPredictions = forecastDataMap[Object.keys(forecastDataMap)[0]]
    }
    console.log(weatherPredictions)
    return weatherPredictions
}

export {findLatestDataOfEachType,getDaysBetween,isFromLast5Days,
     is, findMinimumTemperature, findMaximumTemperature, getTotalPrecipitation,
    getAverageWindSpeed, getAverageCloudCoverage, getDominantWindDirection,
    getHighestOccuringElement, addValueToKey, showLatestWeatherData, 
    showMinimumTemperatureWeatherData, showMaximumTemperatureWeatherData,
    showTotalPrecipitation, showAverageWindSpeed, showAverageCloudCoverage,
    showDominantWindDirection, showWeatherForecastData} 