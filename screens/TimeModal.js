import React, { useState } from "react";
import { Alert, Modal, StyleSheet, Text, Pressable, View, TextInput } from "react-native";

const TimeModal = ({modalVisible, setModalVisible, time, setTime}) => {
  // const [modalVisible, setModalVisible] = useState(false);
  const [minutes, setMinutes] = useState(0)
  const [seconds, setSeconds] = useState(0)
  const handleSave = () => {
    console.log(minutes, seconds)
    const temp = (parseInt(minutes) * 60) + parseInt(seconds)
    setTime(temp)
    console.log(temp)
    setModalVisible(!modalVisible)
    
  }

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Hello World!</Text>
            <View style={styles.inputContainer}>
              <TextInput
                keyboardType='numeric'
                placeholder="Minutes"
                value={minutes}
                onChangeText={text => setMinutes(text)}
                style={styles.input}
              />
              <TextInput
                keyboardType='numeric'
                placeholder="Seconds"
                value={seconds}
                onChangeText={text =>setSeconds(text)}
                style={styles.input}
              />
            </View>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => handleSave()}
            >
              <Text style={styles.textStyle}>Save</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
};
const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
    marginTop: 100
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  },
  inputContainer: {
    width: '100%',
    marginBottom: 20
  },
  input: {
    backgroundColor: 'gray',
    width: "100%",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
  },
});

export default TimeModal