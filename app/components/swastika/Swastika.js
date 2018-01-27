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