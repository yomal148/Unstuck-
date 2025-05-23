import React, { useState } from 'react';
import { View, Text, TextInput, Button, ActivityIndicator, StyleSheet } from 'react-native';
import { categorizeThought } from '../../thought-categorization/thoughtCategorization';

const ThoughtCloud: React.FC = () => {
  const [thought, setThought] = useState('');
  const [category, setCategory] = useState('');
  const [loading, setLoading] = useState(false);

  const handleCategorize = async () => {
    if (!thought.trim()) return;

    setLoading(true);
    setCategory('');

    try {
      const result = await categorizeThought();
      setCategory(result)
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
      
              <TextInput
                style={styles.input}
                placeholder="Type your thought here..."
                value={thought}
                onChangeText={setThought}
                multiline
                placeholderTextColor="#666"
              />
      
              <Button title="Categorize Thought" onPress={handleCategorize} />
      
              {loading && <ActivityIndicator size="small" color="#555" style={{ marginTop: 10 }} />}
      
              {category !== '' && !loading && (
                <View style={styles.thoughtCloud}>
                  <Text style={styles.thoughtCloudText}>{thought}</Text>
                  <Text style={styles.categoryText}>Category: {category}</Text>
                </View>
              )}
    </View>
  );
};

export default ThoughtCloud;

const styles = StyleSheet.create({
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
    textAlign: 'right',
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
