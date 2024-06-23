import React from 'react';
import {View, StyleSheet, ScrollView, Pressable} from 'react-native';
import {Card, Button, Text} from 'react-native-paper';

export default function Recipes({recipes, navigation}) {
  const navigateToDetails = recipeId => {
    // Assuming you have a 'RecipeDetails' screen defined in your navigation stack
    navigation.navigate('RecipeDetails', {recipeId});
  };

  return (
    <View style={styles.container}>
      <Text variant="headlineLarge">Meals</Text>
      <ScrollView style={styles.cardsContainer}>
        {recipes.map((recipe, index) => (
          <Pressable
            key={index}
            onPress={() => navigateToDetails(recipe.idMeal)}>
            <Card style={styles.card}>
              <Card.Cover source={{uri: recipe.strMealThumb}} />
              <Card.Title title={recipe.strMeal} />
              <Card.Actions>
                <Button
                  onPress={() => navigateToDetails(recipe.idMeal)}
                  textColor="#84251E">
                  View Details
                </Button>
              </Card.Actions>
            </Card>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    marginBottom: 800,
  },
  cardsContainer: {
    marginTop: 20,
    marginBottom: 20,
  },
  card: {
    marginBottom: 16,
  },
});
