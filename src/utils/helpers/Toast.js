import Snackbar from 'react-native-snackbar';

export default function showErrorAlert(message) {
  Snackbar.show({
    text: message,
    duration: Snackbar.LENGTH_SHORT,
  });
}
