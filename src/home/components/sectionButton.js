import React from 'react';
import { View, Text, StyleSheet, TouchableNativeFeedback } from 'react-native';
import common_styles from '../../../common/styles/common_styles';
import { Icon } from 'react-native-elements';

export default class SectionButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        const { label, icon, iconType, color } = this.props
        return (
            <TouchableNativeFeedback style={{ borderRadius: 50, overflow: 'hidden' }} background={TouchableNativeFeedback.Ripple(common_styles.colors.main_color)} onPress={() => 1}>
                <View style={styles.main_container}>
                    <Icon
                        reverse
                        name={icon}
                        type={iconType ? iconType : 'antdesign'}
                        color={color ? color : common_styles.colors.main_color}
                        reverseColor={common_styles.colors.main_light_color}
                    />
                    <Text style={styles.title}>{label}</Text>
                </View>
            </TouchableNativeFeedback>
        )
    }
};

const styles = StyleSheet.create({
    main_container: {
        borderRadius: 8,
        padding: 12,
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        color: common_styles.colors.main_light_color,
        fontSize: 13,
    },
});