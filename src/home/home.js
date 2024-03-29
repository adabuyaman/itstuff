import React from 'react';
import { StyleSheet, View, Text, FlatList, ActivityIndicator, SafeAreaView } from 'react-native';
import common_styles, { style_objects } from '../../common/styles/common_styles';
import { Icon } from 'react-native-elements';
import { DrawerActions } from 'react-navigation-drawer';
import { TouchableOpacity } from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import SectionButton from './components/sectionButton';
import Article from './components/article';
import links from '../../common/indexes/index'
export default class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            articles: [],
            weather: [],
            loading: false,
            refresher: -1
        };
    }

    async componentDidMount() {
        await this.importArticles();
        this.setState({ loading: true })
    }

    async importArticles() {
        try {
            let response = await fetch(links.ArticlesApi);
            let w = await fetch(links.weatherAPI);
            let articles = await response.json();
            this.setState({ articles });
            this.setState({ weather: await w.json() });
        } catch (error) {
            console.error(error);
        }
    }

    static navigationOptions = ({ navigation }) => {
        return {
            title: 'الصفحة الرئيسية',
            headerRight: () => (
                <TouchableOpacity containerStyle={{ marginRight: 20 }} onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
                    <Icon name='menu' containerStyle={{}} size={22} type='MaterialCommunityIcons' color={common_styles.colors.main_light_color} />
                </TouchableOpacity>
            ),
        };
    };

    render() {
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <View style={style_objects.headerBar}>
                    {
                        this.state.loading ?
                            <View style={{marginLeft:10,flexDirection:'row-reverse'}}>
                                <Text style={{ color: '#fff' ,marginLeft:2}}>{Math.round(this.state.weather.main.temp - 273.15)}°</Text>
                                <Icon name='sun' size={22} type='feather' color={common_styles.colors.main_light_color} />
                            </View>
                            : <Text></Text>
                    }
                    <Icon name='menu' size={22} containerStyle={{ opacity: 0, paddingHorizontal: 20 }} />
                    <Text style={{ color: '#fff' ,marginLeft:-100}}>الصفحة الرئيسية</Text>
                    <View style={{}}>
                        <TouchableOpacity onPress={() => this.props.navigation.dispatch(DrawerActions.openDrawer())} style={{ height: '100%', justifyContent: 'center', alignItems: 'center', paddingHorizontal: 20 }}>
                            <Icon name='menu' size={22} type='MaterialCommunityIcons' color={common_styles.colors.main_light_color} />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={[styles.main_container, { padding: 0 }]}>
                    <View style={{ flex: 1, }}>
                        {
                            this.state.loading ?
                                <FlatList
                                    ListHeaderComponent={() => (
                                        <View>
                                            <View style={{ flexDirection: 'row-reverse', alignItems: 'center', justifyContent: 'center', zIndex: 1, backgroundColor: common_styles.colors.main_back_color, paddingBottom: 6 }}>
                                                <SectionButton navigation={this.props.navigation} label='المواد الدراسية' icon='book' screen='subjectsList' />
                                                <SectionButton navigation={this.props.navigation} label='جدولُك الدراسي' icon='table' screen='mySubjects' />
                                                <SectionButton navigation={this.props.navigation} label='حساب المعدل' icon='calculator' screen='GPACalculator' />
                                            </View>
                                            <View style={{ backgroundColor: common_styles.colors.main_back_color, }}>
                                                <View style={{ backgroundColor: common_styles.colors.main_back_color_d1, borderTopRightRadius: 5, borderTopLeftRadius: 5, justifyContent: 'center', alignItems: 'flex-end', paddingVertical: 8, paddingHorizontal: 10 }}>
                                                    <Text style={{ color: common_styles.colors.main_light_color, borderRightWidth: 2, borderColor: common_styles.colors.main_secondary_color, fontSize: 13, paddingHorizontal: 8 }}>أخر الأخبار</Text>
                                                </View>
                                            </View>
                                            <LinearGradient colors={['rgba(0,0,0,0.25)', 'transparent',]} style={styles.linearGradient} />
                                        </View>
                                    )}
                                    stickyHeaderIndices={[0]}
                                    contentContainerStyle={{ paddingHorizontal: 15, }}
                                    data={this.state.articles}
                                    extraData={this.state.articles}
                                    renderItem={({ item, index }) => (
                                        <View style={{ paddingTop: 10 }}>
                                            <Article title={item.title} link={item.link} reference={item.reference} date={item.date} />
                                        </View>
                                    )}
                                    keyExtractor={(item, index) => index.toString()}
                                />
                                :
                                <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
                                    <ActivityIndicator size='large' color={common_styles.colors.main_secondary_color} />
                                </View>
                        }
                    </View>
                </View>
            </SafeAreaView>
        );
    }
};

const styles = StyleSheet.create({
    main_container: {
        ...style_objects.main_container,
    },
    linearGradient: {
        opacity: 0.75,
        overflow: 'hidden',
        position: 'absolute',
        bottom: -50,
        zIndex: 5,
        height: 50,
        width: '100%'
    }
});