// import React from 'react'
// import { View  ,Text} from 'native-base'



// export const History = () => {
//     const result = getTodayRecord();
//     result.then(data => {
//         console.log(`im working from historuy`)
//         console.log(data)
//     })
//     return (
//         <View>
//             <Text>hahahah</Text>
//         </View>
//     )
// }
import React, { Component } from 'react';
import { View, Text, SafeAreaView, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import {getTodayRecord,removeRecord} from './global'
import { ThemeConsumer } from 'react-native-elements';
class history extends Component {
    state = {
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
    

    componentWillMount(){
         const result = getTodayRecord();
         result.then(_data => {
                this.setState({
                    data : _data
                })
          })
    }


    refreshComponent =() => {
        const result = getTodayRecord();
         result.then(_data => {
                this.setState({
                    data : _data
                })
          })
    }
    toRemove  = (id ) =>  {
        const result =  removeRecord(id);
        result.then(res => {
            if(res.status == true ){
                const result = getTodayRecord();
                result.then(_data => {
                        this.setState({
                            data : _data
                        })
                })
            }
        } ).catch(err => {
            console.log(err)
        })
    }
    render() {
        return (
            <SafeAreaView>
                <View>
                    <TouchableOpacity onPress={() => { this.refreshComponent() }} activeOpacity={0.7}  >
                        <Text style={{ fontSize: 50, height: 100, textAlign: "center", color: '#393939' }}>Today History</Text>
                    </TouchableOpacity>   
                </View>
                <View style={styles.tableContainer}>
                    
                    <View style={{ flexDirection: 'row' }}>
                        <View style={styles.textHeader}><Text style={styles.textStyle}>#</Text></View>
                        <View style={styles.textHeader}><Text style={styles.textStyle}>Name</Text></View>
                        <View style={styles.textHeader}><Text style={styles.textStyle}>Amount</Text></View>
                        <View style={styles.textHeader}><Text style={styles.textStyle}>Action</Text></View>

                    </View>
                    <FlatList
                        data={this.state.data}
                        renderItem={({ item }) => (
                            <View style={{ flexDirection: 'row' }}>
                                <View style={styles.textTable}><Text >{item.id}</Text></View>
                                <View style={styles.textTable}><Text>{item.category_name}</Text></View>
                                <View style={styles.textTable}><Text>{item.service_amount}</Text></View>
                                <TouchableOpacity onPress={() => { this.toRemove(item.id) }} activeOpacity={0.7} style={styles.button} >
                                    <Text style={styles.buttonText}> clear </Text>
                                </TouchableOpacity>
                            </View>
                        )}
                        keyExtractor={item => item.id}
                    />
                </View>

            </SafeAreaView>
        );
    }
}
export default history;


const styles = StyleSheet.create({
    tableContainer: {
        borderRadius: 20,
        flexDirection: 'column',
        justifyContent: 'center',
        backgroundColor: '#fff'
        },
    header:{ 
        fontSize: 50, height: 100, textAlign: "center", color: '#393939' 
    },
    button: {
        width: '17%',
        height: 30,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 30,
        marginTop: 13,
        // backgroundColor: 'red'
        borderWidth : 0.5,
        borderColor: '#393939'
    },
    buttonText: {
        color: '#393939',
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
    }

})