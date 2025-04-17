import { message, Select  } from 'antd'
import React, { FunctionComponent, useState } from 'react'
import dayjs from 'dayjs';
import { FileZipOutlined, ArrowLeftOutlined } from '@ant-design/icons'
import { Document, Page, Text, View, StyleSheet, PDFViewer } from '@react-pdf/renderer';
import { getTransactionForFacture } from '../../../api/Transaction';
import { useGetAllTransaction } from '../../../hooks/useGetAllTransaction';
import { useDark } from '../../../context/DarkThemeContext';

interface StepsPropsType {
  handlePrev: ()=>void;
  handleNext: ()=>void;
}
//the pdf style
const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: 'white',
    padding: '25 10',
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  header: {
    fontSize: 16,
  },
  ref: {
    fontSize: 13,
  },
  table: {
    // display: 'table',
    width: '100%',
    borderStyle: 'solid',
    borderWidth: .5,
    borderCollapse: 'collapse',
    fontSize: 12,
  },
  row: {
    flexDirection: 'row',
    textAlign: 'center',
  },

  rowhead: {
    flexDirection: 'row',
    backgroundColor: 'grey',
    textAlign: 'center',
  },
  cell: {
    flex: 1,
    borderStyle: 'solid',
    borderWidth: .5,
    padding: 5,
  },
  unit: {
    fontSize: 7,
  }  
  ,
  head: {
    flexDirection: 'row',
    display: 'flex',
    justifyContent: 'space-between',
  },
  hr: {
    backgroundColor: 'grey',
    height: 1,
    width: '100%',
  },
  totalchamp: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    margin: '5 0',
    fontSize: 12,
  },
  totalchampamount: {
    padding: 5,
    border: '1px solid gray',
    width: '110px',
    height: '25px',
    textAlign: 'center',
  },
  totaltext: {
    fontSize: 12,
    marginTop: 5,
    marginRight: 5,
  }
});
//another pdf style
const logo = StyleSheet.create({
  logo: {
    fontSize: 35,
    fontWeight: 'bold',
  },
  abrev: {
    fontSize: 7,
  },
  nb: {
    fontSize: 7,
    marginTop: 5,
  },
  client: {
    fontSize: 12,
    marginBottom: 10,
    marginTop: 10,
  },
});
//pdf footer style
const footer = StyleSheet.create({
  contain: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    fontSize: 12,
    paddingBottom: 55,
    marginTop: 30,
  },
});

//generate pdf function
const generatePDF = async (token: string | null,  selectedTransId: string ) => {
  //getting all detail of the transaction
  // const response = await getDetailById(token, selectedTransId);
  // const data = response.data;
  // //filling the table blank
  // while (data.length < 13) {
  //   data.push({ quantite: '', product: '', montant_brut: '', remise: '', montant_total: '' });
  // }

  const res = await getTransactionForFacture(token, selectedTransId);
  const transaction = res.data[0];
  //the pdf content 
  const pdfDocument = (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <View style={styles.head}>
            <View>
              <Text style={logo.logo}>WBS</Text>
              <Text style={logo.abrev}>World Business Solution</Text>
              <Text style={logo.abrev}>Tulear 601</Text>
            </View>
            <View>
              <Text style={styles.header}>FACTURE </Text>
              <Text style={styles.ref}>Ref : { transaction.ref }</Text>
              <Text style={styles.ref}>Tulear , le { dayjs(transaction.date_transaction).format('DD-MM-YYYY HH:mm')}</Text>
            </View>
          </View>

          <Text style={styles.hr}></Text>
            <View style={logo.client}>
              <Text style={styles.header}>Doit : { transaction.nom_client }</Text>
              <Text style={styles.header}>Adresse : { transaction.adresse_client }</Text>
              <Text style={styles.header}>Mail : { transaction.mail_client }</Text>
              <Text style={styles.header}>Telephone : { transaction.telephone_client }</Text>
            </View>
          <View style={styles.table}>
            <View style={styles.rowhead}>
              <View style={styles.cell}>
                <Text>Quantite </Text>
              </View>
              <View style={styles.cell}>
                <Text>Produit</Text>
              </View>
              <View style={styles.cell}>
                <Text>Montant brut</Text>
              </View>
              <View style={styles.cell}>
                <Text>Remise</Text>
              </View>
              <View style={styles.cell}>
                <Text>Montant total</Text>
              </View>
            </View>
            {/* {data.map((detail: any, index: any) => (
              <View style={styles.row} key={index}>
                <View style={styles.cell}>
                  <Text>{detail.quantite}</Text>
                </View>
                <View style={styles.cell}>
                  <Text>{detail.product}</Text>
                </View>
                <View style={styles.cell}>
                  <Text>{detail.montant_brut} <Text style={styles.unit}>MGA</Text></Text>
                </View>
                <View style={styles.cell}>
                  <Text>{detail.remise} <Text style={styles.unit}>%</Text></Text>
                </View>
                <View style={styles.cell}>
                  <Text>{detail.montant_total} <Text style={styles.unit}>MGA</Text></Text>
                </View>
              </View>
            ))} */}
          </View>
          <View style={styles.totalchamp}>
            <Text style={styles.totaltext}>Total</Text>
            <Text style={styles.totalchampamount}>{ transaction.montant_transaction } <Text style={styles.unit}>MGA</Text></Text>
          </View>
          <View style={footer.contain}>
              <View>
                <Text>Le client reçu conforme</Text>
              </View>
              <View>
                <Text>Le vendeur</Text>
              </View>
            </View>
            <Text style={styles.hr}></Text>
            <Text style={logo.nb}>NB: Les marchandises restent la propriété du vendeur jusqu'au paiement intégral de leur prix</Text>
        </View>
      </Page>
    </Document>
  );

  return pdfDocument;
};

const { Option } = Select;

const AddFacturePage: FunctionComponent<StepsPropsType> = ({handlePrev}) => {
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token")
  )
  const [selectedTransId, setSelectedTransId] = useState('');
  const { data: trans } = useGetAllTransaction();
  const [pdfData, setPdfData] =  useState<null | JSX.Element>(null);
  const { isDark } = useDark();
  //handling the form submit
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (selectedTransId) {
      generatePDF(token,selectedTransId).then((pdf) => {
        setPdfData(pdf);
      })
    } else {
      errorMessage()
    }
  }
  //error message
  const errorMessage = () => {
    message.error('Veuillez remplir les champs !');
  };
  //handling the select transaction change
  const handleSelectTransChange = (value: any) => {
    setSelectedTransId(value);
  };

  return (
    <div className={isDark ? 'dark-container py-16 min-h-screen h-full' : 'py-16'}>
      <button onClick={handlePrev}
        className='fixed top-4 left-4 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 text-sm  rounded focus:outline-none focus:ring-2 focus:ring-blue-500'
      >
        <ArrowLeftOutlined /> Retour 
      </button>
      <div className='text-center flex justify-center'>
        <div>
          <div className='text-2xl font-bold'>FACTURE</div>
          <form onSubmit={handleSubmit} className='my-7 w-60 text-left mx-auto'>
            <label htmlFor='idproduit'>Transaction : </label><br />
            <Select
              value={selectedTransId}
              onChange={handleSelectTransChange}
              className='w-full my-1'
              showSearch
              optionFilterProp="children"
              filterOption={(input: any, option: any) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              <Option value="">Sélectionnez une transaction</Option>
              {
                trans && trans.map((tr: any) => {
                  return(
                    <Option key={trans._id} value={tr._id}>
                      { `${tr.nom_client} ${dayjs(tr.date_transaction).format('DD-MM-YYYY HH:mm')}` }
                    </Option>
                  )
                })
              }
            </Select>
            {selectedTransId && <p>Transaction sélectionné : {selectedTransId}</p>}  

            <div className='flex justify-center my-3'>
              <button type='submit'  className='bg-green-500 hover:bg-green-600 text-white py-2 px-4 text-sm  rounded focus:outline-none focus:ring-2 focus:ring-green-500'><FileZipOutlined /> Generer la facture</button>
            </div>
          </form>
        </div>
      </div>
      <div className='my-10 mx-4 md:mx-auto md:w-1/2'>
        {pdfData && (
          <PDFViewer width="100%" height="500">
            {pdfData}
          </PDFViewer>
        )}
      </div>
    </div>
  )
}

export default AddFacturePage