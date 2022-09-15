import { useNavigation } from '@react-navigation/native'
import { collection, getDocs, query, where } from 'firebase/firestore'
import React, {useEffect, useState} from 'react'
import { Pressable, StyleSheet, Text, TouchableOpacity, View, FlatList } from 'react-native'
import { auth, db } from '../firebase'
import {ListItem, ScreenWidth}
 from '@rneui/base'
const HomeScreen = () => {
  const [rooms, setRooms] = useState([])
  console.log("BOI")
  useEffect(() => {
    const getRooms = async() => {
      const q = query(collection(db, "rooms"), where("userId", "==", auth.currentUser.uid))
      const roomDocs = await getDocs(q)
      const temp = []
      roomDocs.forEach((doc) => {
        temp.push({id: doc.id, ...doc.data()})
      }) 
      setRooms(temp)     
    }
    getRooms()
  }, [])

  const navigation = useNavigation()
  // console.log(rooms)
  return (
    <View style={styles.container}>
      <FlatList
        keyExtractor={item => item.id}
        style={{flex: 1, width: "100%"}}
        data={rooms}
        renderItem={({item}) => (
          <TouchableOpacity onPress={() => navigation.navigate("Devices", {
            roomId: item.id
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

export default HomeScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',

  },
})