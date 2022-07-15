import { Image, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';

const CardImages = ({image}) => {

	 const navigation = useNavigation();

  return (
	<TouchableOpacity style={styles.container} onPress={() => navigation.navigate("ImageScreen", { image })} >
		<Image 
			source={{
				uri: image.src.portrait
				    ?image.src.portrait
					: "https://cdn.iconscout.com/icon/free/png-256/no-image-1771002-1505134.png"			
				
			}}	
			style={{height: 178, width: "100%"}}	
		/>
	</TouchableOpacity>
  )
}

const styles = StyleSheet.create({
	container: {
		display: 'flex',
		width: '48%',
		justifyContent: 'space-between',
		alignItems: 'center',
		margin: 6,
		backgroundColor: '#2c292c',
		borderWidth: 0,
		borderRadius: 6,
	}
})

export default CardImages