export interface TopCheapProduct {
  _id: string;
  title: string;
  description: string;
  price: number;
  imageCover: string;
  brand: {
    _id: string;
    title: string;
    createdAt: string;
  };
  ratingsAverage: number;
  id: string;
}

export interface Product {
  _id: string;
  title: string;
  description: string;
  price: number;
  imageCover: string;
  brand: {
    _id: string;
    title: string;
    createdAt: string;
  };
  ratingsAverage: number;
  ratingsQuantity: number;
  id: string;
  images: string[];
  category: {
    _id: string;
    title: string;
    createdAt: string;
  };
  createdAt: string;
  updatedAt: string;
}
