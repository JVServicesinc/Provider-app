import React, {useState, useRef, useEffect} from 'react';
import {View, Modal, StyleSheet, Animated, Easing, Image, Platform} from 'react-native';
import {Button, Card, Title, Paragraph} from 'react-native-paper';
import FastImage from 'react-native-fast-image';
import AsyncStorage from '@react-native-async-storage/async-storage';
import normalize from '../../utils/helpers/normalize';
import { TouchableWithoutFeedback } from 'react-native';

const PartyModal = ({ onValueFromChild, visible}) => {
  async function Done() {
    await AsyncStorage.setItem('popup', 'true');
 
    onValueFromChild(true);
  }

  return (
    <Modal
    visible={visible}
    transparent

  >
    <TouchableWithoutFeedback onPress={Done}>
    <View style={styles.modalContainer}>
        <View style={styles.cardContainer}>
          <Card>
            <FastImage
              source={require('../../assets/images/party.gif')}
              style={styles.backgroundImage}
              resizeMode={FastImage.resizeMode.cover}
            />
            <Card.Content>
              <FastImage
                source={require('../../assets/images/emoji.gif')}
                style={styles.gifImage}
                resizeMode={FastImage.resizeMode.contain}
                animated
              />
              <Title
                style={{
                  alignSelf: 'auto',
                  textAlign: 'center',
                  fontWeight: 'bold',
                }}>
                Merci de vous être enregistré avec JVservices. Vous recevrez un
                appel d'un de nos membres d'équipe dans les 24 à 48 heures pour
                discuter du processus ultérieur. 
              </Title>
              <Title
                style={{
                  alignSelf: 'auto',
                  textAlign: 'center',
                  fontWeight: 'bold',
                }}>
                 Thank you for registering with
                JVservices . You will receive a call from one of our team member
                with in 24-48hours to go over further process.
              </Title>
              {/* <Paragraph>This is the card content.</Paragraph> */}
            </Card.Content>
            {/* <Card.Actions style={styles.actionsContainer}>
              <Button onPress={Done}>Sounds Good</Button>
            </Card.Actions> */}
          </Card>
        </View>
      </View>
    </TouchableWithoutFeedback>
     
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Platform.OS=='ios'?'rgba(0,0,0,0.7)':'rgba(0, 0, 0, 0.8)',
  },
  cardContainer: {
    backgroundColor: '#fff',
    borderRadius: normalize(8),
    margin: normalize(15),
    overflow: 'hidden',
  },
  backgroundImage: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  //   cardContent: {
  //     position: 'relative',
  //     zIndex: 1,
  //   },
  title: {
    alignSelf: 'center',
  },
  //   actionsContainer: {
  //     justifyContent: 'flex-end',
  //     marginTop: 16,
  //   },
  gifImage: {
    alignSelf: 'center',
    width: normalize(80),
    height: normalize(80),
    // marginRight: 8,
    marginTop: normalize(20),
  },
});

export default PartyModal;
