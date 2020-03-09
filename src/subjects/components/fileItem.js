import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Linking, Share } from 'react-native';
import { Icon } from 'react-native-elements';
import common_styles from '../../../common/styles/common_styles';

const TestbankFile = (props) => {
  const { object } = props;
  const testbankShare = async () => {
    try {
      const result = await Share.share({
        message: '' + object.link,
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          //console.log('shared with blabla');

        } else {
          //console.log('shared');

        }
      } else if (result.action === Share.dismissedAction) {
        //console.log('dismissed');
      }
    } catch (error) {
      alert(error.message);
    }
  };
  return (
    <TouchableOpacity onPress={() => Linking.openURL(object.link)}>
      <View style={styles.item_container}>
        <View style={styles.info_container}>
          <View style={{ flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', flex: 1 }}>
            <Text style={{ marginRight: 10, color: '#414649', flex: 1, textAlign: 'right' }}>{object.name}</Text>
            <Icon color='#5F6368' name='pdffile1' size={17} type='antdesign' />
          </View>
          <View style={{ flexDirection: 'row' }}>
            <Text style={[styles.notebook_item_author_name,{display:object.reference=='-'  ? 'none':'flex'}]}>{object.reference}</Text>
            <Text style={[styles.notebook_item_author_name,{display:object.type=='-'  ? 'none':'flex'}]}>{object.type}</Text>
          </View>
        </View>
        <View style={{ marginRight: 10, flexDirection: 'row' }}>
          <Icon color={common_styles.colors.main_back_color} containerStyle={{ marginRight: 5 }} name='download' size={17} type='antdesign' />
          <TouchableOpacity onPress={testbankShare}>
            <Icon color={common_styles.colors.main_back_color} name='sharealt' size={17} type='antdesign' />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  )
}

const NotebookFile = (props) => {
  const { object } = props;
  const notebookShare = async () => {
    try {
      const result = await Share.share({
        message: '' + object.link,
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          //console.log('shared with blabla');

        } else {
          //console.log('shared');

        }
      } else if (result.action === Share.dismissedAction) {
        //console.log('dismissed');
      }
    } catch (error) {
      alert(error.message);
    }
  };
  return (
    <TouchableOpacity onPress={() => Linking.openURL(object.link)}>
      <View style={styles.item_container}>
        <View style={styles.info_container}>
          <View style={{ flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', flex: 1 }}>
            <Text style={{ marginRight: 10, color: '#414649', flex: 1, textAlign: 'right' }}>{object.name}</Text>
            <Icon color='#5F6368' name='pdffile1' size={17} type='antdesign' />
          </View>
          <View style={{ flexDirection: 'row' }}>
            <Text style={[styles.notebook_item_author_name,{display:object.author=='-'  ? 'none':'flex'}]}>{object.author}</Text>
          </View>
        </View>
        <View style={{ marginRight: 10, flexDirection: 'row' }}>
          <Icon color={common_styles.colors.main_back_color} containerStyle={{ marginRight: 5 }} name='download' size={17} type='antdesign' />
          <TouchableOpacity onPress={notebookShare}>
            <Icon color={common_styles.colors.main_back_color} name='sharealt' size={17} type='antdesign' />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  item_container: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    backgroundColor: common_styles.colors.main_light_color,
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  notebook_item_author_name: {
    color: '#fff',
    backgroundColor: common_styles.colors.main_color,
    fontSize: 12,
    borderRadius: 20,
    paddingVertical: 4.5,
    paddingHorizontal: 8,
    marginRight: 5
  },
  info_container: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    justifyContent: 'space-between',
    flex: 1
  }
});

export default NotebookFile
export { TestbankFile }