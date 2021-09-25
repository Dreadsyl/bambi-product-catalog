export interface Product {
  id: string;
  productCode: string;
  productName: string;
  foreignNames: Array<ForeignName>;
  productClass: {
    id: string;
    title: string;
  };
  active: boolean;
  thumbnail: {
    id: string;
    imageName: string;
  };
  images: Array<Image>;
  unit: string;
  eANCode: string;
  eANPackageCode: string;
  logisticData: Array<LogData>;
  tags: Array<string>;
  customAttributes: Array<CustomAttributes>;
  likes: number;
  description: string;
}

interface ForeignName {
  countryCode: string;
  name: string;
}

interface Image {
  id: string;
  imageName: string;
}

interface LogData {
  key: string;
  prompt: string;
  value: number;
}

interface CustomAttributes {
  key: string;
  prompt: string;
  value: boolean;
}

interface ProductClass {
  id: string;
  title: string;
}
