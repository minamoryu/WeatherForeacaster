import { CityName } from "./models.js";
import { Short } from "./models.js";
import { Remnant } from "./models.js";
import { Card } from "./models.js";
import { City } from "./models.js";
import { NearbyCity } from "./models.js";

export class Parser {

    constructor() {
        this._modelCN = new CityName();
        this._modelS = new Short();
        this._modelR = new Remnant();
        this._modelC = new Card();
        this._modelCity = new City();
        this._modelNearbyCity = new NearbyCity();
    }

    getModelCityName() {
        return this._modelCN;
    }

    getModelNerbyCity() {
        return this._modelNearbyCity;
    }

    getModelShort() {
        return this._modelS;
    }

    getModelRemnant() {
        return this._modelR;
    }

    getModelCard() {
        return this._modelC;
    }

    getModelCity() {
        return this._modelCity;
    }


    dataTransitCity(responseData) {
        this._modelCity.name = responseData[0].name;
    }

    dataTransitNearbyCity(responseData) {
        this._modelNearbyCity.name = responseData.name;
        this._modelNearbyCity.temp = responseData.main.temp;
        this._modelNearbyCity.main = responseData.weather[0].main;
    }

    dataTransitCityName(responseData) {
        this._modelCN.country = responseData[0].country;
        this._modelCN.lat = responseData[0].lat;
        this._modelCN.lon = responseData[0].lon;
        this._modelCN.name = responseData[0].local_names.uk;
        this._modelCN.state = responseData[0].state;
    }

    dataTransitShort(responseData) {
        this._modelS.dt = responseData.dt;
        this._modelS.icon = responseData.weather[0].icon;
        this._modelS.main = responseData.weather[0].main;
        this._modelS.temp = responseData.main.temp;
        this._modelS.feels_like = responseData.main.feels_like;
        this._modelS.sunrise = responseData.sys.sunrise;
        this._modelS.sunset = responseData.sys.sunset;
    }

    dataTransitRemnant(responseData) {
        this._modelR.list = responseData.list;
    }

    dataTransitCard(responseData) {
        this._modelC.list = responseData.list;
    }
}

export class Templater {

    //* Конвернтує час Unix до шаблону дати ДД.ММ.РРРР
    dateConverter(UNIX_timestamp) {
        let a = new Date(UNIX_timestamp * 1000);
        let months = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
        let year = a.getFullYear();
        let month = months[a.getMonth()];
        let date = undefined;
        if(a.getDate() < 10 )
        {
            date = '0' + a.getDate();
        } else {
            date = a.getDate();
        }
        let time = date + '.' + month + '.' + year;
        return time;
    }

    //* Конвертує час Unix до часу шаблону 00:00:00
    timeConverter(UNIX_timestamp) {
        let a = new Date(UNIX_timestamp * 1000);
        let hour = a.getHours();
        let min = a.getMinutes();

        let time = "";
        let hrs = "";
        let mins = "";

        if (hour >= 10) {
            hrs = time + hour + ':';
        } else {
            hrs = time + '0' + hour + ':';
        }

        if (min >= 10) {
            mins = time + min;
        } else {
            mins = time + '0' + min;
        }
        time = hrs + mins;

        return time;
    }

    //* Отримує погоду та повертає рядок з шляхом до картинки
    weatherMain(main) {
        if (main === 'Clouds') {
            return "assets/img/clouds.png"
        }
        if (main === 'Rain') {
            return "assets/img/rain.png"
        }
        if (main === 'Clear') {
            return "assets/img/clear.png"
        }
        if (main === 'Fog') {
            return "assets/img/fog.png"
        }
        if (main === 'Snow') {
            return "assets/img/snow.png"
        }
    }

    //* Отримує назву погоди на англ. мові та повертає на українській
    translateMain(main) {
        if (main === 'Clouds') {
            return 'Хмарно'
        }
        if (main === 'Rain') {
            return 'Дощ'
        }
        if (main === 'Clear') {
            return 'Ясно'
        }
        if (main === 'Fog') {
            return 'Туман'
        }
        if (main === 'Snow') {
            return 'Сніг'
        }
    }

    //* Отримує напрямок вітру у градусах та повертає напрямок в текстовому виді(Захід, Схід, Південь, Північ)
    windDeg(deg) {
        let wdeg = deg;
        if (wdeg >= 0 && wdeg < 22.5) {
            return "П"
        } else if (wdeg >= 22.5 && wdeg < 67.5) {
            return "ПС";
        } else if (wdeg >= 67.5 && wdeg < 112.5) {
            return "С";
        } else if (wdeg >= 112.5 && wdeg < 157.5) {
            return "ПС";
        } else if (wdeg >= 157.5 && wdeg < 202.5) {
            return "П";
        } else if (wdeg >= 202.5 && wdeg < 247.5) {
            return "ПЗ";
        } else if (wdeg >= 247.5 && wdeg < 292.5) {
            return "З";
        } else if (wdeg >= 292.5 && wdeg < 337.5) {
            return "ПЗ";
        } else if (wdeg >= 337.5) {
            return "П";
        }
    }

    //* Отримує швидкість в км на годину та повертає швидкість в метрах на секунду
    speedConverter(speed) {
        let a = speed * 3.6;
        return a.toFixed();
    }

    //* Отримує ідентифікатор сьогоднішнього дня неділі та ідентифікатор кнопки, повертає день неділі
    weekConverter(dayX, countDay) {
        let day = undefined;
        if (countDay === 'first') {
            countDay = 0;
        }
        if (countDay === 'second') {
            countDay = 1;
        }
        if (countDay === 'third') {
            countDay = 2;
        }
        if (countDay === 'fourth') {
            countDay = 3;
        }
        if (countDay === 'fifth') {
            countDay = 4;
        }
        let week = ["Нд", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"];
        if (dayX + countDay >= 7) {
            day = (dayX + countDay) - week.length;
            let weekDay = week[day];
            return weekDay;
        }
        else {
            day = countDay + dayX;
            let weekDay = week[day];
            return weekDay;
        }
    }

    //* Отримує погоду, нажату кнопку та ідентифікатор часу та повертає ідентифікатор часу із масива в api-шнику
    daytime(weather, btn, num) {
        console.log("weather.dt" + weather.list[0].dt);
        let first = 0;
        let second = undefined;
        let third = undefined;
        let fourth = undefined;
        let fifth = undefined;
        let count = 0;
        
        for (let i = 0; i < 40; i++) {
            if (this.timeConverter(weather.list[i].dt) === '03:00') {
                count++;
                console.log(count);
                if (count === 1) {
                    second = i;
                }
                if (count === 2) {
                    third = i;
                }
                if (count === 3) {
                    fourth = i;
                }
                if (count === 4) {
                    fifth = i;
                }
            }
        }
        
    
        if (btn === 'first') {
            first += num;
            return first;
        }

        if (btn === 'second') {
            second += num;
            return second;
        }
        if (btn === 'third') {
            third += num;
            return third;
        }
        if (btn === 'fourth') {
            fourth += num;
            return fourth;
        }
        if (btn === 'fifth') {
            fifth += num;
            return fifth;
        }
    }

    //* Повертає інформацію до первого віджету
    renderShort(weather) {
        console.log(this.timeConverter(weather.dt));
        console.log(weather.icon);
        let html = `
            <div class="container">
                <div id="lab_header" class="header">
                    <label>Сьогоднішня погода</label>
                </div>
                <div id="lab_header_time" class="header">
                    <label id="lb">${this.dateConverter(weather.dt)}</label>
                </div>
            </div>
            <div class="disp">
                <div id="sec1">
                    <img src="${this.weatherMain(weather.main)}" id="logo"/>
                    <label id="main_weather">${this.translateMain(weather.main)}</label>
                </div>
                <div id="sec2">
                    <h2>${Math.trunc(weather.temp)}°С</h2>
                    <label>Відчувається як: ${Math.trunc(weather.feels_like)}°C</label>
                </div>
                <div id="sec3">
                    <p>
                        <tr>
                            <td>Схід сонця:</td>
                            <td>${this.timeConverter(weather.sunrise)}</td>
                        </tr>
                    </p>
                    <tr>
                        <td>Захід сонця:</td>
                        <td>${this.timeConverter(weather.sunset)}</td>
                    </tr>
                </div>
            </div>
        `;
        return html;
    }

    //* Повертає інформацію до другого віджету
    renderRemnant(weather) {

        let html = `
        <div id="table-vidget" class="cont table-responsive">
            <table class="table table-hover">
                <tr class="trow">
                    <th>Сьогодні</th>
                    <td class="tdrow">${this.timeConverter(weather.list[1].dt)}</td>
                    <td class="tdrow">${this.timeConverter(weather.list[2].dt)}</td>
                    <td class="tdrow">${this.timeConverter(weather.list[3].dt)}</td>
                    <td class="tdrow">${this.timeConverter(weather.list[4].dt)}</td>
                    <td class="tdrow">${this.timeConverter(weather.list[5].dt)}</td>
                    <td class="tdrow">${this.timeConverter(weather.list[6].dt)}</td>
                    <td class="tdrow">${this.timeConverter(weather.list[7].dt)}</td>
                </tr>
                <tr class="trow">
                    <td></td>
                    <td class="tdrow"><img src="${this.weatherMain(weather.list[1].weather[0].main)}" id="main_logo"/></td>
                    <td class="tdrow"><img src="${this.weatherMain(weather.list[2].weather[0].main)}" id="main_logo"/></td>
                    <td class="tdrow"><img src="${this.weatherMain(weather.list[3].weather[0].main)}" id="main_logo"/></td>
                    <td class="tdrow"><img src="${this.weatherMain(weather.list[4].weather[0].main)}" id="main_logo"/></td>
                    <td class="tdrow"><img src="${this.weatherMain(weather.list[5].weather[0].main)}" id="main_logo"/></td>
                    <td class="tdrow"><img src="${this.weatherMain(weather.list[6].weather[0].main)}" id="main_logo"/></td>
                    <td class="tdrow"><img src="${this.weatherMain(weather.list[7].weather[0].main)}" id="main_logo"/></td>
                </tr>
                <tr class="trow">
                    <th>Прогноз</th>
                    <td class="tdrow">${this.translateMain(weather.list[1].weather[0].main)}</td>
                    <td class="tdrow">${this.translateMain(weather.list[2].weather[0].main)}</td>
                    <td class="tdrow">${this.translateMain(weather.list[3].weather[0].main)}</td>
                    <td class="tdrow">${this.translateMain(weather.list[4].weather[0].main)}</td>
                    <td class="tdrow">${this.translateMain(weather.list[5].weather[0].main)}</td>
                    <td class="tdrow">${this.translateMain(weather.list[6].weather[0].main)}</td>
                    <td class="tdrow">${this.translateMain(weather.list[7].weather[0].main)}</td>
                </tr>
                <tr class="trow">
                    <th>Температура(°C)</th>
                    <td class="tdrow">${Math.trunc(weather.list[1].main.temp)}°</td>
                    <td class="tdrow">${Math.trunc(weather.list[2].main.temp)}°</td>
                    <td class="tdrow">${Math.trunc(weather.list[3].main.temp)}°</td>
                    <td class="tdrow">${Math.trunc(weather.list[4].main.temp)}°</td>
                    <td class="tdrow">${Math.trunc(weather.list[5].main.temp)}°</td>
                    <td class="tdrow">${Math.trunc(weather.list[6].main.temp)}°</td>
                    <td class="tdrow">${Math.trunc(weather.list[7].main.temp)}°</td>
                </tr>
                <tr class="trow">
                    <th>Відчувається як</th>
                    <td class="tdrow">${Math.trunc(weather.list[1].main.feels_like)}°</td>
                    <td class="tdrow">${Math.trunc(weather.list[2].main.feels_like)}°</td>
                    <td class="tdrow">${Math.trunc(weather.list[3].main.feels_like)}°</td>
                    <td class="tdrow">${Math.trunc(weather.list[4].main.feels_like)}°</td>
                    <td class="tdrow">${Math.trunc(weather.list[5].main.feels_like)}°</td>
                    <td class="tdrow">${Math.trunc(weather.list[6].main.feels_like)}°</td>
                    <td class="tdrow">${Math.trunc(weather.list[7].main.feels_like)}°</td>
                </tr>
                <tr class="trow">
                    <th>Вітер(км/год)</th>
                    <td class="tdrow">${this.speedConverter(weather.list[1].wind.speed)} ${this.windDeg(weather.list[1].wind.deg)}</td>
                    <td class="tdrow">${this.speedConverter(weather.list[2].wind.speed)} ${this.windDeg(weather.list[2].wind.deg)}</td>
                    <td class="tdrow">${this.speedConverter(weather.list[3].wind.speed)} ${this.windDeg(weather.list[3].wind.deg)}</td>
                    <td class="tdrow">${this.speedConverter(weather.list[4].wind.speed)} ${this.windDeg(weather.list[4].wind.deg)}</td>
                    <td class="tdrow">${this.speedConverter(weather.list[5].wind.speed)} ${this.windDeg(weather.list[5].wind.deg)}</td>
                    <td class="tdrow">${this.speedConverter(weather.list[6].wind.speed)} ${this.windDeg(weather.list[6].wind.deg)}</td>
                    <td class="tdrow">${this.speedConverter(weather.list[7].wind.speed)} ${this.windDeg(weather.list[7].wind.deg)}</td>
                </tr>
        </table>
        </div>
        </div>
            `;
        return html;
    }

    //* Повертає інформацію до четвертого віджету
    renderCard(weather) {
        let day = new Date().getDay();
        let num = 0;
        let html = `
        <div class="group-button">
        <div class="colum-btn">
        <button id="button1" type="button" class="btn btn-group">
            <p><label class="label_header">${this.weekConverter(day, 0)}</label></p>
            <label class="label_Date">${this.dateConverter(weather.list[this.daytime(weather, 'first', num + 0)].dt)}</label>
            <p><img src="${this.weatherMain(weather.list[0].weather[0].main)}" id="main_logo"/></p>
            <p>${Math.trunc(weather.list[0].main.temp)}°</p>
            <p class="parCard">${weather.list[0].weather[0].main}, ${weather.list[0].weather[0].description}</p>
        </button>
        </div>

        <div class="colum-btn">
        <button id="button2" type="button" class="btn btn-group">
            <p><label class="label_header">${this.weekConverter(day, 1)}</label></p>
            <label class="label_Date">${this.dateConverter(weather.list[this.daytime(weather, 'second', num + 0)].dt)}</label>
            <p><img src="${this.weatherMain(weather.list[0].weather[0].main)}" id="main_logo"/></p>
            <p>${Math.trunc(weather.list[10].main.temp)}°</p>
            <p class="parCard">${weather.list[10].weather[0].main}, ${weather.list[10].weather[0].description}</p>
        </button>
        </div>

        <div class="colum-btn">
        <button id="button3" type="button" class="btn btn-group">
            <p><label class="label_header">${this.weekConverter(day, 2)}</label></p>
            <label class="label_Date">${this.dateConverter(weather.list[this.daytime(weather, 'third', num + 0)].dt)}</label>
            <p><img src="${this.weatherMain(weather.list[0].weather[0].main)}" id="main_logo"/></p>
            <p>${Math.trunc(weather.list[15].main.temp)}°</p>
            <p class="parCard">${weather.list[15].weather[0].main}, ${weather.list[15].weather[0].description}</p>
        </button>
        </div>
        
        <div class="colum-btn">
        <button id="button4" type="button" class="btn btn-group">
            <p><label class="label_header">${this.weekConverter(day, 3)}</label></p>
            <label class="label_Date">${this.dateConverter(weather.list[this.daytime(weather, 'fourth', num + 0)].dt)}</label>
            <p><img src="${this.weatherMain(weather.list[0].weather[0].main)}" id="main_logo"/></p>
            <p>${Math.trunc(weather.list[25].main.temp)}°</p>
            <p class="parCard">${weather.list[25].weather[0].main}, ${weather.list[25].weather[0].description}</p>
        </button>
        </div>

        <div class="colum-btn">
        <button id="button5" type="button" class="btn btn-group">
            <p><label class="label_header">${this.weekConverter(day, 4)}</label></p>
            <label class="label_Date">${this.dateConverter(weather.list[this.daytime(weather, 'fifth', num + 0)].dt)}</label>
            <p><img src="${this.weatherMain(weather.list[0].weather[0].main)}" id="main_logo"/></p>
            <p>${Math.trunc(weather.list[30].main.temp)}°</p>
            <p class="parCard">${weather.list[30].weather[0].main}, ${weather.list[30].weather[0].description}</p>
        </button>
        </div>
        </div>
    `;
        return html;
    }

    //* Повертає інформацію до п`ятого віджету
    renderCard2(weather, btn) {


        let day = new Date().getDay();
        let num = 0;
        console.log(`btn: ${btn} ${this.daytime(weather, btn, num + 0)}`);
        let html = `
        <div id="table-vidget" class="cont table-responsive">
        <table class="table table-hover">
            <tr class="trow">
                <th>${this.weekConverter(day, btn)}</th>
                <td class="tdrow">${this.timeConverter(weather.list[this.daytime(weather, btn, num + 0)].dt)}</td>
                <td class="tdrow">${this.timeConverter(weather.list[this.daytime(weather, btn, num + 1)].dt)}</td>
                <td class="tdrow">${this.timeConverter(weather.list[this.daytime(weather, btn, num + 2)].dt)}</td>
                <td class="tdrow">${this.timeConverter(weather.list[this.daytime(weather, btn, num + 3)].dt)}</td>
                <td class="tdrow">${this.timeConverter(weather.list[this.daytime(weather, btn, num + 4)].dt)}</td>
                <td class="tdrow">${this.timeConverter(weather.list[this.daytime(weather, btn, num + 5)].dt)}</td>
                <td class="tdrow">${this.timeConverter(weather.list[this.daytime(weather, btn, num + 6)].dt)}</td>
                <td class="tdrow">${this.timeConverter(weather.list[this.daytime(weather, btn, num + 7)].dt)}</td>
            </tr>
            <tr class="trow">
                <td></td>
                <td class="tdrow"><img src="${this.weatherMain(weather.list[this.daytime(weather, btn, num + 0)].weather[0].main)}" id="main_logo"/></td>
                <td class="tdrow"><img src="${this.weatherMain(weather.list[this.daytime(weather, btn, num + 1)].weather[0].main)}" id="main_logo"/></td>
                <td class="tdrow"><img src="${this.weatherMain(weather.list[this.daytime(weather, btn, num + 2)].weather[0].main)}" id="main_logo"/></td>
                <td class="tdrow"><img src="${this.weatherMain(weather.list[this.daytime(weather, btn, num + 3)].weather[0].main)}" id="main_logo"/></td>
                <td class="tdrow"><img src="${this.weatherMain(weather.list[this.daytime(weather, btn, num + 4)].weather[0].main)}" id="main_logo"/></td>
                <td class="tdrow"><img src="${this.weatherMain(weather.list[this.daytime(weather, btn, num + 5)].weather[0].main)}" id="main_logo"/></td>
                <td class="tdrow"><img src="${this.weatherMain(weather.list[this.daytime(weather, btn, num + 6)].weather[0].main)}" id="main_logo"/></td>
                <td class="tdrow"><img src="${this.weatherMain(weather.list[this.daytime(weather, btn, num + 7)].weather[0].main)}" id="main_logo"/></td>
            </tr>
            <tr class="trow">
                <th>Прогноз</th>
                <td class="tdrow">${this.translateMain(weather.list[this.daytime(weather, btn, num + 0)].weather[0].main)}</td>
                <td class="tdrow">${this.translateMain(weather.list[this.daytime(weather, btn, num + 1)].weather[0].main)}</td>
                <td class="tdrow">${this.translateMain(weather.list[this.daytime(weather, btn, num + 2)].weather[0].main)}</td>
                <td class="tdrow">${this.translateMain(weather.list[this.daytime(weather, btn, num + 3)].weather[0].main)}</td>
                <td class="tdrow">${this.translateMain(weather.list[this.daytime(weather, btn, num + 4)].weather[0].main)}</td>
                <td class="tdrow">${this.translateMain(weather.list[this.daytime(weather, btn, num + 5)].weather[0].main)}</td>
                <td class="tdrow">${this.translateMain(weather.list[this.daytime(weather, btn, num + 6)].weather[0].main)}</td>
                <td class="tdrow">${this.translateMain(weather.list[this.daytime(weather, btn, num + 7)].weather[0].main)}</td>
            </tr>
            <tr class="trow">
                <th>Температура(°C)</th>
                <td class="tdrow">${Math.trunc(weather.list[this.daytime(weather, btn, num + 0)].main.temp)}°</td>
                <td class="tdrow">${Math.trunc(weather.list[this.daytime(weather, btn, num + 1)].main.temp)}°</td>
                <td class="tdrow">${Math.trunc(weather.list[this.daytime(weather, btn, num + 2)].main.temp)}°</td>
                <td class="tdrow">${Math.trunc(weather.list[this.daytime(weather, btn, num + 3)].main.temp)}°</td>
                <td class="tdrow">${Math.trunc(weather.list[this.daytime(weather, btn, num + 4)].main.temp)}°</td>
                <td class="tdrow">${Math.trunc(weather.list[this.daytime(weather, btn, num + 5)].main.temp)}°</td>            
                <td class="tdrow">${Math.trunc(weather.list[this.daytime(weather, btn, num + 6)].main.temp)}°</td>            
                <td class="tdrow">${Math.trunc(weather.list[this.daytime(weather, btn, num + 7)].main.temp)}°</td>            
            </tr>
            <tr class="trow">
                <th>Як відчувається</th>
                <td class="tdrow">${Math.trunc(weather.list[this.daytime(weather, btn, num + 0)].main.feels_like)}°</td>
                <td class="tdrow">${Math.trunc(weather.list[this.daytime(weather, btn, num + 1)].main.feels_like)}°</td>
                <td class="tdrow">${Math.trunc(weather.list[this.daytime(weather, btn, num + 2)].main.feels_like)}°</td>
                <td class="tdrow">${Math.trunc(weather.list[this.daytime(weather, btn, num + 3)].main.feels_like)}°</td>
                <td class="tdrow">${Math.trunc(weather.list[this.daytime(weather, btn, num + 4)].main.feels_like)}°</td>
                <td class="tdrow">${Math.trunc(weather.list[this.daytime(weather, btn, num + 5)].main.feels_like)}°</td>
                <td class="tdrow">${Math.trunc(weather.list[this.daytime(weather, btn, num + 6)].main.feels_like)}°</td>
                <td class="tdrow">${Math.trunc(weather.list[this.daytime(weather, btn, num + 7)].main.feels_like)}°</td>
            </tr>
            <tr class="trow">
                <th>Вітер(км/год)</th>
                <td class="tdrow">${this.speedConverter(weather.list[this.daytime(weather, btn, num + 0)].wind.speed)} ${this.windDeg(weather.list[this.daytime(weather, btn, num + 0)].wind.deg)}</td>
                <td class="tdrow">${this.speedConverter(weather.list[this.daytime(weather, btn, num + 1)].wind.speed)} ${this.windDeg(weather.list[this.daytime(weather, btn, num + 1)].wind.deg)}</td>
                <td class="tdrow">${this.speedConverter(weather.list[this.daytime(weather, btn, num + 2)].wind.speed)} ${this.windDeg(weather.list[this.daytime(weather, btn, num + 2)].wind.deg)}</td>
                <td class="tdrow">${this.speedConverter(weather.list[this.daytime(weather, btn, num + 3)].wind.speed)} ${this.windDeg(weather.list[this.daytime(weather, btn, num + 3)].wind.deg)}</td>
                <td class="tdrow">${this.speedConverter(weather.list[this.daytime(weather, btn, num + 4)].wind.speed)} ${this.windDeg(weather.list[this.daytime(weather, btn, num + 4)].wind.deg)}</td>
                <td class="tdrow">${this.speedConverter(weather.list[this.daytime(weather, btn, num + 5)].wind.speed)} ${this.windDeg(weather.list[this.daytime(weather, btn, num + 5)].wind.deg)}</td>            
                <td class="tdrow">${this.speedConverter(weather.list[this.daytime(weather, btn, num + 6)].wind.speed)} ${this.windDeg(weather.list[this.daytime(weather, btn, num + 6)].wind.deg)}</td>            
                <td class="tdrow">${this.speedConverter(weather.list[this.daytime(weather, btn, num + 7)].wind.speed)} ${this.windDeg(weather.list[this.daytime(weather, btn, num + 7)].wind.deg)}</td>            
            </tr>
        </table>
        </div>
        </div>
        `
        return html;
    }

    //* Повертає інформацію до третього віджету
    NearbyCity(weather) {
        let html = `
            <div class="mini-card">
                    <div>
                        <label>${weather.name}</label>
                    </div>
                    <div>
                        <label><img src="${this.weatherMain(weather.main)}" id="main_logo" /></label>
                    </div>
                    <div>
                        <label>${Math.trunc(weather.temp)}°</label>
                    </div>
            </div>
        `;
        return html;
    }
}


export class ErrorPage {

    constructor() {
        this._modelCN = new CityName();
    }
    //* Повертає сторінку помилки у разі ії появи
    renderError(city) {
        let html = `
        <div>
            <img src="assets/img/error.png" id="error-img"/>
            <div id="error-mess">
                <h3>'${city}' не вдалося знайти.</h3>
                <h3>Будь ласка введіть інше місце.</h3>
            </div>
        </div>
       `;
        return html;
    }

}