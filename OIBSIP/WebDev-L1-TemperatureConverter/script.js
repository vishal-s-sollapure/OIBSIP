const temperatureInput =
    document.getElementById("temperature");

const unitSelect =
    document.getElementById("unit");

const convertBtn =
    document.getElementById("convertBtn");

const resetBtn =
    document.getElementById("resetBtn");

const errorMessage =
    document.getElementById("errorMessage");

const celsiusResult =
    document.getElementById("celsiusResult");

const fahrenheitResult =
    document.getElementById("fahrenheitResult");

const kelvinResult =
    document.getElementById("kelvinResult");

convertBtn.addEventListener("click", convertTemperature);

resetBtn.addEventListener("click", resetConverter);

function convertTemperature() {

    errorMessage.textContent = "";

    const inputValue =
        temperatureInput.value.trim();

    if (inputValue === "") {

        showError(
            "Please enter a temperature."
        );

        return;
    }

    const temperature =
        Number(inputValue);

    if (!Number.isFinite(temperature)) {

        showError(
            "Please enter a valid number."
        );

        return;
    }

    const selectedUnit =
        unitSelect.value;


    /* Variables for converted values */

    let celsius;
    let fahrenheit;
    let kelvin;

    if (selectedUnit === "celsius") {

        celsius = temperature;

        fahrenheit =
            (temperature * 9 / 5) + 32;

        kelvin =
            temperature + 273.15;
    }

    else if (selectedUnit === "fahrenheit") {

        fahrenheit = temperature;

        celsius =
            (temperature - 32) * 5 / 9;

        kelvin =
            (temperature - 32) * 5 / 9
            + 273.15;
    }

    else if (selectedUnit === "kelvin") {

        kelvin = temperature;

        celsius =
            temperature - 273.15;

        fahrenheit =
            (temperature - 273.15) * 9 / 5
            + 32;
    }

    if (kelvin < 0) {

        showError(
            "Temperature cannot be below absolute zero."
        );

        clearResults();

        return;
    }

    celsiusResult.textContent =
        `${formatNumber(celsius)} °C`;

    fahrenheitResult.textContent =
        `${formatNumber(fahrenheit)} °F`;

    kelvinResult.textContent =
        `${formatNumber(kelvin)} K`;
}
function showError(message) {

    errorMessage.textContent = message;
}

function formatNumber(value) {

    /*
        Round the result to a maximum
        of two decimal places.
    */

    return Number(value.toFixed(2));
}

function clearResults() {

    celsiusResult.textContent = "—";

    fahrenheitResult.textContent = "—";

    kelvinResult.textContent = "—";
}

function resetConverter() {

    temperatureInput.value = "";

    unitSelect.value = "celsius";

    errorMessage.textContent = "";

    clearResults();

    temperatureInput.focus();
}

temperatureInput.addEventListener(
    "keydown",
    function (event) {

        if (event.key === "Enter") {

            convertTemperature();
        }

    }
);