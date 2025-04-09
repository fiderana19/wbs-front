export interface Transaction {
    _id: string;
    date_transaction: string;
    nom_client: string;
}

export interface CreateTransactionInterface {
    client: string;
    date_transaction: any;
}

export interface TransactionForDisplay {
    _id: string;
    ref: string;
    date_transaction: string;
    nom_client: string;
    montant_transaction: string;
}

export interface TransactionItem {
    _id: string; 
    date_transaction: string;
    nom_client: string;
    ref: string;
    montant_transaction: number;
}

export interface TransactionForEdit {
    _id: string;
    date_transaction: string;
}
  
export interface TransactionSearch {
    start: string;
    end: string;
}
  