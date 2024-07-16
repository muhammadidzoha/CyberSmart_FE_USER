import { Text, View, StyleSheet } from "@react-pdf/renderer";
import React from "react";

const styles = StyleSheet.create({
  heroContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  heroTitle: {
    marginLeft: "20px",
    textTransform: "uppercase",
  },
  heroContent: {
    fontSize: "10px",
    marginTop: "5px",
  },
});

const PDFHero = () => {
  return (
    <View style={styles.heroContainer}>
      <Text style={styles.heroTitle}>Surat Pengantar KTP</Text>
      <Text style={styles.heroContent}>Nomor : ...............</Text>
    </View>
  );
};

export default PDFHero;
