import React from 'react';
import PropTypes from 'prop-types';
import {View, Text, Image } from 'react-native';

var HOST = 'https://aamboceanservice.blob.core.windows.net'

export class CustomText extends React.Component {
    // "componentType": "Text",
    // "styleName": "title",
    // "id": "6",
    // "dataType": "String",
    // "dataSource": "Simpler. Smarter. Faster."

    static propTypes = {
        styleName: PropTypes.array.isRequired,
        // styles: PropTypes.oneOfType([
        //     PropTypes.array,
        //     PropTypes.number,
        //     PropTypes.shape({}),
        // ]).isRequired,
    }

    constructor(props){
        super(props)
        const { styleName } = this.props;
        this.style = props.getListStylesByStyleName(styleName);
    }

    render = () => {
        const { styleName, dataSource, id } = this.props;
        return (
            <Text key={id} style={this.style}>{dataSource}</Text>
        );
    }
}


export class CustomView extends React.Component {
    static propTypes = {
        styleName: PropTypes.array.isRequired,
    }

    constructor(props) {
        super(props)
        const { styleName } = this.props;
        this.style = props.getListStylesByStyleName(styleName);
        for (let styleChild of this.style) {
            if (styleChild.hasOwnProperty('color')) {
                styleChild['backgroundColor'] = styleChild['color']
                delete styleChild['color']
            }
        }
    }

    render = () => {
        const { styleName, dataSource, id, dataType } = this.props;
        return (
            <View key={id} style={this.style}>
                {this.props.generateTag(dataSource)}
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
        const { styleName } = this.props;
        this.style = props.getListStylesByStyleName(styleName);
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