export type Product = {
  id: number;
  name: string;
  type: string;
  date: string;
  price: number;
  stock: number;
  status: 'Active' | 'Out of Stock';
};

const mockProduct: Product[] = [
  {"id":1,"name":"Apple iPhone 14","type":"Smartphones","date":"2023-07-01","price":799,"stock":25,"status":"Active"},
  {"id":2,"name":"Samsung Galaxy S23","type":"Smartphones","date":"2023-06-15","price":899,"stock":30,"status":"Active"},
  {"id":3,"name":"Sony WH-1000XM4","type":"Headphones","date":"2023-07-01","price":349,"stock":12,"status":"Active"},
  {"id":4,"name":"Bose QuietComfort 45","type":"Headphones","date":"2023-05-20","price":329,"stock":15,"status":"Active"},
  {"id":5,"name":"Dell XPS 13 Laptop","type":"Laptops","date":"2023-07-26","price":1199,"stock":8,"status":"Active"},
  {"id":6,"name":"MacBook Air M2","type":"Laptops","date":"2023-07-10","price":1099,"stock":5,"status":"Active"},
  {"id":7,"name":"Nike Running Shoes","type":"Footwear","date":"2020-07-26","price":120,"stock":0,"status":"Out of Stock"},
  {"id":8,"name":"Adidas Ultraboost","type":"Footwear","date":"2022-03-15","price":180,"stock":20,"status":"Active"},
  {"id":9,"name":"Samsung Galaxy Watch 5","type":"Wearables","date":"2023-07-26","price":299,"stock":34,"status":"Active"},
  {"id":10,"name":"Apple Watch Series 8","type":"Wearables","date":"2023-06-05","price":399,"stock":25,"status":"Active"},
  {"id":11,"name":"Canon EDS R5 Camera","type":"Camera","date":"2023-07-26","price":3499,"stock":8,"status":"Active"},
  {"id":12,"name":"Nikon Z6 II","type":"Camera","date":"2023-06-10","price":1999,"stock":6,"status":"Active"},
  {"id":13,"name":"Instant P9t Duo 7-in-1","type":"Home Appliances","date":"2023-07-20","price":89,"stock":20,"status":"Active"},
  {"id":14,"name":"Philips Air Fryer","type":"Home Appliances","date":"2023-05-05","price":129,"stock":15,"status":"Active"},
  {"id":15,"name":"Apple MacBook Pro 15","type":"Laptops","date":"2023-07-26","price":2499,"stock":10,"status":"Out of Stock"},
  {"id":16,"name":"Microsoft Surface Pro 9","type":"Laptops","date":"2023-06-15","price":1399,"stock":7,"status":"Active"},
  {"id":17,"name":"JBL Flip 8 Speaker","type":"Speakers","date":"2023-07-26","price":99,"stock":50,"status":"Active"},
  {"id":18,"name":"Sony SRS-XB43","type":"Speakers","date":"2023-06-10","price":149,"stock":22,"status":"Active"},
  {"id":19,"name":"GoPro HERO11","type":"Camera","date":"2023-06-20","price":499,"stock":18,"status":"Active"},
  {"id":20,"name":"Fitbit Charge 6","type":"Wearables","date":"2023-05-30","price":179,"stock":30,"status":"Active"},
  {"id":21,"name":"Logitech MX Master 3","type":"Accessories","date":"2023-06-12","price":99,"stock":40,"status":"Active"},
  {"id":22,"name":"Razer DeathAdder V3","type":"Accessories","date":"2023-05-22","price":69,"stock":35,"status":"Active"},
  {"id":23,"name":"HP Envy 13","type":"Laptops","date":"2023-07-01","price":999,"stock":12,"status":"Active"},
  {"id":24,"name":"Asus ROG Strix","type":"Laptops","date":"2023-06-18","price":1599,"stock":5,"status":"Active"},
  {"id":25,"name":"Google Pixel 7","type":"Smartphones","date":"2023-07-01","price":699,"stock":20,"status":"Active"},
  {"id":26,"name":"OnePlus 11","type":"Smartphones","date":"2023-06-25","price":729,"stock":15,"status":"Active"},
  {"id":27,"name":"Bose SoundLink Revolve","type":"Speakers","date":"2023-05-30","price":199,"stock":25,"status":"Active"},
  {"id":28,"name":"KitchenAid Mixer","type":"Home Appliances","date":"2023-05-15","price":349,"stock":10,"status":"Active"},
  {"id":29,"name":"Dyson V15 Vacuum","type":"Home Appliances","date":"2023-06-05","price":599,"stock":8,"status":"Active"},
  {"id":30,"name":"Samsung Galaxy Buds 2","type":"Headphones","date":"2023-07-05","price":149,"stock":18,"status":"Active"},
  {"id":31,"name":"Anker Soundcore Life Q30","type":"Headphones","date":"2023-06-20","price":79,"stock":20,"status":"Active"},
  {"id":32,"name":"Sony Bravia 55\" TV","type":"Electronics","date":"2023-05-25","price":799,"stock":10,"status":"Active"},
  {"id":33,"name":"LG OLED 65\" TV","type":"Electronics","date":"2023-06-10","price":1299,"stock":6,"status":"Active"},
  {"id":34,"name":"Canon PIXMA Printer","type":"Electronics","date":"2023-05-18","price":129,"stock":15,"status":"Active"},
  {"id":35,"name":"HP LaserJet Pro","type":"Electronics","date":"2023-06-05","price":249,"stock":12,"status":"Active"},
  {"id":36,"name":"Sony PlayStation 5","type":"Gaming","date":"2023-06-12","price":499,"stock":0,"status":"Out of Stock"},
  {"id":37,"name":"Xbox Series X","type":"Gaming","date":"2023-06-12","price":499,"stock":5,"status":"Active"},
  {"id":38,"name":"Nintendo Switch OLED","type":"Gaming","date":"2023-06-18","price":349,"stock":10,"status":"Active"},
  {"id":39,"name":"Logitech G502 Mouse","type":"Accessories","date":"2023-06-20","price":79,"stock":22,"status":"Active"},
  {"id":40,"name":"Corsair K95 Keyboard","type":"Accessories","date":"2023-06-25","price":199,"stock":18,"status":"Active"}
]

export default mockProduct;