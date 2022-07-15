import { View, StyleSheet, ImageComponent, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { Input, Button } from "@rneui/base";

import { getImages } from "../api/pexel";
import ImagesList from "../components/ImagesList";

const HomeScreen = ({ openSearch }) => {
  const [photos, setPhotos] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  
  const loadImages = async (searchTerm) => {
    const res = await getImages(searchTerm);
    console.log(res.headers);
    setPhotos(res.data.photos);
  };

  useEffect(() => {
    loadImages();
  }, []);

  const handleSearch = async () =>{
      await loadImages(searchTerm);
  }


  
// headerTitleStyle
  return (
    <>
	{openSearch && (
		<View style={styles.searchSection}>
			<Input 
			  leftIcon={{ type: "feather", name: "search", color:"#FFFFFF"}}
			  placeholder="Enter Search"
			  style={styles.input}
			  leftIconContainerStyle={styles.searchLeftIcon}
			  inputContainerStyle={styles.inputSearch}
			  onChangeText={(value) => setSearchTerm(value)}
			/>
			<Button title="Search" buttonStyle={styles.searchButton} onPress={() => handleSearch()} />						
		</View>
	)}
      <View style={styles.container}>
        <Text style={styles.totalResults}>? Result</Text>
        <ImagesList photos={photos} />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0d0d0d",
    alignItems: "center",
    justifyContent: "center",
  },

  totalResults: {
    color: "#8F8F8F",
    textAlign: "right",
    width: "100%",
    paddingTop: 28,
  },

   searchSection:{
		backgroundColor: "#0d0d0d",
		width: '100%',
		paddingLeft: 10,
		paddingRight: 70,
		flex: 1 / 3,
		flexDirection: 'row',
		alignItems: "center",
   }, 

   searchLeftIcon:{
	paddingStart: 8,
	marginRight: 4,
   },

   inputSearch: {
		backgroundColor: "#2c292c",
		borderBottomWidth: 0,
		borderBottomColor: "#000000",
		color: "#ffffff",	
		paddingHorizontal: 4,
   },  

   searchButton: {
		backgroundColor: "#229783",
		marginBottom: 27,
   },
   
   input: {
	color: "#fff",
	},

});

export default HomeScreen;
