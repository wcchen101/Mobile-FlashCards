import React from 'react';
import { StyleSheet, Text, View, Platform } from 'react-native';
import { StackNavigator, TabNavigator } from 'react-navigation';
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers'
import DeckList from './components/DeckList';
import CreateNewDeck from './components/CreateNewDeck';
import { white, purple } from './utils/colors';
import { FontAwesome, Ionicons } from '@expo/vector-icons'
import IndividualDeck from './components/IndividualDeck';
import AddCard from './components/AddCard';
import QuizView from './components/QuizView';
import Tabs from './components/Tabs';
import { setLocalNotification } from './utils/helpers'

const MainNavigator = StackNavigator({
  Home: {
    screen: Tabs,
  },
  DeckList: {
    screen: DeckList,
    navigationOptions: {
      headerTintColor: white,
      headerStyle: {
        backgroundColor: purple,
      }
    }
  },
  IndividualDeck: {
    screen: IndividualDeck,
    navigationOptions: {
      tabBarLabel: 'IndividualDeck',
      tabBarIcon: ({ tintColor }) => <FontAwesome name='plus-square' size={30}
      color={tintColor}/>
    },
  },
  AddCard: {
    screen: AddCard,
    navigationOptions: {
      tabBarLabel: 'AddCard',
      tabBarIcon: ({ tintColor }) => <FontAwesome name='plus-square' size={30}
      color={tintColor}/>
    },
  },
  QuizView: {
    screen: QuizView,
    navigationOptions: {
      tabBarLabel: 'QuizView',
      tabBarIcon: ({ tintColor }) => <FontAwesome name='plus-square' size={30}
      color={tintColor}/>
    },
  }
})

export default class App extends React.Component {
  componentDidMount() {
    setLocalNotification()
  }
  render() {
    return (
      <Provider store={createStore(reducer)}>
        <View style={{flex: 1}}>
          <MainNavigator />
        </View>
      </Provider>
    );
  }
}
