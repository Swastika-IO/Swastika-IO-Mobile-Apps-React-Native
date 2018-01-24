import React from 'react';
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { StyleSheet, View, Text, ScrollView, Image, ActivityIndicator } from 'react-native';
import RNC from 'react-native-css';
import { vw, vh, vmin, vmax, getPercentWidth, getPercentHeight } from '../../utils/scale'

var HOST = 'http://shop2banh.vn'
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

var dataStyle
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

var styleBootstrap;

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

//swastika.io
var jsonData
// = [{
//     "componentType": "View",
//     "styleName": "page-header page-header-small",
//     "id": "1",
//     "dataType": "Component",
//     "dataSource": [
//         {
//             "componentType": "View",
//             "styleName": "page-header-image",
//             "id": "2",
//             "dataType": "background",
//             "dataSource": "/images/thumbs/2016/01/dia-sau-galfer-size-zin-yamaha-exciter-150-216-slide-products-56a304d05c030.JPG"
//         }, {
//             "componentType": "View",
//             "styleName": "content-center",
//             "dataType": "Component",
//             "id": "3",
//             "dataSource": [{
//                 "componentType": "View",
//                 "id": "4",
//                 "styleName": "row",
//                 "dataType": "Component",
//                 "dataSource": [{
//                     "componentType": "View",
//                     "styleName": "col-md",
//                     "dataType": "Component",
//                     "id": "5",
//                     "dataSource": [{
//                         "componentType": "Text",
//                         "styleName": "title",
//                         "id": "6",
//                         "dataType": "String",
//                         "dataSource": "Simpler. Smarter. Faster."
//                     }, {
//                         "componentType": "Text",
//                         "styleName": "title",
//                         "id": "7",
//                         "dataType": "String",
//                         "dataSource": "The CloudCheckr Cloud Management Platform (CMP) provides full visibility and control to reduce costs, improve cybersecurity posture, and automate critical tasks."
//                     }]
//                 }]
//             }]
//         }]
// }]

function getListStylesByStyleName(listStyleName) {
    let arrStyle = [];
    for (let styleName of listStyleName) {
        if (typeof styleBootstrap[styleName] !== 'undefined')
            arrStyle.push(styleBootstrap[styleName])
    }
    return arrStyle;
}

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

function generateTag(data) {
    let Arr = (data).map((entry, i) => {
        if (entry.componentType == 'View') {
            if (entry.dataType == 'background') {
                return <CustomImage key={i + 'CustomImage'}
                    id={entry.id} styleName={convertReactStyleNames(entry.styleName)}
                    dataSource={entry.dataSource} dataType={entry.dataType} />
            } else {
                return <CustomView key={i + 'CustomView'}
                    id={entry.id} styleName={convertReactStyleNames(entry.styleName)}
                    dataSource={entry.dataSource} dataType={entry.dataType} />
            }
        } else if (entry.componentType == 'Text') {
            return <CustomText key={i + 'CustomText'}
                id={entry.id} styleName={convertReactStyleNames(entry.styleName)}
                dataSource={entry.dataSource} dataType={entry.dataType} />
        }
    })

    return Arr;
}

export class MyScreen extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            isLoading: true
        }
    }

    async getDataJson() {
        var swasitkaData = await fetch("http://swastika.io/api/vi-vn/module/details/backend/9")
        let responseJson = await swasitkaData.json();
        var content = responseJson.data.view.mobileStyle;
        // var styleData = JSON.parse(content.replace("\"", '').replace("\n", '').replace("\r", ''));
        jsonData = content.componentData;
        var dataStyle = parserStyle(content.styleData);
        styleBootstrap = StyleSheet.create(dataStyle)
        this.setState({ isLoading: false })
    }

    componentDidMount() {
        this.getDataJson();
    }
    render() {
        if (!this.state.isLoading) {
            const data = jsonData
            return (
                generateTag(data)
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

class CustomText extends React.Component {
    static propTypes = {
        styleName: PropTypes.array.isRequired,
        // styles: PropTypes.oneOfType([
        //     PropTypes.array,
        //     PropTypes.number,
        //     PropTypes.shape({}),
        // ]).isRequired,
    }

    render = () => {
        const { styleName, dataSource, id } = this.props;

        return (
            <Text key={id} style={getListStylesByStyleName(styleName)}>{dataSource}</Text>
        );
    }
}

class CustomView extends React.Component {
    static propTypes = {
        styleName: PropTypes.array.isRequired,
        // styles: PropTypes.oneOfType([
        //     PropTypes.array,
        //     PropTypes.number,
        //     PropTypes.shape({}),
        // ]).isRequired,
    }

    constructor(props) {
        super(props)
        const { styleName } = this.props;
        this.styleC = getListStylesByStyleName(styleName);
        for (let styleChild of this.styleC) {
            if (styleChild.hasOwnProperty('color')) {
                styleChild['backgroundColor'] = styleChild['color']
                delete styleChild['color']
            }
        }
    }

    render = () => {
        const { styleName, dataSource, id, dataType } = this.props;
        // style={styles[styleName]}
        return (
            <View key={id} style={this.styleC}>
                {generateTag(dataSource)}
            </View>
        );
    }
}

class CustomImage extends React.Component {
    static propTypes = {
        styleName: PropTypes.array.isRequired,
    }

    converImageURL(image) {
        return HOST + image
    }

    render = () => {
        const { styleName, dataSource, id, dataType } = this.props;
        return (
            <Image key={id} style={getListStylesByStyleName(styleName)}
                source={{ uri: this.converImageURL(dataSource) }} />
        );
    }
}