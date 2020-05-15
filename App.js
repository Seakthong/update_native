import * as React from 'react';
import { Text, View, SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import Icon from 'react-native-vector-icons/FontAwesome';
import Category from './src/category';
import History from './src/history'
import Report from './src/report';
import Transaction from './src/transaction';
import Ionicons from 'react-native-vector-icons/Ionicons';
InsertScreen = () => {
  return (
    <SafeAreaView>
      <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 40 }}>
        <Transaction />
      </View>
    </SafeAreaView>

  );
}

ReportScreen = () => {
  return (
    <SafeAreaView >
      <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 40 }}>
        <Report />
      </View>
      
    </SafeAreaView>
  );
}
TodayScreen = () => {
  return (
    <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 100 }}>
      <History />
    </View>
  );
}
NewScreen = () => {
  return (
    <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 100 }}>
      <Category />
    </View>
  );
}


const Tab = createBottomTabNavigator();

export default function App() {
  console.disableYellowBox = true;

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Insert') {
              iconName = focused
                ? 'ios-add-circle'
                : 'md-add-circle-outline';
            } else if (route.name === 'Report') {
              iconName = focused ? 'ios-list-box' : 'ios-list';
            }
            else if (route.name === 'Today') {
              iconName = focused ? 'md-folder' : 'md-folder';
              
            }
            else if (route.name === 'New') {
              iconName = focused ? 'ios-browsers' : 'ios-browsers'
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: 'tomato',
          inactiveTintColor: 'gray',
        }}
      >
        <Tab.Screen name="Insert" component={InsertScreen} resetOnBlur={true} />
        <Tab.Screen name="Report" component={ReportScreen} />
        <Tab.Screen name="Today" component={History} resetOnBlur={true}/>
        <Tab.Screen name="New" component={NewScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}