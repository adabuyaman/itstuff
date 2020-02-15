import React from 'react';
import { StyleSheet, Text, View, TouchableNativeFeedback, } from 'react-native';
import { Icon } from 'react-native-elements';
import common_styles from '../../../common/styles/common_styles';


const SubjectItem = (props) => {
  const { pk, name, major } = props;
    return (
      <TouchableNativeFeedback onPress={() => props.navigation.navigate('subject_detail', {
        subject_id: pk
      })}>
        <View style={styles.item_container}>
          <View style={{ flexDirection: 'row-reverse', alignItems: 'center', justifyContent: 'space-between', flex: 1 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1, justifyContent: 'flex-end' }}>
              <Text style={{ marginRight: 10, color: common_styles.colors.main_light_color, flex: 1, textAlign: 'right' }}>{name}</Text>
              <Icon color='#21303f' name='book' size={18} type='antdesign' />
            </View>
            <Text style={styles.subject_major}>{major.name}</Text>
          </View>
          <View style={{ marginRight: 5 }}>
            <Icon color='#21303f' name='left' size={17} type='antdesign' />
          </View>
        </View>
      </TouchableNativeFeedback>
    );
};

const styles = StyleSheet.create({
  item_container: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 11,
    paddingHorizontal: 12,
    backgroundColor: common_styles.colors.main_back_color_light,
    borderRadius: 6,
    flex: 1
  },
  subject_major: {
    color: '#fff',
    backgroundColor: common_styles.colors.main_color,
    fontSize: 12,
    borderRadius: 20,
    paddingVertical: 3,
    paddingHorizontal: 7,
  }
});
export default SubjectItem;