import React, { useState, useEffect } from 'react';
import { FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import {
  getBookmarkedArticlesForUser,
  UserBookmark,
} from '../services/ApiService';
import { Layout, Text, useTheme } from '@ui-kitten/components';
import { Chip } from 'react-native-paper';
import { HomeRoutes, Routes } from '../navigation/RouteEnums';

interface BookmarksScreenProps {
  navigation: any;
}

export default function BookmarksScreen({ navigation }: BookmarksScreenProps) {
  const theme = useTheme();
  const [bookmarkedArticles, setBookmarkedArticles] = useState<UserBookmark[]>(
    []
  );

  useEffect(() => {
    const fetchBookmarkedArticles = async () => {
      const articles = await getBookmarkedArticlesForUser(
        '659ea6d330cc17c0e305ee6e'
      );
      console.log(articles);
      setBookmarkedArticles(articles);
    };

    fetchBookmarkedArticles();
  }, []);

  const renderItem = ({ item }: { item: UserBookmark }) => (
    <Layout style={styles.card} level="2">
      <Text category="h6" style={styles.titleText}>
        {item.Article.title}
      </Text>
      <Text>{item.Article.content}</Text>

      {item.Article.tags && (
        <Layout style={styles.tagsContainer}>
          {item.Article.tags.map((tag: string, index: number) => (
            <Chip key={index} style={styles.chip}>
              <Text># {tag}</Text>
            </Chip>
          ))}
        </Layout>
      )}

      <Text>{item.Article.topic}</Text>
    </Layout>
  );

  return (
    <Layout style={styles.container} level="1">
      <TouchableOpacity
        onPress={() =>
          navigation.navigate(Routes.HomeRoute, {
            screen: HomeRoutes.HomeScreen,
          })
        }
      >
        <Text style={styles.backButton}>Back</Text>
      </TouchableOpacity>

      <FlatList
        data={bookmarkedArticles}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
      />
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  card: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 16,
    marginBottom: 16,
    borderRadius: 8,
  },
  titleText: {
    marginBottom: 8,
  },
  topicText: {
    color: 'green', // Change the color to green or any other color you prefer
  },
  hashtagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 8,
  },
  backButton: {
    color: 'color-primary-500', // Customize the color to match your theme
    fontSize: 16,
    marginBottom: 16,
  },
  hashtagText: {
    marginRight: 8,
    color: '#3498db', // Customize hashtag text color
  },
  tagsContainer: {
    flexDirection: 'row',
    marginTop: 8,
  },
  chip: {
    margin: 4, // Adjust the margin as needed
  },
});
