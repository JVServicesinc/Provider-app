import {createNavigationContainerRef} from '@react-navigation/native';
import {StackActions} from '@react-navigation/native';

export const navigationRef = createNavigationContainerRef();

export function navigate(name, params) {
  if (navigationRef.isReady()) {
    navigationRef.navigate(name, params);
  }
}

export function replace(name, params) {
  if (navigationRef.isReady()) {
    navigationRef.dispatch(StackActions.replace(name, params));
  }
}

export function goBack() {
  if (navigationRef.isReady()) {
    navigationRef.goBack();
  }
}

export function reset(index, name) {
  if (navigationRef.isReady()) {
    navigationRef.reset({
      index: index,
      routes: [{name: name}],
    });
  }
}

export function canGoBack(num) {
  if (navigationRef.isReady()) {
    navigationRef.dispatch(StackActions.pop(num));
  }
}
