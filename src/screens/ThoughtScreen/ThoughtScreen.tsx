import React from 'react';
import { StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import LinearGradient from 'react-native-linear-gradient'; // Make sure to install react-native-linear-gradient
import ThoughtCloud from '../../components/ThoughtCloud';

const ThoughtScreen = () => {
  return (
    <LinearGradient colors={['#dbe9f4', '#f5f9fc']} style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.innerContainer}
      >
        <ThoughtCloud />
      </KeyboardAvoidingView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  innerContainer: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
  },
});

export default ThoughtScreen;
