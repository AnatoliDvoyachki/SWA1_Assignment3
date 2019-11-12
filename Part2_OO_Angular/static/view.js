export default (window, viewmodel) => {
    const document = window.document

    const appendWeatherDataRow = (weatherData, tableName) => {
        const table_body = document.getElementById(tableName)
        const row = table_body.appendChild(document.createElement('tr'))

        let row = table_body.insertRow();

        let typeCell = row.insertCell(0)
        let valueCell = row.insertCell(1);
        let unitCell = row.insertCell(2);
        let timeCell = row.insertCell(3);
        let placeCell = row.insertCell(4);

        typeCell.innerHTML = weatherData.type
        valueCell.innerHTML = weatherData.value;
        unitCell.innerHTML = weatherData.unit; 
        timeCell.innerHTML = weatherData.time;
        placeCell.innerHTML = weatherData.place;
    }

    const appendWeatherPredictionRow = (weatherPrediction, tableName) => {
        const table_body = document.getElementById(tableName)
        const row = table_body.appendChild(document.createElement("tr"))

        let row = table_body.insertRow();

        let fromCell = row.insertCell(0)
        let toCell = row.insertCell(1);
        let typeCell = row.insertCell(2);
        let unitCell = row.insertCell(3);
        let timeCell = row.insertCell(4);
        let placeCell = row.insertCell(5);

        fromCell.innerHTML = weatherPrediction.from
        toCell.innerHTML = weatherPrediction.to;
        typeCell.innerHTML = weatherPrediction.type; 
        unitCell.innerHTML = weatherPrediction.unit;
        timeCell.innerHTML = weatherPrediction.time;
        placeCell.innerHTML = weatherPrediction.place;
    }

    const appendText = (text, htmlElement) => {
        let division = document.getElementById(htmlElement)
        division.innerHTML = text
    }

    const ensureElementIsEmpty = tableName => {
        const table_body = document.getElementById(tableName)
        while(table_body.firstChild) {
            table_body.removeChild(table_body.firstChild)
        }
    }

    const update = (weatherDataModel) => {
        ensureElementIsEmpty("latest_data_data")
        ensureElementIsEmpty("min_temperature_data")
        ensureElementIsEmpty("max_temperature_data")
        ensureElementIsEmpty("totalPrecipitation")
        ensureElementIsEmpty("averageWindSpeed")
        ensureElementIsEmpty("averageCloudCoverage")
        ensureElementIsEmpty("dominantWindDirection")
        ensureElementIsEmpty("hourly_predictions_data")

        weatherDataModel.showLatestWeatherData().forEach(wd => appendWeatherDataRow(wd, "latest_data_data"))
        weatherDataModel.showMinimumTemperatureWeatherData().forEach(wd => appendWeatherDataRow(wd, "min_temperature_data"))
        weatherDataModel.showMaximumTemperatureWeatherData().forEach(wd => appendWeatherDataRow(wd, "max_temperature_data"))
        weatherDataModel.showTotalPrecipitation(totalPrecipitation => appendText(totalPrecipitation, "totalPrecipitation"))
        weatherDataModel.showAverageWindSpeed(averageWindSpeed => appendText(averageWindSpeed, "averageWindSpeed"))
        weatherDataModel.showAverageCloudGoverage(averageCloudCoverage => appendText(averageCloudCoverage, "averageCloudCoverage"))
        weatherDataModel.showDominantWindDirection(dominantWindDirection => appendText(dominantWindDirection, "dominantWindDirection"))
        weatherDataModel.showWeatherForecastData(forecast => appendWeatherPredictionRow(forecast, "hourly_predictions_data"))
    }

    viewmodel.addListener(() => update(viewmodel))
    update(viewmodel)
}
