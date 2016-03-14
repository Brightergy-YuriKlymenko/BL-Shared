import ProfileController from './ctrl/profile.controller';
import DetailTabController from './ctrl/detail.tab.controller';

export default angular
  .module('blComponents.Settings.Managements.Profile', [])
  .controller('ProfileController', ProfileController)
  .controller('DetailTabController', DetailTabController)
  .name;
