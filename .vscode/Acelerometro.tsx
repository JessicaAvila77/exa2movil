import { View, Text, StyleSheet } from 'react-native'
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
    
//cambio de color forma1
    if (x > 0.1) {
      setColor('blue') // derecha
    } else if (x < -0.1) {
      setColor('black') // izquierda
    } else if (y > 0.1) {
      setColor('yellow') // abajo
    } else if (y < -0.1) {
      setColor('green') // arriba
    } else {
      setColor('red') // sin movimiento
    }

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
  }


})