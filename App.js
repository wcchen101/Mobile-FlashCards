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
  }
})



export default class App extends React.Component {
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
