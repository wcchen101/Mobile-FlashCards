import React from 'react';
import { Platform } from 'react-native';
import { white, purple } from '../utils/colors';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { TabNavigator } from 'react-navigation';
import DeckList from './DeckList';
import CreateNewDeck from './CreateNewDeck';

const Tabs = TabNavigator({
  DeckList: {
    screen: DeckList,
    navigationOptions: {
      tabBarLabel: 'DeckList',
      tabBarIcon: ({ tintColor }) => <Ionicons name='ios-bookmarks' size={30}
      color={tintColor} />
    },
  },
  CreateNewDeck: {
    screen: CreateNewDeck,
    navigationOptions: {
      tabBarLabel: 'createNewDeck',
      tabBarIcon: ({ tintColor }) => <FontAwesome name='plus-square' size={30}
      color={tintColor}/>
    },
  },
},
{
 navigationOptions: {
   header: null
 },
 tabBarOptions: {
   activeTintColor: Platform.OS === 'ios' ? purple : white,
   style: {
     height: 56,
     backgroundColor: Platform.OS === 'ios' ? white : purple,
     shadowColor: 'rgba(0, 0, 0, 0.24)',
     shadowOffset: {
       width: 0,
       height: 3
     },
     shadowRadius: 6,
     shadowOpacity: 1
   }
 }
})
export default Tabs
