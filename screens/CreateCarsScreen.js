import React, {useState} from 'react';
import {View, Text, Button, TextInput, ScrollView, StyleSheet} from 'react-native';
import firebase from '../database/firebase'


const CreateCarScreen = (props) => {

    const [state, setState] = useState({
        nombre: '',
        serie: '',
        precio: '',
        modelo: '',
        origen: '',
        tipo:''
    });

    const recuperaText = (nombre, value) => {
        setState({...state, [nombre]:value})
    };

    const GuardaNuevoCarro = async () =>{
     if(state.nombre==''){
         alert('Introduce el nombre del automóvil')
     }else{
       try {
        await firebase.db.collection('auto').add({
            nombre: state.nombre,
            serie: state.serie,
            precio: state.precio,
            modelo: state.modelo,
            origen: state.origen,
            tipo: state.tipo
           })
           props.navigation.navigate('CarsList');
       } catch (error) {
           alert(error);
       }
     }   
    };
    return (
        
        <ScrollView style={styles.container}>
            <View style={styles.input}>
                <TextInput placeholder="Nombre del automóvil" onChangeText={(value) => recuperaText('nombre',value) }/>
            </View>
            <View style={styles.input}>
                <TextInput placeholder="Número de serie" onChangeText={(value) => recuperaText('serie',value) }/>
            </View>
            <View style={styles.input}>
                <TextInput placeholder="Precio en pesos mexicanos" onChangeText={(value) => recuperaText('precio',value) }/>
            </View>
            <View style={styles.input}>
                <TextInput placeholder="Modelo (año)" onChangeText={(value) => recuperaText('modelo',value) }/>
            </View>
            <View style={styles.input}>
                <TextInput placeholder="País de origen" onChangeText={(value) => recuperaText('origen',value) }/>
            </View>
            <View style={styles.input}>
                <TextInput placeholder="Tipo de automóvil" onChangeText={(value) => recuperaText('tipo',value) }/>
            </View>
            <View>
                <Button title="Seleccionar una imagen" onPress={() => alert('Abrir galería')} color="#841584"></Button>
            </View>
            <View>
                <Button color="#4EC42C" title="Guardar automóvil" onPress={() =>GuardaNuevoCarro() }></Button>
            </View> 
        </ScrollView>
    )
}

export default CreateCarScreen

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