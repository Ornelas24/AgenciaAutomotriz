import React, {useEffect, useState} from 'react';
import {View, Text, ScrollView, Button, StyleSheet } from 'react-native';
import firebase from '../database/firebase'
import {ListItem, Avatar} from 'react-native-elements'


const CarsList = (props) => {

    const [cars, setCars] = useState([])

    useEffect(() => {
        firebase.db.collection("auto").onSnapshot(querySnapshot => {
           const cars = [];
            
            querySnapshot.docs.forEach(doc => {
                const {nombre,serie,precio,modelo,origen,tipo} = doc.data()
                cars.push({
                    id: doc.id,
                    nombre,
                    serie,
                    precio,
                    modelo,
                    origen,
                    tipo
                })
            });

            setCars(cars)
        });
    }, []);

    return (
      <ScrollView style={styles.container}> 
      
          <Button 
           title="Crear carro"
           onPress={() => props.navigation.navigate("CreateCarsScreen")}
        />
      
      {cars.map((car) => {
              return(   
                  <ListItem key={car.id} bottomDivider onPress={() => {props.navigation.navigate("CarDetailScreen",{carId:car.id})}}>
                    <ListItem.Chevron/>
                    <Avatar source={{uri: 'https://cdn.icon-icons.com/icons2/650/PNG/512/Banking_00002_A_icon-icons.com_59821.png',}} rounded/>
                    <ListItem.Content>
                        <ListItem.Title>{car.nombre}</ListItem.Title>
                        <ListItem.Subtitle>{car.precio}</ListItem.Subtitle>
                    </ListItem.Content>
                  </ListItem>
              );
          })}
          
      </ScrollView> 
    );
}

export default CarsList

const styles = StyleSheet.create({
    input: {
        flex:1,
        padding:0,
        marginBottom: 15,
        borderBottomWidth:1,
        borderBottomColor: '#cccccc'
    },
    container:{
        flex:1,
        padding:35,
        backgroundColor:"#D4F3EF"
    },
})  