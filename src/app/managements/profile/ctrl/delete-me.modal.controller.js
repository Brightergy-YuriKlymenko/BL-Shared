export default class DeleteMeModalController {
  constructor($modalInstance, UserService, currentUser, globalConfig) {
    'ngInject';

    this.$modalInstance = $modalInstance;
    this.UserService = UserService;
    this.currentUser = currentUser;
    this.globalConfig = globalConfig;

    this.isRemoving = false;
  }

  closeModal() {
    this.$modalInstance.dismiss('cancel');
  }

  deleteUser() {
    this.isRemoving = true;
    this.UserService
      .deleteUser(this.currentUser._id || this.currentUser.id)
      .then(() => {
        this.UserService
          .logout()
          .then(() => window.location.href = globalConfig['REDIRECT-URL-AFTER-LOGOUT']);
      })
      .catch(errorMessage => this.errorMessage = errorMessage)
      .finally(this.isRemoving = false);
  }
}
