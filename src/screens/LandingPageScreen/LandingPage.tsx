import React, {useState, useRef} from  'react';
import { StyleSheet, KeyboardAvoidingView, Platform, View, Text, Button, Dimensions } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import PhoneInput from 'react-native-phone-number-input'; // Ensure you have this package installed
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

const LandingPage = () => { 
    const navigation = useNavigation();
    return (
        <LinearGradient
        colors={['#dbe9f4', '#f5f9fc']}
        style={styles.container}
        >
            {/* Cloud emojis for a playful cloud effect */}
            <Text style={[styles.cloud, { top: 60, left: 30 }]}>☁️</Text>
            <Text style={[styles.cloud, { top: 120, right: 40 }]}>☁️</Text>
            <Text style={[styles.cloud, { top: 200, left: width / 2 - 40 }]}>☁️</Text>
            <Text style={[styles.cloud, { top: 300, right: 80 }]}>☁️</Text>
            <Text style={[styles.cloud, { bottom: 100, left: 60 }]}>☁️</Text>
            <View style={styles.centerContent}/>
            <Text style={styles.title}>Welcome to Unstuck</Text>
            <Text style={styles.subtitle}>Your thoughts, in the cloud.</Text>

            <View style={styles.signup}>
                <Button title="Sign Up" color='#56789a' onPress={() => navigation.navigate('SignUp')}/>
            </View>
            <View style={styles.login}>
                {/*Ignore error line for navigation*/}
                <Button title="Login" color='#56789a' onPress={() => navigation.navigate('Login')} />
            </View>

        </LinearGradient>
    )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cloud: {
    position: 'absolute',
    fontSize: 60,
    opacity: 0.7,
  },
  centerContent: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 100,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#56789a',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 18,
    color: '#56789a',
    opacity: 0.8,
  },
  signup: {
    marginTop: 20,
    backgroundColor: '#ADD8E6',
    fontWeight: 'bold',
    color: '#000000',
    padding: 2,
    borderRadius: 200,
    width: 200
  },
    login: {
        marginTop: 20,
        backgroundColor: '#ADD8E6',
        fontWeight: 'bold',
        color: '#000000',
        padding: 2,
        borderRadius: 200,
        width: 200,
    },
});

export default LandingPage;