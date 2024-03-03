/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  NativeModules,
  SafeAreaView, 
  Linking,
  Platform,
  ToastAndroid,
  FlatList,
  RefreshControl
} from 'react-native';
import AppModal from './components/AppModal'
import LoaderComponent from './components/Loader'

function App(): React.JSX.Element {
  const [showPermissionModal, setShowPermissionModal] = useState(false)
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [healthData, setHealthData] = useState<any>([]);

  console.log(NativeModules.HealthInfo)

  const loadPermissions = () => {
    NativeModules.HealthInfo.authorizeHealthKit((value: boolean) => {
      if (value == true) {
        handleGetHealthKitData()
      } else {
        setShowPermissionModal(true)
      }
    })
  }

  const handleAskForPermission = () => {
    NativeModules.HealthInfo.authorizeHealthKit((value: boolean) => {
      if (value == true) {
        handleGetHealthKitData()
      } else {
        // permission has been denied on initial app load, user will need to update in settings.
        // Navigate to settings to update manually.
        if (Platform.OS) {
          Linking.openURL('app-settings:')
        } else {
          ToastAndroid.show('Update permissions in settings', ToastAndroid.LONG)
        }
      }
    })
  }

  const handleGetHealthKitData = () => {
    setHealthData([])
    setShowPermissionModal(false)
    setIsLoading(false)
    NativeModules.HealthInfo.getHeartRate((value: { status: boolean }) => {
      if (value.status == true) {
        setHealthData((prevHealthData:any) => [...prevHealthData, value]);
      }
    })

    NativeModules.HealthInfo.getBodyTemperature((value: { status: boolean }) => {
      if (value.status == true) {
        setHealthData((prevHealthData:any) => [...prevHealthData, value]);
      }
    })

    NativeModules.HealthInfo.getOxygenSaturation((value: { status: boolean }) => {
      if (value.status == true) {
        setHealthData((prevHealthData:any) => [...prevHealthData, value]);
      }
    })

    NativeModules.HealthInfo.getBloodPressureSystolic((value: { status: boolean }) => {
      if (value.status == true) {
        setHealthData((prevHealthData:any) => [...prevHealthData, value]);
      }
    })

  }

  const handleRefresh = () => {
    setRefreshing(true);
    handleGetHealthKitData()
    setRefreshing(false)
  }

  useEffect(() => {
    loadPermissions()
  }, [])

  return (
    <View style={styles.containter}>
      <SafeAreaView>
        <LoaderComponent isLoading={isLoading} />
        <Text style={{ alignSelf: 'center' }}>Health Tracker App</Text>
        <FlatList
          data={healthData}
          keyExtractor={(item: { name:string, unit: string, latestValue:number, recordDuration:string}) => item.name}
          ListEmptyComponent={<EmptyStateMessage />}
          renderItem={({ item }) => (
            <View style={styles.dataItem}>
              <Text>{item.name} {`\n`} ({item.recordDuration})</Text>
              <Text>{item.latestValue} {item.unit}</Text>
            </View>
          )}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={handleRefresh}
            />
          }
        />
        <AppModal
          showPermissionModal={showPermissionModal}
          onButtonPressed={() => handleAskForPermission()}
        />
      </SafeAreaView>
    </View>
  );
}

const EmptyStateMessage = () => {
  return (
    <Text style={styles.emptyStateMessage}>No health data available</Text>
  );
}

const styles = StyleSheet.create({
  containter: {
    flex: 1,
  },
  dataItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    flex: 1
  },
  emptyStateMessage: {
    textAlign: 'center',
    fontSize: 18,
    marginTop: 20,
  },
});

export default App;
