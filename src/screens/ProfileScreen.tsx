import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export function ProfileScreen() {
  const navigation = useNavigation();

 // Handle Log Out action
 const handleLogout = () => {
  
  Alert.alert("Logged out", "You have successfully logged out.");
  
  navigation.navigate('LoginScreen');
};

  return (
    <ScrollView style={styles.scrollView} contentContainerStyle={styles.container}>
      {/* User Info Section */}
      <View style={styles.userInfoContainer}>
        <Image 
          source={{ uri: 'https://i.pinimg.com/564x/47/da/d2/47dad2bc350f4fbebce3eeb3ea2761ef.jpg' }} 
          style={styles.avatar} 
        />
        <Text style={styles.fullName}>John Doe</Text>
        <Text style={styles.email}>john.doe@example.com</Text>
      </View>

      {/* Donated and Adopted Cards */}
      <View style={styles.cardRow}>
        <View style={styles.card}>
          <Ionicons name="heart" size={30} color="#16A99F" />
          <Text style={styles.cardText}>Total Donated</Text>
          <Text style={styles.cardValue}>10,000,000 VND</Text>
        </View>

        <View style={styles.card}>
          <FontAwesome name="paw" size={30} color="#16A99F" />
          <Text style={styles.cardText}>Adopted</Text>
          <Text style={styles.cardValue}>5 pets</Text>
        </View>
      </View>

      {/* Account Security Section */}
      <View style={styles.securityCard}>
        <Text style={styles.sectionTitle}>Account Security</Text>

        <TouchableOpacity 
          style={styles.securityItem}
          onPress={() => navigation.navigate('ProfileInfoScreen')}
        >
          <Text style={styles.securityText}>Profile Info</Text>
          <FontAwesome name="chevron-right" size={24} color="#16A99F" />
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.securityItem}
          onPress={() => navigation.navigate('ForgotPasswordScreen')}
        >
          <Text style={styles.securityText}>Forgot Password</Text>
          <FontAwesome name="chevron-right" size={24} color="#16A99F" />
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.securityItem}
          onPress={() => navigation.navigate('ResetPassword')}
        >
          <Text style={styles.securityText}>Reset Password</Text>
          <FontAwesome name="chevron-right" size={24} color="#16A99F" />
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.securityItem}
          onPress={() => navigation.navigate('NumberVerificationWithNumber')}
        >
          <Text style={styles.securityText}>Phone Verification</Text>
          <FontAwesome name="chevron-right" size={24} color="#16A99F" />
        </TouchableOpacity>
      </View>

      {/* User Preferences Section */}
      <View style={styles.securityCard}>
        <Text style={styles.sectionTitle}>User Preferences</Text>

        <TouchableOpacity 
          style={styles.securityItem}
          onPress={() => navigation.navigate('Pet Preferences')}
        >
          <Text style={styles.securityText}>Pet Preferences</Text>
          <FontAwesome name="chevron-right" size={24} color="#16A99F" />
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.securityItem}
          onPress={() => navigation.navigate('Location')}
        >
          <Text style={styles.securityText}>Location and Accessibility</Text>
          <FontAwesome name="chevron-right" size={24} color="#16A99F" />
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.securityItem}
          onPress={() => navigation.navigate('Volunteering')}
        >
          <Text style={styles.securityText}>Volunteering</Text>
          <FontAwesome name="chevron-right" size={24} color="#16A99F" />
        </TouchableOpacity>
      </View>

      {/* Donation */}
      <View style={styles.securityCard}>
        <Text style={styles.sectionTitle}>Donation</Text>

        <TouchableOpacity 
          style={styles.securityItem}
          onPress={() => navigation.navigate('UPISetting')}
        >
          <Text style={styles.securityText}>UPI Settings</Text>
          <FontAwesome name="chevron-right" size={24} color="#16A99F" />
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.securityItem}
          onPress={() => navigation.navigate('DonatedHistory')}
        >
          <Text style={styles.securityText}>Donation history</Text>
          <FontAwesome name="chevron-right" size={24} color="#16A99F" />
        </TouchableOpacity>

      </View>


      {/* Log Out Button */}
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>Log Out</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,  // Use flex: 1 for ScrollView to take full space
    backgroundColor: '#f5f5f5',
  },
  container: {
    padding: 20,
    paddingBottom: 100,  // Added bottom padding to avoid content being cut off
  },
  userInfoContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  fullName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
  },
  email: {
    fontSize: 16,
    color: '#666',
  },
  cardRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  card: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    marginHorizontal: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  cardText: {
    fontSize: 16,
    color: '#333',
    marginTop: 10,
  },
  cardValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#16A99F',
    marginTop: 5,
  },
  securityCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  securityItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 15,
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
  },
  securityText: {
    fontSize: 16,
    color: '#333',
  },
  logoutButton: {
    backgroundColor: '#16A99F',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    marginTop: 20,
  },
  logoutButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
