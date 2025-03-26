import { View, Text,StyleSheet, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'

export default function Logs() {

  const [logs, setLogs] = useState<any[]>([]);

  const obtenerLogs = async () => {
    try {
      const response = await fetch('http://192.168.0.192:5000/logs');
      if (response.ok) {
        const data = await response.json();
        setLogs(data);
      } else {
        console.error('Error al obtener logs');
      }
    } catch (error) {
      console.error('Error al conectar con el servidor:', error);
    }
  };


  useEffect(() => {
    obtenerLogs();
  }, []);




  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lista de Logs</Text>
      <ScrollView contentContainerStyle={styles.scroll}>
      {logs.length > 0 ? (
        logs.map((log, index) => (
          <View key={index} style={styles.card}>
          <Text style={styles.cardTitle}>Movimiento #{index + 1}</Text>
          <Text style={styles.cardText}>X: {log.postitionX.toFixed(2)}</Text>
          <Text style={styles.cardText}>Y: {log.positionY.toFixed(2)}</Text>
          <Text style={styles.cardText}>Fecha: {log.fecha}</Text>
        </View>
        ))
      ) : (
        <Text>No hay registros</Text>
      )}
      </ScrollView>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  logText: {
    fontSize: 16,
    marginBottom: 5,
  },card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 15,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 4,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#2C3E50',
  },
  cardText: {
    fontSize: 16,
    color: '#555',
    marginBottom: 4,
  },
  scroll: {
    paddingTop: 10,
    paddingBottom: 100,
  },
 
});