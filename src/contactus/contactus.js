import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, RefreshControl, ScrollView } from 'react-native';
import common_styles, { style_objects } from '../../common/styles/common_styles';
import { Icon } from 'react-native-elements';
import { DrawerActions } from 'react-navigation-drawer';
import Modal from 'react-native-modalbox';
import Button from '../../common/components/button';
import ProfileModal from './components/profilemodal';

export default class contactus extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            v: false,
            laith: {
                name: 'Laith Eyad Obaiyat',
                facebook: 'https://www.facebook.com/laith.eyad',
                email: 'Laithop@gmail.com',
                phone: '0787107088',
                major: 'Computer Information System',
                instagram: 'https://www.instagram.com/laith_eyad/'
            },
            Ahmad: {
                name: 'Ahmad M Abuyaman',
                facebook: 'https://www.facebook.com/11abuyaman',
                email: '11abuyaman@gmail.com',
                phone: '0786108778',
                major: 'Computer Sciense',
                instagram: 'https://www.instagram.com/11abuyaman/'
            }
        };
    }



    render() {
        return (

            <View style={{ backgroundColor: common_styles.colors.main_back_color, flex: 1 }}>

                <View style={style_objects.headerBar}>
                    {/* <Text style={{color:'#fff',fontWeight:'bold',fontSize:15}}>تواصل معنا</Text> */}
                    <TouchableOpacity onPress={() => this.props.navigation.dispatch(DrawerActions.openDrawer())} style={{ height: '100%', justifyContent: 'center', alignItems: 'center', paddingHorizontal: 20 }}>
                        <Icon name='menu' size={22} type='MaterialCommunityIcons' color={common_styles.colors.main_light_color} />
                    </TouchableOpacity>


                </View>
                <View style={{ marginLeft: 15 ,marginRight:15}}>
                    <Text style={[styles.paragaroh, { color: '#fff' ,fontSize:16}]}>
                    في حال اردتم التواصل معنا للتبليغ عن بعض الأخطاء 
                    , أو إقتراح أفكار جديدة , أو اضافة دوسيات جديدة  
                    يمكنكم التواصل معنا على الحسابات التالية :
                    </Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', margin: '5%', }}>
                    <TouchableOpacity style={{ width: '50%' }} onPress={() => this.refs.profileModal.show(this.state.laith)}>
                        <Image style={styles.profileContainer} source={require('./../../image/laith.png')} />
                        <Text style={{ color: '#fff', paddingLeft: '20%', marginTop: 10 }} >Laith Obaiyat</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ width: '50%' }} onPress={() => this.refs.profileModal.show(this.state.Ahmad)}>
                        <Image style={styles.profileContainer} source={require('./../../image/profile.jpg')} />
                        <Text style={{ color: '#fff', paddingLeft: '12%', marginTop: 10 }} >Ahmad Abuyaman</Text>
                    </TouchableOpacity>
                </View>
                <ProfileModal ref='profileModal' />
            </View>
        );
    }
}


const styles = StyleSheet.create({
    main_container: {
        ...style_objects.main_container,
    },
    paragaroh: {
        marginTop: '10%',
        backgroundColor: common_styles.colors.main_back_color_light,
        textAlign: 'center',
        borderRadius: 10,
    },
    profileContainer: {
        height: '50%',
        width: '90%',
        borderRadius: 150,
        borderWidth: 10,
        borderColor: common_styles.colors.main_back_color_d1
    },
    modalstyle: {
        height: '50%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: common_styles.colors.main_back_color_light,


    }

});