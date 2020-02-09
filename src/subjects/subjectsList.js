import React from 'react';
import { StyleSheet, View, Text, FlatList, ActivityIndicator, TextInput, RefreshControl } from 'react-native';
import common_styles, { style_objects } from '../../common/styles/common_styles';
import SubjectItem from './components/subject_component';
import { Icon } from 'react-native-elements';
import { DrawerActions } from 'react-navigation-drawer';
import { TouchableNativeFeedback, TouchableOpacity } from 'react-native-gesture-handler';
import Swipeable from '../../common/components/swipable';
import AsyncStorage from '@react-native-community/async-storage';
import AwesomeAlert from 'react-native-awesome-alerts';

class SubjectsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      subjects: [],
      searched_subjects: [],
      loading: false,
      search_string: '',
      userInfo: null,
      addBG: common_styles.colors.fail_color,
      refreshing: false,
      showAddAlert: false
    };
    this._get_all_subjects = this._get_all_subjects.bind(this);
  }

  async componentDidMount() {
    await this._get_all_subjects();
    await this.get_user_data();
    this.setState({ showAddAlert: true })
  }

  static navigationOptions = ({ navigation }) => {
    return {
      title: 'المواد الدراسية',
      headerRight: () => (
        <TouchableNativeFeedback containerStyle={{ marginRight: 20 }} onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
          <Icon name='menu' containerStyle={{}} size={22} type='MaterialCommunityIcons' color={common_styles.colors.main_light_color} />
        </TouchableNativeFeedback>
      ),
    };
  };

  async get_user_data() {
    let userInfo = await AsyncStorage.getItem('userInfo');
    userInfo = JSON.parse(userInfo);
    this.setState({ userInfo: userInfo })
  }

  async _get_all_subjects() {
    this.setState({ refreshing: true });
    try {
      await fetch('http://laitheyad1.pythonanywhere.com/subjects/')
        .then((response) => response.json())
        .then((responseJson) => {
          this.setState({ subjects: responseJson, searched_subjects: responseJson })
        });
    }
    catch (error) {
      console.log(error);
    }
    this.setState({ refreshing: false });
  }

  local_search(text) {
    this.setState({ search_string: text });
    const subjects_list = this.state.subjects,
      searched_subjects_list = [];
    for (let i = 0; i < subjects_list.length; i++) {
      if (subjects_list[i].name.includes(text)) {
        searched_subjects_list.push(subjects_list[i]);
      }
    }
    this.setState({ searched_subjects: searched_subjects_list })
  }

  async add_subject(subject) {
    if (this.state.userInfo != null) {
      let userObject = this.state.userInfo;
      if (userObject.subjects != undefined) {
        userObject.subjects[subject.pk.toString()] = subject;
      }
      else {
        userObject.subjects = {};
        userObject.subjects[subject.pk.toString()] = subject;
      }
      try {
        await AsyncStorage.setItem('userInfo', JSON.stringify(userObject));
        console.log('subject added');
      }
      catch (error) {
        console.log(error);
      }
    }
    else {
      this.props.navigation.navigate('User');
    }
  }



  render() {
    const { loading, search_string } = this.state;
    const No_result_found = () => (
      <View>
        {
          !this.state.loading &&
          <View style={{ alignSelf: 'center', alignItems: 'center', justifyContent: 'center', marginTop: 20, }}>
            <Icon name='frowno' color={common_styles.colors.main_back_color_d1} size={45} type='antdesign' />
            <Text style={{ fontSize: 20, textAlign: 'center', color: common_styles.colors.main_back_color_d1, fontWeight: 'bold', marginTop: 4 }}>{'لا يوجد اي مواد\n مطابقة لذلك الأسم.'}</Text>
          </View>
        }
      </View>
    );
    const rightContent = (
      <TouchableOpacity onPress={() => console.log('s')} style={{ alignItems: 'center', justifyContent: 'center', width: 70, height: '100%', borderRadius: 5, marginLeft: 5, overflow: 'hidden' }}>
        <Icon name='plus' type='antdesign' size={18} color={common_styles.colors.main_light_color} />
        <Text style={{ color: common_styles.colors.main_light_color, fontSize: 13 }}>اضافة</Text>
      </TouchableOpacity>
    );
    return (
      <View style={styles.main_container}>
        <View style={styles.search_container}>
          {
            this.state.search_string.length > 0 ?
              <Icon name='cancel' onPress={() => this.local_search('')} type='MaterialIcons' color={common_styles.colors.main_color} />
              :
              <Icon name='search' type='FontAwesome' color='rgba(0,0,0,0.15)' />
          }
          <TextInput placeholder='ابحث عن اسم المادة . .' style={{ padding: 0, flex: 1, textAlign: 'right' }} value={search_string} onChangeText={(text) => this.local_search(text)} />
        </View>

        <ActivityIndicator style={{ display: loading ? 'flex' : 'none' }} animating={this.state.loading} size={24} color={common_styles.colors.main_color} />
        <FlatList
          data={this.state.searched_subjects}
          renderItem={({ item }) =>
            <Swipeable style={{ flex: 1, height: '100%', marginTop: 7 }} rightActionActivationDistance={70} rightContent={rightContent} onRightActionRelease={() => this.add_subject(item)} rightContentContainerStyle={{ flex: 1 }}>
              <SubjectItem {...this.props} pk={item.pk} name={item.name} major={item.major} level={item.level} />
            </Swipeable>
          }
          keyExtractor={(item) => item.pk.toString()}
          ListEmptyComponent={<No_result_found />}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              style={{ elevation: 0, borderRadius: 0 }}

              onRefresh={this._get_all_subjects.bind(this)}
              progressBackgroundColor={common_styles.colors.main_back_color_d1}
              colors={[common_styles.colors.main_color, common_styles.colors.pass_color,]}
            />
          }
        />
        {/* <AwesomeAlert
        alertContainerStyle={{justifyContent:'center',alignItems:'center'}}
          show={this.state.showAddAlert}
          showProgress={false}
          title="AwesomeAlert"
          message="I have a message for you!"
          closeOnTouchOutside={true}
          closeOnHardwareBackPress={false}
          showCancelButton={true}
          showConfirmButton={true}
          cancelText="No, cancel"
          confirmText="Yes, delete it"
          confirmButtonColor="#DD6B55"
          onCancelPressed={() => {
            this.hideAlert();
          }}
          onConfirmPressed={() => {
            this.hideAlert();
          }}
        /> */}
      </View>
    );
  }
};

const styles = StyleSheet.create({
  main_container: {
    ...style_objects.main_container
  },
  search_container: {
    backgroundColor: '#ecf0f1',
    borderRadius: 50,
    flexDirection: 'row',
    paddingVertical: 6,
    paddingHorizontal: 15,
    alignItems: 'center',
    marginBottom: 13,
    opacity: 0.95,
  }
});

export default SubjectsList;