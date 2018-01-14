import React from 'react';
import {
  FlatList,
  Image,
  View,
  RefreshControl,
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
import { HOST } from '../../utils/APIConfig';
import { loadData, saveData, storage } from '../../data/store/DataProvider'

let moment = require('moment');

export class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Article List'.toUpperCase()
  };

  constructor(props) {
    super(props);

    this.state = {
      refreshing: false,
    };
    this.data = null;


    // loadData('acticle').then((act) => {
    //   console.log("load ccuess ")

    //   console.log(JSON.stringify(act));
    //   this.data = act
    // });


    this.renderItem = this._renderItem.bind(this);
    
  }

  componentDidMount() {
    this._onRefresh();

    // load
    storage.load({
      key: 'acticle'
    }).then(ret => {
      // found data goes to then()
      this.data = ret
      this.forceUpdate()
    }).catch(err => {
      switch (err.name) {
        case 'NotFoundError':
          // TODO;
          break;
        case 'ExpiredError':
          // TODO
          break;
      }
    });
  }

  _onRefresh() {
    this.setState({ refreshing: true });
    this.props.fetchData()
  }

  componentWillReceiveProps(nextProps) {
    const { dataActicles } = nextProps;
    if (dataActicles) {
      const { isSucceed, data } = dataActicles;
      if (isSucceed) {
        console.log("save ccuess " + data.items)
        saveData('acticle', data.items)
      }
      this.setState({ refreshing: false });
    }
  }

  _keyExtractor(post, index) {
    return post.id;
  }

  converImageURL(image) {
    return HOST + image
  }

  _renderItem(info) {
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
    if (dataActicles) {
      const { isSucceed, data } = dataActicles;
      if (isSucceed) {
        this.data = data.items;
      }
    }
    return (
      <FlatList data={this.data}
        renderItem={this.renderItem}
        refreshControl={<RefreshControl
          refreshing={this.state.refreshing}
          onRefresh={this._onRefresh.bind(this)}
        />}
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


const mapStateToProps = (state) => {
  if (!_.isEmpty(state.serReducer.dataInfo))
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
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);