import React, {useState, useRef, useEffect} from  'react';
import { StyleSheet, KeyboardAvoidingView, Platform, View, Text, TextInput, Alert, Button, Dimensions, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { insertUser } from '../../../lib/db';
import PhoneInput from 'react-native-phone-number-input'; // Ensure you have this package installed
import { useNavigation } from '@react-navigation/native';
import Svg, { Path } from 'react-native-svg';
import { fetchUsers } from '../../../lib/db'; // Assuming you have a function to fetch user data

const { width, height } = Dimensions.get('window'); 

const Login = () => {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const phoneInputRef = useRef<PhoneInput>(null);
    const [value, setValue] = useState('');
    const [number, setNumber] = useState('');
    const navigation = useNavigation();
    const [existingUsers, setExistingUsers] = useState([]); 

    const handleLogin = () => {
        if (!email || !value || !name) {
            Alert.alert('Please fill in all fields');
            return;
        }
        
        fetchUsers()
        .then(users => {
            const foundUser = users.find(user => user.email === email);
            if (foundUser) {
                const user = {
                    id: foundUser.id,
                    email: foundUser.email,
                    number: foundUser.number,
                    name: foundUser.name,
                };
                navigation.navigate('Thought', { user });
            } else {
                Alert.alert('User not found', 'Please sign up first.');
                //navigation.navigate('SignUp', { email, number, name });
            }
        })
        .catch(err => {
            console.error('Error checking user:', err);
            Alert.alert('Error', 'An error occurred while checking user data. Please try again.');
            return;
        });
    };

    /**
     * Ask user to input email, number and name
     * Design? -> Same background as landing page?
     * 
     */


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
                  <Button title="Login" color='#56789a' onPress={() => handleLogin()}/>
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
export default Login;