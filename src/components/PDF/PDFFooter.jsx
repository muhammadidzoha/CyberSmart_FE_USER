import React from "react";
import { View, StyleSheet, Text } from "@react-pdf/renderer";
import { format } from "date-fns";
import { id } from "date-fns/locale";

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: "25px",
  },
  textCreate: {
    fontSize: "10px",
    marginTop: "30px",
    textAlign: "right",
  },
  textSignatureContainer: {
    display: "flex",
    flexDirection: "column",
    fontSize: "10px",
    alignItems: "flex-end",
    marginTop: "10px",
    gap: "75px",
  },
});

const PDFFooter = () => {
  const currentDate = new Date();
  const formattedDate = format(currentDate, "dd MMMM yyyy", { locale: id });

  return (
    <View style={styles.container}>
      <Text style={styles.textCreate}>Desa Citeureup, {formattedDate}</Text>
      <View style={styles.textSignatureContainer}>
        <Text>Kepala Desa</Text>
        <Text>Gugun Wiguna</Text>
      </View>
    </View>
  );
};

export default PDFFooter;
