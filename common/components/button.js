import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import common_styles from '../styles/common_styles';

const Button = (props) => {
    const { label, color, onPress, icon, iconType, containerStyle } = props;
    const styles = StyleSheet.create({
        button_container: {
            backgroundColor: color ? color : common_styles.colors.main_color,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            paddingVertical: 10,
            paddingHorizontal: 20,
            borderRadius: 7,
            ...containerStyle,
        },
        label: {
            color: common_styles.colors.main_light_color,
            textTransform: 'capitalize'
        },
        icon_container_style: {
            marginLeft: label == '' || label == undefined ? 0 : 4
        }
    })

    return (
        <View style={styles.button_container}>
            <TouchableOpacity onPress={onPress} style={{
                flexDirection: 'row',
            }}>
                <Text style={styles.label}>{label}</Text>
                {
                    icon &&
                    <Icon containerStyle={styles.icon_container_style} name={icon} size={18} type={iconType ? iconType : 'antdesign'} color={common_styles.colors.main_light_color} />
                }
            </TouchableOpacity>
        </View>

    )
}



export default Button
// export { TestbankFile }