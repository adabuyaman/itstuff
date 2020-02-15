import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
    Linking,
    Dimensions
} from 'react-native';
import common_styles, { style_objects } from '../../../common/styles/common_styles';
import { Icon } from 'react-native-elements';
import Modal from 'react-native-modalbox';


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
            <Modal
                ref='profile'
                backdrop={true}
                coverScreen={true}
                style={[styles.ModalContainer, ]}
            ><View>
                    <View style={{padding:'5%'}}>
                        <View style={{ alignItems: "center",}}>
                            <Image style={{ width: 100, height: 100, borderRadius: 150 }} source={picture}></Image>
                        </View>
                        <View style={{ alignItems: 'center' }}>
                            <Text style={{ color: '#fff', marginTop: '2%' }}>{this.state.user.name}</Text>
                            <Text style={{ color: '#fff', marginTop: '2%' }}>{this.state.user.phone}</Text>
                            <Text style={{ color: '#fff', marginTop: '2%' }}>{this.state.user.email}</Text>
                            <Text style={{ color: '#fff', marginTop: '2%' }}>{this.state.user.major}</Text>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'center', margin: '3%' }}>
                            <TouchableOpacity style={{ margin: '2%' }} onPress={() => { Linking.openURL(this.state.user.facebook) }}>
                                <Icon name='facebook-with-circle' type='entypo' color='#fff' size={30} />
                            </TouchableOpacity>
                            <TouchableOpacity style={{ margin: '2%' }} onPress={() => { Linking.openURL(this.state.user.instagram) }}>
                                <Icon name='instagram' type='antdesign' color='#fff' size={30} />
                            </TouchableOpacity>
                        </View>
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
        borderWidth: 10,
        borderColor: common_styles.colors.main_back_color_d1

    }
})