import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Dimensions } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
import Svg, { Path } from 'react-native-svg';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');

type Props = NativeStackScreenProps<RootStackParamList, 'History'>;

const ThoughtHistory = ({ route }: Props) => {
    // Extract thoughts from Supabase instead of navigation or local state. 
  const { thoughts } = route.params;
  const [uniqueThoughts, setUniqueThoughts] = useState<{text: string; category: string}[]>([]);
  const navigation = useNavigation();

  const removeDuplicates = (thoughts: { text: string; category: string }[]) => {
    const uniqueThoughts = new Map();
    thoughts.forEach(thought => {
      if (!uniqueThoughts.has(thought.text)) {
        uniqueThoughts.set(thought.text, thought);
      }
    }
    );
    return Array.from(uniqueThoughts.values());
  }

  useEffect(() => {
    if (thoughts.length > 0) {
        const uniqueThoughts = removeDuplicates(thoughts);
        setUniqueThoughts(uniqueThoughts);
    }
  }
  , [thoughts, route.params]);

  return (
    <View style={styles.container}>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20, width: '100%' }}>
        <Svg width={24} height={24} viewBox="0 0 24 24" onPress={() => navigation.goBack()} style={{ marginRight: 12 }}>
            <Path
                d="M8 5l-8 7 8 7"
                stroke="#56789a"
                strokeWidth={2}
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </Svg>
        <Text style={styles.title}>Your Thought History</Text>
        </View>
      <FlatList
        data={uniqueThoughts}
        keyExtractor={(_, idx) => idx.toString()}
        renderItem={({ item } ) => (
          <View style={styles.thoughtItem}>
            <Text style={styles.thoughtText}>{item.text}</Text>
            <Text style={styles.categoryText}>{item.category}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 3 },
  thoughtItem: { marginBottom: 16, backgroundColor: '#e3f0ff', padding: 12, borderRadius: 10 },
  thoughtText: { fontSize: 16, marginBottom: 4 },
  categoryText: { fontSize: 14, color: '#56789a' },
});

export default ThoughtHistory;