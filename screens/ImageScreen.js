import { View, Image, StyleSheet, Text, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";
import { Avatar, Button } from "@rneui/base";
import * as WebBrowser from "expo-web-browser";
import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';

import ImagesList from "../components/ImagesList";
import { getImages } from "../api/pexel";

const ImageScreen = ({ route }) => {
  const { image } = route.params;
  const [photos, setPhotos] = useState([]);
  //   const [searchTerm, setSearchTerm] = useState('');

  const loadImages = async () => {
    const res = await getImages();
    // console.log(res.headers);
    setPhotos(res.data.photos);
  };

  useEffect(() => {
    loadImages();
  }, []);

  const handlePress = async () => {
    await WebBrowser.openBrowserAsync(image.photographer_url);
  };
  
  const downloadFile = async () =>{
	try {
		  let fileUri = FileSystem.documentDirectory + image.id + '.jpeg'
	  	  const {uri} = await FileSystem.downloadAsync(image.src.large2x, fileUri);
		   saveFile(uri)
	} catch (error) {
		console.error(error);
		alert(error.message)
	}
	
  };

  const saveFile = async (fileUri) =>{
	const {status} = await MediaLibrary.requestPermissionsAsync()
	 if(status === 'granted'){
		const asset = await MediaLibrary.createAssetAsync(fileUri)	
		await MediaLibrary.createAlbumAsync('Download', asset, false )
	 }

  }
  
  const handleDownload = async () =>{
	downloadFile();
  };

  return (
    <View style={styles.headerPhotographer}>
      <Image source={{ uri: image.src.large2x, height: 280 }} />
      <View
        style={{
          display: "flex",
          paddingVertical: 18,
          justifyContent: "space-between",
          flexDirection: "row",
          alignItems: "center",
          width: "100%",
        }}
      >
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Avatar
            title={image.photographer
              .split(" ")
              .map((string) => string[0])
              .join("")
              .toUpperCase()}
            containerStyle={{ backgroundColor: "red" }}
            rounded
          />
          <TouchableOpacity onPress={handlePress}>
            <Text style={styles.textPhotographer}>{image.photographer}</Text>
          </TouchableOpacity>
        </View>
        <Button
          title="DOWNLOAD!"
          buttonStyle={{ backgroundColor: "#229783" }}
          onPress={() => handleDownload()}
        />
      </View>
      <View>
        <ImagesList photos={photos} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerPhotographer: {
    backgroundColor: "#0d0d0d",
    flex: 1,
    flexDirection: "column",
    padding: 10,
  },

  textPhotographer: {
    color: "#ffffff",
    fontWeight: "bold",
    marginStart: 6,
    fontSize: 18,
  },
});

export default ImageScreen;
