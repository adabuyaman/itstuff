import React from 'react';
import { View, Text, StyleSheet,TouchableOpacity } from 'react-native';
import common_styles from '../../../common/styles/common_styles';
import { Icon } from 'react-native-elements';

const SectionButton = (props) => {
    const { label, icon, iconType, color, screen, navigation } = props
    return (
        <View style={{ borderRadius: 5, overflow: 'hidden' }}>
            <TouchableOpacity
                onPress={() => navigation.navigate(screen)}>
                <View style={styles.main_container}>
                    <Icon
                        reverse
                        name={icon}
                        type={iconType ? iconType : 'antdesign'}
                        color={color ? color : common_styles.colors.main_secondary_color}
                        reverseColor={common_styles.colors.main_light_color}
                    />
                    <Text style={styles.title}>{label}</Text>
                </View>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    main_container: {
        borderRadius: 8,
        padding: 12,
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        color: common_styles.colors.main_light_color,
        fontSize: 12,
    },
});


export default SectionButton