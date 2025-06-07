import React, {useState, useRef} from  'react';
import { StyleSheet, KeyboardAvoidingView, Platform, View, Text, TextInput, Alert, Button, Dimensions, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { insertUser } from '../../../lib/db';
import PhoneInput from 'react-native-phone-number-input'; // Ensure you have this package installed
import { useNavigation } from '@react-navigation/native';
import Svg, { Path } from 'react-native-svg';
import { signup } from '../../../lib/auth';

const { width, height } = Dimensions.get('window');

const SignUpScreen = () => {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const phoneInputRef = useRef<PhoneInput>(null);
    const [value, setValue] = useState('');
    const [number, setNumber] = useState('');
    const navigation = useNavigation();

    const handleSignUp = async () => {
        if (!email || !value || !name) {
            Alert.alert('Please fill in all fields');
            return;
        }
        try {
            const user = { email, number, name };
            await insertUser(user);
        } catch (error) {
            console.error('Error inserting user:', error);
            if (String(error) === 'Error: User with this email already exists') { 
                Alert.alert('Your email is already registered. Please login instead.');
                return;
            }else {
              Alert.alert('Please try logging in again.');
              return;
            }
        }
        Alert.alert('Success', 'You have successfully logged in!');
        setEmail('');
        setNumber('');
        setName('');
        {/*Ignore error line for navigation*/}
        navigation.navigate('Thought'); 
    };  

  return (
    <LinearGradient colors={['#dbe9f4', '#f5f9fc']} style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} activeOpacity={0.8} style={{ position: 'absolute', top: 32, left: 25, zIndex: 10 }}>
        <Svg width={24} height={24} viewBox="0 0 24 24" >
          <Path
            d="M8 5l-8 7 8 7"
            stroke="#56789a"
            strokeWidth={2}
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </Svg>
        </TouchableOpacity>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.innerContainer}
      >
    <View style={styles.container}>
      <Text style={styles.title}>Unstuck</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <PhoneInput
        ref={phoneInputRef}
        defaultValue={value}
        defaultCode="US"
        layout="first"
        onChangeText={setValue}
        onChangeFormattedText={setNumber}
        withDarkTheme
        withShadow
        autoFocus
      />
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />
      <View style={styles.signup}>
          <Button title="Sign Up" color='#56789a' onPress={() => handleSignUp()}/>
      </View>
    </View>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  haveAccount: {
    fontSize: 17,
    color: '#444', // dark grey
    marginBottom: 8,
    marginRight: 'auto',
    textAlign: 'center',
  },
  container: {
    flex: 1,
  },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 24, textAlign: 'center' },
  innerContainer: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
  },
  signup: {
    marginTop: 20,
    backgroundColor: '#ADD8E6',
    fontWeight: 'bold',
    color: '#000000',
    padding: 2,
    borderRadius: 200,
    width: 200,
    alignSelf: 'center',
  }
});

export default SignUpScreen;