import {
  Image,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import React from "react";

const DonatedTransactionDetails: React.FC = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <View style={styles.container}>
        <View style={styles.navbar}>
          <TouchableOpacity style={styles.backButton}>
            <Ionicons name="chevron-back" size={24} color="#000" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.shareButton}>
            <Ionicons name="share-social" size={18} color="#000" />
          </TouchableOpacity>
        </View>

        {/* View 1: Image and Title */}
        <View style={styles.profileContainer}>
          <Image
            source={require("../assets/user-donate.png")}
            style={styles.profileImage}
          />
          <Text style={styles.headerTitle}>Paws for a Cause</Text>
        </View>

        {/* View 2: Amount and Date with Status Button */}
        <View style={styles.amountDateContainer}>
          <View style={styles.amountContainer}>
            <Text style={styles.amount}>₹500</Text>
            <Text style={styles.date}>10:25am, 5th June 24</Text>
          </View>
          <TouchableOpacity style={styles.statusButton}>
            <Text style={styles.status}>Successful</Text>
          </TouchableOpacity>
        </View>

        {/* View 3: Bank Info */}
        <View style={styles.bankInfo}>
          <View style={styles.bankInfoContainer}>
            <Image
              source={require("../assets/axis_bank_icon.png.png")}
              style={styles.bankIcon}
            />
            <View>
              <Text style={styles.bankName}>Axis Bank</Text>
              <Text style={styles.upiId}>xxxxxx9158 (UPI)</Text>
            </View>
          </View>
          <View style={styles.transactionInfoContainer}>
            <Text style={styles.transactionId}>Transaction ID</Text>
            <Text style={styles.transactionName}>
              hgfehjgreyuerjer454612fefk
            </Text>
          </View>
          <View style={styles.transactionInfoContainer}>
            <Text style={styles.transactionId}>UPI ID</Text>
            <Text style={styles.transactionName}>582246122426+</Text>
          </View>
          <View style={styles.transactionInfoContainer}>
            <Text style={styles.transactionId}>Paid to</Text>
            <Text style={styles.transactionName}>onecard@icici</Text>
          </View>
        </View>
      </View>

      {/* Thank You Container and Contact Support at the bottom */}
      <View style={styles.thankYouContainer}>
        <View style={styles.leftIconContainer}>
          <Image
            source={require("../assets/volunteer_activism.png")}
            style={styles.leftIcon}
          />
        </View>
        <Text style={styles.thankYouText}>
          Thank you for your donation to{" "}
          <Text style={styles.boldText}>Paws for a Cause</Text>. Your support
          helps us care for animals in need.
        </Text>
        <TouchableOpacity style={styles.donateMoreButton}>
          <Text style={styles.donateMoreText}>Donate More</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.contactSupport}>
        <Text style={styles.contactSupportText}>
          need more help? <Text style={styles.textBlue}>Contact Support</Text>
        </Text>
      </TouchableOpacity>
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
    justifyContent: "space-between",
    marginBottom: 26,
  },
  backButton: {
    padding: 0,
  },
  shareButton: {
    padding: 0,
  },
  profileContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingBottom: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  profileImage: {
    width: 53,
    height: 53,
    borderRadius: 25,
    marginRight: 10,
  },
  headerTitle: {
    fontSize: 14,
    fontWeight: "600",
  },
  amountDateContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 22,
    marginTop: 14,
  },
  amountContainer: {
    flex: 1,
  },
  statusButton: {
    backgroundColor: "#16A99F",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 5,
  },
  amount: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 4,
  },
  date: {
    fontSize: 12,
    color: "#999999",
  },
  bankInfo: {
    paddingVertical: 10,
  },
  bankInfoContainer: {
    flexDirection: "row",
    marginBottom: 14,
  },
  bankIcon: {
    width: 33,
    height: 33,
    marginRight: 8,
  },
  bankName: {
    fontSize: 14,
    fontWeight: "400",
    color: "#A1A1A1",
    marginBottom: 2,
  },
  upiId: {
    fontSize: 12,
    fontWeight: "400",
    color: "#000000",
  },
  transactionInfoContainer: {
    flexDirection: "column",
    marginBottom: 14,
  },
  transactionId: {
    fontSize: 14,
    fontWeight: "400",
    color: "#A1A1A1",
  },
  transactionName: {
    fontSize: 12,
    fontWeight: "400",
    color: "#000000",
  },
  paidTo: {
    fontSize: 12,
    color: "#888",
  },
  status: {
    fontSize: 12,
    color: "#fff",
    fontWeight: "400",
    textAlign: "right",
  },
  thankYouContainer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    padding: 21,
    backgroundColor: "#E8F7F6",
    marginBottom: 35,
  },
  thankYouText: {
    fontSize: 14, // Kích thước chữ lớn hơn
    fontWeight: "500",
    color: "#16A99F", // Màu chữ tối hơn
    marginBottom: 10, // Khoảng cách giữa văn bản và nút
  },
  boldText: {
    fontWeight: "700",
  },
  donateMoreButton: {
    backgroundColor: "#16A99F", // Màu nền nút
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 5,
    alignItems: "center",
    width: 100,
  },
  donateMoreText: {
    color: "#fff",
    fontWeight: "400",
    fontSize: 12, // Kích thước chữ lớn hơn
  },
  contactSupport: {
    marginTop: 23,
    alignItems: "center",
  },
  contactSupportText: {
    fontSize: 14,
    fontWeight: "400",
    color: "#000000",
  },
  textBlue: {
    color: "#16A99F",
  },
  leftIconContainer: {
    width: 35,
    height: 35,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10, // Khoảng cách giữa icon và text\
    borderRadius: 9999,
  },
  leftIcon: {
    width: 18,
    height: 18,
  },
});

export default DonatedTransactionDetails;
