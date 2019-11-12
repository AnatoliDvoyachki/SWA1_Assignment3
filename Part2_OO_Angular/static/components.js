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
      loadData(aModel, $scope, $http)

      $scope.onCitySelectionChanged = () => {
        loadData(aModel, $scope, $http)
      }

      $scope.onReloadDataClicked = () => {
          loadData(aModel, $scope, $http)
      }
})


function loadData(aModel, $scope, $http) {
      let weatherDataUrl = 'http://localhost:8080/data/'
      let weatherForecastUrl = 'http://localhost:8080/forecast/'
  
      const cityName = $scope.cityName
      
      if (cityName != null) {
          weatherDataUrl += cityName
          weatherForecastUrl += cityName
      }

      console.log(weatherDataUrl)
      console.log(weatherForecastUrl)

      $http.get(weatherDataUrl)
           .then(({data: weatherData}) => {
           $http.get(weatherForecastUrl)
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