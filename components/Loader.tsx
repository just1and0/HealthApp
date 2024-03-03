/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import { 
  ActivityIndicator, 
} from 'react-native'; 

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
 
export default LoaderComponent;
