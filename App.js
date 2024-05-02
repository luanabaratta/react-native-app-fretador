import React, {useState} from "react";
import * as Location from 'expo-location';
import { StyleSheet, View } from 'react-native';

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
});
