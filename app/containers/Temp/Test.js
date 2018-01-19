import React from 'react';
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import RNC from 'react-native-css';

const stylesRNC = RNC
    `
    .page-header {
        minHeight: 100;
        maxHeight: 500;
        padding: 0;
        backgroundColor: #FFFFFF;
        position: relative;
    }
    
      `;
//swastika.io
export const jsonData = [{
    "componentType": "View",
    "styleName": "page-header",
    "id": "1",
    "dataType": "Component",
    "dataSource": [
        {
            "componentType": "Text",
            "styleName": "page-header-image",
            "id": "2",
            "dataType": "background",
            "dataSource": "url('../assets/img/bg32.jpg')"
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

function generateTag(data) {
    var componentCustome;
    let Arr = (data).map((entry, i) => {
        if (entry.componentType == 'View') {
            return <CustomView key={i + 'CustomView'} id={entry.id} styleName={entry.styleName} dataSource={entry.dataSource} />
        } else if (entry.componentType == 'Text') {
            return <CustomText key={i + 'CustomText'} id={entry.id} styleName={entry.styleName} dataSource={entry.dataSource} />
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
        styleName: PropTypes.string.isRequired,
        // styles: PropTypes.oneOfType([
        //     PropTypes.array,
        //     PropTypes.number,
        //     PropTypes.shape({}),
        // ]).isRequired,
    }

    render = () => {
        const { styleName, dataSource, id } = this.props;
        // style={styles[styleName]}
        return (
            <Text key={id} style={stylesRNC[styleName]}>{dataSource}</Text>
        );
    }
}

class CustomView extends React.Component {
    static propTypes = {
        styleName: PropTypes.string.isRequired,
        // styles: PropTypes.oneOfType([
        //     PropTypes.array,
        //     PropTypes.number,
        //     PropTypes.shape({}),
        // ]).isRequired,
    }

    render = () => {
        const { styleName, dataSource, id } = this.props;
        // style={styles[styleName]}
        return (
            <View key={id} style={stylesRNC[styleName]}>
                {generateTag(dataSource)}
            </View>
        );
    }
}