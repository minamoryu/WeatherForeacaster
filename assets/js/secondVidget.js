import { Parser } from "./services.js";
import { Templater } from "./services.js";


export class SecondVidget {
    constructor() {
        this._display = $('#display2');
        this._display3 = $('#display3');
        this._templater = new Templater();
        this._parser = new Parser();
        this._apiUrl = 'https://api.openweathermap.org/data/2.5/forecast';
        this._apiKey = '1d983ebdeb2ee266d687a80daa2994e9';
        this._getParams = 'undefined';
    }

    getData(city) {
        console.log(city);
        this._getParams = `?lat=${city.lat}&lon=${city.lon}&appid=${this._apiKey}&units=metric`;
        
        let qUrl = this._apiUrl + this._getParams;
        console.log(`qUrlR = ${qUrl}`);

        
        $.getJSON(qUrl, (data) => {
            console.log(data);
            this._parser.dataTransitRemnant(data);

            let weather = this._parser.getModelRemnant();
            console.log(weather);

            let template = this._templater.renderRemnant(weather);
            this._display.html(template);
        });
    }
}