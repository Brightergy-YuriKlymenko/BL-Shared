export default class AvatarUploadModalController {
  constructor($scope, $modalInstance, UserService) {
    'ngInject';

    this.$scope = $scope;
    this.$modalInstance = $modalInstance;
    this.UserService = UserService;

    this.initializeVM();
    this.loadProfile();
    this.listenEvents();
  }

  initializeVM() {
    this.bUploading = false;
    this.uploadPercent = 0;
    this.bUploadFailed = false;

    this.avatar = {
      file: null,
      myOriginalImage: null,
      myCroppedImage: null
    };

    this.isFileSelected = false;
  }

  closeModal() {
    if (this.bUploading) {
      return;
    }

    this.uploadPercent = 0;
    this.isFileSelected = false;
    this.bUploadFailed = false;
    this.$modalInstance.dismiss('cancel');
  }

  startUpload() {
    if (this.bUploading) {
      return;
    }

    this.bUploading = true;
    this.bUploadFailed = false;

    this.UserService
      .uploadLoggedInUserPhoto($scope.avatar.file, $scope.avatar.myCroppedImage)
      .then(updatedUser => {
        this.isFileSelected = false;
        this.$modalInstance.close(updatedUser);
      })
      .catch(error => {
        this.uploadPercent = 0;
        this.bUploadFailed = true;
      })
      .finally(
        () => this.bUploading = false,
        evt => this.uploadPercent = parseInt(100.0 * evt.loaded / evt.total)
      );
  }

  loadImagePreview() {
    const reader = new FileReader();

    reader.onload = evt => {
      if (!this.$$phase) {
        this.$scope.$apply(() => {
          this.avatar.myOriginalImage = evt.target.result;
        });
      }
    };
    reader.readAsDataURL(this.avatar.file);
  }

  loadAvatar(files) {
    if (!files.length) {
      return false;
    }

    this.isFileSelected = true;
    this.avatar.file = files[0];

    this.loadImagePreview();
  }
}
