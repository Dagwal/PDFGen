import React from 'react';
import ReactPDF, { Document, Page, Text, View, Image, StyleSheet, Font } from '@react-pdf/renderer';
import { CertificateAProps } from '../model/certModel';

const GreatVibes = 'src/fonts/GreatVibes-Regular.ttf';
const Garet = 'src/fonts/Garet-Book.ttf';
const UnifrakturMaguntia = 'src/fonts/UnifrakturMaguntia-Regular.ttf';

const backgroundImage = 'src/assets/bg.png';
const signerImage1 = 'src/assets/s.png';
const signerImage2 = 'src/assets/m.png';

Font.register({  family: 'Great Vibes',  src: GreatVibes});
Font.register({  family: 'UnifrakturMaguntia',  src: UnifrakturMaguntia});
Font.register({  family: 'Garet',  src: Garet});


const Template = (data: CertificateAProps) => {
  const currentDate = new Date().toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric', 
    year: 'numeric',
  });
   
  return (
    <Document>
      <Page size={[800, 600]} style={styles.page}>
        <View style={styles.section}>
          <Image style={styles.backgroundImage} src={backgroundImage} />

          <Text style={styles.title}>Certificate of Achievement</Text>
          <Text style={styles.subtitle}>This Certificate is proudly awarded to</Text>
          <Text style={styles.dynamicText}>{data.userName}</Text>
          <Text style={styles.subtitle}>has successfully completed</Text>
          <Text style={styles.content}>React-Pdf Certificate Course</Text>
          <Text style={styles.subtitle}>Issued on {currentDate}</Text>

          <Text style={styles.signed}>Signed, </Text>

          <View style={styles.signatureContainer}>

            <View style={{ marginRight: 20 }}>
              <Image style={styles.signatureImage} src={signerImage2} />
              <Text style={styles.signerName}>{data.signerName2}</Text>
            </View>

            <View style={{marginRight: 20}}>
              <Image style={styles.signatureImage} src={signerImage1} />
              <Text style={styles.signerName}>{data.signerName1}</Text>
            </View>

          </View>
        </View>
      </Page>
    </Document>
  );
};

const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    
  },
  section: {
    margin: 5,
    flexGrow: 1,
    position: 'relative', 
  },
  backgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    opacity: 1,
  },
  title: {
    fontSize: 42,
    fontFamily: 'UnifrakturMaguntia',
    fontWeight: 'bold',
    marginTop: 34,
    marginBottom: 30,
    color: '#333', 
    textAlign: 'center',
    textDecoration: 'underline',
  },
  subtitle: {
    fontSize: 18,
    fontFamily: 'Garet',
    marginBottom: 20,
    color: '#555', 
    textAlign: 'center',
  },
  content: {
    fontSize: 28,
    fontWeight: 'bold', 
    fontFamily: 'Garet',
    color: '#777', 
    textAlign: 'center', 
    marginBottom: 10,
  },
  dynamicText: {
    fontSize: 42,
    fontFamily: 'Great Vibes',
    color: '#777', 
    textAlign: 'center',
    marginBottom: 32,
    textDecoration: 'underline',
  },

  signatureContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  signatureImage: {
    width: 150,
    height: 50,
    marginRight: 10,
  },
  signerName: {
    fontFamily: 'Garet',
    fontSize: 18,
    marginLeft: 20,
    color: '#777',
  },

  signed: { 
    fontFamily: 'Garet',
    fontSize: 28,
    color: '#777', 
    textAlign: 'center',
    marginTop: 20,
  },
});
const Certificate = async (data: CertificateAProps) => {
  return await ReactPDF.renderToStream(<Template {...data} />)
};

export default Certificate;
