/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  TouchableOpacity,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { createStore } from 'redux'
import { combineReducers } from 'redux-immutablejs'
import { reducer as formReducer } from 'redux-form/immutable'
import { fromJS } from 'immutable'
import { Provider } from 'react-redux'
import CleanForm from './src/react-native-clean-form'
import CleanFormRedux from './src/react-native-clean-form-redux-form'
import ImmutableForm from './src/immutable'

const reducer = combineReducers({
  form: formReducer
})

const store = createStore(reducer, fromJS({}))

export default class reduxFormArticle extends Component {
  constructor(props) {
    super(props)

    this.state = {
      type: 'clean-form'
    }
  }

  onTypeChange(newType) {
    this.setState({
      type: newType
    })
  }

  render() {
    const { type } = this.state

    return (
      <Provider store={store}>
        <View style={styles.container}>
          <View style={styles.buttonContainer}>
            <Button onPress={() => this.onTypeChange('immutable')}>Immutable</Button>
            <Button onPress={() => this.onTypeChange('clean-form')}>clean-form</Button>
            <Button onPress={() => this.onTypeChange('clean-form-redux')}>clean-form w. redux-form</Button>
          </View>
          <View style={{flex: 1}}>
            { type === 'immutable' && <ImmutableForm /> }
            { type === 'clean-form' && <CleanForm />}
            { type === 'clean-form-redux' && <CleanFormRedux />}
          </View>
        </View>
      </Provider>
    );
  }
}

const Button = props => (
  <TouchableOpacity {...props}><Text style={styles.button}>{ props.children }</Text></TouchableOpacity>
)

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'blue',
    color: 'white',
    fontSize: 10,
    height: 30,
    lineHeight: 30,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 10,
    paddingLeft: 5,
    paddingRight: 5,
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    height: 50
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: 30
  }
});

AppRegistry.registerComponent('reduxFormArticle', () => reduxFormArticle);
