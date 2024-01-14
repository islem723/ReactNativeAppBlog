// screens/HomeScreen.tsx
import React, { useEffect, useState } from 'react';
import {
  FlatList,
  SafeAreaView,
  View,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {
  Divider,
  Layout,
  Text,
  Input,
  Button,
  BottomNavigation,
  BottomNavigationTab,
} from '@ui-kitten/components';
import ArticleCard from '../components/ArticleCard';
import { getAllArticles, deleteArticle } from '../services/ApiService';
import { Article } from '../services/types/types';
import { Ionicons } from '@expo/vector-icons';

const HomeScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0); // Index for the BottomNavigation

  useEffect(() => {
    async function fetchArticles() {
      try {
        const response = await getAllArticles();
        setArticles(response);
      } catch (error) {
        console.error('Error fetching articles:', error);
      }
    }

    fetchArticles();
  }, []);

  const handleDelete = async (articleId: string) => {
    try {
      const response = await deleteArticle(articleId);

      if (response.message === 'Article deleted successfully') {
        // Refresh the article list after deletion
        const updatedArticles = await getAllArticles();
        setArticles(updatedArticles);
      } else {
        console.error('Error deleting article:', response.error);
      }
    } catch (error) {
      console.error('Error deleting article:', error);
    }
  };

  const handleAdd = () => {
    // Navigate to the screen where you want to add a new article
    navigation.navigate('YourAddScreen');
  };

  const renderIcon = (props: any) => (
    <Ionicons
      name="add-circle"
      size={40}
      color={props.selected ? 'black' : 'blue'}
    />
  );

  const onSelect = (index: number) => {
    setSelectedIndex(index);

    // Perform actions based on the selected index if needed
    if (index === 1) {
      handleAdd();
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Layout style={{ flex: 1, flexDirection: 'column', padding: 10 }}>
        <View style={styles.header}>
          <Text category="h4">Explore Articles</Text>
          <TouchableOpacity onPress={() => console.log('Filter pressed')}>
            <Ionicons name="md-options" size={24} color="black" />
          </TouchableOpacity>
        </View>

        <View style={styles.searchContainer}>
          <Input
            style={styles.input}
            placeholder={'Search articles...'}
            value={searchTerm}
            onChangeText={(v) => setSearchTerm(v)}
          />
        </View>

        <FlatList
          data={
            !searchTerm.length
              ? articles
              : articles.filter((e) => e.title.includes(searchTerm))
          }
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <ArticleCard
              onBookmark={function (): void {
                throw new Error('Function not implemented.');
              }}
              isBookmarked={false}
              {...item}
              onDelete={() => handleDelete(item._id)}
            />
          )}
          ItemSeparatorComponent={() => <Divider />}
          style={{ flex: 1 }}
        />

        {/* Bottom Navigation */}
        <BottomNavigation
          selectedIndex={selectedIndex}
          onSelect={onSelect}
          appearance="noIndicator"
          style={styles.bottomNav}
        >
          <BottomNavigationTab icon={renderIcon} />
        </BottomNavigation>
      </Layout>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  searchContainer: {
    marginBottom: 50,
  },
  input: {
    flex: 1,
  },
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    marginVertical: 8,
  },
});

export default HomeScreen;
