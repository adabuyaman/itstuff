import React from 'react';
import { StyleSheet, View, Text, FlatList, ActivityIndicator, TextInput, TouchableOpacity, Alert } from 'react-native';
import common_styles, { style_objects } from '../../common/styles/common_styles';
import SubjectItem from './components/subject_component';
import { Icon } from 'react-native-elements';
import { DrawerActions } from 'react-navigation-drawer';
import Swipeable from '../../common/components/swipable';
import AsyncStorage from '@react-native-community/async-storage';
import links from '../../common/indexes/index'

class SubjectsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      subjects: [],
      searched_subjects: [],
      loading: false,
      search_string: '',
      userInfo: null,
      mysubjects: null,
      addBG: common_styles.colors.fail_color,
      loading: false,
    };
    this.get_mysubjects = this.get_mysubjects.bind(this);
  }

  async componentDidMount() {
    await this._get_all_subjects();
    await this.get_mysubjects();
  }

  static navigationOptions = ({ navigation }) => {
    return {
      title: 'المواد الدراسية',
      headerRight: () => (
        <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
          <Icon name='menu' containerStyle={{ paddingHorizontal: 20, height: '100%', justifyContent: 'center', alignItems: 'center' }} size={22} type='MaterialCommunityIcons' color={common_styles.colors.main_light_color} />
        </TouchableOpacity>
      ),
    };
  };

  async get_mysubjects() {
    let mysubjects = await AsyncStorage.getItem('mysubjects');
    if (mysubjects != undefined) {
      mysubjects = JSON.parse(mysubjects);
      // console.log(mysubjects);
      return mysubjects;
    }
    else {
      await AsyncStorage.setItem('mysubjects', JSON.stringify({}));
      return {};
    }
  }

  async _get_all_subjects() {
    this.setState({ loading: true });
    try {
      await fetch(links.SubjectsApi)
        .then((response) => response.json())
        .then((responseJson) => {
          this.setState({ subjects: responseJson, searched_subjects: responseJson })
        });
    }
    catch (error) {
      console.log(error);
    }
    this.setState({ loading: false });
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

  wannaAddAlert(subject) {
    Alert.alert(
      'إضافة مادة',
      'إضافة ' + subject.name + ' ' + 'الى جدول المواد الدراسية الخاص بك؟',
      [
        {
          text: 'لا',
          onPress: () => console.log('Canceled'),
          style: 'cancel',
        },
        {
          text: 'نعم',
          onPress: () => this.add_subject(subject),
        },
      ],
      { cancelable: false },
    );
  }

  async add_subject(subject) {
      let mysubjects = await this.get_mysubjects();
      mysubjects[subject.pk.toString()] = subject;
      try {
        // console.log(mysubjects);
        await AsyncStorage.setItem('mysubjects', JSON.stringify(mysubjects));
        // console.log('subject added');
      }
      catch (error) {
        console.log(error);
      }
  }

  // async add_subject(subject) {
  //   if (this.state.userInfo != null) {
  //     let userObject = this.state.userInfo;
  //     if (userObject.subjects != undefined) {
  //       userObject.subjects[subject.pk.toString()] = subject;
  //     }
  //     else {
  //       userObject.subjects = {};
  //       userObject.subjects[subject.pk.toString()] = subject;
  //     }
  //     try {
  //       await AsyncStorage.setItem('userInfo', JSON.stringify(userObject));
  //       console.log('subject added');
  //     }
  //     catch (error) {
  //       console.log(error);
  //     }
  //   }
  //   else {
  //     Alert.alert('')
  //   }
  // }

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
        <Text style={{ color: common_styles.colors.main_light_color, fontSize: 13 }}>إضافة</Text>
      </TouchableOpacity>
    );
    if (this.state.loading == false)
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
            removeClippedSubviews={true}
            maxToRenderPerBatch={10}
            initialNumToRender={10}
            contentContainerStyle={{ paddingBottom: 15 }}
            data={this.state.searched_subjects}
            renderItem={({ item }) =>
              <Swipeable style={{ flex: 1, height: '100%', marginTop: 7 }} rightActionActivationDistance={70} rightContent={rightContent} onRightActionRelease={() => this.wannaAddAlert(item)} rightContentContainerStyle={{ flex: 1 }}>
                <SubjectItem {...this.props} pk={item.pk} name={item.name} major={item.major} level={item.level} />
              </Swipeable>
            }
            keyExtractor={(item) => item.pk.toString()}
            ListEmptyComponent={<No_result_found />}
          />
        </View>
      );
    else {
      return (
        <View style={{ flex: 1 }}>
          <View style={[styles.main_container, { justifyContent: 'center', alignContent: 'center' }]}>
            <ActivityIndicator
              size='large'
              color={common_styles.colors.main_secondary_color}
            />
          </View>
        </View>
      );
    }
  }
};

const styles = StyleSheet.create({
  main_container: {
    ...style_objects.main_container,
    paddingBottom: 0
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