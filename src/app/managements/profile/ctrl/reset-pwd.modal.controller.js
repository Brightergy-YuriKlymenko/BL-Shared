export default class ResetPwdModalController {
  constructor($modalInstance, UserService, currentUser) {
    'ngInject';

    this.$modalInstance = $modalInstance;
    this.UserService = UserService;
    this.currentUser = currentUser;

    this.errorMessage = '';
    this.isSaving = false;
  }

  closeModal() {
    this.$modalInstance.dismiss('cancel');
  }

  resetPassword() {
    this.isSaving = true;
    this.UserService
      .sendResetPwdLink(currentUser.email)
      .then(resp => {
        this.isSucceeded = true;
        this.isFailure = false;
      })
      .catch(error => {
        this.isFailure = true;
        this.isSucceeded = false;
        this.errorMessage = error;
      })
      .finally(() => {
        this.isSaving = false;
      });
  }
}
