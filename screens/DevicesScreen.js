import { useNavigation } from '@react-navigation/native'
import { collection, getDocs, query, where } from 'firebase/firestore'
import React, {useEffect, useState} from 'react'
import { Pressable, StyleSheet, Text, TouchableOpacity, View, FlatList } from 'react-native'
import { auth, db } from '../firebase'
import {ListItem, ScreenWidth}
 from '@rneui/base'
const DevicesScreen = ({route}) => {
    const [devices, setDevices] = useState()
    const {roomId} = route.params

    useEffect(() => {
        const getDevices = async() => {
        const roomDocs = await getDocs(collection(db, "rooms", roomId, "devices"))
        const temp = []
        roomDocs.forEach((doc) => {
            temp.push({id: doc.id, ...doc.data()})
        }) 
        setDevices(temp)     
        }
        getDevices()
    }, [])

  const navigation = useNavigation()
  // console.log(rooms)
  return (
    <View style={styles.container}>
      <FlatList
        keyExtractor={item => item.id}
        style={{flex: 1, width: "100%"}}
        data={devices}
        renderItem={({item}) => (
        <TouchableOpacity onPress={() => navigation.navigate("Device", {
            deviceName: item.name,
            roomId: roomId,
            deviceId: item.id,
            characteristic_uuid: item.characteristic_uuid,
            service_uuid: item.service_uuid
        })}>
          <ListItem>
            <ListItem.Content>
              <ListItem.Title>{item.name}</ListItem.Title>
            </ListItem.Content>
          </ListItem>
        </TouchableOpacity>

        )}
      />
    </View>
  )
}

export default DevicesScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',

  },
})