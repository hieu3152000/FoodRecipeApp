import React, {useEffect, useState} from 'react';
import {View, Text, FlatList, StyleSheet, Image} from 'react-native';
import {ActivityIndicator, Icon} from 'react-native-paper';
import {useRoute} from '@react-navigation/native';
import axios from 'axios';

export default function RecipeDetails() {
  const route = useRoute();
  const {recipeId} = route.params;
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipeId}`)
      .then(response => {
        setRecipe(response.data.meals[0]);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching recipe details:', error);
        setLoading(false);
      });
  }, [recipeId]);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#84251E" />
      </View>
    );
  }

  if (!recipe) {
    return (
      <View style={styles.container}>
        <Text>Recipe not found.</Text>
      </View>
    );
  }

  const ingredients = Object.keys(recipe)
    .filter(key => key.startsWith('strIngredient') && recipe[key])
    .map(key => ({
      ingredient: recipe[key],
      measure: recipe[`strMeasure${key.slice(13)}`],
    }));

  const renderHeader = () => (
    <View>
      <Image source={{uri: recipe.strMealThumb}} style={styles.image} />
      <Text style={styles.title}>{recipe.strMeal}</Text>
      <Text style={styles.intrusction}>Intrusction:</Text>

      <Text style={styles.description}>{recipe.strInstructions}</Text>
      <Text style={styles.subTitle}>Ingredients:</Text>
    </View>
  );

  return (
    <FlatList
      style={styles.container}
      ListHeaderComponent={renderHeader}
      data={ingredients}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({item}) => (
        <Text style={styles.item}>
          <Icon source="arrow-right-bold" size={20} color="#84251E" />
          <Text style={styles.boldText}>{item.measure}</Text> {item.ingredient}
        </Text>
      )}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FFF',
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#84251E',
  },
  description: {
    fontSize: 16,
    marginBottom: 20,
  },
  subTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    color: '#84251E',
  },
  item: {
    fontSize: 16,
    alignContent: 'center',
    paddingBottom: 20,
  },
  dot: {
    fontSize: 30,
    fontWeight: 'bold',
    marginRight: 5,
    color: '#84251E',
  },
  boldText: {
    fontWeight: 'bold',
  },
  intrusction: {
    color: '#84251E',

    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});
