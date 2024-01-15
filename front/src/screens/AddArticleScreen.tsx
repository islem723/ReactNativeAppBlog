// AddArticleScreen.tsx
import React, { useRef, useState } from 'react';
import { Image, Pressable } from 'react-native';

import { Addarticle } from '../services/ApiService';
import { Input, Layout, Text } from '@ui-kitten/components/ui';
import * as ImagePicker from 'expo-image-picker';
import CustomButton from '../components/Button';
import TextInput from '../components/TextInput';
import { FlatList } from 'react-native-gesture-handler';
import { FontAwesome } from '@expo/vector-icons';

interface ImageData {
  fileName: string;
  uri: string;
  fileType: string;
}

export default function AddArticleScreen({ navigation }: any) {
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');
  const [topic, setTopic] = useState('');
  const [currentTag, setCurrentTag] = useState('');
  const [tags, setTags] = useState(['']);
  const tagRef = useRef<Input>();
  const [selectedImageData, setSelectedImageData] = useState<ImageData>();

  async function handleImagePick() {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setSelectedImageData({
        uri: result.assets[0].uri,
        fileName: result.assets[0].fileName!,
        fileType: result.assets[0].type!,
      });
    }
  }

  async function handleAddArticle() {
    try {
      if (!selectedImageData) {
        console.error('No image selected!');
        return;
      }

      const resp = await fetch(selectedImageData?.uri!);
      const blob = await resp.blob();
      const response = await Addarticle({
        content,
        title,
        topic,
        tags: JSON.stringify(tags),
        image: blob,
        owner: '659ea6d330cc17c0e305ee6e',
      });

      console.log('Response:', response); // Log the response for more details

      if (response.error) {
        console.error('Error adding article:', response.error);
      } else {
        console.log('Article added successfully:', response);
        // Navigate back to the home screen or perform other actions
      }
    } catch (error) {
      console.error('Error handling image:', error);
    }
  }

  return (
    <Layout
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        marginTop: 26,
        backgroundColor: 'white',
      }}
    >
      <TextInput
        value={content}
        onValueChange={setContent}
        placeholder="Content"
      />
      <TextInput value={title} onValueChange={setTitle} placeholder="Title" />
      <TextInput value={topic} onValueChange={setTopic} placeholder="Topic" />
      <TextInput
        inputRef={tagRef}
        value={currentTag}
        onValueChange={setCurrentTag}
        onSubmitValue={() => {
          setTags((prevTags) => [...prevTags, currentTag]);
          tagRef.current?.clear();
        }}
        placeholder="Tags"
      />

      <CustomButton
        title="Pick Image"
        onPress={async () => handleImagePick()}
      />

      <CustomButton title="Publish" onPress={handleAddArticle} />
      {tags.length && (
        <Layout style={{ flex: 1 }}>
          <FlatList
            horizontal={true}
            data={tags}
            keyExtractor={(_, index) => `${index}`}
            renderItem={(listItem) => (
              <Pressable
                onPress={() => {
                  setTags(tags.filter((t) => t !== listItem.item));
                }}
              >
                <Layout
                  level="3"
                  style={{
                    borderRadius: 25,
                    margin: 5,
                    display: 'flex',
                    flexDirection: 'row',
                    gap: 5,
                    alignItems: 'center',
                  }}
                >
                  <FontAwesome name="hashtag" size={24} color="black" />
                  <Text style={{ color: 'black', fontWeight: 'bold' }}>
                    {listItem.item}
                  </Text>
                </Layout>
              </Pressable>
            )}
          />
        </Layout>
      )}

      <Layout>
        {selectedImageData && (
          <Image
            source={{ uri: selectedImageData?.uri }}
            style={{ width: 200, height: 200 }}
          />
        )}
      </Layout>
    </Layout>
  );
}
