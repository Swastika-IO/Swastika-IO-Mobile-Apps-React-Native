import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, Image } from 'react-native';

var HOST = 'https://aamboceanservice.blob.core.windows.net'


export const ComponentType = {
    View: 0,
    ScrollView: 1,
    Text: 2,
    Image: 3,
    Button: 4,
}

export const DataType = {
    string: 0,
    image: 1,
    url: 2,
    object: 3,
    component: 4,
}

export class CustomText extends React.Component {
    // "componentType": "Text",
    // "styleName": "title",
    // "id": "6",
    // "dataType": "String",
    // "dataSource": "Simpler. Smarter. Faster."

    static propTypes = {
        styleName: PropTypes.array.isRequired,
    }

    constructor(props) {
        super(props)
        const { styleName, dataType, dataSource, id } = this.props;
        this.content = convertDataType(dataType, dataSource);
        this.key = id;
        this.style = props.getListStylesByStyleName(styleName);
    }

    convertDataType(type, dataSource) {
        switch (type) {
            case DataType.string:
                return dataSource;
            case DataType.object:
                const { objectData } = this.props;
                return objectData ? objectData[dataSource] : "";
            default:
                return "";
        }
    }

    render = () => {

        return (
            <Text key={this.key} style={this.style}>{this.content}</Text>
        );
    }
}


export class CustomView extends React.Component {
    static propTypes = {
        styleName: PropTypes.array.isRequired,
    }

    constructor(props) {
        super(props)
        const { styleName, dataType, dataSource, id } = this.props;
        this.content = convertDataType(dataType, dataSource);
        this.key = id;
        this.style = props.getListStylesByStyleName(styleName);
        //Lọc style properties cho View
        for (let styleChild of this.style) {
            if (styleChild.hasOwnProperty('color')) {
                styleChild['backgroundColor'] = styleChild['color']
                delete styleChild['color']
            }
        }
    }

    convertDataType(type, dataSource) {
        switch (type) {
            case DataType.component:
                return dataSource;
            default:
                return "";
        }
    }


    render = () => {
        return (
            <View key={this.key} style={this.style}>
                {this.props.generateTag(this.content)}
            </View>
        );
    }
}

export class CustomImage extends React.Component {
    static propTypes = {
        styleName: PropTypes.array.isRequired,
    }

    constructor(props) {
        super(props)
        const { styleName, dataType, dataSource, id } = this.props;
        this.content = convertDataType(dataType, dataSource);
        this.key = id;
        this.style = props.getListStylesByStyleName(styleName);
    }

    convertDataType(type, dataSource) {
        switch (type) {
            case DataType.image:
                return converImageURL(dataSource);
            case DataType.object:
                const { objectData } = this.props;
                return objectData ? objectData[dataSource] : "";
            default:
                return "";
        }
    }

    converImageURL(image) {
        return HOST + image
    }

    render = () => {
        const { styleName, dataSource, id, dataType } = this.props;
        return (
            <Image key={id} style={this.style}
                source={{ uri: this.converImageURL(dataSource) }} />
        );
    }
}


const temp = {
    "componentType": "View",
    "styleName": "about-description text-center",
    "id": 1,
    "dataType": "component",
    "dataValue": null,
    "dataSource": [
        {
            "componentType": "View",
            "styleName": "features-3",
            "id": 2,
            "dataType": "component",
            "dataValue": null,
            "dataSource": [
                {
                    "componentType": "View",
                    "styleName": "container",
                    "id": 8,
                    "dataType": "component",
                    "dataValue": null,
                    "dataSource": [
                        {
                            "componentType": "View",
                            "styleName": "row",
                            "id": 3,
                            "dataType": "component",
                            "dataValue": null,
                            "dataSource": [
                                {
                                    "componentType": "Text_header2",
                                    "styleName": "title",
                                    "id": 1,
                                    "dataType": "object",
                                    "dataValue": "@Model.title",
                                    "dataSource": []
                                },
                                {
                                    "componentType": "Text_header4",
                                    "styleName": "description",
                                    "id": 2,
                                    "dataType": "object",
                                    "dataValue": "description",
                                    "dataSource": []
                                }
                            ]
                        },
                        {
                            "componentType": "View",
                            "styleName": "row",
                            "id": 4,
                            "dataType": "object_array",
                            "dataValue": "Model.Data.Items",
                            "dataSource": [
                                {
                                    "componentType": "View",
                                    "styleName": "col-md-4",
                                    "id": 5,
                                    "dataType": "component",
                                    "dataValue": null,
                                    "dataSource": [
                                        {
                                            "componentType": "View",
                                            "styleName": "info info-hover",
                                            "id": 6,
                                            "dataType": "component",
                                            "dataValue": null,
                                            "dataSource": [
                                                {
                                                    "componentType": "View",
                                                    "styleName": "icon icon-success icon-circle",
                                                    "id": 7,
                                                    "dataType": "component",
                                                    "dataValue": null,
                                                    "dataSource": [
                                                        {
                                                            "componentType": "Image",
                                                            "styleName": "now-ui-icons",
                                                            "id": 6,
                                                            "dataType": "image_assets",
                                                            "dataValue": "../../assets/icons/iconPlus.png",
                                                            "dataSource": []
                                                        }
                                                    ]
                                                },
                                                {
                                                    "componentType": "Text_header4",
                                                    "styleName": "info-title",
                                                    "id": 5,
                                                    "dataType": "object",
                                                    "dataValue": "title",
                                                    "dataSource": []
                                                },
                                                {
                                                    "componentType": "Text",
                                                    "styleName": "description",
                                                    "id": 5,
                                                    "dataType": "object",
                                                    "dataValue": "excerpt",
                                                    "dataSource": []
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    ]
}