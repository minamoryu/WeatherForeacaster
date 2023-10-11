import { Parser } from "./services.js";
import { Templater } from "./services.js";

export class ThirdVidget {

    constructor() {
        this._apiUrl = 'https://api.openweathermap.org/data/2.5/weather';
        this._apiKey = '1d983ebdeb2ee266d687a80daa2994e9';
        this._displayCity1 = $('#city1');
        this._displayCity2 = $('#city2');
        this._displayCity3 = $('#city3');
        this._displayCity4 = $('#city4');
        this._templater = new Templater();
        this._parser = new Parser();
        this._getParams = 'undefined';
        this._city1 = 'undefined';
        this._city2 = 'undefined';
        this._city3 = 'undefined';
        this._city4 = 'undefined';
    }

    getData(city) {
        console.log(`lat: ${city.lat} lon: ${city.lon}`)
        this._city1 = `?lat=${city.lat + 0.5}&lon=${city.lon}&appid=${this._apiKey}&units=metric`;
        this._city2 = `?lat=${city.lat + 0.5}&lon=${city.lon + 0.5}&appid=${this._apiKey}&units=metric`;
        this._city3 = `?lat=${city.lat - 0.5}&lon=${city.lon}&appid=${this._apiKey}&units=metric`;
        this._city4 = `?lat=${city.lat - 0.5}&lon=${city.lon - 0.5}&appid=${this._apiKey}&units=metric`;

        let cityUrl1 = this._apiUrl + this._city1;
        let cityUrl2 = this._apiUrl + this._city2;
        let cityUrl3 = this._apiUrl + this._city3;
        let cityUrl4 = this._apiUrl + this._city4;

        $.getJSON(cityUrl1, (data) => {
            console.log(data);
            this._parser.dataTransitNearbyCity(data);

            let weather = this._parser.getModelNerbyCity();
            console.log(weather);

            let template = this._templater.NearbyCity(weather);
            this._displayCity1.html(template);
        });

        $.getJSON(cityUrl2, (data) => {
            console.log(data);
            this._parser.dataTransitNearbyCity(data);

            let weather = this._parser.getModelNerbyCity();
            console.log(weather);

            let template = this._templater.NearbyCity(weather);
            this._displayCity2.html(template);
        });

        $.getJSON(cityUrl3, (data) => {
            console.log(data);
            this._parser.dataTransitNearbyCity(data);

            let weather = this._parser.getModelNerbyCity();
            console.log(weather);

            let template = this._templater.NearbyCity(weather);
            this._displayCity3.html(template);
        });
        
        $.getJSON(cityUrl4, (data) => {
            console.log(data);
            this._parser.dataTransitNearbyCity(data);

            let weather = this._parser.getModelNerbyCity();
            console.log(weather);

            let template = this._templater.NearbyCity(weather);
            this._displayCity4.html(template);
        });
    }
}