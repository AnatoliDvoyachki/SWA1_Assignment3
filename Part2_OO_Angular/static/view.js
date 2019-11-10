export default (window, viewmodel) => {
    const document = window.document

    const appendWeatherDataRow = (weatherData, tableName) => {
        const table_body = document.getElementById(tableName)
        const row = table_body.appendChild(document.createElement('tr'))

        let row = table.insertRow();

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

    const appendPredictionToTable(weatherPrediction, tableName) {
        const table_body = document.getElementById(tableName)
        let row = table_body.insertRow();

        let fromCell = row.insertCell(0)
        let toCell = row.insertCell(1);
        let detailsCell = row.insertCell(2);
        let typeCell = row.insertCell(3);
        let unitCell = row.insertCell(4);
        let timeCell = row.insertCell(5);
        let placeCell = row.insertCell(6);

        fromCell.innerHTML = weatherPrediction.from
        toCell.innerHTML = weatherPrediction.to;

        if (weatherPrediction['precipitation_types'] != null)
        {
            detailsCell.innerHTML = weatherPrediction.precipitation_types.join('\n');
        } else if (weatherPrediction['directions'] != null) {
            detailsCell.innerHTML = weatherPrediction.directions.join('\n');
        } else {
            detailsCell.innerHTML = ''
        }
        
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

    const update = model => {
        ensureElementIsEmpty("latest_data_data")
        ensureElementIsEmpty("min_temperature_data")
        ensureElementIsEmpty("max_temperature_data")
        ensureElementIsEmpty("totalPrecipitation")
        ensureElementIsEmpty("averageWindSpeed")
        ensureElementIsEmpty("averageCloudCoverage")
        ensureElementIsEmpty("dominantWindDirection")

        model.showLatestWeatherData().forEach(wd => appendWeatherDataRow(wd, "latest_data_data"))
        model.showMinimumTemperatureWeatherData().forEach(wd => appendWeatherDataRow(wd, "min_temperature_data"))
        model.showMaximumTemperatureWeatherData().forEach(wd => appendWeatherDataRow(wd, "max_temperature_data"))
        model.showTotalPrecipitation(totalPrecipitation => appendText(totalPrecipitation, "totalPrecipitation"))
        model.showAverageWindSpeed(averageWindSpeed => appendText(averageWindSpeed, "averageWindSpeed"))
        model.showAverageCloudGoverage(averageCloudCoverage => appendText(averageCloudCoverage, "averageCloudCoverage"))
        model.showDominantWindDirection(dominantWindDirection => appendText(dominantWindDirection, "dominantWindDirection"))
    }

    viewmodel.addListener(() => update(viewmodel))
    update(viewmodel)
}
