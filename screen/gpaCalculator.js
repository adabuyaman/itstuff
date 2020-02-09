
import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Picker,
  FlatList,
  ScrollView

} from 'react-native';
import Modal from 'react-native-modalbox'
import common_style, { style_objects } from '../common/styles/common_styles'
import Button from '../common/components/button'
import { Icon } from 'react-native-elements';
import common_styles from '../common/styles/common_styles';
import { DrawerActions } from 'react-navigation-drawer'
import { CheckBox } from 'react-native-elements';
import ProgressCircle from 'react-native-progress-circle';
class gpaCalculator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Allhours: '',
      fullGPA: '',
      semesterHours: '',
      modalVisible: true,
      m1: null, m2: null, m3: null, m4: null, m5: null, m6: null, m7: null,
      h1: 3, h2: 3, h3: 3, h4: 3, h5: 3, h6: 3, h7: 3,
      c1: false, c2: false, c3: false, c4: false, c5: false, c6: false, c7: false,
      rm1: null, rm2: null, rm3: null, rm4: null, rm5: null, rm6: null, rm7: null,
      totalHours: 0,
    }
    this.calculate = this.calculate.bind(this);
  }


  calculate() {

    let oldGPA = this.state.Allhours * this.state.fullGPA;
    let Allhours = parseInt(this.state.Allhours);
    let newGPA = 0;
    let counter = 0;
    if (this.state.m1 != null) {
      newGPA += this.state.m1 * this.state.h1;
      counter += this.state.h1;
    }
    if (this.state.m2 != null) {
      newGPA += this.state.m2 * this.state.h2;
      counter += this.state.h2;

    }
    if (this.state.m3 != null) {
      newGPA += this.state.m3 * this.state.h3;
      counter += this.state.h3

    }
    if (this.state.m4 != null) {
      newGPA += this.state.m4 * this.state.h4;
      counter += this.state.h4

    }
    if (this.state.m5 != null) {
      newGPA += this.state.m5 * this.state.h5;
      counter += this.state.h5

    }
    if (this.state.m6 != null) {
      newGPA += this.state.m6 * this.state.h6;
      counter += this.state.h6

    }
    if (this.state.m7 != null) {
      newGPA += this.state.m7 * this.state.h7;
      counter += this.state.h7
    }
    if (this.state.c1 == true) {
      oldGPA -= (this.state.rm1 * this.state.h1);
      Allhours -= this.state.h1
    }
    if (this.state.c2 == true) {
      oldGPA -= (this.state.rm2 * this.state.h2);
      Allhours -= this.state.h2
    }

    if (this.state.c3 == true) {
      oldGPA -= (this.state.rm3 * this.state.h3);
      Allhours -= this.state.h3
    }

    if (this.state.c4 == true) {
      oldGPA -= (this.state.rm4 * this.state.h104);
      Allhours -= this.state.h4
    }

    if (this.state.c5 == true) {
      oldGPA -= (this.state.rm5 * this.state.h5);
      Allhours -= this.state.h5
    }

    if (this.state.c6 == true) {
      oldGPA -= (this.state.rm6 * this.state.h6);
      Allhours -= this.state.h6
    }

    if (this.state.c7 == true) {
      oldGPA -= (this.state.rm7 * this.state.h7);
      Allhours -= this.state.h7
    }


    let semGPA = newGPA / counter;
    let fullGPA = (oldGPA + newGPA) / (counter + Allhours);
     this.state.totalHours=(counter + Allhours)
    if (fullGPA > 4) {
      alert('خطأ بإدخال علاماتك المعادة')
    } else {
     
      // alert(fullGPA)
   
      this.refs.progress.open();
    }
  }

  render() {
    const markOptions =
      [
        {
          label: 'اختر العلامه',
          value: null
        },
        {
          label: 'أ',
          value: 4
        },
        {
          label: '-أ',
          value: 3.75
        },
        {
          label: '+ب',
          value: 3.5
        },
        {
          label: 'ب',
          value: 3
        },
        {
          label: '-ب',
          value: 2.75
        },
        {
          label: '+ج',
          value: 2.5
        },
        {
          label: 'ج',
          value: 2
        },
        {
          label: '-ج',
          value: 1.75
        },
        {
          label: '+د',
          value: 1.5
        },
        {
          label: 'د',
          value: 1
        },
        {
          label: '-د',
          value: 0.75
        },
        {
          label: 'هـ',
          value: 0
        },
      ]

    const hoursOptions = [3, 2, 1]

    return (
      <View style={style_objects.main_container}>
        <TouchableOpacity style={{ position: 'absolute', top: 20, right: 20, zIndex: 2 }} onPress={() => this.props.navigation.dispatch(DrawerActions.openDrawer())}>
          <Icon name='menu' containerStyle={{}} size={22} type='MaterialCommunityIcons' color={common_styles.colors.main_light_color} />
        </TouchableOpacity>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{}}>

          <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <View style={styles.container, { borderBottomWidth: 1 }}>
              <TextInput placeholderTextColor={common_styles.colors.main_light_color} placeholder="المعدل التراكمي" underlineColorAndroid='transparent' keyboardType={'numeric'}
                value={this.state.fullGPA} style={{ width: 300, textAlign: 'center', color: common_styles.colors.main_light_color }} onChangeText={(text) => this.setState({ fullGPA: parseFloat(text) })} />
            </View>
            <View style={styles.container, { borderBottomWidth: 1 }}>
              <TextInput placeholderTextColor={common_styles.colors.main_light_color} placeholder="الساعات المقطوعه" underlineColorAndroid='transparent' keyboardType={'numeric'}
                value={this.state.Allhours} style={{ width: 300, textAlign: 'center' }} onChangeText={(text) => this.setState({ Allhours: parseInt(text, 10) })} />
            </View>


          </View>
          <View style={{ marginTop: 20, }}>
            <View style={styles.picker_container}>
              <CheckBox
                checked={this.state.c1}
                onPress={() => { this.state.c1 ? this.setState({ c1: false }) : this.setState({ c1: true }) }}
                title='هل المادة معادة ؟'
                checkedColor='#fff'
                checkedTitle='.'
                containerStyle={[styles.CheckBoxStyle, { backgroundColor: '#2c3e50', borderWidth: 0, width: this.state.c1 ? '8%' : '38%' }]}
                textStyle={{ color: '#fff', fontSize: 10 }}

              />
              <Picker style={[styles.markPicker, { color: common_styles.colors.main_light_color, display: this.state.c1 ? 'flex' : 'none' }]} selectedValue={this.state.rm1} onValueChange={(text) => this.setState({ rm1: text })} >
                {markOptions.map((item, index) => {
                  return (<Picker.Item label={item.label} value={item.value} key={index} />)
                })}
              </Picker>
              <Picker style={[styles.markPicker, { color: common_styles.colors.main_light_color }]} selectedValue={this.state.m1} onValueChange={(text) => this.setState({ m1: text })} >
                {markOptions.map((item, index) => {
                  return (<Picker.Item label={item.label} value={item.value} key={index} />)
                })}
              </Picker>
              <Picker style={[styles.hoursPicker, { color: common_styles.colors.main_light_color }]} selectedValue={this.state.h1} onValueChange={(text) => this.setState({ h1: text })}>
                {hoursOptions.map((item, index) => {
                  return (<Picker.Item style={{ textAlign: 'right' }} label={item.toString()} value={item} key={index} />)
                })}
              </Picker>

            </View>

            <View style={styles.picker_container}>
              <CheckBox
                checkedTitle='.'

                checked={this.state.c2}
                onPress={() => { this.state.c2 ? this.setState({ c2: false }) : this.setState({ c2: true }) }}
                title='هل المادة معادة ؟'
                checkedColor='#fff'
                containerStyle={[styles.CheckBoxStyle, { backgroundColor: '#2c3e50', borderWidth: 0, borderWidth: 0, width: this.state.c2 ? '8%' : '38%' }]}
                textStyle={{ color: '#fff', fontSize: 10 }}
              />
              <Picker style={[styles.markPicker, { color: common_styles.colors.main_light_color, display: this.state.c2 ? 'flex' : 'none' }]} selectedValue={this.state.rm2} onValueChange={(text) => this.setState({ rm2: text })} >
                {markOptions.map((item, index) => {
                  return (<Picker.Item label={item.label} value={item.value} key={index} />)
                })}
              </Picker>
              <Picker style={[styles.markPicker, { color: common_styles.colors.main_light_color }]} selectedValue={this.state.m2} onValueChange={(text) => this.setState({ m2: text })} >
                {markOptions.map((item, index) => {
                  return (<Picker.Item label={item.label} value={item.value} key={index} />)
                })}
              </Picker>
              <Picker style={[styles.hoursPicker, { color: common_styles.colors.main_light_color }]} selectedValue={this.state.h2} onValueChange={(text) => this.setState({ h2: text })}>
                {hoursOptions.map((item, index) => {
                  return (<Picker.Item label={item.toString()} value={item} key={index} />)
                })}
              </Picker>
            </View>

            <View style={styles.picker_container}>
              <CheckBox
                checkedTitle='.'

                checked={this.state.c3}
                onPress={() => { this.state.c3 ? this.setState({ c3: false }) : this.setState({ c3: true }) }}
                title='هل المادة معادة ؟'
                checkedColor='#fff'
                containerStyle={[styles.CheckBoxStyle, { backgroundColor: '#2c3e50', borderWidth: 0, borderWidth: 0, width: this.state.c3 ? '8%' : '38%' }]}
                textStyle={{ color: '#fff', fontSize: 10 }}
              />
              <Picker style={[styles.markPicker, { color: common_styles.colors.main_light_color, display: this.state.c3 ? 'flex' : 'none' }]} selectedValue={this.state.rm3} onValueChange={(text) => this.setState({ rm3: text })} >
                {markOptions.map((item, index) => {
                  return (<Picker.Item label={item.label} value={item.value} key={index} />)
                })}
              </Picker>
              <Picker style={[styles.markPicker, { color: common_styles.colors.main_light_color }]} selectedValue={this.state.m3} onValueChange={(text) => this.setState({ m3: text })} >
                {markOptions.map((item, index) => {
                  return (<Picker.Item label={item.label} value={item.value} key={index} />)
                })}
              </Picker>
              <Picker style={[styles.hoursPicker, { color: common_styles.colors.main_light_color }]} selectedValue={this.state.h3} onValueChange={(text) => this.setState({ h3: text })}>
                {hoursOptions.map((item, index) => {
                  return (<Picker.Item label={item.toString()} value={item} key={index} />)
                })}
              </Picker>
            </View>

            <View style={styles.picker_container}>
              <CheckBox
                checkedTitle='.'

                checked={this.state.c4}
                onPress={() => { this.state.c4 ? this.setState({ c4: false }) : this.setState({ c4: true }) }}
                title='هل المادة معادة ؟'
                checkedColor='#fff'
                containerStyle={[styles.CheckBoxStyle, { backgroundColor: '#2c3e50', borderWidth: 0, borderWidth: 0, width: this.state.c4 ? '8%' : '38%' }]}
                textStyle={{ color: '#fff', fontSize: 10 }}
              />
              <Picker style={[styles.markPicker, { color: common_styles.colors.main_light_color, display: this.state.c4 ? 'flex' : 'none' }]} selectedValue={this.state.rm4} onValueChange={(text) => this.setState({ rm4: text })} >
                {markOptions.map((item, index) => {
                  return (<Picker.Item label={item.label} value={item.value} key={index} />)
                })}
              </Picker>
              <Picker style={[styles.markPicker, { color: common_styles.colors.main_light_color }]} selectedValue={this.state.m4} onValueChange={(text) => this.setState({ m4: text })} >
                {markOptions.map((item, index) => {
                  return (<Picker.Item label={item.label} value={item.value} key={index} />)
                })}
              </Picker>
              <Picker style={[styles.hoursPicker, { color: common_styles.colors.main_light_color }]} selectedValue={this.state.h4} onValueChange={(text) => this.setState({ h4: text })}>
                {hoursOptions.map((item, index) => {
                  return (<Picker.Item label={item.toString()} value={item} key={index} />)
                })}
              </Picker>
            </View>
          </View>
          <View style={styles.picker_container}>
            <CheckBox
              checkedTitle='.'
              checked={this.state.c5}
              onPress={() => { this.state.c5 ? this.setState({ c5: false }) : this.setState({ c5: true }) }}
              title='هل المادة معادة ؟'
              checkedColor='#fff'
              containerStyle={[styles.CheckBoxStyle, { backgroundColor: '#2c3e50', borderWidth: 0, borderWidth: 0, width: this.state.c5 ? '8%' : '38%' }]}
              textStyle={{ color: '#fff', fontSize: 10 }}
            />
            <Picker style={[styles.markPicker, { color: common_styles.colors.main_light_color, display: this.state.c5 ? 'flex' : 'none' }]} selectedValue={this.state.rm5} onValueChange={(text) => this.setState({ rm5: text })} >
              {markOptions.map((item, index) => {
                return (<Picker.Item label={item.label} value={item.value} key={index} />)
              })}
            </Picker>
            <Picker style={[styles.markPicker, { color: common_styles.colors.main_light_color }]} selectedValue={this.state.m5} onValueChange={(text) => this.setState({ m5: text })} >
              {markOptions.map((item, index) => {
                return (<Picker.Item label={item.label} value={item.value} key={index} />)
              })}
            </Picker>
            <Picker style={[styles.hoursPicker, { color: common_styles.colors.main_light_color }]} selectedValue={this.state.h5} onValueChange={(text) => this.setState({ h5: text })}>
              {hoursOptions.map((item, index) => {
                return (<Picker.Item label={item.toString()} value={item} key={index} />)
              })}
            </Picker>
          </View>

          <View style={styles.picker_container}>
            <CheckBox
              checkedTitle='.'

              checked={this.state.c6}
              onPress={() => { this.state.c6 ? this.setState({ c6: false }) : this.setState({ c6: true }) }}
              title='هل المادة معادة ؟'
              checkedColor='#fff'
              containerStyle={[styles.CheckBoxStyle, { backgroundColor: '#2c3e50', borderWidth: 0, borderWidth: 0, width: this.state.c6 ? '8%' : '38%' }]}
              textStyle={{ color: '#fff', fontSize: 10 }}
            />
            <Picker style={[styles.markPicker, { color: common_styles.colors.main_light_color, display: this.state.c6 ? 'flex' : 'none' }]} selectedValue={this.state.rm6} onValueChange={(text) => this.setState({ rm6: text })} >
              {markOptions.map((item, index) => {
                return (<Picker.Item label={item.label} value={item.value} key={index} />)
              })}
            </Picker>
            <Picker style={[styles.markPicker, { color: common_styles.colors.main_light_color }]} selectedValue={this.state.m6} onValueChange={(text) => this.setState({ m6: text })} >
              {markOptions.map((item, index) => {
                return (<Picker.Item label={item.label} value={item.value} key={index} />)
              })}
            </Picker>
            <Picker style={[styles.hoursPicker, { color: common_styles.colors.main_light_color }]} selectedValue={this.state.h6} onValueChange={(text) => this.setState({ h6: text })}>
              {hoursOptions.map((item, index) => {
                return (<Picker.Item label={item.toString()} value={item} key={index} />)
              })}
            </Picker>
          </View>


          <View style={styles.picker_container}>
            <CheckBox
              checkedTitle='.'

              checked={this.state.c7}
              onPress={() => { this.state.c7 ? this.setState({ c7: false }) : this.setState({ c7: true }) }}
              title='هل المادة معادة ؟'
              checkedColor='#fff'
              containerStyle={[styles.CheckBoxStyle, { backgroundColor: '#2c3e50', borderWidth: 0, borderWidth: 0, width: this.state.c7 ? '8%' : '38%' }]}
              textStyle={{ color: '#fff', fontSize: 10 }}
            />
            <Picker style={[styles.markPicker, { color: common_styles.colors.main_light_color, display: this.state.c7 ? 'flex' : 'none' }]} selectedValue={this.state.rm7} onValueChange={(text) => this.setState({ rm7: text })} >
              {markOptions.map((item, index) => {
                return (<Picker.Item label={item.label} value={item.value} key={index} />)
              })}
            </Picker>
            <Picker style={[styles.markPicker, { color: common_styles.colors.main_light_color }]} selectedValue={this.state.m7} onValueChange={(text) => this.setState({ m7: text })} >
              {markOptions.map((item, index) => {
                return (<Picker.Item label={item.label} value={item.value} key={index} />)
              })}
            </Picker>
            <Picker style={[styles.hoursPicker, { color: common_styles.colors.main_light_color }]} selectedValue={this.state.h7} onValueChange={(text) => this.setState({ h7: text })}>
              {hoursOptions.map((item, index) => {
                return (<Picker.Item label={item.toString()} value={item} key={index} />)
              })}
            </Picker>
          </View  >
          <View style={{ marginTop: 25 }}>
            <Button icon='calculator' label='إحسب' onPress={this.calculate} />

          </View>
          < Modal
            style={styles.modalstyle}
            ref='progress'
          >
            <ProgressCircle
              percent={this.state.totalHours}
              radius={50}
              borderWidth={8}
              color="#3399FF"
              shadowColor="#999"
              bgColor="#fff"
            >
              <Text style={{ fontSize: 18 }}>{this.state.totalHours}</Text>
            </ProgressCircle>


          </Modal>
        </ScrollView>
      </View>
    );
  }
};

const styles = StyleSheet.create(
  {
    main_container: {
      padding: 10
    },
    picker_container: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: 'rgba(0,0,0,0.1)',
      fontSize: 5
    },
    Image: {
      marginTop: '10%',
      width: 150,
      height: 150
    },
    buttons: {
      marginTop: 25,
      borderWidth: 2,
      borderColor: '#7b8b7d',
      textAlign: 'center',
      height: 50,
      textAlignVertical: 'center',
      borderRadius: 15,
      fontSize: 15,
      color: '#3b3d3d'
    },
    Home: {
      backgroundColor: 'white',
      width: 50,
      textAlign: 'center',
      height: 50,
      textAlignVertical: 'center',
      borderRadius: 25,
      marginTop: 10,
      marginLeft: '2%',
      opacity: 0.5,
      fontSize: 20
    },
    markPicker: {
      marginLeft: -20,
      width: '41%'
    },
    hoursPicker: {
      width: '23%',
    },
    CheckBoxStyle: {
      width: '40%',
      marginLeft: 0,
    },
    CheckBoxTextStyle: {
      color: '#fff'
    },
    modalstyle: {
      width: '70%',
      height: '40%',
      opacity: 0.9
    }
  }
)


export default gpaCalculator;
