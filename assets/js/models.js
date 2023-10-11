export class CityName {
    country = '-';
    lat = 0.0;
    lon = 0.0;
    name = '-';
    state = '-';
}

export class City {
    name = '-';
}

export class NearbyCity {
    name = '-';
    temp = '-';
    icon = '-';
}

export class Short {
    // 1:
    dt = '-'; // dt_txt
    icon = '-'; // weather.icon
    main = '-'; // weather.main
    temp = '-'; // main.temp
    feels_like = 0.0; // main.feels_like
    sunrise = 0; // sys.sunrise
    sunset = 0; // sys.sunset
}

export class Remnant {
    // 2:
    dt_txt = '-'; // .list[0].dt_txt
    list = [];
    icon = '-'; // .list[0].weather[0].icon
    main = '-'; // .list[0].weather[0].main
    temp = '-'; // .list[0].main.temp
    feels_like = '-'; // .list[0].main.feels_like
    speed = '-'; // .list[0].wind.speed
    deg = '-'; // .list[0].wind.deg
}

export class Card {
    list = [];
}
