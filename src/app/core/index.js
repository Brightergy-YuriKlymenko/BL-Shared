import ErrorInterceptor from './error.interceptor';
import RequestInterceptor from './request.interceptor';
import UserService from './user.service';
import apiEntryPoint from './api-entrypoint.provider';

angular
  .module('bl.shared.core', [])
  .service('ErrorInterceptor', ErrorInterceptor)
  .service('RequestInterceptor', RequestInterceptor)
  .service('UserService', UserService)
  .provider('apiEntryPoint', apiEntryPoint)
;
