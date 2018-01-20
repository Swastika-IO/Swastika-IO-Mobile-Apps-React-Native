import React from 'react';
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { StyleSheet, View, Text, ScrollView, Image } from 'react-native';
import RNC from 'react-native-css';
import { vw, vh, vmin, vmax, getPercentWidth, getPercentHeight } from '../../utils/scale'

var HOST = 'http://swastika.io'
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

const styleBootstrap = StyleSheet.create({
    'page-headerpage-header-small': {
        'minHeight': 60 * vh,
        'maxHeight': 100
    }
    ,
    'page-header': {
        'minHeight': 100 * vh,
        'maxHeight': 999,
        'padding': 0,
        'backgroundColor': '#FFFFFF',
        'position': 'relative',
    },
    "row": {
        "display": "flex",
        "marginRight": -15,
        'flex': 1,
        "marginLeft": -15
    },
    'page-header-image': {
        'position': 'absolute',
        'resizeMode': 'cover',
        'width': getPercentWidth(100),
        'height': getPercentHeight(100),
        'zIndex': -1,
    },
    'content-center': {
        'top': getPercentHeight(10)
    }
    , "col_md_8": {
        "maxWidth": getPercentWidth(66.666667)
    }
    , "title": {
        "fontWeight": "700",
        "paddingTop": 30
    }
})

const stylesRNC = RNC
    `
    .page-header.page-header-small {
        minHeight: ${60 * vh};
        maxHeight: 440;
    }

    .page-header {
        min-height: 100vh;
        max-height: 999px;
        padding: 0;
        color: #FFFFFF;
        position: relative;
    }

    .page-header-image {
        position: absolute;
        resizeMode: cover;
        width: ${getPercentWidth(100)};
        height: ${getPercentHeight(100)};
        zIndex: -1;
    }
    .content-center {
        top: ${getPercentHeight(57)};
    }

    .row {
        display: flex;
        marginRight: -15;
        marginLeft: -15;
      }
    
      `;
//swastika.io
export const jsonData = [{
    "componentType": "View",
    "styleName": "page-header page-header-small",
    "id": "1",
    "dataType": "Component",
    "dataSource": [
        {
            "componentType": "View",
            "styleName": "page-header-image",
            "id": "2",
            "dataType": "background",
            "dataSource": "/assets/img/bg32.jpg"
        }, {
            "componentType": "View",
            "styleName": "content-center",
            "dataType": "Component",
            "id": "3",
            "dataSource": [{
                "componentType": "View",
                "id": "4",
                "styleName": "row",
                "dataType": "Component",
                "dataSource": [{
                    "componentType": "View",
                    "styleName": "col-md-8 ml-auto mr-auto",
                    "dataType": "Component",
                    "id": "5",
                    "dataSource": [{
                        "componentType": "Text",
                        "styleName": "title",
                        "id": "6",
                        "dataType": "String",
                        "dataSource": "Simpler. Smarter. Faster."
                    }, {
                        "componentType": "Text",
                        "styleName": "title",
                        "id": "7",
                        "dataType": "String",
                        "dataSource": "The CloudCheckr Cloud Management Platform (CMP) provides full visibility and control to reduce costs, improve cybersecurity posture, and automate critical tasks."
                    }]
                }]
            }]
        }]
}]

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
    newStyleName[index] = fullStyleName;
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

    componentDidMount() {

    }
    render() {
        const data = jsonData
        return (
            generateTag(data)
        )
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