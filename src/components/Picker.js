import React from 'react';
import {
  FlatList,
  SafeAreaView,
  View,
  Platform,
  TouchableOpacity,
} from 'react-native';
import PropTypes from 'prop-types';
import normalize from '../utils/helpers/normalize';
import Modal from 'react-native-modal';
import {Text} from 'react-native-elements';
import {Fonts} from '../themes/Themes';

export default function Picker(props) {
  function onBackdropPress() {
    if (props.onBackdropPress) {
      props.onBackdropPress();
    }
  }
  function modalDown() {
    if (props.modalDown) {
      props.modalDown();
    }
  }

  return (
    <SafeAreaView>
      <Modal
        animationIn={'slideInUp'}
        animationOut={'slideOutDown'}
        backdropTransitionOutTiming={0}
        hideModalContentWhileAnimating={true}
        isVisible={props.modalVisible}
        style={{width: '100%', alignSelf: 'center', margin: 0}}
        animationInTiming={800}
        animationOutTiming={500}
        onBackButtonPress={() => onBackdropPress()}
        onBackdropPress={() => onBackdropPress()}>
        <View
          style={{
            flex: 1,
            backgroundColor: '#ddd',
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 10,
            backgroundColor: props.backgroundColor,
            borderTopRightRadius: normalize(7),
            borderTopLeftRadius: normalize(7),
            borderWidth: normalize(2),
            overflow: 'hidden',
            borderColor: props.backgroundColor,
            maxHeight: normalize(200),
            paddingLeft: props.paddingLeft,
            paddingBottom: Platform.OS == 'ios' ? normalize(16) : 0,
          }}>
          {props.ModalDown ? (
            <TouchableOpacity
              style={{
                height: normalize(5),
                width: normalize(40),
                backgroundColor: 'rgba(171, 171, 171, 1)',
                alignSelf: 'center',
                borderRadius: normalize(10),
                marginTop: normalize(10),
              }}
              onPress={() => {
                modalDown();
              }}
            />
          ) : null}
          {props.modalHeading ? (
            <Text
              style={{
                color: '#161616',
                textAlign: 'center',
                fontSize: normalize(15),
                marginTop: normalize(10),
                fontFamily: Fonts.PoppinsMedium,
              }}>
              {props.TextmodalHeading}
            </Text>
          ) : null}

          <FlatList
            data={props.dataList}
            contentContainerStyle={[
              Platform.OS == 'ios' ? {paddingBottom: normalize(15)} : null,
            ]}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item, index) => index.toString()}
            renderItem={props.renderData}
          />
        </View>
      </Modal>
    </SafeAreaView>
  );
}

Picker.propTypes = {
  dataList: PropTypes.array,
  modalVisible: PropTypes.bool,
  renderData: PropTypes.func,
  onBackdropPress: PropTypes.func,
  backgroundColor: PropTypes.string,
  height: PropTypes.number,
  paddingLeft: PropTypes.number,
};

Picker.defaultProps = {
  dataList: [],
  modalVisible: false,
  renderData: null,
  onBackdropPress: null,
  backgroundColor: 'white',
  height: normalize(400),
  paddingLeft: normalize(20),
};
