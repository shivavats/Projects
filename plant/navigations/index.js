import React from "react";
import { Image } from "react-native";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

import Welcome from "../screens/Welcome";
import Login from "../screens/Login";
import Forgot from "../screens/Forgot";
import SignUp from "../screens/SignUp";
import Explore from "../screens/Explore";
import Browse from "../screens/Browse";
import Product from "../screens/Product";
import Settings from "../screens/Settings";
import Plants from "../screens/Plants";
import PostAd from "../screens/PostAd";
import Seeds from "../screens/Seeds";
import Flowers from "../screens/Flowers";
import Sprayers from "../screens/Sprayers";
import Pots from "../screens/Pots";
import Fertilizers from "../screens/Fertilizers";

import { theme } from "../constants";

const Screens = createStackNavigator(
  {
    //Welcome: { screen: Welcome, navigationOptions: { headerShown: false } },
    Login: {
      screen: Login,
      navigationOptions: {
        headerTransparent: true,
      },
    },
    Explore,
    SignUp: {
      screen: SignUp,
      navigationOptions: {
        headerTransparent: true,
      },
    },
    Browse: {
      screen: Browse,
      navigationOptions: {
        headerTransparent: true,
        headerTitle: () => null,
      },
    },
    Product: {
      screen: Product,
      navigationOptions: {
        headerTransparent: true,
      },
    },
    Settings: {
      screen: Settings,
      navigationOptions: {
        headerTransparent: true,
        headerTitle: () => null,
      },
    },
    Forgot: {
      screen: Forgot,
      navigationOptions: {
        headerTransparent: true,
      },
    },
    Plants: {
      screen: Plants,
      navigationOptions: {
        headerTransparent: true,
      },
    },
    PostAd: {
      screen: PostAd,
      navigationOptions: {
        headerTransparent: true,
      },
    },
    Seeds: {
      screen: Seeds,
      navigationOptions: {
        headerTransparent: true,
      },
    },
    Flowers: {
      screen: Flowers,
      navigationOptions: {
        headerTransparent: true,
      },
    },
    Sprayers: {
      screen: Sprayers,
      navigationOptions: {
        headerTransparent: true,
      },
    },
    Pots: {
      screen: Pots,
      navigationOptions: {
        headerTransparent: true,
      },
    },
    Fertilizers: {
      screen: Fertilizers,
      navigationOptions: {
        headerTransparent: true,
      },
    },
  }
  // {
  //   defaultNavigationOption: {
  //     headerStyle: {
  //       backgroundColor: theme.colors.white,
  //       borderBottomColor: theme.colors.white,
  //       elevation: 8,
  //     },
  //     headerBackImage: <Image />,
  //     headerBacktitle: null,
  //     headerLeftContainerStyle: {},
  //     headerRightContainerStyle: {},
  //   },
  // }
);

export default createAppContainer(Screens);
