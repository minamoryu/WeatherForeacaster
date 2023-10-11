import { Parser } from "./services.js";
import { FirstVidget } from "./firstVidget.js";
import { SecondVidget } from "./secondVidget.js";
import { ThirdVidget } from "./thirdVidget.js";
import { Second_Page } from "./second_Page.js";
import { ErrorPage } from "./services.js";
import { UserInfo } from "./userInfo.js";



export class SearchCity {

    constructor() {
        console.log('city -> load');
        this._nameOfCity = $('#nameOfCity');
        this._cityName = 'undefined';
        this._apiUrlCN = 'http://api.openweathermap.org/geo/1.0/direct';
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

    getData(btn) {
        console.log(`BUTTON_CLICK:${btn}`);
        this._cityName = this._nameOfCity.val();
        console.log(`cityName = ${this._cityName}`);
        this._getParamsCN = `?q=${this._cityName}&appid=${this._apiKey}&units=metric&limit=5`;
        let qUrlCN = this._apiUrlCN + this._getParamsCN;
        console.log(`qUlrCN = ${qUrlCN}`);
        if (btn === 'today') {
            if (this._cityName === '') {
                alert('Заповніть назву міста');
            } else {
                $.getJSON(qUrlCN, (data) => {
                    $("#display").html("");
                    $("#display2").html("");
                    $("#display3").show();
                    console.log(data);
                    try {
                        this._parser.dataTransitCityName(data);
                    } catch (err) {
                        $("#display").html("");
                        $("#display2").html("");
                        $("#display3").show();

                        let city = this._cityName;
                        let render = this._errorPage.renderError(city);
                        this._display.html(render);

                        return null;
                    }
                    let city = this._parser.getModelCityName();
                    console.log(city);
                    this._firstVidget.getData(city);
                    this._secondVidget.getData(city);
                    this._thirdVidget.getData(city);
                })
            }
        }

        if (btn === 'forecast') {
            if (this._cityName === '') {
                alert('Заповніть назву міста');
            } else {
                $.getJSON(qUrlCN, (data) => {
                    $("#display").html("");
                    $("#display2").html("");
                    $("#display3").hide();
                    console.log(data);
                    try {
                        this._parser.dataTransitCityName(data);
                    } catch (err) {
                        $("#display").html("");
                        $("#display2").html("");
                        $("#display3").hide();


                        let city = this._cityName;
                        let render = this._errorPage.renderError(city);
                        this._display.html(render);

                        return null;
                    }

                    let city = this._parser.getModelCityName();
                    console.log(city);

                    this._second_page.getData(city);
                })
            }
        }
    }

}