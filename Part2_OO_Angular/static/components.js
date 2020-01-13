import model from "./model.js"

const module = angular.module("weatherDataApp", [])

const headers = { "Content-Type": "application/json", Accept: "application/json" }

module.value("$model", {  })

module.controller("WeatherDataController", ($scope, $model, $http) => {      
    // Initialize application
    $scope.model = $model
    let aModel
    loadWeatherData(aModel, $scope, $http)

    // On city selection changed event handler
    $scope.onCitySelectionChanged = () => loadWeatherData(aModel, $scope, $http)
    
    // On reload data button click event handler
    $scope.onReloadWeatherDataClicked = () => {
        loadWeatherData(aModel, $scope, $http)
        console.log("reloaded") // To verify reload works
    }

    // On date picker value changed event handler
    $scope.onDateChanged = () => loadWeatherData(aModel, $scope, $http)
    
    // On create report click event handler
    $scope.onCreateReportClicked = () => {
        const type = prompt("Please enter weather data type")
        const time = prompt("Please enter weather data time")
        const place = prompt("Please enter weather data place")
        const value = prompt("Please enter weather data value")
        const unit = prompt("Please enter weather data unit")
        
        const newWeatherReport = [{ type, time, place, value, unit }]
    
        $http.post("http://localhost:8080/data/", newWeatherReport, { headers })
             .then(() => loadWeatherData(aModel, $scope, $http))
             .catch(error => console.error(error)) // Refresh data bindings after new weather data is added
    }
})

const loadWeatherData = (aModel, $scope, $http) => {
    const urls = buildWeatherDataApiUrls($scope)
    
    const fromDate = $scope.fromDate != null 
                        ? new Date($scope.fromDate) 
                        : getDate5DaysAgo() // Default date is 5 days ago - similar to assignment 2
    
    const toDate = $scope.toDate != null 
                    ? new Date($scope.toDate)
                    : new Date() // Default date is now

    $http.get(urls.weatherDataUrl)
        .then(({ data: weatherData }) => {
        $http.get(urls.weatherForecastUrl)
            .then(({ data: weatherForecastData }) => {
                aModel = model(weatherData, weatherForecastData, fromDate, toDate)
                
                $scope.model.latestDataOfEachType = aModel.getLatestDataOfEachType()
                $scope.model.minimumTemperatureData = aModel.getMinTemperature()
                $scope.model.maximumTemperatureData = aModel.getMaxTemperature()
                $scope.model.totalPrecipitation = aModel.getTotalPrecipitation()
                $scope.model.averageWindSpeed = aModel.getAverageWindSpeed()
                $scope.model.averageCloudCoverage = aModel.getAverageCloudCoverage()
                $scope.model.dominantWindDirection = aModel.getDominantWindDirection() 
                $scope.model.weatherPredictions = aModel.getWeatherForecastData()
        })
    })
    .catch(error => console.error(error))
}

const buildWeatherDataApiUrls = $scope => {
    let weatherDataUrl = "http://localhost:8080/data/"
    let weatherForecastUrl = "http://localhost:8080/forecast/"

    const cityName = $scope.cityName != null
                        ? $scope.cityName
                        : "" // Default empty to get all city data
                        
    weatherDataUrl += cityName
    weatherForecastUrl += cityName

    return { weatherDataUrl, weatherForecastUrl }
}

const getDate5DaysAgo = () => {
    const dateOffset = (24 * 60 * 60 * 1000) * 5; // 5 days
    const myDate = new Date();
    myDate.setTime(myDate.getTime() - dateOffset);
    return myDate
}
