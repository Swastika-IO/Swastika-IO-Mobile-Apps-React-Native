import React from 'react';
import {
  FlatList,
  Image,
  View,
  TouchableOpacity
} from 'react-native';
import {
  RkText,
  RkCard, RkStyleSheet
} from 'react-native-ui-kitten';
import { connect } from "react-redux";
import _ from 'lodash'
import { getServiceSelector } from '../../data/store/DataProvider';
import { fetchDataArticles } from "../../action/fetch-data/fetch-data";
import { SocialBar } from '../../components/socialBar';
let moment = require('moment');

export class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Article List'.toUpperCase()
  };

  constructor(props) {
    super(props);
    this.data = [{
      id: '1',
      image: '',
      title: '',
      time: '',
      seoDescription: ''
    }, {
      id: '2',
      image: '',
      title: '',
      time: '',
      seoDescription: ''
    }]
    this.renderItem = this._renderItem.bind(this);
  }

  componentDidMount() {
    this.props.fetchData({ data: '134' })
  }

  reloadData(data) {
    this.data = data;
  }

  _keyExtractor(post, index) {
    return post.id;
  }

  converImageURL(image) {
    return 'https://swastika.io' + image
  }

  _renderItem(info) {
    console.log("indeo  " + JSON.stringify(info));
    return (
      <TouchableOpacity
        delayPressIn={70}
        activeOpacity={0.8}
        onPress={() => this.props.navigation.navigate('Article', { id: info.item.id })}>
        <RkCard rkType='backImg'>
          <Image rkCardImg source={{
            uri: this.converImageURL(info.item.image),
            cache: 'only-if-cached',
          }} />
          <View rkCardImgOverlay rkCardContent style={styles.overlay}>
            <RkText rkType='header2 inverseColor'>{info.item.title}</RkText>
            <RkText rkType='secondary2 inverseColor'>{moment().add(-300, 'seconds').fromNow()}</RkText>
            <View rkCardFooter style={styles.footer}>
              <SocialBar rkType='leftAligned' />
            </View >
          </View>
        </RkCard>
      </TouchableOpacity>
    )
  }

  render() {
    const { dataActicles } = this.props;
    console.log("dataActicles  " + dataActicles)
    if (dataActicles) {
      const { isSucceed, data } = dataActicles;
      if (isSucceed) {
        this.data = data.items;
      }
    }
    return (
      <FlatList data={this.data}
        renderItem={this.renderItem}
        keyExtractor={this._keyExtractor}
        style={styles.root} />

    )
  }
}

let styles = RkStyleSheet.create(theme => ({
  root: {
    backgroundColor: theme.colors.screen.base
  },
  overlay: {
    justifyContent: 'flex-end',
  },
  footer: {
    width: 240
  }
}));


function isEmpty(obj) {

  // null and undefined are "empty"
  if (obj == null) return true;

  // Assume if it has a length property with a non-zero value
  // that that property is correct.
  if (obj.length > 0) return false;
  if (obj.length === 0) return true;

  // If it isn't an object at this point
  // it is empty, but it can't be anything *but* empty
  // Is it empty?  Depends on your application.
  if (typeof obj !== "object") return true;

  // Otherwise, does it have any properties of its own?
  // Note that this doesn't handle
  // toString and valueOf enumeration bugs in IE < 9
  for (var key in obj) {
    if (hasOwnProperty.call(obj, key)) return false;
  }

  return true;
}

const mapStateToProps = (state) => {
  if (!isEmpty(state.serReducer.dataInfo))
    return {
      dataActicles: state.serReducer.dataInfo
    }
  return {
    dataActicles: null
  }
};
const mapDispatchToProps = (dispatch) => (
  {
    fetchData: (data) => dispatch(fetchDataArticles(data)),
    send: () => dispatch({
      type: 'SET_VISIBILITY_FILTER',
      filter: 'SHOW_COMPLETED'
    }),
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);