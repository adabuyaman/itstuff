import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
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
                name: 'Laith E. Obaiyat',
                pp: 1,
                facebook: 'https://www.facebook.com/laith.eyad',
                email: 'laithop@gmail.com',
                phone: '0787107088',
                major: 'أنظمة المعلومات الحاسوبية',
                instagram: 'https://www.instagram.com/laith_eyad/',
                twitter: 'https://twitter.com/laitheyas'
            },
            Ahmad: {
                name: 'Ahmad M. Abuyaman',
                pp: 2,
                facebook: 'https://www.facebook.com/11abuyaman',
                email: '11abuyaman@gmail.com',
                phone: '0786108778',
                major: 'علم الحاسوب',
                instagram: 'https://www.instagram.com/11abuyaman/',
                twitter: 'https://twitter.com/adabuyaman'
            },
            Mohanad: {
                name: 'Mohanad W. Barghash',
                pp: 3,
                facebook: 'https://www.facebook.com/mohnad.barghash',
                email: 'tbdra8on@gmail.com',
                phone: '0796810797',
                major: 'علم الحاسوب',
                instagram: 'https://www.instagram.com/m.barghash_photography/',
                twitter: ''
            },
            Omari: {
                name: 'Omar F. Alomari',
                pp: 4,
                facebook: 'https://www.facebook.com/itsomarcs',
                email: 'omaralomari603@gmail.com',
                phone: '0799422060',
                major: 'أنظمة المعلومات الحاسوبية',
                instagram: 'https://www.instagram.com/_omar_alomari_/',
                twitter: ''
            },
            Sharqawi: {
                name: 'Ahmad I. Alsharqawi',
                pp: 5,
                facebook: 'https://www.facebook.com/Adsharqawi',
                email: 'ahmadalshrqawii@gmail.com',
                phone: '0797325907',
                major: 'أنظمة المعلومات الحاسوبية',
                instagram: 'https://www.instagram.com/adsharqawi/',
                twitter: ''
            }
        };
    }

    render() {
        return (
            <SafeAreaView style={{ flex: 1,backgroundColor:common_styles.colors.main_back_color }}>
                <View style={style_objects.headerBar}>
                    <View style={{ opacity: 0 }}>
                        <TouchableOpacity onPress={() => 1} style={{ height: '100%', justifyContent: 'center', alignItems: 'center', paddingHorizontal: 20 }}>
                            <Icon name='menu' size={22} type='MaterialCommunityIcons' color={common_styles.colors.main_light_color} />
                        </TouchableOpacity>
                    </View>
                    <Text style={{ color: '#fff' }}>تواصل معنا</Text>
                    <View style={{}}>
                        <TouchableOpacity onPress={() => this.props.navigation.dispatch(DrawerActions.openDrawer())} style={{ height: '100%', justifyContent: 'center', alignItems: 'center', paddingHorizontal: 20 }}>
                            <Icon name='menu' size={22} type='MaterialCommunityIcons' color={common_styles.colors.main_light_color} />
                        </TouchableOpacity>
                    </View>
                </View>
                <ScrollView contentContainerStyle={styles.main_container}>
                    <View style={styles.paragraph_container}>
                        <Text style={styles.paragraph}>
                            في حال اردتم التواصل معنا للتبليغ عن بعض الأخطاء
                            , أو إقتراح أفكار جديدة , أو اضافة دوسيات جديدة
                            يمكنكم التواصل معنا على الحسابات التالية:
                        </Text>
                    </View>
                    <View style={{ marginVertical: 10 }}>
                        <View style={styles.groupTitleContainer}>
                            <Text style={styles.groupTitle}>تطوير وتصميم</Text>
                        </View>
                        <View style={styles.developers_container}>
                            <TouchableOpacity style={[styles.developer, { marginRight: 10 }]} onPress={() => this.refs.profileModal.show(this.state.laith)}>
                                <Image style={styles.profile_picture} source={require('./../../image/laith.png')} />
                                <Text style={styles.name} >{'Laith\nObaiyat'}</Text>
                                <View style={styles.job_container}>
                                    <Text style={styles.job} >مطور</Text>
                                    <Icon name='checkcircleo' type='antdesign' size={14} color={common_styles.colors.main_color} />
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.developer} onPress={() => this.refs.profileModal.show(this.state.Ahmad)}>
                                <Image style={styles.profile_picture} source={require('./../../image/abuyaman.jpg')} />
                                <Text style={styles.name} >{'Ahmad\nAbuyaman'}</Text>
                                <View style={styles.job_container}>
                                    <Text style={styles.job} >مطور</Text>
                                    <Icon name='checkcircleo' type='antdesign' size={14} color={common_styles.colors.main_color} />
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{ marginVertical: 10 }}>
                        <View style={styles.groupTitleContainer}>
                            <Text style={styles.groupTitle}>إدارة البيانات</Text>
                        </View>
                        <View style={styles.developers_container}>
                            <TouchableOpacity style={styles.developer} onPress={() => this.refs.profileModal.show(this.state.Sharqawi)}>
                                <Image style={styles.profile_picture_sm} source={require('./../../image/sharqawi.jpg')} />
                                <Text style={styles.name_sm} >{'Ahmad\nAlsharqawi'}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.developer, { marginHorizontal: 10 }]} onPress={() => this.refs.profileModal.show(this.state.Mohanad)}>
                                <Image style={styles.profile_picture_sm} source={require('./../../image/mohannad.jpg')} />
                                <Text style={styles.name_sm} >{'Mohanad\nBarghash'}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.developer]} onPress={() => this.refs.profileModal.show(this.state.Omari)}>
                                <Image style={styles.profile_picture_sm} source={require('./../../image/omari.jpg')} />
                                <Text style={styles.name_sm} >{'Omar\nAlomari'}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <ProfileModal ref='profileModal' />
                </ScrollView>
            </SafeAreaView>

        );
    }
}

const styles = StyleSheet.create({
    main_container: {
        ...style_objects.main_container,
        flex: 0,
    },
    paragraph_container: {
    },
    paragraph: {
        color: common_styles.colors.main_light_color,
        textAlign: 'right',
        fontSize: 13.5,
        borderRadius: 10,
    },
    groupTitleContainer: {
        alignSelf: 'center',
        paddingHorizontal: 12,
        paddingVertical: 4.5,
        borderRadius: 50,
        marginBottom: 10,
        backgroundColor: common_styles.colors.main_color
        // paddingHorizontal: 10,
        // paddingVertical:4,
        // marginBottom:10,
        // borderRightWidth:2,
        // borderColor:common_styles.colors.main_color
    },
    groupTitle: {
        color: common_styles.colors.main_light_color
    },
    developers_container: {
        flexDirection: 'row',
    },
    profile_picture: {
        height: 100,
        width: 100,
        alignSelf: 'center',
        borderRadius: 150,
    },
    profile_picture_sm: {
        height: 65,
        width: 65,
        alignSelf: 'center',
        borderRadius: 150,
    },
    name: {
        color: common_styles.colors.main_light_color,
        textAlign: 'center',
        fontSize: 15,
        marginTop: 10
    },
    name_sm: {
        color: common_styles.colors.main_light_color,
        textAlign: 'center',
        fontSize: 12.5,
        marginTop: 10
    },
    developer: {
        flex: 1,
        borderRadius: 6,
        backgroundColor: 'rgba(0,0,0,0.15)',
        paddingVertical: 15,
        paddingHorizontal: 5,
    },
    job_container: {
        alignSelf: 'center',
        backgroundColor: 'rgba(0,0,0,0.22)',
        borderRadius: 50,
        marginTop: 8,
        paddingHorizontal: 11,
        paddingVertical: 3.5,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    job: {
        color: common_styles.colors.main_light_color,
        fontSize: 12.5,
        marginRight: 5
    },
    modalstyle: {
        height: '50%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: common_styles.colors.main_back_color_light,
    }
});