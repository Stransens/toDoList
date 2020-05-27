import { Navigation } from 'react-native-navigation'

export const goToAuth = () => Navigation.setRoot({
      root: {
            bottomTabs: {
                  id: 'BottomTabsId',
                  children: [
                        {
                              component: {
                                    name: 'SignIn',
                                    options: {
                                          bottomTab: {
                                                fontSize: 14,
                                                text: 'Sign In',
                                          }
                                    }
                              },
                        },
                        {
                              component: {
                                    name: 'SignUp',
                                    options: {
                                          bottomTab: {
                                                text: 'Sign Up',
                                                fontSize: 14,
                                          }
                                    }
                              },
                        },
                  ],
            }
      }
});

export const goHome = () => Navigation.setRoot({
      root: {
            stack: {
                  id: 'App',
                  children: [
                        {
                              component: {
                                    name: 'Dashboard',
                              }
                        },
                  ],
            }
      }
});
