import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';
import Animated, {FadeInDown} from 'react-native-reanimated';
import axios from 'axios';

export default function Categories({
  categories,
  activeCategory,
  setActiveCategory,
}) {
  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewContent}>
        {categories.map((cat, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.categoryItem]}
            onPress={() => setActiveCategory(cat.strCategory)}>
            <Image
              source={{uri: cat.strCategoryThumb}}
              style={[
                styles.categoryImage,
                cat.strCategory === activeCategory
                  ? styles.activeCategory
                  : null,
              ]}
            />
            <Text style={styles.categoryText}>{cat.strCategory}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  scrollViewContent: {
    paddingHorizontal: 15,
  },
  categoryItem: {
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingBottom: 10,
    borderRadius: 50,
  },
  categoryImage: {
    width: 65,
    height: 65,
    borderRadius: 50, // For a circular image, adjust based on your design preference
    marginBottom: 10,
    marginTop: 15,
  },
  categoryText: {
    textAlign: 'center',
  },
  activeCategory: {
    borderWidth: 4,
    borderColor: '#84251E',
  },
});
