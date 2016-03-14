export default class SocialTabController {
  constructor($scope, $window, apiEntryPoint, UserService) {
    this.$scope = $scope;
    this.$window = $window;
    this.apiEntryPoint = apiEntryPoint;
    this.UserService = UserService;


    this.UserService
      .getMe()
      .then(me => {
        this.renderOneAllWidget(this.$scope.currentUser);
      });
  }

  renderOneAllWidget(user) {
    const gridXSize = 3;
    const oneallSubdomain = 'brightergy';
    const window = this.$window;
    const document = this.$window.document;

    if (!window._oneall) {
      let oa = document.createElement('script');
      const s = document.getElementsByTagName('script')[0];

      oa.type = 'text/javascript';
      oa.async = true;
      oa.src = '//' + oneallSubdomain + '.api.oneall.com/socialize/library.js';
      s.parentNode.insertBefore(oa, s);
    }

    /* Replace #your_callback_uri# with the url to your own callback script */
    let redirectUrl = $window.location.toString();

    const part1 = redirectUrl.slice(0, -6);
    const part2 = redirectUrl.slice(-6);

    if (part2 === 'detail') {
      redirectUrl = part1 + 'social';
    }

    const yourCallbackScript = apiEntryPoint + '/v1/sociallogin?redirect=' + encodeURIComponent(redirectUrl);

    console.log(yourCallbackScript);

    const setCustomCssUri = apiEntryPoint + '/components/settings/dist/settings.min.css';

    /* Dynamically add the user_token of the currently logged in user. */
    /* If the user has no user_token then leave the field blank. */
    const userToken = user.socialToken;

    /* Embeds the buttons into the container oa_social_link_container */
    const _oneall = window._oneall || [];
    _oneall.push(['social_link', 'set_providers', ['google', 'facebook', 'twitter', 'amazon', 'yahoo',
      'windowslive', 'linkedin', 'github', 'openid']]);
    _oneall.push(['social_link', 'set_grid_sizes', [gridXSize, 5]]);
    _oneall.push(['social_link', 'set_callback_uri', yourCallbackScript]);
    _oneall.push(['social_link', 'set_custom_css_uri', setCustomCssUri]);
    _oneall.push(['social_link', 'set_user_token', userToken]);
    _oneall.push(['social_link', 'do_render_ui', 'oa_social_link_container']);
    window._oneall = _oneall;
  }
}
