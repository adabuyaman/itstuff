import React from 'react';
import { StyleSheet, View, Text, FlatList, ActivityIndicator, Share, RefreshControl, ScrollView, Alert } from 'react-native';
import common_styles, { style_objects } from '../../common/styles/common_styles';
import { Icon } from 'react-native-elements';
import { DrawerActions } from 'react-navigation-drawer';
import {  TouchableOpacity } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage';
import Button from '../../common/components/button';
export default class MySubjects extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            subjects: [],
            search_string: '',
            mysubjects: null,
            createAccountMessage: false,
            AddSubjectsMessage: false,
            showSingleDelete: true,
            refresher: -1
        };
    }

    async componentDidMount() {
        await this.get_mysubjects();
        this.focusListener = this.props.navigation.addListener('willFocus', () => {
            //console.log('updating..')
            this._forceUpdate();
        });
    }

    async _forceUpdate() {
        //console.log('forcing update..')
        await this.get_mysubjects();
    }

    static navigationOptions = ({ navigation }) => {
        return {
            title: 'الصفحة الرئيسية',
            headerRight: () => (
                <TouchableOpacity containerStyle={{ marginRight: 20 }} onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
                    <Icon name='menu' containerStyle={{}} size={22} type='MaterialCommunityIcons' color={common_styles.colors.main_light_color} />
                </TouchableOpacity>
            ),
        };
    };

    confirm_delete(subject) {
        Alert.alert('ازالة مادة', 'ازالة' + ' ' + subject.name + ' ' + 'من جدول موادك؟',
            [
                {
                    text: 'لا',
                    onPress: () => console.log('Canceled'),
                    style: 'cancel',
                },
                {
                    text: 'نعم',
                    onPress: () => this.delete_subject(subject),
                },
            ],
            { cancelable: false },
        )
    }

    async get_mysubjects() {
        let mysubjects = await AsyncStorage.getItem('mysubjects');
        if (mysubjects != undefined) {
            mysubjects = JSON.parse(mysubjects);
            this.setState({ mysubjects });
            //console.log(mysubjects)
        }
        else {
            await AsyncStorage.setItem('mysubjects', JSON.stringify({}));
        }
    }

    async delete_subject(subject) {
        let mysubjects = Object.values(this.state.mysubjects);
        let index = mysubjects.findIndex(e => e.pk == subject.pk);
        mysubjects.splice(index, 1);
        let mysubjects_object = {};
        for (let i = 0; i < mysubjects.length; i++) {
            mysubjects_object[mysubjects[i].pk.toString()] = mysubjects[i];
        }
        await AsyncStorage.setItem('mysubjects', JSON.stringify(mysubjects_object));
        this._forceUpdate();
    }

    componentWillUnmount() {
        try {
            this.focusListener.remove();
            //console.log('removed');
        }
        catch (er) {
            console.log(er);
        }
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <View style={style_objects.headerBar}>
                    <View style={{ opacity: 0 }}>
                        <TouchableOpacity onPress={() => 1} style={{ height: '100%', justifyContent: 'center', alignItems: 'center', paddingHorizontal: 20 }}>
                            <Icon name='menu' size={22} type='MaterialCommunityIcons' color={common_styles.colors.main_light_color} />
                        </TouchableOpacity>
                    </View>
                    <Text style={{ color: '#fff' }}>جدولُكَ الدراسي</Text>
                    <View style={{}}>
                        <TouchableOpacity onPress={() => this.props.navigation.dispatch(DrawerActions.openDrawer())} style={{ height: '100%', justifyContent: 'center', alignItems: 'center', paddingHorizontal: 20 }}>
                            <Icon name='menu' size={22} type='MaterialCommunityIcons' color={common_styles.colors.main_light_color} />
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={[styles.main_container, { padding: 0 }]}>
                    <FlatList
                        contentContainerStyle={{ paddingVertical: 12, paddingHorizontal: 12, }}
                        numColumns={2}
                        keyExtractor={(item, index) => index.toString()}
                        extraData={this.state}
                        ListEmptyComponent={() => (
                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                <Icon color='rgba(0,0,0,0.5)' name='slack-square' type='antdesign' size={50} containerStyle={{ marginBottom: 3, }} />
                                <Text style={{ textAlign: 'center', fontSize: 16, fontWeight: 'bold', color: 'rgba(0,0,0,0.5)' }}>{'جدول المواد فارغ,'}</Text>
                                <Text style={{ textAlign: 'center', fontSize: 16, fontWeight: 'bold', color: common_styles.colors.main_color,textDecorationLine:'underline',textDecorationStyle:'dotted' }} onPress={()=>this.props.navigation.navigate('subjectsList')}>
                                    إضافة موادك الخاصة.
                                </Text>
                            </View>
                        )}
                        data={this.state.mysubjects ? Object.values(this.state.mysubjects) : []}
                        renderItem={({ item, index }) => (
                            <View style={{ flex: 1, marginRight: (index % 2 == 0) && (index + 1 != Object.keys(this.state.mysubjects).length) ? 12 : 0, marginBottom: 15 }}>
                                <TouchableOpacity onPress={() => this.confirm_delete(item)} containerStyle={{ position: 'absolute', top: -9, right: -9, padding: 5, zIndex: 5, }}>
                                    <Icon containerStyle={{ display: this.state.showSingleDelete ? 'flex' : 'none' }} name='closecircle' type='antdesign' color={common_styles.colors.fail_color} size={16} />
                                </TouchableOpacity>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', backgroundColor: common_styles.colors.main_back_color_d1, paddingHorizontal: 10, paddingVertical: 8, borderTopStartRadius: 7, borderTopEndRadius: 7, }}>
                                    <Text style={{ color: common_styles.colors.main_light_color, textAlign: 'center', flex: 1, fontSize: 11.5 }}>{item.name}</Text>
                                </View>
                                <TouchableOpacity
                                    style={{ padding: 10, backgroundColor: common_styles.colors.main_back_color_light, borderBottomEndRadius: 5, borderBottomStartRadius: 5, minHeight: 20, justifyContent: 'center', alignItems: 'center', flex: 1 }}
                                    onPress={() => this.props.navigation.navigate('subject_detail', {
                                        subject_id: item.pk
                                    })}
                                >
                                    <Icon
                                        containerStyle={{ borderRadius: 50, padding: 0, backgroundColor: 'rgba(0,0,0,0.1)' }}
                                        reverse
                                        name='book'
                                        type='antdesign'
                                        color={common_styles.colors.main_color}
                                        reverseColor={common_styles.colors.main_light_color}
                                    />
                                </TouchableOpacity>
                            </View>
                        )}
                    />
                </View>
            </View>
        );
    }
};

const styles = StyleSheet.create({
    main_container: {
        ...style_objects.main_container,
    },

});