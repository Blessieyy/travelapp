import React from 'react';
import { View, FlatList, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome'; 

const navItems = [
  { name: "Places", route: "places", icon: "map-marker" },
  { name: "Map", route: "map", icon: "map" },
  { name: "Search", route: "location", icon: "search" },
  { name: "Profile", route: "profile", icon: "user" },
];

const BottomNav = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.bottomNav}>
      <FlatList
        data={navItems}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.navigate(item.route)} style={styles.navItem}>
            <Icon name={item.icon} style={styles.icons} />
            <Text style={styles.bottomNavItem}>{item.name}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.name}
        horizontal={true}
        contentContainerStyle={styles.bottomNavContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  bottomNav: { height: 50, backgroundColor: "#f8f8f8", boxShadow: "0 0 5px #ccc", borderRadius: 10 ,  padding: 5,  alignItems: "center",
 justifyContent: "center" },

  bottomNavContainer: { alignItems: "center" },
  bottomNavItem: {
    display: "flex",
    marginHorizontal: 10,
    padding: 10,
    marginVertical: -6,
    fontSize: 12,
    color: "#333",
 
  },
  navItem: {
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 10,
  },
  icons: {
    fontSize: 20,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 10,
  },
});

export default BottomNav;