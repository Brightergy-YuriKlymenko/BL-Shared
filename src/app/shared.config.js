export const http = ($httpProvider) => {
  'ngInject';

  $httpProvider.interceptors.push('ErrorInterceptor');
  $httpProvider.interceptors.push('AuthenticationInterceptor');
};

export const log = ($logProvider) => {
  'ngInject';

  $logProvider.debugEnabled(true);
};

export const router = ($uiViewScrollProvider) => {
  'ngInject';

  $uiViewScrollProvider.useAnchorScroll();
};
