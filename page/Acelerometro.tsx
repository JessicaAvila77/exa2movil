import { View, Text, StyleSheet, Alert, Button } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Accelerometer } from 'expo-sensors'

export default function Acelerometro() {

  const [data, setData] = useState({x:0, y:0, z:0})
  const [ballonPosition, setBalonPosition] = useState({x:150, y:300, z:150})
  const [color, setColor] = useState('red')

  const updateBallonPosition = ({x,y,z}:any) => {

    setBalonPosition((prev) => ({
      x:Math.min(Math.max(prev.x + x *50,0), 300),
      y:Math.min(Math.max(prev.y + y *50,0), 600),
      z:Math.min(Math.max(prev.z + x *50,0), 600),
    }))  
    


  }

  useEffect(()=>{

    const subscription = Accelerometer.addListener((accelerometer)=>{
      console.log(accelerometer);
      setData(accelerometer);
      updateBallonPosition(accelerometer)

    });

    Accelerometer.setUpdateInterval(100);

    return () => subscription.remove()


  }, []);

  //cambio de color forma2
  const generarColorAleatorio = () => {
    const colorRamdon=`rgb(${Math.floor(Math.random() *256)},
                      ${Math.floor(Math.random() *256)},
                      ${Math.floor(Math.random() *256)})`     

    setColor(colorRamdon) 
  }

  const guardarMovimiento = async () => {
    const fechaActual = new Date().toISOString().split('T')[0]; 
  
    try {
      const response = await fetch('http://192.168.0.192:5000/logs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          postitionX: ballonPosition.x,
          positionY: ballonPosition.y,
          fecha: fechaActual
        })
      });
  
      if (response.ok) {
        Alert.alert('Movimiento guardado correctamente');
      } else {
        console.error('Error al guardar el movimiento');
      }
  
    } catch (error) {
      console.error('Error al conectar con el servidor:', error);
    }
  };



  useEffect(()=>{
    generarColorAleatorio()
  }, [ballonPosition])

  return (
    <View style={style.container}>
      <View style={[
        style.ball,{
          left: ballonPosition.x,
          top:ballonPosition.y,
          right:ballonPosition.z,
          backgroundColor: color,

        }

      ]}> 

      </View>

      
      <View style={style.buttonContainer}>
        <Button title="Guardar Movimiento" onPress={guardarMovimiento} />
      </View>


    </View>
  )
}

const style = StyleSheet.create({
  container:{
    flex:1, //sobresalir
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    position:'relative'
  },
  ball:{
    position:'absolute', //que se mueva dentro del contenedor
    width:50,
    height:50,
    borderRadius:25,
    backgroundColor:'red',
  },
  text:{
    position:'absolute',
    bottom:50,
    fontSize:12,
    fontWeight:'bold'
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 50,
    left: 20,
    right: 20,
  },


})