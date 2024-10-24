import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

export function PetCard({
  name,
  breed,
  image,
}: {
  name: string;
  breed: string;
  image: string;
}) {
  return (
    <View style={styles.card}>
      <Image source={{ uri: image }} style={styles.image} />
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.type}>{breed}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 10,
    backgroundColor: "#fff",
    padding: 10,
    margin: 5,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
  image: {
    width: 100,
    height: 100,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 10,
  },
  type: {
    fontSize: 14,
    color: "gray",
  },
});
