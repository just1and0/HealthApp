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
