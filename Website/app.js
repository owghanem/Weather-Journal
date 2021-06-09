// Global Variables
const weatherAPIKey = "75a4f78d7f39f0ce89739e960bfb103f";
const frag = document.createDocumentFragment();

// Gets todays date
const currentDate = getDate();
function getDate() {
    const date = new Date();
    const day = date.getDate();
    const month = date.getMonth() + 1;
    let year = date.getFullYear().toString().slice(2);
    const currentDate = day + "/" + month + "/" + year;
    return currentDate;
}

// submit data button
const btn = document.getElementById("mainBTN");
let userData = {};
btn.addEventListener("click", submitData);

async function submitData() {
    const zip = document.getElementById("userZip").value;
    const feelings = document.querySelector('#userFeelings').value;
    if (zip.length === 5) {
        let weatherData = await fetch(`https://api.openweathermap.org/data/2.5/weather?zip=${zip}&appid=${weatherAPIKey}&units=metric`);
        weatherData = await weatherData.json();

        if (weatherData.cod === 200) {

            await fetch('/saveUserData', {
                method: "POST",
                credentials: "same-origin",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    date: currentDate,
                    userZipcode: zip,
                    userWeatherData: weatherData,
                    userFeelings: feelings
                })
            });

            userData = await fetch('/getUserData', {
                credentials: "same-origin",
            });
            userData = await userData.json();
            createResultText();
        }
        else {
            alert(weatherData.message);
        }
    }
    else {
        alert('Zipcode must be 5 characters');
    }
}

// display result
function createResultText() {
    const date = userData.date;
    const feelings = userData.userFeelings;
    const temp = userData.userWeatherData.main.temp;

    const output = document.querySelector('.output');
    const outputHeader = document.querySelector('.outputHeader');
    const resultText = document.createElement('p');
    resultText.classList.add('outputText');
    resultText.textContent = "On " + date + " you were " + feelings + " and it was " + temp + "!";
    outputHeader.textContent = "There you go!";
    output.innerHTML = '';
    output.appendChild(resultText);
}
