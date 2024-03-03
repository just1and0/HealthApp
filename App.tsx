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
import Icons from './components/Icons';

function App(): React.JSX.Element {
  const [showPermissionModal, setShowPermissionModal] = useState(false)
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [healthData, setHealthData] = useState<any>([]);

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
        if (Platform.OS == 'ios') {
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
    <View style={styles.container}>
      <SafeAreaView>
        <LoaderComponent isLoading={isLoading} />
        <View style={styles.header}>
          <Text style={styles.appTitle}>Health Tracker App</Text>
        </View>
        <FlatList
          data={healthData}
          keyExtractor={(item) => item.name}
          ListEmptyComponent={<EmptyStateMessage />}
          renderItem={({ item }) => (
            <View style={styles.dataItem}>
              <Icons identifier={item.identifier} />
              <View style={styles.dataText}>
                <Text style={styles.dataItemName}>{item.name}</Text>
                <Text style={styles.dataItemDuration}>({item.recordDuration})</Text>
                <Text style={styles.dataItemValue}>
                  {item.latestValue} {item.unit}
                </Text>
              </View>
            </View>
          )}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />}
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
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4',
  },
  header: {
    backgroundColor: '#3498db',
    padding: 15,
    alignItems: 'center',
  },
  appTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  dataItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  dataText: {
    marginLeft: 15,
  },
  dataItemName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  dataItemDuration: {
    fontSize: 12,
    color: '#888',
  },
  dataItemValue: {
    fontSize: 14,
  },
  emptyStateMessage: {
    textAlign: 'center',
    fontSize: 18,
    marginTop: 20,
  },
});

export default App;
