// components/ArticleCard.tsx
import React, { useState } from 'react';
import { Image, StyleSheet, TouchableOpacity } from 'react-native';
import { BASE_URL } from '../utils/consts';
import { Article } from '../services/types';
import { Layout, Text } from '@ui-kitten/components';
import { Alert } from 'react-native';
import { AntDesign, FontAwesome, Ionicons } from '@expo/vector-icons';

interface ArticleCardProps extends Article {
  onDelete: () => void;
  onBookmark: () => void;
  onRemoveBookmark: () => void;
  isBookmarked: boolean;
}

function ArticleCard({
  title,
  content,
  image,
  createdAt,
  onDelete,
  onBookmark,
  onRemoveBookmark,
  isBookmarked,
}: ArticleCardProps) {
  const [isBookmarkedLocal, setIsBookmarkedLocal] = useState(isBookmarked);

  async function toggleBookmark() {
    setIsBookmarkedLocal((prev) => !prev);
    if (isBookmarkedLocal) {
      onRemoveBookmark();
    } else {
      onBookmark();
    }
  }

  const formatRelativeTime = (timestamp: string) => {
    const now = new Date();
    const articleDate = new Date(timestamp);
    const diffInSeconds = Math.floor(
      (now.getTime() - articleDate.getTime()) / 1000
    );

    if (diffInSeconds < 60) {
      return `${diffInSeconds} seconds ago`;
    } else if (diffInSeconds < 3600) {
      const minutes = Math.floor(diffInSeconds / 60);
      return `${minutes} ${minutes === 1 ? 'min' : 'mins'} ago`;
    } else if (diffInSeconds < 86400) {
      const hours = Math.floor(diffInSeconds / 3600);
      return `${hours}h ago`;
    } else {
      return articleDate.toLocaleDateString();
    }
  };

  const handleDelete = () => {
    Alert.alert(
      'Confirm Deletion',
      'Are you sure you want to delete this article?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: onDelete, // Call onDelete if the user confirms
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <Layout style={styles.card}>
      <Image
        source={{ uri: `${BASE_URL}/img/${image}` }}
        style={styles.image}
      />
      <Layout style={styles.content}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.text}>{content}</Text>
        <Layout style={styles.row}>
          <Text style={styles.createdAt}>{formatRelativeTime(createdAt)}</Text>

          <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
            <AntDesign name="delete" size={22} color="red" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.bookmarkButton}
            onPress={async () => await toggleBookmark()}
          >
            <Ionicons
              name={isBookmarkedLocal ? 'bookmarks' : 'bookmarks-outline'}
              size={24}
              color="black"
            />
          </TouchableOpacity>
          <FontAwesome name="edit" size={22} color="blue" />
        </Layout>
      </Layout>
    </Layout>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    padding: 16,
    marginBottom: 16,
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000000',
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  image: {
    width: 80,
    height: 80,
    marginRight: 16,
    borderRadius: 4,
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333333',
  },
  text: {
    fontSize: 14,
    marginBottom: 12,
    color: '#666666',
  },
  createdAt: {
    color: '#0000FF',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  deleteButton: {
    marginLeft: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  bookmarkButton: {
    marginLeft: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  editButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
});

export default ArticleCard;
