export interface Billing {
  address: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  optionalAddress: string;
  state: string;
  zip: string;
  country: string;
  paid: boolean;
  planType: string;
  payNow: boolean;
}
