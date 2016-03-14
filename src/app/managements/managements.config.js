export const router = ($stateProvider) => {
  'ngInject';

  $stateProvider
    .state('settings', {
      abstract: true,
      url: '/settings',
      template: '<div ui-view></div>'
    })
    .state('settings.profile', {
      url: '/profile',
      controller: 'ProfileController',
      templateUrl: 'app/managements/profile/tmpl/profile.template.html'
    })
    .state('settings.profile.detail', {
      url: '/detail',
      controller: 'DetailTabController',
      templateUrl: 'app/managements/profile/tmpl/detail.tab.template.html'
    });
};

