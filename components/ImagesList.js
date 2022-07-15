import React from 'react';
import { View, FlatList } from 'react-native';

import CardImages from './CardImages';


const ImagesList = ({photos}) => {

	const renderItem = ({item}) => <CardImages image={item}/>;

		return (
			<View>
				<FlatList 
					data={photos} 
					renderItem={renderItem} 
					keyExtractor={(item) => item.id}
					numColumns={2}
				/>
				
			</View>
		);
};




export default ImagesList;