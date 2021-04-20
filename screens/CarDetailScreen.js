import { CardStyleInterpolators } from '@react-navigation/stack';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert } from 'react-native';
import {View, StyleSheet,  TextInput, ScrollView, Text, Button} from 'react-native';
import firebase from '../database/firebase'

const CarDetailScreen = (props) => {

    const initialState = {
            id: '',
            nombre: '',
            serie: '',
            precio: '',
            modelo: '',
            origen: '',
            tipo:''
        }
    
     const [cars, setCars] = useState();
    
    const [loading, setLoading] = useState(true)

    const obtenerCarPorId = async (id) =>{
        const dbRef = firebase.db.collection("auto").doc(id)
        const doc = await dbRef.get();
        const car = doc.data();
        setCars({
            ...car,
            id:doc.id
        });
        setLoading(false)
    };

    useEffect(()=>{
        obtenerCarPorId(props.route.params.carId);
    }, []);

    const recuperaText = (nombre, value) => {
        setCars({...cars, [nombre]:value})
    };

    const EliminarCarro = async () =>{
        const dbRef = firebase.db.collection('auto').doc(props.route.params.carId);
        await dbRef.delete();
        props.navigation.navigate('CarsList');
    }

    const ActualizarCarro = async () =>{
        const dbRef = firebase.db.collection('auto').doc(cars.id);
        await dbRef.set({
            nombre: cars.nombre,
            serie: cars.serie,
            precio: cars.precio,
            modelo: cars.modelo,
            origen: cars.origen,
            tipo: cars.tipo

        });
        setCars(initialState)
        props.navigation.navigate('CarsList');
    }

    const alertadeConfirmacion = () => {
        Alert.alert('Eliminar auto', '¿Estás seguro?', [
            {text: 'Sí', onPress: () =>EliminarCarro()},
            {text: 'No', onPress: () =>alert('Operación cancelada')},
        ])
    }
    if(loading){
        return(
            <View>
                <ActivityIndicator size="large" color="#9e9e9e"/>
            </View>
        );
    }

    return (
        <ScrollView style={styles.container}>
             <View style={styles.input}>
                <TextInput placeholder="Nombre del automóvil" value={cars.nombre} onChangeText={(value) => recuperaText('nombre',value) }/>
            </View>
            <View style={styles.input}>
                <TextInput placeholder="Número de serie" value={cars.serie} onChangeText={(value) => recuperaText('serie',value) }/>
            </View>
            <View style={styles.input}>
                <TextInput placeholder="Precio en pesos mexicanos" value={cars.precio} onChangeText={(value) => recuperaText('precio',value) }/>
            </View>
            <View style={styles.input}>
                <TextInput placeholder="Modelo (año)" value={cars.modelo} onChangeText={(value) => recuperaText('modelo',value) }/>
            </View>
            <View style={styles.input}>
                <TextInput placeholder="País de origen" value={cars.origen} onChangeText={(value) => recuperaText('origen',value) }/>
            </View>
            <View style={styles.input}>
                <TextInput placeholder="Tipo de automóvil" value={cars.tipo} onChangeText={(value) => recuperaText('tipo',value) }/>
            </View>
            <View>
            <Button color="#4EC42C" title="Actualizar carro" onPress={() =>ActualizarCarro() }></Button>
            </View> 
            <View>
            <Button color="#CE1616" title="Eliminar carro" onPress={() =>alertadeConfirmacion() }></Button>
            </View>
        </ScrollView>
    )
}


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

export default CarDetailScreen