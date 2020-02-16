import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
    Linking,
    Dimensions,
    ScrollView
} from 'react-native';
import common_styles, { style_objects } from '../../../common/styles/common_styles';
import { Icon } from 'react-native-elements';
import Modal from 'react-native-modalbox';
import Button from '../../../common/components/button';
import LinearGradient from 'react-native-linear-gradient';


export default class ProfileModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {},
            picture: '',
            name: '',
        }
        this.show = this.show.bind(this);
        this.hide = this.hide.bind(this);
    }

    show(user) {
        this.refs.profile.open();
        this.setState({ user, name: user.name })
    }

    hide() {
        this.refs.profile.close();
    }

    render() {
        let picture = '';
        switch (this.state.user.pp) {
            case 1:
                picture = require('../../../image/laith.png')
                break;
            case 2:
                picture = require('../../../image/abuyaman.jpg');
                break;
            case 3:
                picture = require('../../../image/mohannad.jpg');
                break;
            case 4:
                picture = require('../../../image/omari.jpg');
                break;
            case 5:
                picture = require('../../../image/sharqawi.jpg');
                break;
            default:
                picture = require('../../../image/omari.jpg');
                break;
        }
        return (
            <Modal
                ref='profile'
                backdrop={true}
                coverScreen={true}
                style={styles.ModalContainer}
            >
                <View style={styles.main_container}>

                    <View style={styles.profile_picture}>
                        <View style={styles.cover}>
                            <TouchableOpacity style={{ position: 'absolute', top: 0, right: 0, padding: 10, zIndex: 3 }} onPress={this.hide}>
                                <Icon name='closecircle' containerStyle={{}} size={22} type='antdesign' color={common_styles.colors.main_back_color_light} />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.profile_picture}>
                            <Image style={{ width: 120, height: 120, borderRadius: 150, marginTop: -75 }} source={picture} />
                        </View>
                    </View>
                    <View style={styles.title_container}>
                        <Text style={styles.title}>{this.state.user.name}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', marginVertical: 3 }}>
                        <Button
                            icon='mail'
                            iconType='entypo'
                            color={common_styles.colors.main_back_color_d1}
                            label=''
                            onPress={() => Linking.openURL('mailto:' + this.state.user.email)}
                            containerStyle={{ paddingHorizontal: 13, justifyContent: 'center', alignItems: 'center' }}
                        />
                        <Button
                            containerStyle={{ flex: 1, marginLeft: 6 }}
                            icon='phone'
                            label='اتصل بي'
                            onPress={() => Linking.openURL(`tel:${this.state.user.phone}`)}
                        />
                    </View>
                    <View style={styles.info_container}>
                        <TouchableOpacity onPress={() => Linking.openURL('mailto:' + this.state.user.email)} style={[styles.info_item, { marginBottom: 4 }]}>
                            <Text style={styles.info_title}>{this.state.user.email}</Text>
                            <Icon name='mail' type='entypo' size={18} color={common_styles.colors.main_back_color_d1} />
                        </TouchableOpacity>
                        <View style={[styles.info_item, { marginBottom: 4 }]}>
                            <Text style={styles.info_title}>{this.state.user.major}</Text>
                            <Icon name='graduation-cap' type='entypo' size={18} color={common_styles.colors.main_back_color_d1} />
                        </View>
                        <View style={[styles.info_item, { marginBottom: 4 }]}>
                            <Text style={styles.info_title}>الأردن</Text>
                            <Icon name='location-pin' type='entypo' size={18} color={common_styles.colors.main_back_color_d1} />
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row-reverse', justifyContent: 'center', marginBottom: 10 }}>
                        <TouchableOpacity onPress={() => { Linking.openURL(this.state.user.twitter) }}>
                            <Icon containerStyle={[styles.social_icon, { backgroundColor: '#1da1f2' }]} name='twitter' type='antdesign' color={common_styles.colors.main_light_color} size={20} />
                        </TouchableOpacity>
                        <TouchableOpacity style={{ marginHorizontal: 10 }} onPress={() => { Linking.openURL(this.state.user.facebook) }}>
                            <Icon containerStyle={[styles.social_icon, { backgroundColor: '#3b5998' }]} name='facebook-square' type='antdesign' color={common_styles.colors.main_light_color} size={20} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => { Linking.openURL(this.state.user.instagram) }}>
                            <LinearGradient colors={['#405de6', '#405de6', '#5851db', '#833ab4', '#c13584', '#e1306c', '#fd1d1d', '#f56040', '#f77737', '#fcaf45', '#ffdc80']} style={{ borderRadius: 30, }}>
                                <Icon containerStyle={[styles.social_icon]} name='instagram' type='antdesign' color={common_styles.colors.main_light_color} size={20} />
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        );
    }
};

const styles = StyleSheet.create({
    main_container: {
        ...style_objects.main_container,
    },
    title_container: {
        marginTop: 6,
        marginBottom: 12,
    },
    title: {
        color: common_styles.colors.main_light_color,
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        textTransform: 'capitalize'
    },
    profile_picture: {
        alignItems: "center",
    },
    cover: {
        backgroundColor: common_styles.colors.main_back_color_d1,
        width: '100%',
        height: 110,
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10
    },
    info_container: {
        alignItems: 'flex-end',
        padding: 10,
        backgroundColor: common_styles.colors.main_back_color_light,
        marginVertical: 10,
        borderRadius: 7
    },
    info_item: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    info_title: {
        color: common_styles.colors.main_light_color,
        marginRight: 6
    },
    social_icon: {
        padding: 9,
        borderRadius: 30,
    },
    header_container: {
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20
    },
    header_container_title: {
        color: common_styles.colors.main_light_color
    },
    ModalContainer: {
        backgroundColor: common_styles.colors.main_back_color_light,
        // borderWidth: 15,
        borderColor: common_styles.colors.main_back_color_d1,
    }
})