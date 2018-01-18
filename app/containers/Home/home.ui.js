import React from 'react';
import {
  FlatList,
  Image,
  View,
  RefreshControl,
  ActivityIndicator,
  TouchableOpacity
} from 'react-native';
import {
  RkText,
  RkCard, RkStyleSheet
} from 'react-native-ui-kitten';
import { connect } from "react-redux";
import _ from 'lodash'
import RootRoutes  from '../../config/routes'
import { NavigationActions } from 'react-navigation';
import { fetchDataArticles } from "../../action/fetch-data/fetch-data";
import { SocialBar } from '../../components/socialBar';
import { HOST } from '../../config/APIConfig';
import { loadData, saveData, loadDataSync } from '../../data/store/DataProvider'

let moment = require('moment');

export class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Article List'.toUpperCase()
  };

  constructor(props) {
    super(props);
    this.state = {
      pageSize: 3,
      pageIndex: 0,
      loadmore: false,
      refreshing: false,
    };
    this.data = null;
    this.renderItem = this._renderItem.bind(this);
  }

  componentDidMount() {
    this._onRefresh();
    loadDataSync(this.onLoadedSuccess, 'acticle')
  }

  onLoadedSuccess = (items) => {
    this.data = items
    this.forceUpdate()
  }

  _onRefresh() {
    this.setState({ refreshing: true });
    this.props.fetchData({ pageIndex: 0, pageSize: this.state.pageSize })
  }

  componentWillReceiveProps(nextProps) {
    const { dataActicles } = nextProps;
    var increateIndex = this.state.pageIndex
    if (dataActicles) {
      const { isSucceed, data } = dataActicles;
      if (isSucceed) {
        const { pageIndex, items } = data
        if (pageIndex == 0)
          saveData('acticle', data.items)
        this.data = pageIndex === 0 ? items : [...this.data, ...items];
        if (items.length > 0) {
          increateIndex = pageIndex + 1
        }
      }
      this.setState({ loadmore: false, refreshing: false, pageIndex: increateIndex });
    }
  }

  renderFooter = () => {
    if (!this.state.loadmore) return null;

    return (
      <View
        style={{
          paddingVertical: 20,
          borderTopWidth: 1,
          borderColor: "#CED0CE"
        }}
      >
        <ActivityIndicator animating size="large" />
      </View>
    );
  };


  _keyExtractor(post, index) {
    return post.id;
  }

  _onEndReached = (info) => {
    if (!this.state.loadmore) {
      this.setState({ loadmore: true });
      this.props.fetchData({ pageIndex: this.state.pageIndex, pageSize: this.state.pageSize })
    }
  };

  converImageURL(image) {
    return HOST + image
  }

  _renderItem(info) {
    return (
      <TouchableOpacity
        delayPressIn={70}
        activeOpacity={0.8}
        onPress={() => this.props.openArticleDetail({ dataArticle: info.item })}>
        <RkCard rkType='backImg'>
          <Image rkCardImg source={{
            uri: this.converImageURL(info.item.image),
            cache: 'only-if-cached',
          }} />
          <View rkCardImgOverlay rkCardContent style={styles.overlay}>
            <RkText rkType='header2 inverseColor'>{info.item.title}</RkText>
            <RkText rkType='secondary2 inverseColor'>{moment().utc(info.item.createdDateTime).fromNow()}</RkText>
            {/* <View rkCardFooter style={styles.footer}>
              <SocialBar rkType='leftAligned' />
            </View > */}
          </View>
        </RkCard>
      </TouchableOpacity>
    )
  }

  render() {
    return (
      <FlatList data={this.data}
        renderItem={this.renderItem}
        ListFooterComponent={this.renderFooter}
        onEndReachedThreshold={0.001}
        onEndReached={this._onEndReached}
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
    backgroundColor: theme.colors.screen.base,
    flex: 1
  },
  overlay: {
    justifyContent: 'flex-end',
  },
  footer: {
    width: 240
  }
}));


const mapStateToProps = (state) => {
  if (!_.isEmpty(state.serviceReducer.dataInfo))
    return {
      dataActicles: state.serviceReducer.dataInfo
    }
  return {
    dataActicles: null
  }
};
const mapDispatchToProps = (dispatch) => (
  {
    openArticleDetail: (param) => dispatch(NavigationActions.navigate({ routeName: RootRoutes.ArticleDetail.name }, param)),
    fetchData: (data) => dispatch(fetchDataArticles(data)),
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);