import model from './model.js'

const module = angular.module('weatherDataApp', [])

module.value('$model', { salary: 0, cityNames: ["Aarhus", "Horsens", "Copenhagen"] })

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
                    aModel = model(weatherData)
                    $scope.model.latestDataOfEachType = aModel.showLatestWeatherData()
                    $scope.model.minimumTemperatureData = aModel.showMinimumTemperatureWeatherData()
                    $scope.model.maximumTemperatureData = aModel.showMaximumTemperatureWeatherData()
                    $scope.model.totalPrecipitation = aModel.showTotalPrecipitation()
                    $scope.model.averageWindSpeed = aModel.showAverageWindSpeed()
                    $scope.model.averageCloudCoverage = aModel.showAverageCloudCoverage()
                    $scope.model.dominantWindDirection = aModel.showDominantWindDirection()
      }) 

      $scope.onCitySelectionChanged = () => {
        const cityName = $scope.cityName
        $http.get('http://localhost:8080/data/' + cityName)
             .then(({data: weatherData}) => {
                     aModel = model(weatherData)
                     $scope.model.latestDataOfEachType = aModel.showLatestWeatherData(cityName)
                     $scope.model.minimumTemperatureData = aModel.showMinimumTemperatureWeatherData(cityName)
                     $scope.model.maximumTemperatureData = aModel.showMaximumTemperatureWeatherData(cityName)
                     $scope.model.totalPrecipitation = aModel.showTotalPrecipitation(cityName)
                     $scope.model.averageWindSpeed = aModel.showAverageWindSpeed(cityName)
                     $scope.model.averageCloudCoverage = aModel.showAverageCloudCoverage(cityName)
                     $scope.model.dominantWindDirection = aModel.showDominantWindDirection(cityName)
          }
        )}
      })
 
         /*   $http.get('http://localhost:8080/data/')
      .then(({data: weatherPredictionData}) => {
               aModel = model(weatherPredictionData)
               $scope.model.dominantWindDirection = aModel.showDominantWindDirection()*/


      
  /*{
    $http.get('http://localhost:9090/employees')
    .then(({data: employees}) => {
      aModel = model(persons, employees)
      $scope.model.persons = aModel.personData()
    })
  })
  .catch(console.err)

  $scope.hire = id => {
    if ($scope.model.salary > 0) {
      const headers = { 'Content-Type': 'application/json', Accept: 'application/json' }
      $http.post('http://localhost:9090/employees', JSON.stringify({salary: $scope.model.salary, manager: false}), { headers })
      .then(({data: employee})=> {
        $http.patch('http://localhost:9090/persons/' + id, JSON.stringify({ employeeId: employee.employeeId }), {headers })
        .then(({data: person}) => {
          aModel.addEmployee(employee)
          aModel.updatePerson(person)
          $scope.model.persons = aModel.personData()
          $scope.model.salary = 0
        })
      })
    }
  }*/
