import { Parser } from "./services.js";
import { Templater } from "./services.js";

export class Second_Page {

    constructor() {
        this._display = $('#display');
        this._display2 = $('#display2');
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
        console.log(`qUrlS = ${qUrl}`);

        $.getJSON(qUrl, (data) => {
            console.log(data);
            this._parser.dataTransitCard(data);

            let weather = this._parser.getModelCard();
            console.log(weather);

            let template = this._templater.renderCard(weather);
            let btn1 = 'first';
            let template2 = this._templater.renderCard2(weather, btn1);
            this._display.html(template);
            this._display2.html(template2);

            $('#button1').click(() => {
                let template2 = this._templater.renderCard2(weather, btn1);
                this._display2.html(template2);
            })
            $('#button2').click(() => {
                let btn2 = 'second';
                let template2 = this._templater.renderCard2(weather, btn2);
                this._display2.html(template2);
            })
            $('#button3').click(() => {
                let btn3 = 'third';
                let template2 = this._templater.renderCard2(weather, btn3);
                this._display2.html(template2);
            })
            $('#button4').click(() => {
                let btn4 = 'fourth';
                let template2 = this._templater.renderCard2(weather, btn4);
                this._display2.html(template2);
            })
            $('#button5').click(() => {
                let btn5 = 'fifth';
                let template2 = this._templater.renderCard2(weather, btn5);
                this._display2.html(template2);
            })
        });

    }
}