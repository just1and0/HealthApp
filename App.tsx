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
  Modal,
  SafeAreaView,
  Button,
  TouchableOpacity,
  ActivityIndicator,
  Linking,
  Platform,
  ToastAndroid,
  FlatList,
  RefreshControl
} from 'react-native';


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

const LoaderComponent = ({ isLoading }: { isLoading: boolean }) => {
  return (
    <>
      {
        isLoading ?
          <ActivityIndicator color={'green'} /> : null
      }
    </>
  )
}

const AppModal = ({ showPermissionModal, onButtonPressed }: { showPermissionModal: boolean, onButtonPressed: () => void }) => {
  return (
    <>
      <Modal
        visible={showPermissionModal}
        animationType='slide'
        statusBarTranslucent
        transparent
      >
        <SafeAreaView style={styles.modalContainer}>
          <View style={styles.modalContentContainer}>
            <Text style={styles.modalContentViewTitle}>Grant Permission</Text>
            <Text style={styles.modalContentViewSubTitle}>You need to grant permission to HealthApp before you can start enjoying our services. We will never share your data with third party</Text>
            <TouchableOpacity
              onPress={() => onButtonPressed()}
              style={styles.button}
            >
              <Text>Request Permission</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </Modal>
    </>
  )
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
  modalContainer: {
    flex: 1,
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
    opacity: .9
  },
  modalContentContainer: {
    flex: 1,
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20
  },
  modalContentViewTitle: {
    color: 'white',
    fontSize: 25,
    marginBottom: 15
  },
  modalContentViewSubTitle: {
    color: 'white',
    fontSize: 15,
    textAlign: "justify",
    marginBottom: 15
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10
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
