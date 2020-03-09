import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Picker,
  TouchableOpacity,
  SafeAreaView
} from 'react-native';
import common_styles, { style_objects } from '../../common/styles/common_styles';
import Button from '../../common/components/button';
import AsyncStorage from '@react-native-community/async-storage';
import { DrawerActions } from 'react-navigation-drawer'
import { Icon } from 'react-native-elements';
import MySubjectsModal from './mysubjects';

export default class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      level: '',
      major: '',
      subjects: {},
    }
    this.saveUserInfo = this.saveUserInfo.bind(this);
    this.getUserInfo = this.getUserInfo.bind(this);
    this._forceUpdate = this._forceUpdate.bind(this);
  }

  componentDidMount() {
    this.getUserInfo();
    this.focusListener = this.props.navigation.addListener('didFocus', () => {
      this._forceUpdate();
    });
  }

  async _forceUpdate() {
    await this.getUserInfo();
    this.setState({ count: 0 });
  }

  async saveUserInfo() {
    //console.log('in saveUserInfo')
    let userObject = {
      name: this.state.name,
      level: this.state.level,
      major: this.state.major,
      subjects: this.state.subjects
    }
    await AsyncStorage.setItem('userInfo', JSON.stringify(userObject))
    this.props.navigation.navigate('subjectsList');
  };

  async getUserInfo() {
    try {
      let userInfo = await AsyncStorage.getItem('userInfo');
      if (userInfo != null) {
        let userInfoObject = JSON.parse(userInfo);
        this.setState({
          name: userInfoObject.name,
          major: userInfoObject.major,
          level: userInfoObject.level,
          subjects: userInfoObject.subjects
        })
        //console.log('user object:', userInfo)
      }
      else {
        //console.log('not a user')
      }
    }
    catch (error) {
      console.log(error)
    }
  }

  componentWillUnmount() {
    // Remove the event listener before removing the screen from the stack
    this.focusListener.remove();
  }

  render() {
    return (
      <SafeAreaView style={styles.main_container}>
        <TouchableOpacity style={{ position: 'absolute', top: 0, right: 0, padding: 20 }} onPress={() => this.props.navigation.dispatch(DrawerActions.openDrawer())}>
          <Icon name='menu' containerStyle={{}} size={22} type='MaterialCommunityIcons' color={common_styles.colors.main_light_color} />
        </TouchableOpacity>
        <View style={{ flex: 1 }}>
          <View style={{ alignItems: 'center', justifyContent: 'center', marginBottom: 10 }}>
            <Icon reverse iconStyle={{ color: common_styles.colors.main_light_color }} name='user' color={common_styles.colors.main_color} type='antdesign' size={50} />
          </View>
          <View style={styles.field_container}>
            <TextInput value={this.state.name} placeholder='الأسم' style={styles.input} onChangeText={(text) => this.setState({ name: text })} />
            <Icon color={common_styles.colors.main_light_color} containerStyle={styles.field_icon_container} name='idcard' type='antdesign' />
          </View>
          <View style={styles.picker_container}>
            <Picker mode='dropdown' itemStyle={{ color: 'red' }} prompt='السنة الدراسية' style={styles.input} selectedValue={this.state.level} onValueChange={(text) => this.setState({ level: text })} >
              <Picker.Item label='السنة الدراسية ..' value={null} />
              <Picker.Item label='أولى' value={1} />
              <Picker.Item label='ثانية' value={2} />
              <Picker.Item label='ثالثه' value={3} />
              <Picker.Item label='رابعه' value={4} />
            </Picker>
            <Icon color={common_styles.colors.main_light_color} containerStyle={styles.field_icon_container} name='rocket1' type='antdesign' />
          </View>
          <View style={styles.picker_container}>
            <Picker mode='dropdown' style={styles.input} selectedValue={this.state.major} onValueChange={(text) => this.setState({ major: text })} >
              <Picker.Item label='التخصص ..' value={null} />
              <Picker.Item label='علم حاسوب' value='CS' />
              <Picker.Item label='أنظمة معلومات حاسوبية' value='CIS' />
              <Picker.Item label='تكنولوجيا معلومات الأعمال' value='BIT' />
            </Picker>
            <Icon color={common_styles.colors.main_light_color} containerStyle={styles.field_icon_container} name='book' type='antdesign' />
          </View>
          {/* <TouchableOpacity onPress={() => this.refs.mysubjects.show(this.state.subjects)}>
            <View style={styles.subjects_header}>
              <View>
                <Icon name='table' color={common_styles.colors.main_light_color} type='antdesign' containerStyle={{ padding: 10, marginBottom: 5, backgroundColor: common_styles.colors.main_back_color, borderRadius: 50 }} />
              </View>
              <Text style={{ color: common_styles.colors.main_light_color }}>جدولك الدراسي</Text>
            </View>
          </TouchableOpacity> */}
        </View>
        <Button label='حفظ' icon='save' onPress={this.saveUserInfo} />
        <MySubjectsModal forceUpdate={this._forceUpdate} {...this.props} ref='mysubjects' />
      </SafeAreaView>
    );
  }
};

const styles = StyleSheet.create({
  main_container: {
    ...style_objects.main_container,
  },
  field_container: {
    width: '100%',
    flexDirection: 'row',
    borderRadius: 30,
    backgroundColor: common_styles.colors.main_back_color_light,
    marginBottom: 15,
    paddingHorizontal: 13,
    direction: 'rtl',
  },
  field_icon_container: {
    position: 'absolute',
    height: '100%', backgroundColor: common_styles.colors.main_color,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 15,
    borderTopStartRadius: 10,
    borderBottomStartRadius: 10
  },
  picker_container: {
    width: '100%',
    flexDirection: 'row',
    borderRadius: 30,
    backgroundColor: common_styles.colors.main_back_color_light,
    marginBottom: 15,
    direction: 'rtl',
  },
  input: {
    flex: 1,
    textAlign: 'right',
    color: common_styles.colors.main_light_color,
  },
  subjects_header: {
    width: '50%',
    backgroundColor: common_styles.colors.main_color,
    paddingVertical: 20,
    textAlign: 'center',
    color: common_styles.colors.main_light_color,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end'
  },
})

// import React from 'react';
// import {
//   StyleSheet,
//   Text,
//   View,
//   TextInput,
//   Picker,
//   
//   TouchableOpacity
// } from 'react-native';
// import common_styles, { style_objects } from '../../common/styles/common_styles';
// import Button from '../../common/components/button';
// import AsyncStorage from '@react-native-community/async-storage';
// import { DrawerActions } from 'react-navigation-drawer'
// import { Icon } from 'react-native-elements';
// import MySubjectsModal from './mysubjects';

// export default class Profile extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       name: '',
//       level: '',
//       major: '',
//       subjects: {},
//     }
//     this.saveUserInfo = this.saveUserInfo.bind(this);
//     this.getUserInfo = this.getUserInfo.bind(this);
//     this._forceUpdate = this._forceUpdate.bind(this);
//   }

//   componentDidMount() {
//     this.getUserInfo();
//     this.focusListener = this.props.navigation.addListener('didFocus', () => {
//       this._forceUpdate();
//     });
//   }

//   async _forceUpdate() {
//     await this.getUserInfo();
//     this.setState({ count: 0 });
//   }

//   async saveUserInfo() {
//     //console.log('in saveUserInfo')
//     let userObject = {
//       name: this.state.name,
//       level: this.state.level,
//       major: this.state.major,
//       subjects: this.state.subjects
//     }
//     await AsyncStorage.setItem('userInfo', JSON.stringify(userObject))
//     this.props.navigation.navigate('subjectsList');
//   };

//   async getUserInfo() {
//     try {
//       let userInfo = await AsyncStorage.getItem('userInfo');
//       if (userInfo != null) {
//         let userInfoObject = JSON.parse(userInfo);
//         this.setState({
//           name: userInfoObject.name,
//           major: userInfoObject.major,
//           level: userInfoObject.level,
//           subjects: userInfoObject.subjects
//         })
//         //console.log('user object:', userInfo)
//       }
//       else {
//         //console.log('not a user')
//       }
//     }
//     catch (error) {
//       //console.log(error)
//     }
//   }

//   componentWillUnmount() {
//     // Remove the event listener before removing the screen from the stack
//     this.focusListener.remove();
//   }

//   render() {
//     return (
//       <View style={styles.main_container}>
//         <TouchableOpacity style={{ position: 'absolute', top: 0, right: 0, padding: 20 }} onPress={() => this.props.navigation.dispatch(DrawerActions.openDrawer())}>
//           <Icon name='menu' containerStyle={{}} size={22} type='MaterialCommunityIcons' color={common_styles.colors.main_light_color} />
//         </TouchableOpacity>
//         <View style={{ flex: 1 }}>
//           <View style={{ alignItems: 'center', justifyContent: 'center', marginBottom: 10 }}>
//             <Icon reverse iconStyle={{ color: common_styles.colors.main_light_color }} name='user' color={common_styles.colors.main_color} type='antdesign' size={50} />
//           </View>
//           <View style={styles.field_container}>
//             <TextInput value={this.state.name} placeholder='الأسم' style={styles.input} onChangeText={(text) => this.setState({ name: text })} />
//             <Icon color={common_styles.colors.main_light_color} containerStyle={styles.field_icon_container} name='idcard' type='antdesign' />
//           </View>
//           <View style={styles.picker_container}>
//             <Picker mode='dropdown' itemStyle={{ color: 'red' }} prompt='السنة الدراسية' style={styles.input} selectedValue={this.state.level} onValueChange={(text) => this.setState({ level: text })} >
//               <Picker.Item label='السنة الدراسية ..' value={null} />
//               <Picker.Item label='أولى' value={1} />
//               <Picker.Item label='ثانية' value={2} />
//               <Picker.Item label='ثالثه' value={3} />
//               <Picker.Item label='رابعه' value={4} />
//             </Picker>
//             <Icon color={common_styles.colors.main_light_color} containerStyle={styles.field_icon_container} name='rocket1' type='antdesign' />
//           </View>
//           <View style={styles.picker_container}>
//             <Picker mode='dropdown' style={styles.input} selectedValue={this.state.major} onValueChange={(text) => this.setState({ major: text })} >
//               <Picker.Item label='التخصص ..' value={null} />
//               <Picker.Item label='علم حاسوب' value='CS' />
//               <Picker.Item label='أنظمة معلومات حاسوبية' value='CIS' />
//               <Picker.Item label='تكنولوجيا معلومات الأعمال' value='BIT' />
//             </Picker>
//             <Icon color={common_styles.colors.main_light_color} containerStyle={styles.field_icon_container} name='book' type='antdesign' />
//           </View>
//           <TouchableOpacity onPress={() => this.refs.mysubjects.show(this.state.subjects)}>
//             <View style={styles.subjects_header}>
//               <View>
//                 {/* <View style={{ position: 'absolute', zIndex: 2, top: -10, left: -10, paddingVertical: 4, paddingHorizontal: 6, borderRadius: 20, backgroundColor: '#27ae60', justifyContent: 'center', alignItems: 'center' }}>
//                   <Text style={{ color: common_styles.colors.main_light_color, fontSize: 11 }}>{Object.keys(this.state.subjects).length}</Text>
//                 </View> */}
//                 <Icon name='table' color={common_styles.colors.main_light_color} type='antdesign' containerStyle={{ padding: 10, marginBottom: 5, backgroundColor: common_styles.colors.main_back_color, borderRadius: 50 }} />
//               </View>
//               <Text style={{ color: common_styles.colors.main_light_color }}>جدولك الدراسي</Text>
//             </View>
//           </TouchableOpacity>
//         </View>
//         <Button label='حفظ' icon='save' onPress={this.saveUserInfo} />
//         <MySubjectsModal forceUpdate={this._forceUpdate} {...this.props} ref='mysubjects' />
//       </View>
//     );
//   }
// };

// const styles = StyleSheet.create({
//   main_container: {
//     ...style_objects.main_container,
//   },
//   field_container: {
//     width: '100%',
//     flexDirection: 'row',
//     borderRadius: 30,
//     backgroundColor: common_styles.colors.main_back_color_light,
//     marginBottom: 15,
//     paddingHorizontal: 13,
//     direction: 'rtl',
//   },
//   field_icon_container: {
//     position: 'absolute',
//     height: '100%', backgroundColor: common_styles.colors.main_color,
//     alignItems: 'center',
//     justifyContent: 'center',
//     paddingHorizontal: 15,
//     borderTopStartRadius: 10,
//     borderBottomStartRadius: 10
//   },
//   picker_container: {
//     width: '100%',
//     flexDirection: 'row',
//     borderRadius: 30,
//     backgroundColor: common_styles.colors.main_back_color_light,
//     marginBottom: 15,
//     direction: 'rtl',
//   },
//   input: {
//     flex: 1,
//     textAlign: 'right',
//     color: common_styles.colors.main_light_color,
//   },
//   subjects_header: {
//     width: '50%',
//     backgroundColor: common_styles.colors.main_color,
//     paddingVertical: 20,
//     textAlign: 'center',
//     color: common_styles.colors.main_light_color,
//     borderRadius: 15,
//     justifyContent: 'center',
//     alignItems: 'center',
//     alignSelf: 'flex-end'
//   },
// })