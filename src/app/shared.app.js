/*!
 * Settings
 * Author: Ivan Vesely
 */

import * as config from './shared.config';

import Core from './core';
import Managements from './managements/managements.app';

angular
  .module('bl.shared', [
    'ngImgCrop',
    'ngFileUpload',
    'ui.router',

    Core,
    Managements
  ])
  .config(config.http)
  .config(config.router)
  .config(config.log)
  ;
