export interface ColorVariant {
  name: string;
  imageUrls: string[];
}

export interface Saree {
  id: number;
  name: string;
  description: string;
  price: number;
  productCode: string;
  category: string;
  specifications: {
    Fabric: string;
    Work: string;
  };
  colorVariants: ColorVariant[];
}