import React, { useState, useEffect } from "react";
import * as Location from 'expo-location';
import { StyleSheet, View } from 'react-native';
import MapView, {Marker} from "react-native-maps";

export default function App() {
  const [location, setLocation] = useState(null);

  useEffect(() => {
    getLocationPermission();
  }, []);

  const getLocationPermission = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if(status !== 'granted') {
      alert("Permissão negada!");
      return;
    }

    let location = await Location.getCurrentPositionAsync();
    setLocation(location);
  }

  return (
    <View style={styles.container}>
      {
        location &&
          <MapView
              style={styles.map}
              initialRegion={{
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
                latitudeDelta: 0.005,
                longitudeDelta: 0.005,
              }}
              zoom={16}
          >
            <Marker
              coordinate={{
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
              }}
            />
          </MapView>
      }

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: '100%',
    height: '100%',
  }
});
