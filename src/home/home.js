import React from 'react';
import { StyleSheet, View, Text, FlatList, ActivityIndicator, Share, RefreshControl, ScrollView } from 'react-native';
import common_styles, { style_objects } from '../../common/styles/common_styles';
import { Icon } from 'react-native-elements';
import { DrawerActions } from 'react-navigation-drawer';
import { TouchableNativeFeedback, TouchableOpacity } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage';
import SectionButton from './components/sectionButton';

export default class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            subjects: [],
            loading: false,
            search_string: '',
            userInfo: null,
            createAccountMessage: false,
            AddSubjectsMessage: false,
            refresher: -1
        };
    }

    async componentDidMount() {
        await this.get_user_data();
        this.focusListener = this.props.navigation.addListener('willFocus', () => {
            this._forceUpdate();
        });
    }

    async _forceUpdate() {
        console.log('Updating..')
        await this.get_user_data();
        this.setState({ refresher: 0 });
    }

    static navigationOptions = ({ navigation }) => {
        return {
            title: 'الصفحة الرئيسية',
            headerRight: () => (
                <TouchableNativeFeedback containerStyle={{ marginRight: 20 }} onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
                    <Icon name='menu' containerStyle={{}} size={22} type='MaterialCommunityIcons' color={common_styles.colors.main_light_color} />
                </TouchableNativeFeedback>
            ),
        };
    };

    async get_user_data() {
        this.setState({ loading: true });
        let userInfo = await AsyncStorage.getItem('userInfo');
        if (userInfo != undefined) {
            userInfo = JSON.parse(userInfo);
            this.setState({ userInfo: userInfo, loading: false, subjects: userInfo.subjects });
            if (Object.values(userInfo.subjects).length < 1)
                this.setState({ AddSubjectsMessage: true })
            else
                this.setState({ AddSubjectsMessage: false })
        }
        else {
            console.log('in saveUserInfo')
            let userObject = {
                name: '',
                level: '',
                major: '',
                subjects: {}
            }
            await AsyncStorage.setItem('userInfo', JSON.stringify(userObject))
        }
    }

    render() {
        const { loading } = this.state;
        if (loading != true)
            return (
                <View style={{ flex: 1 }}>
                    <View style={style_objects.headerBar}>
                        <View style={{}}>
                            <TouchableOpacity onPress={() => this.props.navigation.dispatch(DrawerActions.openDrawer())} style={{ height: '100%', justifyContent: 'center', alignItems: 'center', paddingHorizontal: 20 }}>
                                <Icon name='menu' size={22} type='MaterialCommunityIcons' color={common_styles.colors.main_light_color} />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={[styles.main_container, { padding: 0 }]}>
                        {/* <View style={{ margin: 15, display: this.state.AddSubjectsMessage ? 'flex' : 'none' }}>
                            <TouchableNativeFeedback onPress={() => { }}>
                                <View style={{ backgroundColor: common_styles.colors.pass_color, borderRadius: 5, flexDirection: 'row', paddingHorizontal: 10, paddingVertical: 8 }}>
                                    <TouchableOpacity onPress={() => alert('hi')} style={{ alignItems: 'center', justifyContent: 'center', }}>
                                        <Icon name='closecircle' type='antdesign' size={15} color='rgba(0,0,0,0.25)' />
                                    </TouchableOpacity>
                                    <View style={{ flexDirection: 'row', flex: 1, alignItems: 'center', }}>
                                        <Text style={{ color: common_styles.colors.main_light_color, flex: 1, fontSize: 12.5 }}>
                                            {' انشئ حساباً لاضافة المواد الى جدولك والصفحة الرئيسية.'}
                                        </Text>
                                    </View>
                                </View>
                            </TouchableNativeFeedback>
                        </View> */}

                        <FlatList
                            contentContainerStyle={{ paddingVertical: 12, paddingHorizontal: 12 }}
                            // ListHeaderComponent={
                            //     <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', }}>
                            //         <View style={{ backgroundColor: common_styles.colors.main_back_color_d2 }}>
                            //             <SectionButton label='المواد الدراسية' icon='book' />
                            //         </View>
                            //     </View>
                            // }
                            numColumns={2}
                            keyExtractor={(item, index) => index.toString()}
                            extraData={this.state}
                            data={Object.values(this.state.subjects)}
                            renderItem={({ item, index }) => (
                                <View style={{ flex: 1, marginRight: index % 2 == 0 && (index + 1) != Object.keys(this.state.subjects).length ? 12 : 0, marginBottom: 15 }}>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', backgroundColor: common_styles.colors.main_back_color_d1, paddingHorizontal: 10, paddingVertical: 8, borderTopStartRadius: 7, borderTopEndRadius: 7, }}>
                                        <Text style={{ color: common_styles.colors.main_light_color, textAlign: 'center', flex: 1, fontSize: 11.5 }}>{item.name}</Text>
                                    </View>
                                    <View style={{ padding: 10, backgroundColor: common_styles.colors.main_back_color_light, borderBottomEndRadius: 5, borderBottomStartRadius: 5, minHeight: 20, justifyContent: 'center', alignItems: 'center', flex: 1 }}>
                                        <Icon
                                            containerStyle={{ borderRadius: 50, padding: 0, backgroundColor: 'rgba(0,0,0,0.1)' }}
                                            reverse
                                            name='book'
                                            type='antdesign'
                                            color={common_styles.colors.main_color}
                                            reverseColor={common_styles.colors.main_light_color}
                                        />
                                    </View>
                                </View>
                            )}
                        />
                    </View>
                </View>
            );
        else {
            return (
                <View style={{ flex: 1 }}>
                    <View style={style_objects.headerBar}>
                        <View style={{}}>
                            <TouchableOpacity onPress={() => this.props.navigation.dispatch(DrawerActions.openDrawer())}>
                                <Icon name='menu' size={22} type='MaterialCommunityIcons' color={common_styles.colors.main_light_color} />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={[styles.main_container,]}>
                        <ActivityIndicator
                            size='large'
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
    },

});