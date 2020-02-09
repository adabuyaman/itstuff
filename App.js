import {createAppContainer} from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer';
import gpaCalculator from './screen/gpaCalculator';
import SubjectNavigator from './src/subjects/main';
import Profile from './src/user/profile';
import CustomDrawer from './common/components/CustomDrawer';
import { Icon } from 'react-native-elements';
import React from 'react'
import common_styles from './common/styles/common_styles';
import Home from './src/home/home'

const MainNavigator = createDrawerNavigator({
  Home:{
    screen:Home,
    navigationOptions: ({ navigation }) => ({
      title: 'الصفحة الرئيسية',
      drawerIcon: ({tintColor}) => (
        <Icon size={18} color={tintColor} name='home' type='antdesign'/>
      )
    }),
  },
  User:{
    screen:Profile,
    navigationOptions: ({ navigation }) => ({
      title: 'الصفحة الشخصية',
      drawerIcon: ({tintColor}) => (
        <Icon size={18} color={tintColor} name='user' type='antdesign'/>
      )
    }),
  },
  subjectsList:{
    screen:SubjectNavigator,
    navigationOptions: ({ navigation }) => ({
      title: 'المواد الدراسية',
      drawerIcon: ({tintColor}) => (
        <Icon size={18} color={tintColor} name='book' type='antdesign'/>
      )
    }),
  },
  GPACalculator:{
    screen:gpaCalculator,
    navigationOptions: ({ navigation }) => ({
      title: 'حساب المعدل',
      drawerIcon: ({tintColor}) => (
        <Icon size={18} color={tintColor} name='calculator' type='antdesign'/>
      )
      
    }),
  },
  
},{
  initialRouteName:'Home',
  drawerPosition:'right',
  activeTintColor:'red',
  contentComponent: CustomDrawer,
  drawerType:'slide',
  defaultNavigationOptions:{
    drawerIcon:({tintColor})=><Icon color={tintColor} name='search' />,
    
  }
})

const App = createAppContainer(MainNavigator);

export default App;