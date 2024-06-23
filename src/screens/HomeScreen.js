import React, {useEffect, useState} from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import {
  List,
  ActivityIndicator,
  Avatar,
  Text,
  TextInput,
  Button,
  useTheme,
  Searchbar,
  Divider,
} from 'react-native-paper';
import axios from 'axios';
import Categories from '../components/Categories';
import Recipes from '../components/Recipes';

export default function HomeScreen({navigation}) {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const {colors} = useTheme();
  const [activeCategory, setActiveCategory] = useState('Beef');
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchCategories();
    fetchRecipes(activeCategory);
  }, [activeCategory]);

  const fetchCategories = () => {
    axios
      .get('https://www.themealdb.com/api/json/v1/1/categories.php')
      .then(response => {
        if (response.data.categories) {
          setCategories(response.data.categories);
        }
      })
      .catch(error => {
        console.error('Error fetching categories:', error);
      });
  };

  const fetchRecipes = async (categories = 'Beef') => {
    setLoading(true);
    axios
      .get(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${categories}`)
      .then(response => {
        if (response.data.meals) {
          setRecipes(response.data.meals.slice(0, 5));
        }
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching recipes:', error);
        setLoading(false);
      });
  };
  const navigateToCategories = () => {
    navigation.navigate('Categories');
  };
  const handleSearch = () => {
    if (search.trim()) {
      setLoading(true);
      axios
        .get(`https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`)
        .then(response => {
          if (response.data.meals) {
            setRecipes(response.data.meals);
          } else {
            setRecipes([]);
          }
          setLoading(false);
        })
        .catch(error => {
          console.error('Error fetching recipes:', error);
          setLoading(false);
        });
    } else {
      fetchRecipes(activeCategory);
    }
  };

  return (
    <View style={styles.container}>
      <View>
        <View style={styles.header}>
          <View style={styles.leftContainer}>
            <Avatar.Icon
              size={54}
              icon="account"
              style={styles.avatar}
              theme={{colors: {primary: '#84251E'}}}
            />
            <Text style={styles.greeting}>Hello, User</Text>
          </View>
          <View style={styles.rightContainer}>
            <Searchbar
              placeholder="Search"
              onChangeText={setSearch}
              value={search}
              onSubmitEditing={handleSearch}
              theme={{colors: {primary: '#84251E'}}}
            />
          </View>
        </View>
        <View>
          <Text variant="headlineLarge">Make your own food,</Text>
          <TouchableOpacity
            style={styles.button}
            onPress={navigateToCategories}>
            <Text
              style={[styles.linkText, {color: colors.tertiary}]}
              variant="headlineLarge">
              see more Categories here
            </Text>
          </TouchableOpacity>
        </View>
        <View>
          <Categories
            categories={categories}
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
          />
        </View>
        <View>
          {loading ? (
            <ActivityIndicator size="large" color="#84251E" />
          ) : (
            <Recipes
              navigation={navigation}
              recipes={recipes}
              categories={categories}></Recipes>
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FFF',
  },
  header: {
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  leftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 20,
  },
  rightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    marginRight: 25,
  },
  greeting: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  searchInput: {
    flex: 1,
    marginRight: 10,
  },
  searchButton: {
    height: 56, // To match the TextInput height
    justifyContent: 'center',
  },
  categoryContainer: {
    marginBottom: 20,
  },
  categoryTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 20,
  },
  linkText: {
    textDecorationLine: 'underline',
  },
});
