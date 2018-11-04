// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
    production: false,
    BASE_URL: 'http://staging02.hosiana.com.vn',
    GOOGLE_API_KEY: 'AIzaSyDkmwDNzKl2b0YZdYDkrbOXLg6PuI45Byo',
    VERSION: 'api/v1',
    LANGUAGE: {
        default: 'en',
        supported: ['en', 'vi']
    },
    CURRENCY: {
        default: 'vnd',
        supported: ['vnd', 'usd']
    },

    VIDEO: {
        supported: ['mp4', 'webm', 'ogg']
    },

    PRO_URL: 'http://pro.hosiana.com.vn/',

    FACEBOOK_APPID:'2045069705544226',
    HOSTING: 'https://hosiana.vn/'
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
