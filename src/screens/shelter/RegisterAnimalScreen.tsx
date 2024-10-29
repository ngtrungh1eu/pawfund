import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView, Button, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { Picker } from '@react-native-picker/picker';

export function RegisterAnimalScreen() {
  const [animal, setAnimal] = useState({
    name: '',
    species: 'Dog', // Default selection
    breed: '',
    age: '',
    gender: '',
    size: '',
    color: '',
    description: '',
    medicalHistory: '',
    behavior: '',
    adoptionStatus: 'Available', // Static value for display only
    images: [],
  });

  const handleInputChange = (key: string, value: string) => {
    setAnimal({
      ...animal,
      [key]: value,
    });
  };

  const handleImageUpload = () => {
    const options = {
      mediaType: 'photo',
      quality: 1,
    };

    launchImageLibrary(options, (response) => {
      if (!response.didCancel && !response.errorCode && response.assets) {
        setAnimal({
          ...animal,
          images: [...animal.images, response.assets[0].uri], 
        });
      }
    });
  };

  const handleSubmit = () => {
    console.log('Animal data:', animal);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Register a New Animal</Text>

      {/* Animal Name */}
      <TextInput
        style={styles.input}
        placeholder="Animal Name"
        value={animal.name}
        onChangeText={(value) => handleInputChange('name', value)}
      />

<View style={styles.row}>
  {/* Species Dropdown */}
  <View style={[styles.pickerContainer, styles.halfInput]}>
    <Picker
      selectedValue={animal.species}
      style={styles.picker}
      onValueChange={(itemValue) => handleInputChange('species', itemValue)}
    >
      <Picker.Item label="Dog" value="Dog" />
      <Picker.Item label="Cat" value="Cat" />
      <Picker.Item label="Bird" value="Bird" />
      <Picker.Item label="Other" value="Other" />
    </Picker>
  </View>

  {/* Breed */}
  <TextInput
    style={[styles.input, styles.halfInput]} // half width style
    placeholder="Breed"
    value={animal.breed}
    onChangeText={(value) => handleInputChange('breed', value)}
  />
</View>


    
      <View style={styles.row}>
        <TextInput
          style={[styles.input, styles.halfInput]} 
          placeholder="Age"
          value={animal.age}
          keyboardType="numeric"
          onChangeText={(value) => handleInputChange('age', value)}
        />
        <TextInput
          style={[styles.input, styles.halfInput]} 
          placeholder="Gender"
          value={animal.gender}
          onChangeText={(value) => handleInputChange('gender', value)}
        />
      </View>

   
      {/* Size */}
      <TextInput
        style={styles.input}
        placeholder="Size (e.g., Small, Medium, Large)"
        value={animal.size}
        onChangeText={(value) => handleInputChange('size', value)}
      />

      {/* Color */}
      <TextInput
        style={styles.input}
        placeholder="Color"
        value={animal.color}
        onChangeText={(value) => handleInputChange('color', value)}
      />

      {/* Description */}
      <TextInput
        style={styles.input}
        placeholder="Description"
        value={animal.description}
        onChangeText={(value) => handleInputChange('description', value)}
      />

      {/* Medical History */}
      <TextInput
        style={styles.input}
        placeholder="Medical History"
        value={animal.medicalHistory}
        onChangeText={(value) => handleInputChange('medicalHistory', value)}
      />

      {/* Behavior */}
      <TextInput
        style={styles.input}
        placeholder="Behavior (e.g., Good with children)"
        value={animal.behavior}
        onChangeText={(value) => handleInputChange('behavior', value)}
      />

      {/* Display Adoption Status */}
      <View style={styles.statusContainer}>
        <Text style={styles.label}>Status: {animal.adoptionStatus}</Text>
      </View>

      {/* Image Upload */}
      <TouchableOpacity style={styles.button} onPress={handleImageUpload}>
        <Text style={styles.buttonText}>Upload Images</Text>
      </TouchableOpacity>

      {/* Show uploaded images */}
      {animal.images.length > 0 && (
        <View style={styles.imagePreviewContainer}>
          {animal.images.map((image, index) => (
            <Image key={index} source={{ uri: image }} style={styles.imagePreview} />
          ))}
        </View>
      )}

      {/* Submit Button */}
      <Button title="Register Animal" onPress={handleSubmit} color="#16A99F" />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#16A99F1A', 
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#16A99F',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#16A99F',
  },
  pickerContainer: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#16A99F',
    borderRadius: 10,
    marginBottom: 10,
  },
  picker: {
    height: 50,
    width: '100%',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  halfInput: {
    flex: 0.48,
  },
  button: {
    backgroundColor: '#16A99F',
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  statusContainer: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#16A99F',
  },
  label: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#555',
  },
  statusText: {
    fontSize: 16,
    color: '#333',
    marginTop: 5,
  },
  imagePreviewContainer: {
    marginVertical: 10,
  },
  imagePreview: {
    width: 100,
    height: 100,
    marginBottom: 10,
    borderRadius: 10,
  },
});
