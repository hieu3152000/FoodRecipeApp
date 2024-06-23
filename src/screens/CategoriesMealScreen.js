// CategoryMealsScreen.js

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

const CategoryMealsScreen = ({route}) => {
  const {categoryId, categoryName} = route.params; // Receive categoryId and categoryName from navigation

  const navigation = useNavigation();
  const [meals, setMeals] = useState([]);

  useEffect(() => {
    fetchMeals();
  }, []);

  const fetchMeals = async () => {
    try {
      // Replace with your actual API endpoint to fetch meals by categoryId
      const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoryName}`,
      );
      const data = await response.json();
      if (data.meals) {
        setMeals(data.meals);
      }
    } catch (error) {
      console.error('Error fetching meals:', error);
    }
  };

  const handleMealPress = (mealId, mealName) => {
    navigation.navigate('RecipeDetails', {
      recipeId: mealId,
      recipeName: mealName,
    });
  };

  const renderItem = ({item}) => (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() => handleMealPress(item.idMeal, item.strMeal)}>
      <Image source={{uri: item.strMealThumb}} style={styles.itemImage} />
      <Text style={styles.itemText}>{item.strMeal}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>{categoryName} Meals</Text>
      <FlatList
        data={meals}
        renderItem={renderItem}
        keyExtractor={item => item.idMeal}
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
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
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
    fontSize: 18,
    textAlign: 'center',
  },
});

export default CategoryMealsScreen;
