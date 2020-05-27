import {Navigation} from 'react-native-navigation';

export function registerScreens() {
      Navigation.registerComponent('Dashboard', () => require('./screens/Dashboard').default);
      Navigation.registerComponent('Initializing', () => require('./Initializing').default);
      Navigation.registerComponent('SignIn', () => require('./login/SignIn').default);
      Navigation.registerComponent('SignUp', () => require('./login/SignUp').default);
      Navigation.registerComponent('Task', () => require('./screens/Task').default);
      Navigation.registerComponent('TaskEdit', () => require('./screens/TaskEdit').default);
      Navigation.registerComponent('Modal', () => require('./screens/SortModal').default);
}
