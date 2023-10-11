import { Parser } from "./services.js";
import { FirstVidget } from "./firstVidget.js";
import { SecondVidget } from "./secondVidget.js";
import { ThirdVidget } from "./thirdVidget.js";
import { Second_Page } from "./second_Page.js";
import { ErrorPage } from "./services.js";
import { UserInfo } from "./userInfo.js";

export class AutoSearchCity {

    constructor() {
        console.log('ASCity -> load');
        this._nameOfCity = $('#nameOfCity');
        this._cityName = 'undefined';
        this._apiUrlCN = 'http://api.openweathermap.org/geo/1.0/reverse';
        this._limit = 1;
        this._apiKey = '1d983ebdeb2ee266d687a80daa2994e9';
        this._getParamsCN = 'undefined';
        this._parser = new Parser();
        this._firstVidget = new FirstVidget();
        this._secondVidget = new SecondVidget();
        this._thirdVidget = new ThirdVidget();
        this._second_page = new Second_Page();
        this._errorPage = new ErrorPage();
        this._display = $('#display');
        this._info = new UserInfo();
    }

    async getData() {
        let lat = undefined;
        let lon = undefined;

        try {
            lat = (await (await this._info.geoCoords()).lat);
            console.log(lat);
            lon = (await (await this._info.geoCoords()).long);
            console.log(lon);

            this._cityName = this._nameOfCity.val();

        } catch (err) {
            lat = 50.5293592;
            lon = 30.8086188;

            this._cityName = 'Бровари';

        }

        $('#nameOfCity').html("");
        this._getParamsCN = `?lat=${lat}&lon=${lon}&appid=${this._apiKey}&limi=5`;
        let qUrlCN = this._apiUrlCN + this._getParamsCN;
        console.log(`qUlrCN = ${qUrlCN}`);
        $.getJSON(qUrlCN, (data) => {
            $('#display3').show();
            console.log(data);
            try {
                this._parser.dataTransitCityName(data);
            } catch (err) {
                $("#display").html("");
                $("#display2").html("");

                let city = this._cityName;
                let render = this._errorPage.renderError(city);
                this._display.html(render);

                return null;
            }
            let city = this._parser.getModelCityName();
            console.log(city);
            console.log(city.name);
            $('#nameOfCity').val(city.name);
            this._firstVidget.getData(city);
            this._secondVidget.getData(city);
            this._thirdVidget.getData(city);
        });
    }
}