import { useNavigation } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'

const CountdownTimer = ({time, setTime, running, modalVisible, setModalVisible}) => {
    useEffect(() => {
        if(running && time != 0){
            const interval = setInterval(() => {
                const temp = time - 1
                setTime(temp);
            }, 1000);   
            return () => clearInterval(interval);          
        }
        
      }, [time, running]);
    //   console.log(time)
    const getMinutes = () => {
        const minutes = Math.floor((time % 3600) / 60)
        if(minutes < 10){
            return '0' + minutes
        }
        return minutes
    }

    const getSeconds = () => {
        const seconds = time % 60
        if(seconds < 10){
            return '0' + seconds
        }
        return seconds
    }

  return (
      <View style={styles.container} >
        <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
            <Text>{`${getMinutes()}:${getSeconds()}`}</Text>
        </TouchableOpacity>
          

      </View>
  )
}

export default CountdownTimer

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    width: '80%'
  },
  input: {
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
  },
  buttonContainer: {
    width: '60%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
  button: {
    backgroundColor: '#0782F9',
    width: '100%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonOutline: {
    backgroundColor: 'white',
    marginTop: 5,
    borderColor: '#0782F9',
    borderWidth: 2,
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
  buttonOutlineText: {
    color: '#0782F9',
    fontWeight: '700',
    fontSize: 16,
  },
})