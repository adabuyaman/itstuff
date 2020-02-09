import { createStackNavigator } from 'react-navigation-stack';
import SubjectsList from './subjectsList';
import SubjectDetailView from './subject_detail';
import common_styles from '../../common/styles/common_styles';

const SubjectNavigator = createStackNavigator({
  subjectsList: {
    screen: SubjectsList
  },
  subject_detail: {
    screen: SubjectDetailView
  }
},
  {
    defaultNavigationOptions: {
      headerShown: true,
      headerStyle: {
        elevation: 0,
        backgroundColor: common_styles.colors.main_color,
        height: 50,
      },
      headerTitleAlign: 'center',
      headerTitleStyle: {
        color: common_styles.colors.main_light_color,
        fontSize: 18
      },
      headerTintColor: common_styles.colors.main_light_color,
      gestureEnabled: true,
    }
  })

export default SubjectNavigator;