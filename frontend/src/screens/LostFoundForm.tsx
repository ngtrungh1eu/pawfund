import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, ScrollView, Button } from "react-native";
import { Checkbox } from "react-native-paper";
import DateTimePicker from "@react-native-community/datetimepicker";
import * as ImagePicker from "expo-image-picker";
import { Picker } from "@react-native-picker/picker";

export default function LostFoundForm({ navigation }: any) {
  const [isFound, setIsFound] = useState(false);
  const [petType, setPetType] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [location, setLocation] = useState("");
  const [contactInfo, setContactInfo] = useState("");
  const [photo, setPhoto] = useState(null);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      quality: 1,
    });
    if (!result.canceled) {
      setPhoto(result.uri);
    }
  };

  const onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(false);
    setDate(currentDate);
  };

  const formatDate = (date) => {
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#fff", padding: 16 }}>
      <Text style={styles.title}>Lost & Found Form</Text>

      {/* Checkbox Cards */}
      <View style={styles.checkboxContainer}>
        <View style={styles.card}>
          <Checkbox status={isFound ? "unchecked" : "checked"} onPress={() => setIsFound(false)} />
          <Text>Lost</Text>
        </View>
        <View style={styles.card}>
          <Checkbox status={isFound ? "checked" : "unchecked"} onPress={() => setIsFound(true)} />
          <Text>Found</Text>
        </View>
      </View>

      {/* Select Pet Type */}
      <Text style={styles.label}>Type of Pet</Text>
      <View style={styles.pickerContainer}>
        <Picker selectedValue={petType} onValueChange={(itemValue) => setPetType(itemValue)}>
          <Picker.Item label="Dog" value="dog" />
          <Picker.Item label="Cat" value="cat" />
          <Picker.Item label="Other" value="other" />
        </Picker>
      </View>

      {/* Description */}
      <Text style={styles.label}>Description</Text>
      <TextInput
        style={styles.input}
        placeholder="Describe the pet"
        value={description}
        onChangeText={setDescription}
      />

      {/* Date & Time */}
      <Text style={styles.label}>Date & Time</Text>
      <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.input}>
        <Text>{formatDate(date)}</Text>
      </TouchableOpacity>
      {showDatePicker && <DateTimePicker value={date} mode="date" display="default" onChange={onDateChange} />}

      {/* Location */}
      <Text style={styles.label}>Location</Text>
      <TextInput style={styles.input} placeholder="Enter location" value={location} onChangeText={setLocation} />

      {/* Contact Info */}
      <Text style={styles.label}>Contact Info</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter contact information"
        value={contactInfo}
        onChangeText={setContactInfo}
      />

      {/* Upload Photo */}
      <Text style={styles.label}>Upload Picture</Text>
      <TouchableOpacity onPress={pickImage} style={styles.uploadButton}>
        <Text style={styles.plus}>+</Text>
      </TouchableOpacity>
      {photo && <Image source={{ uri: photo }} style={styles.image} />}

      {/* Submit Button */}
      <TouchableOpacity style={styles.submitButton}>
        <Text style={styles.submitButtonText}>Submit</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  checkboxContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 16,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    marginBottom: 16,
  },
  uploadButton: {
    width: 100,
    height: 100,
    borderRadius: 8,
    backgroundColor: "#16A99F1A",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  plus: {
    fontSize: 40,
    color: "#16A99F",
  },
  image: {
    width: 200,
    height: 200,
    marginTop: 16,
    alignSelf: "center",
  },
  submitButton: {
    backgroundColor: "#16A99F",
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: "center",
    position: "absolute",
    bottom: 50,
    left: 16,
    right: 16,
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 16,
  },
});
