// import React from 'react'
// import {View, Text} from 'react-native'
// import {getReportDuring } from './global'
// import DatePicker from 'react-native-datepicker'
// export  const Report = () => {
//     const myDate = new Date()
//     const start = myDate.toISOString().split('T')[0]

//     const result = getReportDuring(start , start)

//     result.then(data => {
//         console.log(data)
//     }).catch(err=> {
//         console.log(err)
//     })
//     return (
//         <View>
//             <Text>workk</Text>
//         </View>
//     )
// }
// import React, { useState } from 'react';
// import { View, Button, Platform, SafeAreaView, TouchableOpacity, Text, StyleSheet } from 'react-native';
// import DateTimePicker from '@react-native-community/datetimepicker';



import React, { Component } from 'react';
import { View, Text, SafeAreaView, StyleSheet, FlatList, TouchableOpacity,Dimensions } from 'react-native';
import DatePicker from 'react-native-datepicker'
import {getReportDuring} from './global'
import { ScrollView } from 'react-native-gesture-handler';
 
const screen = parseInt(Dimensions.get("screen").height * 0.55);

export default class report extends Component {
  state = {
    startDate: null,
    endDate: null,
    data: [
      {
        id: 1,
        name: 'car',
        amount: 100,
      },
      {
        id: 2,
        name: 'Car',
        amount: 100,
      },
      {
        id: 3,
        name: 'Car',
        amount: 100,
      },
      {
        id: 4,
        name: 'Car',
        amount: 100,
      },

    ]
  }
  searchByDate(){
    
    const result = getReportDuring(this.state.startDate, this.state.endDate)
    
    result.then(_data => {
        let _total = 0
        _data.forEach(({total_price} )=> {
          _total += total_price
        });
        this.setState({
          data : _data,
          total : _total
        })
     
    }).catch(err=> {
        console.log(err)
    })

    console.log(this.state)
  }
  componentWillMount(){
        let myDate = new Date()
        const start = myDate.toISOString().split('T')[0]
        myDate.setDate(myDate.getDate() + 1)
        const end = myDate.toISOString().split('T')[0]
        const result = getReportDuring(start, end)
        
        result.then(_data => {
          let _total = 0
          _data.forEach(({total_price} )=> {
            _total += total_price
          });
            this.setState({
              startDate : start,
              endDate : end,
              data : _data,
              total : _total
            })
         
        }).catch(err=> {
            console.log(err)
        })
        
  }
  render() {
    return (
      <View style={{ flexDirection: 'column', alignItems: 'center' }}>
        <View>
          <Text style={{ fontSize: 50, height: 100, textAlign: "center", color: '#393939' }}>Income Report</Text>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <DatePicker
            style={{ width: 200 }}
            date={this.state.startDate}
            mode="date"
            // placeholder="Start Date"
            format="YYYY-MM-DD"
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            customStyles={{
              dateIcon: {
                position: 'absolute',
                left: 0,
                top: 4,
                marginLeft: 0
              },
              dateInput: {
                marginLeft: 36,
                borderRadius : 100
              }
              // ... You can check the source to find the other keys.
            }}
            onDateChange={(date) => { this.setState({ startDate: date }) }}
          />
          <DatePicker
            style={{ width: 200 }}
            date={this.state.endDate}
            mode="date"
            format="YYYY-MM-DD"
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            customStyles={{
              dateIcon: {
                position: 'absolute',
                left: 0,
                top: 4,
                marginLeft: 0
              },
              dateInput: {
                marginLeft: 36,
                borderRadius : 100
              }
              // ... You can check the source to find the other keys.
            }}
            onDateChange={(date) => { this.setState({ endDate: date }) }}
          />
        </View>
        <TouchableOpacity onPress={()=> {this.searchByDate()}} activeOpacity={0.7} style={styles.buttonSearch} >
          <Text style={styles.buttonText}> Search</Text>
        </TouchableOpacity>

        <View style={styles.tableContainer}>
          <View style={{ flexDirection: 'row' }}>
            <View style={styles.textHeader}><Text style={styles.textStyle}>Name</Text></View>
            <View style={styles.textHeader}><Text style={styles.textStyle}>Amount</Text></View>
            <View style={styles.textHeader}><Text style={styles.textStyle}>Income</Text></View>
            <View style={styles.textHeader}><Text style={styles.textStyle}>Total</Text></View>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <View style={styles.textHeader}><Text style={styles.textStyle}></Text></View>
            <View style={styles.textHeader}><Text style={styles.textStyle}></Text></View>
            <View style={styles.textHeader}><Text style={styles.textStyle}></Text></View>
          <View style={styles.textHeader}><Text style={styles.textStyle}>{this.state.total}</Text></View>
          </View>
          <ScrollView style={styles.scrollView}>
            <FlatList
              showsHorizontalScrollIndicator={true}
              data={this.state.data}
              renderItem={({ item }) => {
              
                return (
                  <View style={{ flexDirection: 'row' }}>
                    
                    <View style={styles.textTable}><Text>{item.name}</Text></View>
                    <View style={styles.textTable}><Text>{item.service_amount}</Text></View>
                    <View style={styles.textTable}><Text >{item.total_price}</Text></View>
                    <View style={styles.textHeader}><Text>{this.total}</Text></View>
                  </View>
                )
              }}
              keyExtractor={item => item.id}
            />
          </ScrollView>
        </View>
      </View>

    );
  }
}


const styles = StyleSheet.create({
  tableContainer: {
    borderRadius: 20,
    flexDirection: 'column',
    justifyContent: 'center',
    marginTop: 30,
    // marginBottom: 30,
    backgroundColor:"#fff",
    height: screen
  },
  header: {
    fontSize: 50, height: 100, textAlign: "center", color: 'red'
  },
  button: {
    width: '20%',
    height: 30,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    marginTop: 13,
    backgroundColor: 'red'

  },
  buttonSearch:
  {
    width: '35%',
    height: 40,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    marginTop: 13,
    backgroundColor: 'green'

  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
  textTable: {
    width: 100,
    height: 50,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',

  },
  textHeader: {
    width: 100,
    height: 50,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',

  },
  textStyle: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  scrollView: {
    // height: screen,
    // paddingBottom : 30
  }

})