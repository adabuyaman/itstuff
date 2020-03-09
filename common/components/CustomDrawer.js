import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    ScrollView,
    Image,
} from 'react-native';
import common_styles, { style_objects } from '../styles/common_styles';
import { DrawerItems } from 'react-navigation-drawer';
import { SafeAreaView } from 'react-navigation';

export default class CustomDrawer extends React.Component {
    render() {
        return (
            <ScrollView contentContainerStyle={styles.main_container}>
                <SafeAreaView forceInset={{ top: 'always', horizontal: 'never', }} style={{ flex: 1 }}>
                    <View style={styles.header_container}>
                        <View style={{ padding: 6 }}>
                            <Text style={{ color: common_styles.colors.main_light_color, fontSize: 25 }}>شارك!</Text>
                            <Text style={{ color: common_styles.colors.main_light_color, fontSize: 13 }}>{'ساعدنا في جمع المزيد\nمن الدوسيات والأسئلة.'}</Text>
                            <TouchableOpacity style={{ paddingHorizontal: 9 }} onPress={()=>this.props.navigation.navigate('contactus')}>
                                <Text style={{ color: common_styles.colors.main_light_color, fontSize: 13, textAlign: 'center', backgroundColor: common_styles.colors.main_color, borderRadius: 5, padding: 5, marginTop: 6 }}>تواصل معنا</Text>
                            </TouchableOpacity>
                        </View>
                        <Image style={{ flex: 1, width: 150, height: 150, marginBottom: -12, transform: [{ scaleX: -1 }] }} source={require('../images/box.png')} />
                    </View>
                    <View style={{}}>
                        <DrawerItems
                            {...this.props}
                            itemsContainerStyle={styles.itemsContainerStyle}
                            iconContainerStyle={styles.iconContainerStyle}
                            itemStyle={styles.itemStyle}
                            labelStyle={styles.labelStyle}
                            inactiveLabelStyle={styles.inactiveLabelStyle}
                            activeBackgroundColor={common_styles.colors.main_color}
                            activeTintColor={common_styles.colors.main_light_color}
                            inactiveTintColor={'#e3e3e3'}
                            activeLabelStyle={styles.activeLabelStyle}
                        />
                    </View>
                </SafeAreaView>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    main_container: {
        ...style_objects.main_container,
        padding: 0,
        marginTop: 0,
    },
    header_container: {
        flexDirection: 'row-reverse',
        padding: 5,
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: common_styles.colors.main_back_color_d1,
        marginBottom: 10
    },
    itemsContainerStyle: {
        padding: 15,
        marginTop: 5
    },
    iconContainerStyle: {
    },
    itemStyle: {
        flexDirection: 'row-reverse',
        justifyContent: 'flex-start',
        borderRadius: 5,
        overflow: 'hidden'
    },
    labelStyle: {
        color: common_styles.colors.main_light_color,
        fontWeight: 'normal',
        marginRight: 0
    },
    activeLabelStyle: {
        fontWeight: 'bold',
    },
    inactiveLabelStyle: {
        color: '#e3e3e3'
    }
})