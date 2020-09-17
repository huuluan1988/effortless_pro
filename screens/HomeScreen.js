import React from "react";
import { StyleSheet, Image, Text, View, Dimensions, TouchableOpacity, StatusBar, ActivityIndicator} from "react-native";
// import { AdMobBanner, AdMobInterstitial } from 'react-native-admob';
import {DrawerActions } from 'react-navigation';
import Icon from 'react-native-vector-icons/Feather';
import Masonry from "./app/Masonry";
// import Notification from "./Notification";
import Base from "./Base";
import AsyncStorage from '@react-native-community/async-storage';
// import SplashScreen from 'react-native-smart-splash-screen'
import Menu, {
    MenuProvider,
} from 'react-native-popup-menu';

const { width } = Dimensions.get("window");
const columnWidth = (width - 10) / 2 - 10;

export default class Category extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            withHeight: false,
            loading: false,
            colors: Base.color,
            dataSource: [],
            isHidden: true,
            modalVisible: false,
        };
    }

    componentDidMount() {

        // SplashScreen.close({
        //     animationType: SplashScreen.animationType.scale,
        //     duration: 850,
        //     delay: 500,
        //  })

        this.load();
        // this.loadAdmod();

        this.getColors();
        this.getNumber();
    }

    getColors = async () => {
        try {
          const value = await AsyncStorage.getItem('colors')
          if(value !== null) {
            // value previously stored
            this.setState({ colors: value ? value : '2FA1B3' });
          }
        } catch(e) {
          // error reading value
        }
    }

    getNumber = async () => {
        try {
          const number = await AsyncStorage.getItem('number')
          if(number !== null) {
            // value previously stored
            this.setState({ number: number });
          }
        } catch(e) {
          // error reading value
        }
      }

    load() {
        this.setState({ loading: true });
        fetch("https://nhocbi.com/tienganh/category_effortlessenglish_v4/json_category_effortlessenglish", {
            headers: {
                "X-Requested-With": "XMLHttpRequest"
            }
        }).then(res => res.json())
            .then(data => {
                this.setState({ loading: false });
                data = data.map(item => {
                    return {
                        code: item.code,
                        image: item.image,
                        word: item.word,
                        height: columnWidth / item.image_width * item.image_height,
                    }
                });
                if (this.state.withHeight) {
                    this.refs.list.addItemsWithHeight(data);
                } else {
                    this.refs.list.addItems(data);
                }
            });
    }

    onScrollEnd(event) {
        const scrollHeight = Math.floor(event.nativeEvent.contentOffset.y + event.nativeEvent.layoutMeasurement.height);
        const height = Math.floor(event.nativeEvent.contentSize.height);
        if (scrollHeight >= height) {
            // this.load();
        }
    }

    render() {
        const { navigate } = this.props.navigation;

        return (

            <MenuProvider style={{ flex: 1 }}>
                <View style={{ flex: 1, backgroundColor: "#fff" }}>
                    

                    <Masonry onMomentumScrollEnd={this.onScrollEnd.bind(this)}
                        style={{ flex: 1}}
                        columns={2} ref="list"
                        containerStyle={{ padding: 5 }}
                        renderItem={item => <TouchableOpacity
                            onPress={() => {
                                navigate('DanhSach', { code: item.code, word: item.word })
                            }}
                            style={{
                                margin: 5,
                                backgroundColor: "#fff",
                                borderRadius: 5,
                                overflow: "hidden",
                                borderWidth: 1,
                                borderColor: "#dedede"
                            }}>
                            <Image source={{ uri: 'https://nhocbi.com/public/static/templates/frontend/effortlessenglish/image/' + item.image }} style={{ height: item.height }} />
                            <Text style={{ padding: 5, color: "#444", textAlign: 'center' }}>{item.word}</Text>

                        </TouchableOpacity>} />



                    {this.state.loading && <View style={{
                        position: "absolute",
                        justifyContent: "center",
                        alignItems: "center",
                        top: 0,
                        bottom: 0,
                        left: 0,
                        right: 0,
                        backgroundColor: "#ffffff"
                    }}>
                        <ActivityIndicator size="large" color={'#' + this.state.colors} />
                    </View>}

                </View>
            </MenuProvider>
        )
    }
}

const styles = StyleSheet.create({

    header: {
        backgroundColor: '#2FA1B3',
        height: 40,
    },
    menu: {
        position: 'absolute',
        top: 6,
        left: 10,
        zIndex: 99,
    },
    title: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        color: '#d1090b',
    },
    title_text: {
        color: '#ffffff',
        textAlign: 'center',
        fontSize: 18,
        marginTop: 0,
        position: 'absolute',
        zIndex: 99,
    },
    setting: {
        position: 'absolute',
        top: 5,
        right: 10,
        zIndex: 9,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        width: 60,
    },
    btn: {
        position: 'absolute',
        bottom: 25,
        zIndex: 9,
        backgroundColor: '#fff',
        color: '#000',
        fontSize: 20,
        width: '35%',
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        borderRadius: 10,
        lineHeight: 40,
    }
});