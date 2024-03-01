/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import {
  StyleSheet,
  Text,
  View,
} from 'react-native';


function App(): React.JSX.Element {
  return (
    <View style={styles.containter}>
      <Text>Health Tracker App</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  containter: { 
    flex: 1, 
    alignContent: 'center', 
    justifyContent: 'center', 
    alignItems: 'center' },
});

export default App;
