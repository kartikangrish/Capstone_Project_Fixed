export interface Feedback {
  id?: number;
  customerName: string;
  productName: string;
  rating: number;
  comment: string;
  submittedAt?: Date;
}