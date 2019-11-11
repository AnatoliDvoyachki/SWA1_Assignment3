import model from './model.js'

const module = angular.module('weatherDataApp', [])

module.value('$model', { salary: 0, cityNames: ["Aarhus", "Horsens", "Copenhagen"] })
//module.value('$weather_prediction_model', { })

/*module.component('modelInput', {
  bindings: { propertyName: '@' },
  template: '<input ng-model="$ctrl.model[$ctrl.propertyName]">',
  controller: ['$model', function ($model) {
      this.model = $model
  }]            
})*/

module.controller('WeatherDataController', function($scope, $model, $http) {
      $scope.model = $model
      let aModel
      $http.get('http://localhost:8080/data/')
           .then(({data: weatherData}) => {
            $http.get('http://localhost:8080/forecast/')
                 .then(({data: weatherPredictionData}) => {
                      aModel = model(weatherData, weatherPredictionData)
                      $scope.model.latestDataOfEachType = aModel.showLatestWeatherData()
                      $scope.model.minimumTemperatureData = aModel.showMinimumTemperatureWeatherData()
                      $scope.model.maximumTemperatureData = aModel.showMaximumTemperatureWeatherData()
                      $scope.model.totalPrecipitation = aModel.showTotalPrecipitation()
                      $scope.model.averageWindSpeed = aModel.showAverageWindSpeed()
                      $scope.model.averageCloudCoverage = aModel.showAverageCloudCoverage()
                      $scope.model.dominantWindDirection = aModel.showDominantWindDirection() 
                      $scope.model.weatherPredictions = aModel.showWeatherForecastData()
              })         
      }) 

      $scope.onCitySelectionChanged = () => {
        const cityName = $scope.cityName
        $http.get('http://localhost:8080/data/' + cityName)
           .then(({data: weatherData}) => {
            $http.get('http://localhost:8080/forecast/' + cityName)
                 .then(({data: weatherPredictionData}) => {
                      aModel = model(weatherData, weatherPredictionData)
                      $scope.model.latestDataOfEachType = aModel.showLatestWeatherData()
                      $scope.model.minimumTemperatureData = aModel.showMinimumTemperatureWeatherData()
                      $scope.model.maximumTemperatureData = aModel.showMaximumTemperatureWeatherData()
                      $scope.model.totalPrecipitation = aModel.showTotalPrecipitation()
                      $scope.model.averageWindSpeed = aModel.showAverageWindSpeed()
                      $scope.model.averageCloudCoverage = aModel.showAverageCloudCoverage()
                      $scope.model.dominantWindDirection = aModel.showDominantWindDirection() 
                      $scope.model.weatherPredictions = aModel.showWeatherForecastData()
              })
          })
        }
      })
