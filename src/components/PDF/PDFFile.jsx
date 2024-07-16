import React from "react";
import { Page, Document } from "@react-pdf/renderer";
import PDFHeader from "./PDFHeader";
import PDFHero from "./PDFHero";
import PDFContents from "./PDFContents";
import PDFFooter from "./PDFFooter";

const PDFFile = ({
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
    <Document>
      <Page size="A4">
        <PDFHeader />
        <PDFHero />
        <PDFContents
          nama={nama}
          nik={nik}
          tempat={tempat}
          tanggalLahir={tanggalLahir}
          jenisKelamin={jenisKelamin}
          pekerjaan={pekerjaan}
          agama={agama}
          alamatSekarang={alamatSekarang}
          tujuan={tujuan}
        />
        <PDFFooter />
      </Page>
    </Document>
  );
};

export default PDFFile;
