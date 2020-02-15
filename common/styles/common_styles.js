import {StyleSheet} from 'react-native'
const common_styles = {
    colors:{
        main_back_color:'#2c3e50',
        main_back_color_d1:'#232e3a',
        main_back_color_light:'#34495e',
        main_color:'#2980b9',
        main_color_d1:'#316c91',
        main_secondary_color:'#3498db',
        main_light_color:'#ecf0f1',
        fail_color:'#e74c3c',
        pass_color:'#27ae60'
    }
}

const style_objects = StyleSheet.create({
    main_container:{
        flex:1,
        padding:15,
        backgroundColor:common_styles.colors.main_back_color
    },
    headerBar:{
        width:'100%',
        height:50,
        backgroundColor:common_styles.colors.main_color,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
    }
})

export default common_styles;
export {style_objects};