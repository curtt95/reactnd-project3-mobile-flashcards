import 'react-native-gesture-handler';
import React from 'react';
import { View, StatusBar, Platform } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Decks from './components/Decks'
import AddDeck from './components/AddDeck'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers'
import Constants from "expo-constants"
import { blue, white } from './utils/colors'
import {createStackNavigator} from '@react-navigation/stack';
import Quiz from './components/Quiz'
import {FontAwesome, Ionicons} from "@expo/vector-icons";
import { receiveDecks } from './actions'
import Deck from './components/Deck';

function TopStatusBar({backgroundColor, ...props}) {
  return (
      <View style={{backgroundColor, height: Constants.statusBarHeight}}>
          <StatusBar translucent backgroundColor={backgroundColor} {...props}/>
      </View>
  )
}

const Tabs =
    Platform.OS === "ios"
        ? createBottomTabNavigator()
        : createMaterialTopTabNavigator();

const TabNav = () => (
    <Tabs.Navigator
        initialRouteName="AddDeck"
        screenOptions={({route}) => ({
            tabBarIcon: ({color, size}) => {
                let icon;
                if (route.name === "Add Deck") {
                    icon = (
                        <FontAwesome name="plus-square" size={size} color={color}/>
                    );
                } else if (route.name === "Decks") {
                    icon = (
                        <Ionicons name="ios-bookmarks" size={size} color={color}/>
                    );
                }
                return icon;
            }
        })}
        tabBarOptions={{
            header: null,
            activeTintColor: Platform.OS === "ios" ? blue : white,
            showIcon: true,
            style: {
                height: 80,
                backgroundColor: Platform.OS === "ios" ? white : blue,
                shadowColor: "rgba(0, 0, 0, 0.24)",
                shadowOffset: {
                    width: 0,
                    height: 3
                },
                shadowRadius: 6,
                shadowOpacity: 1
            }
        }}
    >
        <Tabs.Screen name="Decks" component={Decks}/>
        <Tabs.Screen name="Add Deck" component={AddDeck}/>
    </Tabs.Navigator>
);

const Stack = createStackNavigator();
const MainNav = () => (
    <Stack.Navigator headerMode="screen">
        <Stack.Screen
            name="Home"
            component={TabNav}
            options={{headerShown: false}}/>
        <Stack.Screen
            name="Deck"
            component={Deck}
            options={{
                headerTintColor: white, headerStyle: {
                    backgroundColor: blue,
                }
            }}/>
    </Stack.Navigator>
);

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <Provider store={createStore(reducer)}>
        <View style={{flex:1}}>
            <View style={{flex: 1}}>
                <NavigationContainer>
                    <TopStatusBar backgroundColor={blue} barStyle="light-content"/>
                    <MainNav/>
                </NavigationContainer>
            </View>
        </View>
      </Provider>
  );
}