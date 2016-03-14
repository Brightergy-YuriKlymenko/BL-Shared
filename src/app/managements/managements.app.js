import * as config from './managements.config';
import * as component from './managements.component';
import * as run from './managements.run';

import Profile from './profile';

export default angular
  .module('blComponents.Settings.Managements', [
    'ngImgCrop',
    'ngFileUpload',
    'ui.router',


    Profile
  ])
  .config(config.router)
  .component('managementsWrapper', component.managementsWrapper)
  .run(run.closeInlineEditor)
  .name;
