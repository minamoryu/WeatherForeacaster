import { Parser } from "./services.js";
import { Templater } from "./services.js";


export class FirstVidget {
    constructor() {
        this._display = $('#display');
        this._templater = new Templater();
        this._parser = new Parser();
        this._apiUrl = 'https://api.openweathermap.org/data/2.5/weather';
        this._apiKey = '1d983ebdeb2ee266d687a80daa2994e9';
        this._getParams = 'undefined';

    }

    getData(city) {
        console.log(city);
        this._getParams = `?lat=${city.lat}&lon=${city.lon}&appid=${this._apiKey}&units=metric`;
        let qUrl = this._apiUrl + this._getParams;
        console.log(`qUrlS = ${qUrl}`);

        $.getJSON(qUrl, (data) => {
            console.log(data);
            this._parser.dataTransitShort(data);

            let weather = this._parser.getModelShort();
            console.log(weather);

            let template = this._templater.renderShort(weather);
            this._display.html(template);
        });

    }
}