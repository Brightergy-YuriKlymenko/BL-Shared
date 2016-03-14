import BaseController from '../../../helpers/base-controller';

export default class DetailTabController {
  constructor($scope, $state, $modal, UserService) {
    'ngInject';

    this.$scope = $scope;
    this.$state = $state;
    this.$modal = $modal;
    this.UserService = UserService;

    this.initializeVM();
    this.listenEvents();
  }

  initializeVM() {
    this.infoTextTemplate = {
      'BP': ['You are part of the Brightergy Organization.',
             'As Brightergy Personnel, you have full administrative access to the entire platform.'].join(' '),
      'Admin': ['You are an Admin for the {{ accountName}} account.',
        'As an Admin, you can manage data sources, other users, and all other aspects of the account.'].join(' '),
      'TM': ['You are a member of the {{ accountName }} team.',
        'As a Team Member, you can view data sources and use them in your apps.'].join(' ')
    };

    this.infoTextOfRole = this.infoTextTemplate.TM;
  }

  updateCurrentUser() {
    return this.UserService
      .updateUser({user: this.currentUser})
      .then(updated => this.UserService.setMe(updated))
      .then(me => {
        this.$scope.$emit('SETTINGS_PROFILE_CHANGED', me);
      });
  }

  showResetPwdModal() {
    this.$modal.open({
      templateUrl: 'app/profile-management/partials/reset-pwd.template.html',
      controller: 'profileResetPwdModalController',
      animation: 'fade',
      keyboard: false,
      backdrop: false,
      windowClass: 'modal-style',
      resolve: {
        currentUser: function () {
          return $scope.currentUser;
        }
      }
    });
  }

  showDeleteMeModal() {
    this.$modal.open({
      templateUrl: 'app/profile-management/partials/delete-me.template.html',
      controller: 'profileDeleteMeModalController',
      //animation: true,
      keyboard: false,
      backdrop: false,
      windowClass: 'modal-style',
      resolve: {
        currentUser: function () {
          return $scope.currentUser;
        }
      }
    });
  }
}
