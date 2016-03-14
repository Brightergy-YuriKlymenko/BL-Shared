import avatarUploadTmpl from '../tmpl/avatar-upload.modal.html';
import avatarUploadCtrl from './avatar-upload.modal.controller';
import BaseController from '../../../helpers/base-controller';

export default class ProfileController extends BaseController {
  constructor($scope, $state, $modal, UserService) {
    'ngInject';

    super($scope);

    this.$modal = $modal;
    this.$state = $state;
    this.UserService = UserService;

    this.initializeVM();
    this.listenEvents();
  }

  initializeVM() {
    this.tabs = [
      {
        heading: 'User Details',
        route:'settings.profile.detail',
        active: true
      },
      {
        heading: 'Social Networks',
        route:'settings.profile.social',
        active: false
      }
    ];
  }

  listenEvents() {
    this.observables.push(
      this.UserService
        .watchMe()
        .subscribe(this.loadProfile.bind(this))
    );

    this.$scope.$on('$stateChangeSuccess', () => {
      this.tabs.forEach(tab => {
        tab.active = $state.is(tab.route);
      });
    });
  }

  loadProfile(me) {
    this.currentUser = me;
    if (me.profilePictureUrl) {
      this.currentUser.avatarStyle = {
        'background-image': `url(${me.profilePictureUrl})`,
        'background-size': '100% 100%',
        'font-size': '0'
      };
    }
  }

  showProfileAvatarUploadModal () {
    const modalOptions = {
      template: avatarUploadTmpl,
      controller: avatarUploadCtrl,
      //animation: true,
      keyboard: false,
      backdrop: false,
      backdropClass: 'modal-backdrop',
      windowClass: 'modal-style'
    };

    this.$modal
      .open(modalOptions).result
      .then(updatedUser => this.currentUser.profilePictureUrl = updatedUser.profilePictureUrl);
  }
}
