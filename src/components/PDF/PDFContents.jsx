import React from "react";
import { View, StyleSheet, Text } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  contentContainer: {
    marginTop: "20px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingLeft: "25px",
    paddingRight: "25px",
    gap: "15px",
  },
  contentText: {
    fontSize: "10px",
    lineHeight: 1.5,
    alignSelf: "flex-start",
    textAlign: "justify",
  },
  containerData: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "flex-start",
    paddingLeft: "50px",
  },
  containerText: {
    fontSize: "10px",
    flexBasis: "150px",
  },
  containerText2: {
    fontSize: "10px",
    flexBasis: "20px",
  },
  containerText3: {
    fontSize: "10px",
    flexBasis: "320px",
    textTransform: "capitalize",
  },
});

const PDFContents = ({
  nama,
  nik,
  tempat,
  tanggalLahir,
  jenisKelamin,
  pekerjaan,
  agama,
  alamatSekarang,
  tujuan,
}) => {
  return (
    <View style={styles.contentContainer}>
      <Text style={styles.contentText}>
        Saya yang bertanda tangan dibawah ini Kepala Desa Citeureup, Kecamatan
        Dayeuhkolot, Kabupaten Bandung dengan ini menerangkan bahwa :
      </Text>
      <View style={styles.containerData}>
        <View style={styles.containerText}>
          <Text>Nama Lengkap</Text>
        </View>
        <View style={styles.containerText2}>
          <Text>:</Text>
        </View>
        <View style={styles.containerText3}>
          <Text>{nama}</Text>
        </View>
      </View>
      <View style={styles.containerData}>
        <View style={styles.containerText}>
          <Text>NIK</Text>
        </View>
        <View style={styles.containerText2}>
          <Text>:</Text>
        </View>
        <View style={styles.containerText3}>
          <Text>{nik}</Text>
        </View>
      </View>
      <View style={styles.containerData}>
        <View style={styles.containerText}>
          <Text>Tempat, Tanggal Lahir</Text>
        </View>
        <View style={styles.containerText2}>
          <Text>:</Text>
        </View>
        <View style={styles.containerText3}>
          <Text>
            {tempat}, {tanggalLahir}
          </Text>
        </View>
      </View>
      <View style={styles.containerData}>
        <View style={styles.containerText}>
          <Text>Jenis Kelamin</Text>
        </View>
        <View style={styles.containerText2}>
          <Text>:</Text>
        </View>
        <View style={styles.containerText3}>
          <Text>{jenisKelamin}</Text>
        </View>
      </View>
      <View style={styles.containerData}>
        <View style={styles.containerText}>
          <Text>Pekerjaan</Text>
        </View>
        <View style={styles.containerText2}>
          <Text>:</Text>
        </View>
        <View style={styles.containerText3}>
          <Text>{pekerjaan}</Text>
        </View>
      </View>
      <View style={styles.containerData}>
        <View style={styles.containerText}>
          <Text>Agama</Text>
        </View>
        <View style={styles.containerText2}>
          <Text>:</Text>
        </View>
        <View style={styles.containerText3}>
          <Text>{agama}</Text>
        </View>
      </View>
      <View style={styles.containerData}>
        <View style={styles.containerText}>
          <Text>Alamat Sekarang</Text>
        </View>
        <View style={styles.containerText2}>
          <Text>:</Text>
        </View>
        <View style={styles.containerText3}>
          <Text>{alamatSekarang}</Text>
        </View>
      </View>
      <Text style={styles.contentText}>
        Nama diatas adalah warga Desa Citeureup. Adapun maksud dari tujuan kami
        memberikan Surat ini kepada yang bersangkutan adalah untuk {tujuan}.
      </Text>
      <Text style={styles.contentText}>
        Demikian Surat ini kami buat untuk dapat dipergunakan sebagaimana
        semestinya guna proses tindak lanjut ke tingkat selanjutnya. Atas kerja
        samanya diucapkan terimakasih
      </Text>
    </View>
  );
};

export default PDFContents;
