import {Client} from './Client';

export class TransactionTransfer {
  public senderAccountNumber: string;
  public recipientAccountNumber: string;
  public amount: number;
  public title: string;
  public senderBalance: string;
  public client: Client;
  public operationType: string;

  constructor() {
  }
}
