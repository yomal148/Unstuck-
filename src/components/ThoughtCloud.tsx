import React, { useState } from 'react';
import { View, Text, TextInput, Button, ActivityIndicator, StyleSheet } from 'react-native';
import { categorizeThought } from '../../thought-categorization/thoughtCategorization';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { insertUserThought } from '../../lib/db';

const ThoughtCloud = () => {
  const [thought, setThought] = useState('');
  const [category, setCategory] = useState('');
  const [loading, setLoading] = useState(false);
  const [thoughts, setThoughts] = useState<{text: string; category: string}[]>([]);
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList, 'Thought'>>();
  // Show loading when user is typing
  const handleInputChange = (text: string) => {
    setThought(text);
    setCategory('');
    setLoading(text.length > 0);
  };

  /**
   * This function will handle categorizing the thought and store them in supabase.
   */
  const handleCategorize = async () => {
    if (!thought.trim()) return;

    setLoading(true);
    setCategory('');

    try {
      const result = await categorizeThought(thought);
      if (result === `The thought "undefined" does not provide enough context`) {
        setCategory('Sorry, I couldn\'t categorize your thought. Please try rephrasing or adding more detail.');
        return;
      }
      setCategory(`${result}`)
      setThoughts(prev => [...prev, { text: thought, category: result}]); // Add thought to array
    } catch (err) {
      console.error(err);
      setCategory('Failed to connect to server');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View >
       <Text style={styles.welcomeText}>Welcome to Your Thought Cloud</Text>
              <Text style={styles.subText}>Feel free to peacefully share your thoughts below.</Text>

              <Button
                  title="View History"
                  onPress={() => navigation.navigate('History', { thoughts })}
              />
              <TextInput
                style={styles.input}
                placeholder="Type your thought here..."
                value={thought}
                onChangeText={handleInputChange}
                multiline
                placeholderTextColor="#666"
              />
              {/** Store these thoughts in supabase */}
              <Button title="Categorize Thought" onPress={handleCategorize} />
      
              {loading && (
                <View style={styles.cloudLoadingContainer}>
                  <Text style={styles.cloudEmoji}>☁️</Text>
                  <Text style={styles.loadingText}>Categorizing...</Text>
                </View>
              )}
      
              {category !== '' && !loading && (
                <View style={styles.thoughtCloud}>
                  <Text style={styles.categoryText}>{category}</Text>
                </View>
              )}
    </View>
  );
};

export default ThoughtCloud;

const styles = StyleSheet.create({
  cloudLoadingContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  cloudEmoji: {
    fontSize: 48,
    marginBottom: 8,
    // Optionally add animation using a library or React Native's Animated API
  },
  loadingText: {
    fontSize: 16,
    color: '#56789a',
    fontStyle: 'italic',
  },
  container: {
    padding: 20,
    marginTop: 50,
  },
  welcomeText: {
    fontSize: 28,
    fontWeight: '700',
    color: '#3a5f8f',
    textAlign: 'center',
    marginBottom: 8,
  },
  subText: {
    fontSize: 16,
    color: '#56789a',
    textAlign: 'center',
    marginBottom: 24,
    fontStyle: 'italic',
  },
  thoughtCloud: {
    marginTop: 24,
    padding: 20,
    borderRadius: 30,
    backgroundColor: '#cde7ff',
    shadowColor: '#a0c4ff',
    shadowOpacity: 0.7,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
  },
  thoughtCloudText: {
    fontSize: 18,
    color: '#10316b',
    fontStyle: 'italic',
    marginBottom: 8,
  },
  categoryText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1b3a8a',
    textAlign: 'center',
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
  },
  input: {
    height: 100,
    borderColor: '#999',
    borderWidth: 1,
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
    textAlignVertical: 'top',
  },
  result: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#444',
  },
});
