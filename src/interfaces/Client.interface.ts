export interface CreateClientInterface {
  nom_client: string;
  adresse_client: string;
  mail_client: string;
  telephone_client: string;
}

export interface Client {
  _id: string;
  nom_client: string;
  adresse_client: string;
  mail_client: string;
  telephone_client: string;
}

export interface ClientForTransaction {
  _id: string;
  mail_client: string;
}
