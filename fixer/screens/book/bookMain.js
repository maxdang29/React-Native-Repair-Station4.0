import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import BookItem from '../../components/book/bookItem';
import firebase from 'react-native-firebase';
import {connect} from 'react-redux';
import * as bookAction from '../../redux/book/actions/actions';

class Book extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.props.getAllBook();
  }
  render() {
    const {dataBooks, loading} = this.props;
    if (loading) {
      return (
        <View style={styles.loading}>
          <ActivityIndicator size="large" />
        </View>
      );
    } else {
      return (
        <ScrollView>
          <View style={styles.container}>
            <FlatList
              data={dataBooks}
              renderItem={({item}) => <BookItem item={item} />}
              keyExtractor={item => item.id}
            />
          </View>
        </ScrollView>
      );
    }
  }
}
const styles = StyleSheet.create({
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
const mapStateToProps = store => {
  return {
    dataBooks: store.BookReducers.dataBook,
    loading: store.BookReducers.loading,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    getAllBook: () => {
      dispatch(bookAction.getAllBook());
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Book);
