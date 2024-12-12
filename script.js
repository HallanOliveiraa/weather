document.querySelector('#search').addEventListener('submit', async (event) => {
    event.preventDefault();

    const cityName = document.querySelector('#city_name').value;

    if (!cityName) {
        document.querySelector("#weather").classList.remove('show');
        showAlert('Você precisa digitar uma cidade...');
        return;

    }
    const apikey = '9ed12c5d89ae6167b5a5ae1022108773';

    const apiurl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(cityName)}&appid=${apikey}&unitsmetric&lang=pt_br`

    const results = await fetch(apiurl);    
    const json = await results.json();   
    
    if (json.cod === 200){
        showInfo({
            city: json.name,
            country:json.sys.country,
            temp: json.main.temp_max,
            tempMax: json.main.temp_min,
            tempMin: json.main.temp_min,
            description: json.weather[0].description,
            tempIcon:json.weather[0].icon,
            windSpeed:json.wind.speed,
            humidity: json.main.humidity,
        })
    } else {

            document.querySelector("#weather").classList.remove('show');

        showAlert(`

            Não foi possível localizar...

            <img src="public/error-404-page-no-found.png"/>

            `)
    }


});

function showInfo(json){
    showAlert('');

    document.querySelector("#weather").classList.add('show');

    document.querySelector('#title').innerHTML = `${json.city}, ${json.country}`

    document.querySelector('#temp_value').innerHTML = `${parseInt(json.tempMax).toString().slice(0, 2)} <sup>ºC</sup>`;
    
    document.querySelector('#temp_description').innerHTML = `${json.city}, ${json.description}`

    document.querySelector('#temp_img').setAttribute('src', `https://openweathermap.org/img/wn/${json.tempIcon}@2x.png`)

    document.querySelector('#temp_max').innerHTML = `${parseInt(json.tempMax).toString().slice(0, 2)} <sup>ºC</sup>`;

    document.querySelector('#temp_min').innerHTML = `${parseInt(json.tempMin).toString().slice(0, 2)} <sup>ºC</sup>`;

    document.querySelector('#humidity').innerHTML = `${json.humidity}%`;

    document.querySelector('#wind').innerHTML = `${json.windSpeed.toFixed(1)}km/h`;
}

function showAlert(msg) {
    document.querySelector('#alert').innerHTML = msg;
}