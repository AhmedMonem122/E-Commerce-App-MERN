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
