import React from 'react'
import { Platform } from 'react-native';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { StackNavigator } from 'react-navigation';
import { white, purple } from '../utils/colors';
import Tabs from './Tabs';
import IndividualDeck from './IndividualDeck';
import AddCard from './AddCard';
import QuizView from './QuizView';
import DeckList from './DeckList';
import CreateNewDeck from './CreateNewDeck';

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

export default MainNavigator
