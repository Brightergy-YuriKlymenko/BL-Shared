export default class RequestInterceptor {
  constructor($q, apiEntryPoint) {
    'ngInject';

    this.$q = $q;
    this.apiEntryPoint = apiEntryPoint;
  }

  request(config) {
    if (config.url.search(/(.html|.js|.css|.png|.svg|.jpg|.gif|.swf)/i) === -1) {
      config.url = this.apiEntryPoint + config.url;
      config.withCredentials = true;
    }

    return config;
  }
}
