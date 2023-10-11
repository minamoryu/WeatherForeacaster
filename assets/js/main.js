import { SearchCity } from "./searchCity.js";
import { AutoSearchCity } from "./autoSearchCity.js";


$(document).ready(() => {

    console.log('proj -> start');

    let city = new SearchCity();
    let autoSearchCity = new AutoSearchCity();
    autoSearchCity.getData();
    $('#display3').hide();
    $('#today').click(() =>  {
        let btn = 'today';
        city.getData(btn);
    });

    $('#forecast').click(() => {
        let btn = 'forecast';
        city.getData(btn);
    });

});