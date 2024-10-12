import {
  FlatList,
  Image,
  Modal,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import React, { useCallback, useMemo, useState } from "react";

const DonatedHistory: React.FC = () => {
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null);

  const donations = [
    {
      id: "1",
      name: "Furry Friends Foundation",
      amount: "₹500",
      date: "10:25am, 5th June 24",
      status: "Success",
      image: require("../assets/user-donate.png"),
    },
    {
      id: "2",
      name: "Happy Tails Haven",
      amount: "₹10",
      date: "11:25am, 12th May 24",
      status: "Success",
      image: require("../assets/user-donate.png"),
    },
    {
      id: "3",
      name: "Rescue Paws Initiative",
      amount: "₹550",
      date: "12:15pm, 11th Feb 22",
      status: "Success",
      image: require("../assets/user-donate.png"),
    },
    {
      id: "4",
      name: "Paws for a Cause",
      amount: "Failed",
      date: "12:15pm, 11th Feb 22",
      status: "Failed",
      image: require("../assets/user-donate.png"),
    },
  ];

  const filteredDonations = useMemo(() => {
    let result = [...donations];
    switch (selectedFilter) {
      case "Price - high to low":
        return result.sort(
          (a, b) =>
            parseFloat(b.amount.replace("₹", "")) -
            parseFloat(a.amount.replace("₹", ""))
        );
      case "Price - low to high":
        return result.sort(
          (a, b) =>
            parseFloat(a.amount.replace("₹", "")) -
            parseFloat(b.amount.replace("₹", ""))
        );
      case "Date - Last 6 months":
        // Simplified date filtering (you may need to adjust this based on your date format)
        return result.filter(
          item =>
            new Date(item.date) >
            new Date(Date.now() - 6 * 30 * 24 * 60 * 60 * 1000)
        );
      case "Date - Last 1 year":
        return result.filter(
          item =>
            new Date(item.date) >
            new Date(Date.now() - 365 * 24 * 60 * 60 * 1000)
        );
      case "Transaction - Failed":
        return result.filter(item => item.status === "Failed");
      default:
        return result;
    }
  }, [selectedFilter]);

  const toggleFilterModal = useCallback(() => {
    setIsFilterVisible(!isFilterVisible);
  }, [isFilterVisible]);

  const applyFilter = useCallback((filter: string) => {
    setSelectedFilter(filter);
    setIsFilterVisible(false);
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <View style={styles.container}>
        <View style={styles.navbar}>
          <TouchableOpacity style={styles.backButton}>
            <Ionicons name="chevron-back" size={24} color="#000" />
          </TouchableOpacity>
          <Text style={styles.navbarTitle}>Donated History</Text>
          <TouchableOpacity
            style={styles.filterButton}
            onPress={toggleFilterModal}
          >
            <Ionicons name="filter" size={24} color="#000" />
          </TouchableOpacity>
        </View>
        <FlatList
          data={filteredDonations}
          renderItem={({ item }) => (
            <View style={styles.donationItem}>
              <Image source={item.image} style={styles.donationImage} />
              <View style={styles.detailsContainer}>
                <Text style={styles.donationName}>{item.name}</Text>
                {item.status === "Success" ? (
                  <View style={styles.successContainer}>
                    <MaterialIcons
                      name="check-circle"
                      size={14}
                      color="#16A99F"
                    />
                    <Text style={styles.donationDate}>{item.date}</Text>
                  </View>
                ) : (
                  <View style={styles.failedContainer}>
                    <MaterialIcons name="cancel" size={14} color="red" />
                    <Text style={styles.failedMessage}>
                      UPI payment failed.
                    </Text>
                  </View>
                )}
              </View>
              {item.status === "Success" ? (
                <Text style={styles.donationAmount}>{item.amount}</Text>
              ) : (
                <Text style={styles.failedStatus}>{item.status}</Text>
              )}
              <TouchableOpacity>
                <Ionicons name="chevron-forward" size={14} color="#000" />
              </TouchableOpacity>
            </View>
          )}
          keyExtractor={item => item.id}
        />
      </View>
      <Modal
        visible={isFilterVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={toggleFilterModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Sort by</Text>
            {[
              "Price - high to low",
              "Price - low to high",
              "Date - Last 6 months",
              "Date - Last 1 year",
              "Transaction - Failed",
            ].map(option => (
              <TouchableOpacity
                key={option}
                style={styles.filterOption}
                onPress={() => applyFilter(option)}
              >
                <Text style={styles.filterOptionText}>{option}</Text>
              </TouchableOpacity>
            ))}
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={toggleFilterModal}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },
  container: {
    flex: 1,
    paddingHorizontal: 25,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  navbar: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  backButton: {
    padding: 0,
  },
  navbarTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#000",
    marginLeft: 10,
    flex: 1,
  },
  filterButton: {
    padding: 0,
  },
  donationItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 5,
    justifyContent: "space-between",
  },
  donationImage: {
    width: 51,
    height: 51,
    borderRadius: 20,
    marginRight: 10,
  },
  detailsContainer: {
    flex: 1,
  },
  donationName: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 4,
  },
  donationDate: {
    fontSize: 12,
    fontWeight: "400",
    color: "#888",
  },
  donationAmount: {
    fontSize: 14,
    color: "#000",
    marginLeft: 10,
    fontWeight: "600",
  },
  failedStatus: {
    fontSize: 14,
    color: "red",
    fontWeight: "600",
  },
  failedMessage: {
    fontSize: 12,
    fontWeight: "400",
    color: "red",
  },
  successContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  failedContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 15,
  },
  filterOption: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  filterOptionText: {
    fontSize: 16,
  },
  cancelButton: {
    marginTop: 20,
    alignItems: "center",
  },
  cancelButtonText: {
    fontSize: 16,
    color: "red",
    fontWeight: "600",
  },
});

export default DonatedHistory;
