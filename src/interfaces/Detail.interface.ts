export interface CreateDetailInterface {
  quantite: string;
  remise: string;
  product: string;
  transaction: string;
}

export interface DetailInTransaction {
  _id: string;
  product: string;
  quantite: number;
  montant_brut: number;
  remise: number;
  montant_total: number;
}
