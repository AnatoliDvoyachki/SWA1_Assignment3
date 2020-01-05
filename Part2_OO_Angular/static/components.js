import model from "./model.js"

const module = angular.module("weatherDataApp", [])

const headers = { "Content-Type": "application/json", Accept: "application/json" }

module.value("$model", { cityNames: ["Aarhus", "Horsens", "Copenhagen"] })

module.controller("WeatherDataController", ($scope, $model, $http) => {
      // Initialize application
      $scope.model = $model
      let aModel
      loadData(aModel, $scope, $http)

      // On city selection changed event handler
      $scope.onCitySelectionChanged = () => loadData(aModel, $scope, $http)
      

      // On reload data button click event handler
      $scope.onReloadDataClicked = () => {
          loadData(aModel, $scope, $http)
          console.log("reloaded") // To verify reload works
      }

      // On date picker value changed event handler
      $scope.onDateChanged = () => loadData(aModel, $scope, $http)
      
      // On create report click event handler
      $scope.onCreateReportClicked = () => {
          let type = prompt("Please enter weather data type");
          let time = prompt("Please enter weather data time");
          let place = prompt("Please enter weather data place");
          let value = prompt("Please enter weather data value");
          let unit = prompt("Please enter weather data unit");
          
          let newWeatherReport = 
          [{
              type,
              time,
              place,
              value,
              unit
          }]
        
          $http.post("http://localhost:8080/data/", newWeatherReport, { headers })
               .then(() => loadData(aModel, $scope, $http)) // Refresh data bindings after new weather data is added
      }
})

const loadData = (aModel, $scope, $http) => {
      let weatherDataUrl = "http://localhost:8080/data/"
      let weatherForecastUrl = "http://localhost:8080/forecast/"
  
      const cityName = $scope.cityName != null
                          ? $scope.cityName
                          : "" // Default empty to get all city data

      const fromDate = $scope.fromDate != null 
                          ? new Date($scope.fromDate) 
                          : getDate5DaysAgo() // Default date (5 days ago, similar to assignment 2)
      
      const toDate = $scope.toDate != null 
                       ? new Date($scope.toDate)
                       : getCurrentDate() // Default date is now

      weatherDataUrl += cityName
      weatherForecastUrl += cityName
      
      $http.get(weatherDataUrl)
           .then(({data: weatherData}) => {
           $http.get(weatherForecastUrl)
                .then(({data: weatherForecastData}) => {
                  aModel = model(weatherData, weatherForecastData)
                  
                  $scope.model.latestDataOfEachType = aModel.getLatestDataOfEachType(fromDate, toDate)
                  $scope.model.minimumTemperatureData = aModel.getMinTemperature(fromDate, toDate)
                  $scope.model.maximumTemperatureData = aModel.getMaxTemperature(fromDate, toDate)
                  $scope.model.totalPrecipitation = aModel.getTotalPrecipitation(fromDate, toDate)
                  $scope.model.averageWindSpeed = aModel.getAverageWindSpeed(fromDate, toDate)
                  $scope.model.averageCloudCoverage = aModel.getAverageCloudCoverage(fromDate, toDate)
                  $scope.model.dominantWindDirection = aModel.getDominantWindDirection(fromDate, toDate) 
                  $scope.model.weatherPredictions = aModel.getWeatherForecastData(fromDate, toDate)
            })
      }).catch(console.error) 
}

const getDate5DaysAgo = () => {
    let dateOffset = (24 * 60 * 60 * 1000) * 5; // 5 days
    let myDate = new Date();
    myDate.setTime(myDate.getTime() - dateOffset);
    return myDate
}

const getCurrentDate = () => {
    return new Date()
}
