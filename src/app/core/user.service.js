export default class UserService {
  constructor($http, $q, UtilService, Upload) {
    'ngInject';

    this.$http = $http;
    this.$q = $q;
    this.UtilService = UtilService;
    this.Upload = Upload;

    this.me = null;
    this.getMe();
  }

  setMe(me) {
    this.me = me;

    return me;
  }

  getMe() {
    if (this.me) {
      return this.$q.when(this.me);
    } else {
      return this.$http.get('/users/me')
        .then(this.setMe.bind(this));
    }
  }

  updateUser(data) {
    const apiUrl = '/users/' + (data.user.id || data.user._id);

    if (data.user.name) {
      var parsed = UtilService.parseName(data.user.name);
      data.user.firstName = parsed[0];
      data.user.middleName = parsed[1];
      data.user.lastName = parsed[2];
    }

    if (data.user.email.indexOf('@') > -1) {
      var emailParsed = UtilService.parseEmail(data.user.email);
      data.user.emailUser = emailParsed[0];
      data.user.emailDomain = emailParsed[1];
    }

    return this.$http.put(apiUrl, data);
  }

  logout() {
    const apiUrl = '/users/logout';
    return this.$http.post(apiUrl);
  }

  uploadMyPhoto(file, thumbnail) {
    const apiUrl = '/users/assets/userprofile';

    return this.Upload.upload({
      url: apiUrl,
      method: 'POST',
      fields: {
        hasCropped: 'true',
        imageBinary: thumbnail
      },
      file: file,
      sendFieldsAs: 'form'
    }).then(this.setMe.bind(this));
  }
}
