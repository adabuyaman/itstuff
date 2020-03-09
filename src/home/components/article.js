import React from 'react';
import { View, Text, StyleSheet, Linking, TouchableOpacity } from 'react-native';
import common_styles from '../../../common/styles/common_styles';
import { Icon } from 'react-native-elements';

const Article = (props) => {
    const { title, reference, link, date } = props
    return (
        <View style={{ borderRadius: 5, overflow: 'hidden' }}>
            <TouchableOpacity
                onPress={() => Linking.openURL(link)}>
                <View style={styles.main_container}>
                    <View style={styles.info_container}>
                        <Icon reverse name='link' type='antdesign' color={common_styles.colors.main_back_color_light} size={16} />
                        <View style={styles.info_content}>
                            <Text style={styles.title}>{title}</Text>
                            <View style={styles.subinfo_container}>
                                <View style={[styles.reference_container, { marginRight: 5 }]}>
                                    <Text style={styles.reference_text}>{date}</Text>
                                    <Icon name='clockcircleo' type='antdesign' color='#fff' size={10} />
                                </View>
                                <View style={styles.reference_container}>
                                    <Text style={styles.reference_text}>{reference}</Text>
                                    <Icon name='user' type='antdesign' color='#fff' size={11} />
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={styles.link_container}>
                        <Text style={styles.link}>{link.length > 65 ? link.substring(0, 49) + ' ..' : link}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    main_container: {
        borderRadius: 6,
    },
    info_container: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: common_styles.colors.main_back_color_d1,
        width: '100%',
        padding: 8
    },
    info_content: {
        flex: 1,
        flexDirection: 'column',
    },
    title: {
        color: common_styles.colors.main_light_color,
        fontWeight: 'bold',
        fontSize: 15
    },
    subinfo_container: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    reference_container: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        backgroundColor: common_styles.colors.main_secondary_color,
        paddingVertical: 1.5,
        paddingHorizontal: 4.5,
        marginTop: 3,
        borderRadius: 15
    },
    reference_text: {
        color: common_styles.colors.main_light_color,
        fontSize: 10.5,
        marginRight: 3,
    },
    link_container: {
        flexDirection: 'row',
        backgroundColor: common_styles.colors.main_back_color_light,
        width: '100%',
        paddingVertical: 4,
        paddingHorizontal: 10
    },
    link: {
        color: common_styles.colors.main_back_color_d1,
        fontSize: 12,
        flex: 1
    },
});

export default Article