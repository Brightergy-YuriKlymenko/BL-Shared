class BaseController {
  constructor($scope) {
    'ngInject';

    this.$scope = $scope;
    this.observables = [];

    this.disposeAllObservables();
  }

  disposeAllObservables() {
    this.$scope.$on('$destroy', ()=> {
      this.observables.forEach(o=> o.dispose());
    });
  }

  invokeOnDestroy(fs) {
    this.$scope.$on('$destroy', fs);
  }
}

export default BaseController;
