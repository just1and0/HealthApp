import {
  StyleSheet,
  Text,
  View, 
  Modal,
  SafeAreaView, 
  TouchableOpacity, 
} from 'react-native';


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

const styles = StyleSheet.create({
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
  }
});

export default AppModal;
