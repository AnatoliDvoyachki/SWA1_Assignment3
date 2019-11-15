import model from './model.js'

const module = angular.module('weatherDataApp', [])

module.value('$model', { cityNames: ["Aarhus", "Horsens", "Copenhagen"] })

module.controller('WeatherDataController', function($scope, $model, $http) {
      // Initialize application
      $scope.model = $model
      let aModel
      loadData(aModel, $scope, $http)

      // On city selection changed event handler
      $scope.onCitySelectionChanged = () => {
        loadData(aModel, $scope, $http)
      }

      // On reload data button click event handler
      $scope.onReloadDataClicked = () => {
          loadData(aModel, $scope, $http)
      }

      $scope.onDateChanged = () => {
        loadData(aModel, $scope, $http)
      }

      $scope.onCreateReportClicked = () => {
        var type = prompt("Please enter weather data type");
        var time = prompt("Please enter weather data time");
        var place = prompt("Please enter weather data place");
        var value = prompt("Please enter weather data value");
        var unit = prompt("Please enter weather data unit");
        
        let newWeatherReport = [{
            type: type,
            time: time,
            place: place,
            value: value,
            unit: unit
        }]
        
        /*const headers = { "Content-Type": "application/json", Accept: "application/json" }
        $http.post("http://localhost:8080/data/", newWeatherReport, { headers })
             .then(({data: p}) => {
               // $scope.model = $model
                aModel.addWeatherDataReport(p)
                loadData(aModel, $scope, $http)
              })*/
      }
})

function loadData(aModel, $scope, $http) {
      let weatherDataUrl = "http://localhost:8080/data/"
      let weatherForecastUrl = "http://localhost:8080/forecast/"
  
      const cityName = $scope.cityName
      const fromDate = new Date($scope.fromDate)
      const toDate = new Date($scope.toDate)

      console.log(fromDate > toDate)
      console.log(fromDate < toDate)

      console.log(fromDate)
      console.log(toDate)

      if (cityName != null) {
          weatherDataUrl += cityName
          weatherForecastUrl += cityName
      }

      $http.get(weatherDataUrl)
           .then(({data: weatherData}) => {
           $http.get(weatherForecastUrl)
                .then(({data: weatherPredictionData}) => {
                    aModel = model(weatherData, weatherPredictionData)
                   
                   console.log(weatherData)
                   console.log(weatherPredictionData)
                   
                    $scope.model.latestDataOfEachType = aModel.showLatestWeatherData(fromDate, toDate)
                    $scope.model.minimumTemperatureData = aModel.showMinimumTemperatureWeatherData()
                    $scope.model.maximumTemperatureData = aModel.showMaximumTemperatureWeatherData()
                    $scope.model.totalPrecipitation = aModel.showTotalPrecipitation()
                    $scope.model.averageWindSpeed = aModel.showAverageWindSpeed()
                    $scope.model.averageCloudCoverage = aModel.showAverageCloudCoverage()
                    $scope.model.dominantWindDirection = aModel.showDominantWindDirection() 
                    $scope.model.weatherPredictions = aModel.showWeatherForecastData()
            })         
      }).catch(console.error) 
}