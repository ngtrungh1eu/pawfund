import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";

import { Ionicons } from "@expo/vector-icons";
import Slider from "@react-native-community/slider"; // Add this import
import { useNavigation } from "@react-navigation/native";

// Define interfaces for form data
interface FormData {
  name: string;
  email: string;
  password: string;
  interests: {
    adoptingPet: boolean;
    reportingPets: boolean;
    donating: boolean;
    learningPetCare: boolean;
    volunteering: boolean;
  };
  petPreferences: {
    species: string;
    ageRange: string;
    size: string;
  };
  location: string;
  radius: number;
  volunteeringAvailability: {
    weekdays: boolean;
    weekends: boolean;
    evenings: boolean;
  };
  skills: {
    animalTraining: boolean;
    eventOrganizing: boolean;
    fundraising: boolean;
  };
}

// Define props for each component
interface CustomCheckBoxProps {
  title: string;
  checked: boolean;
  onPress: () => void;
}

interface AccountSetupProps {
  formData: FormData;
  updateFormData: (key: string, value: any) => void;
  navigation: any; // Consider using a more specific type from @react-navigation/native
}

interface UserPreferencesProps {
  formData: FormData;
  updateFormData: (key: string, value: any) => void;
}

interface PetPreferencesProps {
  formData: FormData;
  updateFormData: (key: string, value: any) => void;
}

interface LocationAccessibilityProps {
  formData: FormData;
  updateFormData: (key: string, value: any) => void;
}

interface VolunteeringProps {
  formData: FormData;
  updateFormData: (key: string, value: any) => void;
}

const CustomCheckBox: React.FC<CustomCheckBoxProps> = ({
  title,
  checked,
  onPress,
}) => (
  <TouchableOpacity style={styles.checkboxContainer} onPress={onPress}>
    <View style={[styles.checkbox, checked && styles.checkedBox]}>
      {checked && <Ionicons name="checkmark" size={14} color="#fff" />}
    </View>
    <Text style={styles.checkboxLabel}>{title}</Text>
  </TouchableOpacity>
);

const OnboardingScreens: React.FC = () => {
  const navigation = useNavigation();
  const [currentScreen, setCurrentScreen] = useState<number>(0);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    password: "",
    interests: {
      adoptingPet: false,
      reportingPets: false,
      donating: false,
      learningPetCare: false,
      volunteering: false,
    },
    petPreferences: {
      species: "",
      ageRange: "",
      size: "",
    },
    location: "",
    radius: 0,
    volunteeringAvailability: {
      weekdays: false,
      weekends: false,
      evenings: false,
    },
    skills: {
      animalTraining: false,
      eventOrganizing: false,
      fundraising: false,
    },
  });

  const updateFormData = (key: string, value: any) => {
    setFormData(prevData => ({
      ...prevData,
      [key]: value,
    }));
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 0:
        return (
          <AccountSetup
            formData={formData}
            updateFormData={updateFormData}
            navigation={navigation}
          />
        );
      case 1:
        return (
          <UserPreferences
            formData={formData}
            updateFormData={updateFormData}
          />
        );
      case 2:
        return (
          <PetPreferences formData={formData} updateFormData={updateFormData} />
        );
      case 3:
        return (
          <LocationAccessibility
            formData={formData}
            updateFormData={updateFormData}
          />
        );
      case 4:
        return (
          <Volunteering formData={formData} updateFormData={updateFormData} />
        );
      default:
        return (
          <AccountSetup
            formData={formData}
            updateFormData={updateFormData}
            navigation={navigation}
          />
        );
    }
  };

  const nextScreen = () => {
    if (currentScreen < 4) {
      setCurrentScreen(currentScreen + 1);
    }
  };

  const prevScreen = () => {
    if (currentScreen > 0) {
      setCurrentScreen(currentScreen - 1);
    }
  };

  const submitForm = () => {
    navigation.navigate("ProfileSetupComplete" as never);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar backgroundColor="#16A99F" />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 24}
      >
        <View style={styles.progressBar}>
          {[0, 1, 2, 3, 4].map(step => (
            <View
              key={step}
              style={[
                styles.progressStep,
                {
                  backgroundColor:
                    step <= currentScreen ? "#16A99F" : "#E0E0E0",
                },
              ]}
            />
          ))}
        </View>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          {renderScreen()}
        </ScrollView>
        <View style={styles.bottomContainer}>
          {currentScreen > 0 ? (
            <TouchableOpacity style={styles.backButton} onPress={prevScreen}>
              <Text style={styles.backButtonText}>Back</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => navigation.navigate("Login" as never)}
            >
              <Text style={styles.backButtonText}>Back to Sign In</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity
            style={styles.nextButton}
            onPress={currentScreen === 4 ? submitForm : nextScreen}
          >
            <Text style={styles.nextButtonText}>
              {currentScreen === 4 ? "Submit" : "Next"}
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const AccountSetup: React.FC<AccountSetupProps> = ({
  formData,
  updateFormData,
  navigation,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View>
      <Text style={styles.title}>Account Setup</Text>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Name</Text>
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            placeholder="Enter your name"
            value={formData.name}
            onChangeText={text => updateFormData("name", text)}
          />
        </View>

        <Text style={styles.label}>Email</Text>
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            placeholder="Enter your email address"
            value={formData.email}
            onChangeText={text => updateFormData("email", text)}
            keyboardType="email-address"
          />
          <Ionicons
            name="at"
            size={24}
            color="#848484"
            style={styles.inputIcon}
          />
        </View>

        <Text style={styles.label}>Password</Text>
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            placeholder="Create a password"
            value={formData.password}
            onChangeText={text => updateFormData("password", text)}
            secureTextEntry={!showPassword}
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Ionicons
              name={showPassword ? "eye-off" : "eye"}
              size={24}
              color="#848484"
              style={styles.inputIcon}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const UserPreferences: React.FC<UserPreferencesProps> = ({
  formData,
  updateFormData,
}) => {
  const toggleInterest = (interest: string) => {
    updateFormData("interests", {
      ...formData.interests,
      [interest]:
        !formData.interests[interest as keyof typeof formData.interests],
    });
  };

  return (
    <View>
      <Text style={styles.title}>User Preferences</Text>
      <Text style={styles.subtitle}>Interested in animals</Text>
      <Text style={styles.note}>
        Which of the following are you interested in? (Check all that apply)"
      </Text>
      <CustomCheckBox
        title="Adopting a pet"
        checked={formData.interests.adoptingPet}
        onPress={() => toggleInterest("adoptingPet")}
      />
      <CustomCheckBox
        title="Reporting lost or found pets"
        checked={formData.interests.reportingPets}
        onPress={() => toggleInterest("reportingPets")}
      />
      <CustomCheckBox
        title="Donating to animal causes"
        checked={formData.interests.donating}
        onPress={() => toggleInterest("donating")}
      />
      <CustomCheckBox
        title="Learning about pet care"
        checked={formData.interests.learningPetCare}
        onPress={() => toggleInterest("learningPetCare")}
      />
      <CustomCheckBox
        title="Volunteering at shelters"
        checked={formData.interests.volunteering}
        onPress={() => toggleInterest("volunteering")}
      />
    </View>
  );
};

const PetPreferences: React.FC<PetPreferencesProps> = ({
  formData,
  updateFormData,
}) => {
  const updatePetPreference = (key: string, value: string) => {
    updateFormData("petPreferences", {
      ...formData.petPreferences,
      [key]: value,
    });
  };

  return (
    <View>
      <Text style={styles.title}>Pet Preferences</Text>
      <Text style={styles.subtitle}>Preferred Species</Text>
      <Text style={styles.note}>
        What type of pet are you looking to adopt?
      </Text>
      <CustomCheckBox
        title="Dog"
        checked={formData.petPreferences.species === "dog"}
        onPress={() => updatePetPreference("species", "dog")}
      />
      <CustomCheckBox
        title="Cat"
        checked={formData.petPreferences.species === "cat"}
        onPress={() => updatePetPreference("species", "cat")}
      />
      <CustomCheckBox
        title="Other (e.g., rabbit, bird)"
        checked={formData.petPreferences.species === "other"}
        onPress={() => updatePetPreference("species", "other")}
      />

      <Text style={styles.subtitle}>Age Range</Text>
      <Text style={styles.note}>
        What age range of pets are you interested in?
      </Text>
      <CustomCheckBox
        title="Puppy/Kitten"
        checked={formData.petPreferences.ageRange === "puppy-kitten"}
        onPress={() => updatePetPreference("ageRange", "puppy-kitten")}
      />
      <CustomCheckBox
        title="Young"
        checked={formData.petPreferences.ageRange === "young"}
        onPress={() => updatePetPreference("ageRange", "young")}
      />
      <CustomCheckBox
        title="Adult"
        checked={formData.petPreferences.ageRange === "adult"}
        onPress={() => updatePetPreference("ageRange", "adult")}
      />
      <CustomCheckBox
        title="Senior"
        checked={formData.petPreferences.ageRange === "senior"}
        onPress={() => updatePetPreference("ageRange", "senior")}
      />

      <Text style={styles.subtitle}>Size</Text>
      <Text style={styles.note}>
        What size of pet are you looking for? (if applicable)
      </Text>
      <CustomCheckBox
        title="Small"
        checked={formData.petPreferences.size === "small"}
        onPress={() => updatePetPreference("size", "small")}
      />
      <CustomCheckBox
        title="Medium"
        checked={formData.petPreferences.size === "medium"}
        onPress={() => updatePetPreference("size", "medium")}
      />
      <CustomCheckBox
        title="Large"
        checked={formData.petPreferences.size === "large"}
        onPress={() => updatePetPreference("size", "large")}
      />
    </View>
  );
};

const LocationAccessibility: React.FC<LocationAccessibilityProps> = ({
  formData,
  updateFormData,
}) => {
  return (
    <View>
      <Text style={styles.title}>Location and Accessibility</Text>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Location</Text>
        <Text style={styles.note}>Where are you located? (City/ZIP Code)</Text>
        <View style={styles.inputWrapper}>
          <Ionicons
            name="search-outline"
            size={12}
            color="#848484"
            style={styles.inputIcon}
          />
          <TextInput
            style={styles.input}
            placeholder="Search City/Pincode"
            value={formData.location}
            onChangeText={text => updateFormData("location", text)}
          />
        </View>

        <Text style={styles.subtitle}>Radius</Text>
        <Text style={styles.note}>
          How far are you willing to travel to adopt a pet or volunteer?
        </Text>
        <View style={styles.sliderContainer}>
          <Slider
            style={styles.slider}
            minimumValue={0}
            maximumValue={100}
            step={1}
            value={formData.radius}
            onValueChange={value => updateFormData("radius", value)}
            minimumTrackTintColor="#16A99F"
            maximumTrackTintColor="#D9D9D9"
            thumbTintColor="#16A99F"
          />
          <Text style={styles.sliderValue}>{formData.radius} Km</Text>
        </View>
      </View>
    </View>
  );
};

const Volunteering: React.FC<VolunteeringProps> = ({
  formData,
  updateFormData,
}) => {
  const toggleAvailability = (key: string) => {
    updateFormData("volunteeringAvailability", {
      ...formData.volunteeringAvailability,
      [key]:
        !formData.volunteeringAvailability[
          key as keyof typeof formData.volunteeringAvailability
        ],
    });
  };

  const toggleSkill = (key: string) => {
    updateFormData("skills", {
      ...formData.skills,
      [key]: !formData.skills[key as keyof typeof formData.skills],
    });
  };

  return (
    <View>
      <Text style={styles.title}>Volunteering (if interested)</Text>
      <Text style={styles.subtitle}>Availability</Text>
      <Text style={styles.note}>
        When are you available to volunteer? (Check all that apply)
      </Text>
      <CustomCheckBox
        title="Weekdays"
        checked={formData.volunteeringAvailability.weekdays}
        onPress={() => toggleAvailability("weekdays")}
      />
      <CustomCheckBox
        title="Weekends"
        checked={formData.volunteeringAvailability.weekends}
        onPress={() => toggleAvailability("weekends")}
      />
      <CustomCheckBox
        title="Evenings"
        checked={formData.volunteeringAvailability.evenings}
        onPress={() => toggleAvailability("evenings")}
      />

      <Text style={styles.subtitle}>Skills and Interests</Text>
      <Text style={styles.note}>
        Do you have any specific skills or interests that could help? (e.g.,
        animal training, event organizing, fundraising)
      </Text>
      <CustomCheckBox
        title="Animal Training"
        checked={formData.skills.animalTraining}
        onPress={() => toggleSkill("animalTraining")}
      />
      <CustomCheckBox
        title="Event Organizing"
        checked={formData.skills.eventOrganizing}
        onPress={() => toggleSkill("eventOrganizing")}
      />
      <CustomCheckBox
        title="Fundraising"
        checked={formData.skills.fundraising}
        onPress={() => toggleSkill("fundraising")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#16A99F",
  },
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  scrollContent: {
    flexGrow: 1,
    padding: 25,
    paddingTop: 31,
  },
  progressBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 25,
    paddingBottom: 0,
    gap: 6,
  },
  progressStep: {
    width: "18%",
    height: 6,
    borderRadius: 2,
  },
  title: {
    fontSize: 22,
    fontWeight: "500",
    marginBottom: 26,
    color: "#16A99F",
  },
  subtitle: {
    fontSize: 14,
    fontWeight: "500",
    marginBottom: 8,
  },
  note: {
    fontSize: 14,
    fontWeight: "400",
    marginBottom: 15,
    color: "#696969",
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: "500",
    marginBottom: 8,
    color: "#333",
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    height: 41,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    paddingHorizontal: 12,
  },
  input: {
    flex: 1,
    height: 50,
    fontSize: 14,
    fontWeight: "400",
  },
  inputIcon: {
    marginHorizontal: 5,
  },
  bottomContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 25,
    backgroundColor: "white",
  },
  backButton: {
    backgroundColor: "#E8F7F6",
    padding: 14,
    borderRadius: 5,
    width: "48%",
    alignItems: "center",
  },
  backButtonText: {
    color: "#16A99F",
    fontWeight: "600",
    fontSize: 16,
  },
  nextButton: {
    backgroundColor: "#16A99F",
    padding: 14,
    borderRadius: 5,
    width: "48%",
    alignItems: "center",
  },
  nextButtonText: {
    color: "white",
    fontWeight: "600",
    fontSize: 16,
  },
  button: {
    backgroundColor: "#16A99F",
    padding: 14,
    borderRadius: 5,
    minWidth: 100,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "600",
    fontSize: 14,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  checkbox: {
    width: 18,
    height: 18,
    margin: 3,
    borderWidth: 2,
    borderColor: "#000000",
    borderRadius: 4,
    marginRight: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  checkedBox: {
    backgroundColor: "#16A99F",
    borderColor: "#16A99F",
  },
  checkboxLabel: {
    fontSize: 16,
    fontWeight: "400",
    color: "#333",
  },
  sliderContainer: {
    // marginTop: 15,
  },
  slider: {
    width: "100%",
    height: 15,
  },
  sliderValue: {
    textAlign: "left",
    marginTop: 5,
    fontSize: 16,
    fontWeight: "400",
    color: "#333",
  },
  backToSignIn: {
    marginTop: 20,
    alignSelf: "center",
  },
  backToSignInText: {
    color: "#16A99F",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default OnboardingScreens;
