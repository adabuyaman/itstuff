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
import Button from '../../../common/components/button'


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
        const picture = this.state.name.includes('Laith') ? require('../../../image/laith.png') : require('../../../image/profile.jpg');
        return (
            <ScrollView>

                <Modal
                    ref='profile'
                    backdrop={true}
                    coverScreen={true}
                    style={[styles.ModalContainer,]}
                ><View>
                        <View>
                            <View style={{ backgroundColor: common_styles.colors.main_back_color_d1, height: '55%' }}>
                                <View style={{ alignItems: "center", marginTop: '10%' }}>
                                    <Image style={{ width: 150, height: 150, borderRadius: 150 }} source={picture}></Image>
                                </View>
                                <View style={{ alignItems: 'flex-start', marginLeft: 20, marginTop: 20 }}>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: '2%' }}>
                                        <Icon name='idcard' type='antdesign' color='#fff' />
                                        <Text style={{ color: '#fff', marginLeft: '2%' }}>{this.state.user.name}</Text>
                                    </View>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: '5%' }}>
                                        <Icon name='phone' type='antdesign' color='#fff' />
                                        <Text style={{ color: '#fff', marginLeft: '2%' }}>{this.state.user.phone}</Text>
                                    </View>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: '5%' }}>
                                        <Icon name='mail' type='entypo' color='#fff' />
                                        <Text style={{ color: '#fff', marginLeft: '2%' }}>{this.state.user.email}</Text>
                                    </View>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: '5%' }}>
                                        <Icon name='graduation-cap' type='entypo' color='#fff' />
                                        <Text style={{ color: '#fff', marginLeft: '2%' }}>{this.state.user.major}</Text>
                                    </View>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: '5%' }}>
                                        <Icon name='location-pin' type='entypo' color='#fff' />
                                        <Text style={{ color: '#fff', marginLeft: '2%' }}>Jordan</Text>
                                    </View>


                                </View>
                                <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 30 }}>
                                    <TouchableOpacity style={{ marginRight: '2%' }} onPress={() => { Linking.openURL(this.state.user.facebook) }}>
                                        <Icon name='facebook-with-circle' type='entypo' color='#fff' size={30} />
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => { Linking.openURL(this.state.user.instagram) }}>
                                        <Icon name='instagram' type='antdesign' color='#fff' size={30} />
                                    </TouchableOpacity>

                                </View>
                                <View style={{ padding: 20, marginTop: 70 }}>
                                    <Button icon='back' label='رجوع' onPress={() => { this.setState({ v: false, avg: '' }); this.reload() }} />
                                </View>
                               
                                
                                
                                

                            </View>

                        </View>
                    </View>
                </Modal>
            </ScrollView>

        );
    }
};

const styles = StyleSheet.create({
    main_container: {
        ...style_objects.main_container,
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
        borderRadius: 10,
        borderWidth: 15,
        borderColor: common_styles.colors.main_back_color_d1,

    }
})