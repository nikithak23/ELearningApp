import React, {useState, useEffect, useContext} from 'react';
import {Text, Image, View, StyleSheet, ImageBackground, Touchable} from 'react-native';
import {StackActions} from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';


const TestScreen =()=>{
    return(
        <View>
            <TouchableOpacity>
                <Text>Heyy</Text>
            </TouchableOpacity>
        </View>
    )
}
export default TestScreen;