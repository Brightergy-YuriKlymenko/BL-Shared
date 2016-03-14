export default class ErrorInterceptor {
  constructor($q) {
    'ngInject';

    this.$q = $q;
  }

  response(response) {
    if (typeof response.data === 'object' && response.data.success !== 1) {
      // if call is api call && call is failed
      return this.responseError(response);
    } else if (typeof response.data === 'object' && response.data.message) {
      return this.$q.when(response.data.message);
    }

    return this.$q.when(response);
  }

  responseError(rejection) {
    const error = () => {
      let defaultMessage = 'Sorry! An error has ocurred, please try again or contact us.';
      let message = rejection.data.message || rejection.data || defaultMessage;
      $window.alert('Oops...', message, 'error');
    }

    error();

    return $q.reject(rejection);
  }
}
