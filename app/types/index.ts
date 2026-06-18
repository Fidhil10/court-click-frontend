export type OrderStatus =
  | "cancelled"
  | "order placed"
  | "payment completed"
  | "dispatched"
  | "delivered";

export type ProductType = "Judgement" | "Interim Order" | "Other";

export interface Tag {
  id: string;
  name: string;
  color: string;
}

export interface Clerk {
  id: string;
  name: string;
  phone: string;
}

export interface Address {
  pincode: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  district: string;
  state: string;
  country: string;
}

export interface Product {
  name: string;
  type: ProductType | string;
  orderDate: string;
  file?: string | null;
}

export interface DigiSignDocument {
  name: string;
  digioId: string;
  status: string;
  signedDocument?: string | null;
  auditLog?: string | null;
}

export interface CaseCustomerDetails {
  caseNumber: string;
  legalName: string;
  name: string;
  email: string;
  phone: string;
  deliveryFeedback?: string;
  issue?: string;
}

export interface Order {
  id: number;
  orderId: string;
  trackingId: string;
  paymentCompleted: string;
  orderPlaced: string;
  assigned: string;
  applied: string;
  dispatched: string;
  delivered: string;
  userInfo: {
    name: string;
    phone: string;
    caseNumber: string;
    orderId: string;
  };
  courtComplex: {
    name: string;
    location: string;
  };
  products: {
    type: string;
    amount: number;
  };
  orderDate: string;
  orderTime: string;
  status: OrderStatus;
  orderDetails: {
    amount: number;
    daysSince: string;
    paymentStatus?: string;
  };
  tags: Tag[];
  clerk?: Clerk;
  esign?: boolean;
  address: Address;
  productList: Product[];
  digiDocuments: DigiSignDocument[];
  caseDetails: CaseCustomerDetails;
}

export type TabType = "Orders" | "Clerks" | "Courts" | "Districts" | "Eligible Users";

export interface FilterState {
  district: string;
  courtEstablishment: string;
  product: string;
  testUsers: boolean;
}

export interface TagFilterState {
  selectedTags: string[];
}

export interface ProductFilterState {
  selectedProducts: string[];
}
