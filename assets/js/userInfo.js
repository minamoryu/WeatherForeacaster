export class UserInfo {

    info()
    {
        return navigator;
    }
    
    async geoCoords() {
        const pos = await new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject);
        });

        return {
            lat: pos.coords.latitude,
            long: pos.coords.longitude
        };
    }
}