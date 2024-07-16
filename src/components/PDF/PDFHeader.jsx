import React from "react";
import { StyleSheet, View, Text, Image, Svg, Line } from "@react-pdf/renderer";
import Logo from "/Lambang_Kabupaten_Bandung.png";

const styles = StyleSheet.create({
  titleContainer: {
    paddingVertical: 16,
  },
  title: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: "15px",
  },
  titleContent: {
    display: "flex",
    flexDirection: "column",
    textTransform: "uppercase",
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 50,
    height: 50,
  },
  titleText: {
    fontSize: 5,
    marginTop: 2,
  },
});

const PDFHeader = () => {
  return (
    <View style={styles.titleContainer}>
      <View style={styles.title}>
        <Image style={styles.logo} src={Logo} />
        <View style={styles.titleContent}>
          <Text>pemerintah kabupaten bandung</Text>
          <Text>kecamatan dayeuhkolot</Text>
          <Text>desa citeureup</Text>
          <Text style={styles.titleText}>
            Alamat : Jl. Raya Dayeuhkolot No.385, Citeureup, Kec. Dayeuhkolot,
            Kabupaten Bandung, Jawa Barat 40257
          </Text>
        </View>
      </View>
    </View>
  );
};

export default PDFHeader;
