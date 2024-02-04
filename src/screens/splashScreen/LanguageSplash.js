import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';


const LanguageSelectionScreen = (props) => {
  const [selectedLanguage, setSelectedLanguage] = useState("");

  const handleLanguageSelect = (language) => {
    setSelectedLanguage(language);
  };

  return (
    <View style={styles.container}>

      <Text style={styles.headerText}>Language</Text>

      <Image
        source={{ uri: 'path_to_your_avatar_image' }}
        style={styles.avatarImage}
      />

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[
            styles.button,
            selectedLanguage === 'CC' && styles.selectedButton
          ]}
          onPress={() => handleLanguageSelect("french")}
        >
          <Text style={styles.buttonText}>French</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.button,
            selectedLanguage === 'ASL' && styles.selectedButton
          ]}
          onPress={() => handleLanguageSelect('english')}
        >
          <Text style={styles.buttonText}>English</Text>
        </TouchableOpacity>

        {/* ...other buttons... */}
      </View>

      <TouchableOpacity style={styles.nextButton}
        onPress={ async () => {
          await AsyncStorage.setItem('language', selectedLanguage);
          console.log(typeof props.navigation)
          props.navigation.navigate('Login');
        }}
      >
        <Text style={styles.nextButtonText}>NEXT</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'blue', // Adjust the color to match your design
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  avatarImage: {
    width: 100,
    height: 100,
    borderRadius: 50, // Adjust to match your design
    marginBottom: 20,
  },
  buttonContainer: {
    width: '100%',
    // Add styles to space out the buttons
  },
  button: {
    padding: 10,
    marginVertical: 5,
    backgroundColor: 'white', // Adjust to match your design
    // Add styles for button (border, border-radius, etc.)
  },
  selectedButton: {
    backgroundColor: '#AAA', // Adjust to match your design
    // Add styles for selected state
  },
  buttonText: {
    color: 'black',
    textAlign: 'center',
    // Add text styles
  },
  nextButton: {
    marginTop: 20,
    backgroundColor: '#000', // Adjust to match your design
    padding: 10,
    borderRadius: 5,
  },
  nextButtonText: {
    color: 'white',
    textAlign: 'center',
    // Add text styles
  }
});

export default LanguageSelectionScreen;
