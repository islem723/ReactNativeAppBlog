// screens/HomeScreen.tsx
import React, { useEffect, useState } from 'react';
import { FlatList, Pressable, SafeAreaView, StyleSheet } from 'react-native';
import { Divider, Layout, Text, Input } from '@ui-kitten/components';
import ArticleCard from '../components/ArticleCard';
import { getAllArticles, deleteArticle } from '../services/ApiService';
import {
  createBookmark,
  deleteBookmark,
  getBookmarkedArticlesForUser,
} from '../services/ApiService'; // Import bookmark services
import { Article } from '../services/types';
import { Ionicons } from '@expo/vector-icons';
import Toast from 'react-native-root-toast';
import socket from '../services/SocketManager'; // Import socket from the correct location
import { HomeRoutes, Routes } from '../navigation/RouteEnums';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import { useNavigation } from '@react-navigation/native';
import { RoutesParamList } from '../navigation/NavTypes';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type NavigationProp = NativeStackNavigationProp<
  RoutesParamList,
  Routes.HomeRoute
>;

export default function HomeScreen() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [bookmarkedArticles, setBookmarkedArticles] = useState<string[]>([]); // Array of bookmarked article IDs
  const [searchTerm, setSearchTerm] = useState('');
  const navigation = useNavigation<NavigationProp>();

  async function fetchArticles() {
    const response = await getAllArticles();
    setArticles(response);
  }
  useEffect(() => {
    fetchArticles();
  }, []);

  useEffect(() => {
    async function askNotification() {
      const { status } = await Notifications.getPermissionsAsync();
      if (Device.isDevice && status === 'granted')
        console.log('Notification permissions granted.');
    }
    socket.connect();
    askNotification();
    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    function articleAddedHandler(...args: any[]) {
      const socketMessage: string = args[0]['data'];
      Notifications.scheduleNotificationAsync({
        content: {
          title: 'Article added!',
          body: socketMessage,
          sound: true,
          priority: Notifications.AndroidNotificationPriority.HIGH,
          color: 'green',
        },
        trigger: {
          seconds: 3,
        },
      });
    }

    function handleNotification(event: Notifications.Notification) {
      navigation.navigate(Routes.HomeRoute, {
        screen: HomeRoutes.HomeScreen,
      });
      //fetchArticles();
    }

    socket.on('article_added', articleAddedHandler);

    const listener =
      Notifications.addNotificationReceivedListener(handleNotification);

    return () => {
      listener.remove();
      socket.off('article_added');
    };
  }, []);

  useEffect(() => {
    async function fetchBookmarkedArticles() {
      try {
        const bookmarkedArticlesResponse = await getBookmarkedArticlesForUser(
          '659ea6d330cc17c0e305ee6e'
        );
        // Extract article IDs from UserBookmark objects
        const articleIds = bookmarkedArticlesResponse.map(
          (bookmark) => bookmark.Article._id
        );

        setBookmarkedArticles(articleIds);
      } catch (error) {
        console.error('Error fetching bookmarked articles:', error);
      }
    }

    fetchBookmarkedArticles();
  }, []);

  const handleDelete = async (articleId: string) => {
    try {
      const response = await deleteArticle(articleId);
      if (response.message !== null) {
        Toast.show(response.message!, {
          duration: Toast.durations.SHORT,
          position: Toast.positions.BOTTOM,
        });
        setArticles(await getAllArticles());
      } else {
        Toast.show(response.error!, {
          duration: Toast.durations.SHORT,
          position: Toast.positions.BOTTOM,
        });
        console.error('Error deleting article:', response.error);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleBookmark = async (articleId: string) => {
    try {
      const response = await createBookmark(
        '659ea6d330cc17c0e305ee6e',
        articleId
      );
      if (response.message !== null) {
        Toast.show(response.message!, {
          duration: Toast.durations.SHORT,
          position: Toast.positions.BOTTOM,
        });
        setArticles(await getAllArticles());
        setBookmarkedArticles([...bookmarkedArticles, articleId]); // Update bookmarkedArticles state
      } else {
        Toast.show(response.error!, {
          duration: Toast.durations.SHORT,
          position: Toast.positions.BOTTOM,
        });
        console.error('Error creating bookmark:', response.error);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleRemoveBookmark = async (user: string, article: string) => {
    try {
      const response = await deleteBookmark(user, article);
      if (response.message !== null) {
        Toast.show(response.message!, {
          duration: Toast.durations.SHORT,
          position: Toast.positions.BOTTOM,
        });
        setArticles(await getAllArticles());
        setBookmarkedArticles(
          bookmarkedArticles.filter((id) => id !== article)
        ); // Update bookmarkedArticles state
      } else {
        Toast.show(response.error!, {
          duration: Toast.durations.SHORT,
          position: Toast.positions.BOTTOM,
        });
        console.error('Error deleting bookmark:', response.error);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Layout style={{ flex: 1, flexDirection: 'column', padding: 10 }}>
        <Layout style={styles.header}>
          <Text category="h4">Explore Articles</Text>
          <Pressable onPress={() => console.log('Filter pressed')}>
            <Ionicons name="md-options" size={24} color="black" />
          </Pressable>
        </Layout>

        <Layout style={styles.searchContainer}>
          <Input
            style={styles.input}
            placeholder={'Search articles...'}
            value={searchTerm}
            onChangeText={(v) => setSearchTerm(v)}
          />
        </Layout>

        <FlatList
          data={
            !searchTerm.length
              ? articles.map((article) => ({
                  ...article,
                  isBookmarked: bookmarkedArticles.includes(article._id),
                }))
              : articles
                  .map((article) => ({
                    ...article,
                    isBookmarked: bookmarkedArticles.includes(article._id),
                  }))
                  .filter((v) =>
                    v.title.toLowerCase().includes(searchTerm.toLowerCase())
                  )
          }
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <ArticleCard
              {...item}
              onBookmark={async () => await handleBookmark(item._id)}
              onRemoveBookmark={async () =>
                await handleRemoveBookmark('659ea6d330cc17c0e305ee6e', item._id)
              }
              onDelete={() => handleDelete(item._id)}
            />
          )}
          ItemSeparatorComponent={() => <Divider />}
          style={{ flex: 1 }}
        />
        <Pressable
          style={styles.fab}
          onPress={() => {
            navigation.navigate(Routes.AddArticleScreen);
          }}
        >
          <Ionicons name="add-circle" size={70} color={'blue'} />
        </Pressable>
      </Layout>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  searchContainer: {
    marginBottom: 40,
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
  fab: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    marginRight: 10,
    marginBottom: 10,
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.75,
    shadowOffset: {
      width: 10,
      height: 10,
    },
  },
});
