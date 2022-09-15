import { useNavigation } from '@react-navigation/native'
import { collection, getDocs, query, where } from 'firebase/firestore'
import React, {useEffect, useState} from 'react'
import { Pressable, StyleSheet, Text, TouchableOpacity, View, FlatList, KeyboardAvoidingView, TextInput, Modal, SafeAreaView, ScrollView } from 'react-native'
import { auth, db } from '../firebase'
import {Card, ListItem, ScreenWidth, Slider}
 from '@rneui/base'
 import CountDown from 'react-native-countdown-component';
import TimeModal from './TimeModal'
import CountdownTimer from './CountdownTimer'

const PadCard = ({pad}) => {
  const [value, setValue] = useState(pad.resistance)
  const handleValueChange = (val) => {
    console.log(val)
    setValue(val)
  }
  return(
<Card>
  <Card.Title>{pad.name}</Card.Title>
  <Card.Divider/>
  <View>
    <Slider
      value={value}
      onValueChange={(val) => handleValueChange(val)}
      maximumValue={pad.upper_limit}
      step={1}
    >

    </Slider>
    <Text>Value: {value}</Text>
  </View>
</Card>
  )
}

const DeviceScreen = ({route}) => {
  const [pads, setPads] = useState([])
  const { deviceId, characteristic_uuid, service_uuid, roomId} = route.params
  const [date, setDate] = useState(new Date(1598051730000));
  const [running, setRunning] = useState(false)
  const [time, setTime] = useState(0)
  const [modalVisible, setModalVisible] = useState(false)
  // const [minutes, setMinutes] = useState(0)
  // const [seconds, setSeconds] = useState(0)
  const [countdownId, setCountDownId] = useState()
  // console.log(time)
  useEffect(() => {
      const getPads = async() => {
        const padDocs = await getDocs(collection(db, "rooms", roomId, "devices", deviceId, "pads"))
        // console.log(padDocs)
        const temp = []
        padDocs.forEach((doc) => {
            temp.push({id: doc.id, ...doc.data()})
        }) 
        setPads(temp)     
      }
      getPads()
  }, [])
  useEffect(() => {
    // Generate new id based on unix timestamp (string)
    const id = new Date().getTime().toString()
    // Set id to state
    setCountDownId(id)
  }, [time])

  const handleReset = () => {
    setTime(0)
    if(running){
      setRunning(!running)
    }
    
  }

  const handleStart = () => {
    if(time > 0){
      setRunning(!running)
    }
    
  }

  const navigation = useNavigation()
  // console.log(rooms)
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <KeyboardAvoidingView
        // style={styles.container}
        behavior="padding"
      >
        <Card containerStyle={{display: "flex", justifyContent: 'center', alignItems: 'center'}}>
          <Card.Title>Controls</Card.Title>
          <View style={styles.inputContainer}>
            <CountdownTimer time={time} setTime={setTime} running={running} setModalVisible={setModalVisible} modalVisible={modalVisible}/>
          {/* <CountDown
          id={countdownId}
          until={time}
          running={running}
          onFinish={() => alert('finished')}
          onPress={() => setModalVisible(!modalVisible)}
          size={25}
          timeToShow={['H','M', 'S']}
          /> */}

          {/* <TextInput
            placeholder="Time"
            keyboardType={"numeric"}
            // value={email}
            // onChangeText={text => setEmail(text)}
            style={styles.input}
          /> */}
          </View>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.button} 
                onPress={() => handleStart()}
                >
                <Text style={styles.buttonText}>{running ? "Stop" : "Start"}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.button} 
                onPress={() => handleReset()}
                >
                <Text style={styles.buttonText}>Reset</Text>
              </TouchableOpacity>
          </View>
        </Card>      
      </KeyboardAvoidingView>

        {
          pads.map((pad) => (
            <PadCard pad={pad} />
          ))
        }
        
        {modalVisible ? <TimeModal 
                          modalVisible={modalVisible} setModalVisible={setModalVisible} 
                          time={time} setTime={setTime}/> : null}        
      </ScrollView>

    </SafeAreaView>
  )
}

export default DeviceScreen

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  inputContainer: {
    // width: '100%'
  },
  input: {
    backgroundColor: 'gray',
    width: "100%",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
  },
  buttonContainer: {
    display: "flex",
    flexDirection: "row",
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
    marginRight: 80
  },
  button: {
    backgroundColor: '#0782F9',
    // width: '100%',
    marginRight: 5,
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