// screens/HomeScreen.tsx
import React, { useEffect, useState } from 'react';
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {
  Divider,
  Layout,
  Text,
  Input,
  BottomNavigation,
  BottomNavigationTab,
} from '@ui-kitten/components';
import ArticleCard from '../components/ArticleCard';
import { getAllArticles, deleteArticle } from '../services/ApiService';
import { Article } from '../services/types/types';
import { Ionicons } from '@expo/vector-icons';
import Toast from 'react-native-root-toast';

import socket from '../services/SocketManager';
import { HomeRoutes, Routes } from '../navigation/RouteEnums';

import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';

const HomeScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);

  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: false,
      shouldSetBadge: false,
    }),
  });

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

  useEffect(() => {
    async function askNotification() {
      // We need to ask for Notification permissions for ios devices
      const { status } = await Notifications.getPermissionsAsync();
      if (Device.isDevice && status === 'granted')
        console.log('Notification permissions granted.');
    }

    // no-op if the socket is already connected
    socket.connect();

    askNotification();

    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(function () {
    function artilce_added_handler(...args: any[]) {
      // Notifications show only when app is not active.
      // (ie. another app being used or device's screen is locked)

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
    }

    socket.on('article_added', artilce_added_handler);

    const listener =
      Notifications.addNotificationReceivedListener(handleNotification);

    return () => {
      listener.remove();
      socket.off('article_added');
    };
  }, []);

  const handleDelete = async (articleId: string) => {
    try {
      const response = await deleteArticle(articleId);

      if (response.message !== null) {
        Toast.show(response.message!, {
          duration: Toast.durations.SHORT,
          position: Toast.positions.BOTTOM,
        });
        // Refresh the article list after deletion
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

  const handleAdd = () => {
    // Navigate to the screen where you want to add a new article
    navigation.navigate('YourAddScreen');
  };

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
        <Layout style={styles.header}>
          <Text category="h4">Explore Articles</Text>
          <TouchableOpacity onPress={() => console.log('Filter pressed')}>
            <Ionicons name="md-options" size={24} color="black" />
          </TouchableOpacity>
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
              ? articles
              : articles.filter((v) =>
                  v.title.toLowerCase().includes(searchTerm.toLowerCase())
                )
          }
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <ArticleCard
              {...item}
              isBookmarked={false}
              onBookmark={() => {
                Toast.show('Bookmark added !', {
                  duration: Toast.durations.SHORT,
                  position: Toast.positions.BOTTOM,
                });
              }}
              onRemoveBookmark={() => {
                Toast.show('Bookmark removed !', {
                  duration: Toast.durations.SHORT,
                  position: Toast.positions.BOTTOM,
                });
              }}
              onDelete={async () => await handleDelete(item._id)}
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
          <TouchableOpacity style={styles.fab} onPress={() => {}}>
            <Ionicons name="add-circle" size={70} color={'blue'} />
          </TouchableOpacity>
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

export default HomeScreen;
