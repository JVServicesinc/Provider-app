import React, {useState} from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  Text,
  SafeAreaView,
  Platform,
  Image,
} from 'react-native';
import Header from '../../components/Header';
import {Fonts, IMAGES} from '../../themes/Themes';
import normalize from '../../utils/helpers/normalize';

const ChatScreen = props => {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');

  const getCurrentTime = () => {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'pm' : 'am';
    const formattedHours = hours > 12 ? (hours - 12).toString().padStart(2, '0') : hours;
    return `Today ${formattedHours}:${minutes} ${ampm}`;
  };

  const handleSendMessage = () => {
    if (inputText.trim() !== '') {
      const currentTime = getCurrentTime();
      setMessages([
        ...messages,
        {text: inputText, sender: 'You', time: currentTime},
      ]);
      setInputText('');
    }
  };

  const renderMessageItem = ({item}) => (
    <View style={{flexDirection: 'column', marginBottom: 10}}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: item.sender === 'You' ? 'flex-end' : 'flex-start',
        }}>
        <View
          style={{
            backgroundColor: item.sender === 'You' ? '#F3F3F3' : '#F2EBFF',
            borderRadius: normalize(10),
            padding: normalize(7),
            maxWidth: '70%',
          }}>
          <Text
            style={{
              color: item.sender === 'You' ? 'black' : 'black',
              fontSize: normalize(12),
              fontFamily: Fonts.PoppinsRegular,
            }}>
            {item.text}
          </Text>
        </View>
      </View>
      <Text
        style={{
          color: 'gray',
          fontSize: 12,
          alignSelf: item.sender === 'You' ? 'flex-end' : 'flex-start',
        }}>
        {item.time}
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <Header
        back_button
        back_img_source={IMAGES.Goback}
        LeftImagehght={normalize(20)}
        LeftImagewidth={normalize(20)}
        leftImagebackground={'#dbdbdb'}
        ImagePadding={normalize(5)}
        LeftImggborderradius={normalize(10)}
        // gobackmarginLeft={normalize(10)}
        justifyContent={'space-between'}
        backmargintop={Platform.OS == 'android' ? normalize(20) : normalize(20)}
        text
        // textRight={normalize(25)}
        marginHorizontal={normalize(10)}
        title={'Harry Styles'}
        textcolor={'black'}
        textfont={Fonts.PoppinsMedium}
        textSize={normalize(15)}
        textAlign={'center'}
        RightImage
        textmartop={Platform.OS == 'android' ? normalize(20) : normalize(20)}
        imageMarginTop={
          Platform.OS == 'android' ? normalize(20) : normalize(20)
        }
        onPress_back_button={() => {
          props.navigation.goBack();
        }}
        marginBottom={normalize(10)}
        rightheight={normalize(30)}
        rightwidth={normalize(30)}
        rightImagesrc={IMAGES.Calling}
      />
      <FlatList
        data={messages}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderMessageItem}
        contentContainerStyle={{padding: 10}}
      />
      <View
        style={{
          borderColor: '#DADADA',
          borderWidth: normalize(1),
          width: '90%',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignSelf: 'center',
          padding:Platform.OS=='ios'? normalize(10):normalize(0),
          borderRadius: normalize(20),
          alignItems:'center',
          marginBottom:Platform.OS=='ios'?normalize(0): normalize(15),
          paddingHorizontal:Platform.OS=='ios'?normalize(0):normalize(10)
        }}>
        <TextInput
          placeholder="Send Message"
          placeholderTextColor={'#DADADA'}
          value={inputText}
          onChangeText={text => setInputText(text)}
          style={{
            width: '90%',
            color: 'black',
            fontSize: normalize(12),
            fontFamily: Fonts.PoppinsMedium,
          }}
        />
        <TouchableOpacity onPress={handleSendMessage}>
          <Image
            source={IMAGES.Send_Button}
            style={{height: normalize(25), width: normalize(25)}}
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ChatScreen;
