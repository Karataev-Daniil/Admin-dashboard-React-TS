export type Product = {
  id: number;
  name: string;
  type: string;
  date: string;
  price: number;
  stock: number;
  status: 'active' | 'outOfStock' | 'Inactive';
};

export type CategoryProps = {
  category: 'all' | 'Smartphones' | 'Laptops' | 'Tablets' | 'Accessories';
  onCategoryChange: (category: CategoryProps['category']) => void;
};

export type StockProps = {
  stock: 'all' | 'inStock' | 'outOfStock';
  onStockChange: (stock: StockProps['stock']) => void;
};

export type DateAddProps = {
  dateAdd: 'all' | 'last24hours' | 'last7days' | 'last30days';
  onDateAddChange: (dateAdd: DateAddProps['dateAdd']) => void;
};

export type StatusProps = {
  status: 'all' | 'active' | 'outOfStock' | 'Inactive';
  onStatusChange: (status: StatusProps['status']) => void;
};

const mockProduct: Product[] = [
  {id: 3456, name:"Apple iPhone 14", type:"Smartphones", date:"2026-01-20", price:799, stock:25, status:"active"},
  {id: 7821, name:"Samsung Galaxy S23", type:"Smartphones", date:"2026-01-15", price:899, stock:30, status:"active"},
  {id: 1045, name:"Sony WH-1000XM4", type:"Headphones", date:"2026-01-10", price:349, stock:12, status:"active"},
  {id: 5678, name:"Bose QuietComfort 45", type:"Headphones", date:"2026-01-05", price:329, stock:15, status:"active"},
  {id: 2345, name:"Dell XPS 13 Laptop", type:"Laptops", date:"2026-01-18", price:1199, stock:8, status:"active"},
  {id: 6789, name:"MacBook Air M2", type:"Laptops", date:"2026-01-12", price:1099, stock:5, status:"active"},
  {id: 9123, name:"Nike Running Shoes", type:"Footwear", date:"2025-12-20", price:120, stock:0, status:"outOfStock"},
  {id: 4567, name:"Adidas Ultraboost", type:"Footwear", date:"2025-11-30", price:180, stock:20, status:"active"},
  {id: 3891, name:"Samsung Galaxy Watch 5", type:"Wearables", date:"2026-01-22", price:299, stock:34, status:"active"},
  {id: 8432, name:"Apple Watch Series 8", type:"Wearables", date:"2026-01-18", price:399, stock:25, status:"active"},
  {id: 1023, name:"Canon EDS R5 Camera", type:"Camera", date:"2026-01-21", price:3499, stock:8, status:"active"},
  {id: 5643, name:"Nikon Z6 II", type:"Camera", date:"2026-01-10", price:1999, stock:6, status:"active"},
  {id: 2378, name:"Instant P9t Duo 7-in-1", type:"Home Appliances", date:"2026-01-15", price:89, stock:20, status:"active"},
  {id: 3451, name:"Philips Air Fryer", type:"Home Appliances", date:"2026-01-05", price:129, stock:15, status:"active"},
  {id: 7561, name:"Apple MacBook Pro 15", type:"Laptops", date:"2026-01-22", price:2499, stock:10, status:"Inactive"},
  {id: 8912, name:"Microsoft Surface Pro 9", type:"Laptops", date:"2026-01-12", price:1399, stock:7, status:"active"},
  {id: 4657, name:"JBL Flip 8 Speaker", type:"Speakers", date:"2026-01-20", price:99, stock:50, status:"active"},
  {id: 3124, name:"Sony SRS-XB43", type:"Speakers", date:"2026-01-10", price:149, stock:22, status:"active"},
  {id: 9087, name:"GoPro HERO11", type:"Camera", date:"2026-01-15", price:499, stock:18, status:"active"},
  {id: 1048, name:"Fitbit Charge 6", type:"Wearables", date:"2026-01-05", price:179, stock:30, status:"active"},
  {id: 2301, name:"Logitech MX Master 3", type:"Accessories", date:"2026-01-18", price:99, stock:40, status:"active"},
  {id: 7654, name:"Razer DeathAdder V3", type:"Accessories", date:"2026-01-12", price:69, stock:35, status:"active"},
  {id: 4875, name:"HP Envy 13", type:"Laptops", date:"2026-01-14", price:999, stock:12, status:"active"},
  {id: 3214, name:"Asus ROG Strix", type:"Laptops", date:"2026-01-09", price:1599, stock:5, status:"active"},
  {id: 6723, name:"Google Pixel 7", type:"Smartphones", date:"2026-01-19", price:699, stock:20, status:"active"},
  {id: 1987, name:"OnePlus 11", type:"Smartphones", date:"2026-01-11", price:729, stock:15, status:"active"},
  {id: 4571, name:"Bose SoundLink Revolve", type:"Speakers", date:"2026-01-08", price:199, stock:25, status:"active"},
  {id: 3784, name:"KitchenAid Mixer", type:"Home Appliances", date:"2026-01-07", price:349, stock:10, status:"active"},
  {id: 9876, name:"Dyson V15 Vacuum", type:"Home Appliances", date:"2026-01-06", price:599, stock:8, status:"active"},
  {id: 5642, name:"Samsung Galaxy Buds 2", type:"Headphones", date:"2026-01-16", price:149, stock:18, status:"active"},
  {id: 2310, name:"Anker Soundcore Life Q30", type:"Headphones", date:"2026-01-10", price:79, stock:20, status:"active"},
  {id: 6781, name:"Sony Bravia 55 TV", type:"Electronics", date:"2026-01-05", price:799, stock:10, status:"active"},
  {id: 4590, name:"LG OLED 65 TV", type:"Electronics", date:"2026-01-12", price:1299, stock:6, status:"active"},
  {id: 3245, name:"Canon PIXMA Printer", type:"Electronics", date:"2026-01-07", price:129, stock:15, status:"active"},
  {id: 7865, name:"HP LaserJet Pro", type:"Electronics", date:"2026-01-09", price:249, stock:12, status:"active"},
  {id: 1984, name:"Sony PlayStation 5", type:"Gaming", date:"2026-01-03", price:499, stock:0, status:"outOfStock"},
  {id: 6782, name:"Xbox Series X", type:"Gaming", date:"2026-01-10", price:499, stock:5, status:"active"},
  {id: 5432, name:"Nintendo Switch OLED", type:"Gaming", date:"2026-01-08", price:349, stock:10, status:"active"},
  {id: 1098, name:"Logitech G502 Mouse", type:"Accessories", date:"2026-01-12", price:79, stock:22, status:"active"},
  {id: 3215, name:"Corsair K95 Keyboard", type:"Accessories", date:"2026-01-11", price:199, stock:18, status:"active"}
];


export default mockProduct;