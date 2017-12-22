import React from 'react'
import { AsyncStorage, StyleSheet } from 'react-native'
import { white } from './colors'
import { Notifications, Permissions } from 'expo'
const NOTIFICATION_KEY = 'MyDecksStore:notifications'

export const commonStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: white,
    padding: 15,
  },
  topTap: {
    justifyContent: 'center',
    padding: 20,
    marginTop: 10,
    borderBottomWidth: 2,
  },
  deckView: {
    margin: 20,
    justifyContent: 'center',
    padding: 10,
    borderWidth: 5,
    borderRadius: 5,
  },
  deckText: {
    margin: 20,
    justifyContent: 'center',
    padding: 10,
    fontWeight: 'bold',
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
    margin: 10,
    width: 300,
    height: 50,
    borderRadius: 10,
  },
  textInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    margin: 10,
  },
  textTitle: {
    fontSize: 25,
    justifyContent: 'center',
    textAlign: 'center',
    padding: 15,
    margin: 15,
  },
})

//Refer to React Native Labs materials, using ES6 arrow function for return value
const createNotification = () => ({
    title: 'Time to quiz!',
    body: 'Remeber to do the quiz today!',
    ios: {
      sound: true,
    },
    android: {
      sound: true,
      priority: 'high',
      sticky: false,
      vibrate: true,
    }
})

//Refer to React Native Labs materials
export function setLocalNotification() {
  AsyncStorage.getItem(NOTIFICATION_KEY)
    .then(JSON.parse)
    .then((data) => {
      if (data === null) {
        // check if there is any notification already setup
        // if not, ask for permission
        Permissions.askAsync(Permissions.NOTIFICATIONS)
          .then(({ status }) => {
            if (status === 'granted') { // granted setup notification
              Notifications.cancelAllScheduledNotificationsAsync()
              let tomorrow = new Date()
              tomorrow.setDate(tomorrow.getDate() + 1)
              tomorrow.setHours(12)
              tomorrow.setMinutes(0)
              //schedule notification for every day
              Notifications.scheduleLocalNotificationAsync(
                createNotification(),
                {
                  time: tomorrow,
                  repeat: 'day',
                }
              )
              // set notification as true to asyncStorage to indicate taken the quiz
              AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true))
            }
        })
      }
    })
}

//Refer to React Native Labs materials
export function clearLocalNotification() {
  return AsyncStorage.removeItem(NOTIFICATION_KEY)
    .then(Notifications.cancelAllScheduledNotificationsAsync)
}
