// CategoriesScreen.js

import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const CategoriesScreen = () => {
  const navigation = useNavigation();
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      // Replace with your actual API endpoint to fetch categories
      const response = await fetch(
        'https://www.themealdb.com/api/json/v1/1/categories.php',
      );
      const data = await response.json();
      if (data.categories) {
        setCategories(data.categories);
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleCategoryPress = (categoryId, categoryName) => {
    navigation.navigate('CategoryMeals', {categoryId, categoryName});
    console.log(categoryId, categoryName);
  };

  const renderItem = ({item}) => (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() => handleCategoryPress(item.idCategory, item.strCategory)}>
      <Image source={{uri: item.strCategoryThumb}} style={styles.itemImage} />
      <Text style={styles.itemText}>{item.strCategory}</Text>
      <Text style={styles.itemDescription}>{item.strCategoryDescription}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={categories}
        renderItem={renderItem}
        keyExtractor={item => item.idCategory}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
  },
  listContainer: {
    paddingHorizontal: 10,
  },
  itemContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  itemImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  itemText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  itemDescription: {
    textAlign: 'center',
    marginTop: 10,
  },
});

export default CategoriesScreen;
