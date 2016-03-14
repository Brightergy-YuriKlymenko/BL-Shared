class WrapperController {
  constructor ($element) {
    'ngInject';

    $($element).on('click', 'button.close', this.onClose);
  }

}

export const managementsWrapper = {
  restrict: 'E',
  controller: WrapperController,
  bindings: {
    onClose: '&'
  },
  template: ['<div id="settings-wrapper">',
    '<button type="button" class="close"><span aria-hidden="true">&times;</span></button>',
    '<div class="global-settings-container" ui-view></div>',
    '</div>'].join(''),
}
