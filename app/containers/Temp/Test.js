import React from 'react';
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { StyleSheet, View, Text, ScrollView, Image, ActivityIndicator, RefreshControl } from 'react-native';
import { vw, vh, vmin, vmax, getPercentWidth, getPercentHeight } from '../../utils/scale'
import * as Swastika from '../../components/swastika'

//min-height = minHeight
//max-height = maxHeight
//min-width = minWidth
//max-width = maxWidth
//60vh = 60 * vh
//440px = 440
//url('../assets/img/bg32.jpg') = /assets/img/bg32.jpg
// width: ${getPercentWidth(100)};   %
// height: ${getPercentHeight(100)}; %
// z-index = zIndex
// background-size: cover; = resizeMode: cover;
// background-position: center center; = ??
// margin-right = marginRight
// margin-right = marginRight


//  = {
//     'page-headerpage-header-small': {
//         'minHeight': '60vh',
//         'maxHeight': 100
//     }
//     ,
//     'page-header': {
//         'minHeight': '100vh',
//         'maxHeight': 999,
//         'padding': 0,
//         'backgroundColor': '#FFFFFF',
//         'position': 'relative'
//     },
//     "row": {
//         'flex': 1,
//         "justifyContent": "center"
//     },
//     'page-header-image': {
//         'position': 'absolute',
//         'resizeMode': 'cover',
//         'width': '100%',
//         'height': '100%',
//         'zIndex': -1
//     },
//     'content-center': {
//         'top': '10%'
//     }
//     , "col_md": {
//         "maxWidth": '66.666667%'
//     }
//     , "title": {
//         "fontWeight": "700",
//         "color": "#ffffff",
//         "paddingLeft": 30,
//         "textShadowOffset": {
//             "width": 1,
//             "height": 1
//         },
//         "textShadowRadius": 2,
//         "textShadowColor": "#000000",
//         "fontSize": 20,
//         "paddingRight": 30,
//         "alignSelf": "center",
//         "paddingTop": 30
//     }
// }

function parserStyle(strStyle) {
    var newStyle = {};
    var characters = Object.keys(strStyle);
    characters.map(k => {
        let value = strStyle[k];
        if (typeof value === 'object') {
            newStyle[k] = parserStyle(value);
        } else if (typeof value === 'string') {
            if (value.indexOf('vh') !== -1) {
                var valueConvert = value.replace('vh', '');
                newStyle[k] = parseFloat(valueConvert) * vh;
            } else if (value.indexOf('vw') !== -1) {
                var valueConvert = value.replace('vw', '');
                newStyle[k] = parseFloat(valueConvert) * vw;
            } else if (value.indexOf('%') !== -1) {
                var valueConvert = value.replace('%', '');
                if (k.hasOwnProperty("width") || k.hasOwnProperty("Left") || k.hasOwnProperty("Right")) {
                    newStyle[k] = getPercentWidth(parseFloat(valueConvert));
                } else if (k.hasOwnProperty("height") || k.hasOwnProperty("Top") || k.hasOwnProperty("Bottom")) {
                    newStyle[k] = getPercentHeight(parseFloat(valueConvert));
                } else {
                    newStyle[k] = value;
                }
            } else {
                newStyle[k] = value;
            }
        } else {
            newStyle[k] = value;
        }
    });
    return newStyle;
}

var styleData
// = {
//     "about-description": {
//         "padding": 0,
//         "backgroundColor": "white"
//     },
//     "text-center": {
//     },
//     "features-3": {
//         "padding": 0
//     },
//     "container": {
//         "width": "100%",
//         "paddingRight": 15,
//         "paddingLeft": 15,
//         "zIndex": 2,
//         "position": "relative"
//     },
//     "page-headerpage-header-small": {
//         "minHeight": "60vh",
//         "maxHeight": 100
//     }
//     ,
//     "page-header": {
//         "minHeight": "100vh",
//         "maxHeight": 999,
//         "padding": 0,
//         "backgroundColor": "#FFFFFF",
//         "position": "relative"
//     },
//     "row": {
//         "flex": 1,
//         "justifyContent": "center"
//     },
//     "img": {
//         "position": "absolute",
//         "resizeMode": "cover",
//         "width": "100%",
//         "height": "100%",
//         "zIndex": -1
//     },
//     "content-center": {
//         "top": "10%"
//     }
//     , "col-md-4": {
//         "justifyContent": "center",
//         "width": "100%",
//         "paddingRight": 15,
//         "paddingLeft": 15
//     }
//     , "col-md": {
//         "maxWidth": "66.666667%",
//         "paddingRight": 15,
//         "paddingLeft": 15
//     }
//     , "title": {
//         "fontWeight": "700",
//         "paddingTop": 30,
//         "marginBottom": 30,
//         "fontSize": 25,
//         "textAlign": "center"
//     }
//     , "now-ui-icons": {
//         "alignSelf": "center",
//         "color": "#18ce0f",
//         "textAlign": "center",
//         "fontSize": 25,
//     }
//     , "icon-circle": {
//         "justifyContent": "center",
//         "alignSelf": "center",
//         "width": 80,
//         "shadowColor": "#18ce0f",
//         "shadowOffset": { "width": 0, "height": 2 },
//         "shadowOpacity": 0.8,
//         "shadowRadius": 2,
//         "elevation": 3,
//         "marginBottom": 10,
//         "height": 80,
//         "borderRadius": 40,
//         "backgroundColor": "white"
//     }
//     , "info": {
//         "maxWidth": 360,
//         "paddingTop": 70,
//         "paddingBottom": 30
//     }
//     , "info-title": {
//         "fontWeight": "700",
//         "color": "#000000",
//         "paddingLeft": 30,
//         "textShadowOffset": {
//             "width": 1,
//             "height": 1
//         },
//         "fontSize": 20,
//         "paddingRight": 30,
//         "textAlign": "center",
//         "paddingTop": 30
//     }
//     , "description": {
//         "fontWeight": "300",
//         "color": "#9A9A9A",
//         "marginTop": 30,
//         "backgroundColor": "transparent",
//         "marginBottom": 15,
//         "fontSize": 24,
//         "textAlign": "center"
//     }
// }

var jsonData;
var modelData; 
var styleBootstrap;
var indexR = 0;

//Chuyển đổi style name từ Css ra React Style names
function convertReactStyleNames(strData) {
    var newStyleName = [];
    let splitStyles = strData.split(' ')
    var index = 0;
    var fullStyleName = '';

    for (let styleName of splitStyles) {
        newStyleName[index] = styleName;
        fullStyleName = fullStyleName.concat(styleName)
        index++;
    }

    if (splitStyles.length > 1) {
        newStyleName[index] = fullStyleName;
    }
    return newStyleName;
}


export class MyScreen extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            isLoading: true,
            refreshing: false
        }
        this.contentView;
        this.ComponentType = Swastika.ComponentType;
    }

    generateTag = (data, modelDataChild) => {
        let Arr = (data).map((entry, i) => {
            var test = this.ComponentType.View;
            switch (entry.componentType) {
                case this.ComponentType.View:
                    if (entry.dataType == 'background') {
                        return <Swastika.CustomImage key={i + 'CustomImage'}
                            generateTag={this.generateTag}
                            modelData={modelDataChild} dataValue={entry.dataValue}
                            getListStylesByStyleName={this.getListStylesByStyleName}
                            id={entry.id} styleName={convertReactStyleNames(entry.styleName)}
                            dataSource={entry.dataSource} dataType={entry.dataType} />
                    } else {
                        return <Swastika.CustomView key={i + 'CustomView'}
                            generateTag={this.generateTag}
                            modelData={modelDataChild} dataValue={entry.dataValue}
                            getListStylesByStyleName={this.getListStylesByStyleName}
                            id={entry.id} styleName={convertReactStyleNames(entry.styleName)}
                            dataSource={entry.dataSource} dataType={entry.dataType} />
                    }
                case this.ComponentType.Text:
                    return <Swastika.CustomText key={i + 'CustomText'}
                        generateTag={this.generateTag}
                        modelData={modelDataChild} dataValue={entry.dataValue}
                        getListStylesByStyleName={this.getListStylesByStyleName}
                        id={entry.id} styleName={convertReactStyleNames(entry.styleName)}
                        dataSource={entry.dataSource} dataType={entry.dataType} />
                case this.ComponentType.Image:
                    return <Swastika.CustomImage key={i + 'CustomImage'}
                        generateTag={this.generateTag}
                        modelData={modelDataChild} dataValue={entry.dataValue}
                        getListStylesByStyleName={this.getListStylesByStyleName}
                        id={entry.id} styleName={convertReactStyleNames(entry.styleName)}
                        dataSource={entry.dataSource} dataType={entry.dataType} />
                default:
                    return <View key={i} />
            }
        })
        return Arr;
    }

    getListStylesByStyleName = (listStyleName) => {
        let arrStyle = [];
        for (let styleName of listStyleName) {
            if (typeof styleBootstrap[styleName] !== 'undefined')
                arrStyle.push(styleBootstrap[styleName])
        }
        return arrStyle;
    }

    _onRefresh() {
        this.setState({ refreshing: true });
        this.getDataJson();
    }

    async getDataJson() {
        var swasitkaData = await fetch("http://dev.swastika.io/api/vi-vn/module/details/3")
        let responseJson = await swasitkaData.json();

        modelData = responseJson.data;
        jsonData = [];
        //Dữ liệu của component
        jsonData.push(modelData.view.mobileComponent);

        //Dữ liệu của Style
        var content = modelData.view.mobileView;
        var dataStyle = parserStyle(content);
        styleBootstrap = StyleSheet.create(dataStyle)

        indexR++;
        delete this.contentView;
        if(indexR > 6){
            this.contentView = this.generateTag(jsonData, modelData);
        }else
        if(indexR > 4){
            this.contentView = (<View/>);
        }else{
        this.contentView = this.generateTag(jsonData, modelData);
        }
        this.setState({
            isLoading: false,
            refreshing: false
        })
    }

    componentDidMount() {
        this.getDataJson();
    }

    render() {
        if (!this.state.isLoading) {
            // const data = this.state.jsonData
            return (
                <ScrollView style={{ flex: 1 }} refreshControl={
                    <RefreshControl
                        refreshing={this.state.refreshing}
                        onRefresh={this._onRefresh.bind(this)}
                    />}>
                    {this.contentView}
                </ScrollView>
            )
        } else {
            return (
                <View >
                    <ActivityIndicator size="large" color="#0000ff" />
                </View>
            )
        }
    }
}

export default connect()(MyScreen)