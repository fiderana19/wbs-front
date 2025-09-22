import { StyleSheet } from "@react-pdf/renderer";

export const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    backgroundColor: "white",
    padding: "25 10",
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
    width: "100%",
    borderStyle: "solid",
    borderWidth: 0.5,
    borderCollapse: "collapse",
    fontSize: 12,
  },
  row: {
    flexDirection: "row",
    textAlign: "center",
  },

  rowhead: {
    flexDirection: "row",
    backgroundColor: "grey",
    textAlign: "center",
  },
  cell: {
    flex: 1,
    borderStyle: "solid",
    borderWidth: 0.5,
    padding: 5,
  },
  unit: {
    fontSize: 7,
  },
  head: {
    flexDirection: "row",
    display: "flex",
    justifyContent: "space-between",
  },
  hr: {
    backgroundColor: "grey",
    height: 1,
    width: "100%",
  },
  totalchamp: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    margin: "5 0",
    fontSize: 12,
  },
  totalchampamount: {
    padding: 5,
    border: "1px solid gray",
    width: "110px",
    height: "25px",
    textAlign: "center",
  },
  totaltext: {
    fontSize: 12,
    marginTop: 5,
    marginRight: 5,
  },
});

export const logo = StyleSheet.create({
  logo: {
    fontSize: 35,
    fontWeight: "bold",
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

export const footer = StyleSheet.create({
  contain: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    fontSize: 12,
    paddingBottom: 55,
    marginTop: 30,
  },
});
