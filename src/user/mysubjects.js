import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    FlatList,
    TouchableOpacity,
    RefreshControl
} from 'react-native';
import common_styles, { style_objects } from '../../common/styles/common_styles';
import Button from '../../common/components/button';
import { Icon } from 'react-native-elements';
import Modal from 'react-native-modalbox';
import MySubjectItem from './components/mySubjectItem';
import Swipeable from '../../common/components/swipable';
import AsyncStorage from '@react-native-community/async-storage';


export default class MySubjectsModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            subjects: {},
            userInfo: null,
            isSwiping: false
        }
        this.show = this.show.bind(this);
        this.hide = this.hide.bind(this);

    }
    async componentDidMount() {
        await this.get_user_data();
    }

    show(subjects) {
        this.setState({ subjects: subjects }, () => {
            this.refs.mysubjects.open();
            console.log('HEREMANIGGA')
            for (let i = 0; i < this.state.subjects.length; i++) {
                console.log(this.state.subjects[i].major.name)
            }
        })
    }

    async get_user_data() {
        let userInfo = await AsyncStorage.getItem('userInfo');
        userInfo = JSON.parse(userInfo);
        this.setState({ userInfo: userInfo })
    }

    hide() {
        this.refs.mysubjects.close();
    }

    async remove_subject(subject) {
        let userObject = this.state.userInfo;
        if (this.state.userInfo != null) {
            console.log('hi')
            if (userObject.subjects != undefined) {
                console.log(userObject.subjects[subject.pk.toString()].name);
                delete userObject.subjects[subject.pk.toString()]
                this.setState({ subjects: userObject.subjects });
            }
        }

        //saving data to userInfo
        try {
            await AsyncStorage.setItem('userInfo', JSON.stringify(userObject));
            console.log('subject deleted');
        }
        catch (error) {
            console.log(error);
        }
    }

    render() {
        const rightContent = (
            <TouchableOpacity onPress={() => console.log('s')} style={{ alignItems: 'center', justifyContent: 'center', backgroundColor: this.state.addBG, width: 70, height: '100%', borderRadius: 5, marginLeft: 5, overflow: 'hidden' }}>
                <Icon name='delete' type='antdesign' size={18} color={common_styles.colors.main_light_color} />
                <Text style={{ color: common_styles.colors.main_light_color }}>إزالة</Text>
            </TouchableOpacity>
        );
        return (
            <Modal
                ref='mysubjects'
                backdrop={true}
                coverScreen={true}
                style={{ ...style_objects.main_container }}
                onClosed={() => this.props.forceUpdate()}
            >
                <View style={styles.header_container}>
                    <Icon reverse name='table' color={common_styles.colors.main_color} type='antdesign' containerStyle={{ marginBottom: 4 }} />
                    <Text style={styles.header_container_title}>جدول موادك الدراسية</Text>
                </View>
                <TouchableOpacity style={{ position: 'absolute', top: 20, right: 20, zIndex: 50 }} onPress={this.hide}>
                    <Icon name='close' containerStyle={{}} size={22} type='AntDesign' color={common_styles.colors.main_light_color} />
                </TouchableOpacity>
                {
                    Object.keys(this.state.subjects).length > 0 &&
                    <FlatList
                    scrollIndicatorInsets={20, 0, 0, 20}
                        scrollEnabled={!this.state.isSwiping}
                        style={{ marginBottom: 10 }}
                        data={Object.values(this.state.subjects)}
                        renderItem={({ item }) =>
                            <Swipeable
                                style={{ flex: 1, height: '100%', marginTop: 7 }}
                                rightContent={rightContent}
                                onRightActionRelease={() => this.remove_subject(item)}
                                rightContentContainerStyle={{ flex: 1 }}
                                onSwipeStart={() => this.setState({ isSwiping: true })}
                                onSwipeRelease={() => this.setState({ isSwiping: false })}
                            >
                                <MySubjectItem hide={this.hide} {...this.props} pk={item.pk} name={item.name} major={item.major} level={item.level} />
                            </Swipeable>
                        }
                        keyExtractor={(item, index) => index.toString()}
                    />
                }
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
    }
})