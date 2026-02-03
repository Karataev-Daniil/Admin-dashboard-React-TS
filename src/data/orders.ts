import type { Product } from "./products";
import type { User } from "./users";

export type Order = {
    id: number;
    userId: User['id'];
    userName: User['name'];
    userEmail: User['email'];
    date: string;
    status: 'pending' | 'completed' | 'canceled';
    products: Product[];
    total: number;
}

const mockOrders: Order[] = [
    {
        id: 1001,
        userId: 101,
        userName: "Alice Johnson",
        userEmail: "alice@example.com",
        date: "2026-01-22",
        status: "completed",
        products: [
            { id: 3456, name:"Apple iPhone 14", type:"Smartphones", date:"2026-01-20", price:799, stock:25, status:"active" },
            { id: 2301, name:"Logitech MX Master 3", type:"Accessories", date:"2026-01-18", price:99, stock:40, status:"active" }
        ],
        total: 898
    },
    {
        id: 1002,
        userId: 103,
        userName: "Charlie Brown",
        userEmail: "charlie@example.com",
        date: "2026-01-21",
        status: "pending",
        products: [
            { id: 6789, name:"MacBook Air M2", type:"Laptops", date:"2026-01-12", price:1099, stock:5, status:"active" }
        ],
        total: 1099
    },
    {
        id: 1003,
        userId: 107,
        userName: "George Martin",
        userEmail: "george@example.com",
        date: "2026-01-20",
        status: "completed",
        products: [
            { id: 4567, name:"Adidas Ultraboost", type:"Footwear", date:"2025-11-30", price:180, stock:20, status:"active" }
        ],
        total: 180
    },
    {
        id: 1004,
        userId: 104,
        userName: "Diana Prince",
        userEmail: "diana@example.com",
        date: "2026-01-20",
        status: "canceled",
        products: [
            { id: 1984, name:"Sony PlayStation 5", type:"Gaming", date:"2026-01-03", price:499, stock:0, status:"outOfStock" }
        ],
        total: 499
    },
    {
        id: 1005,
        userId: 110,
        userName: "Julia Roberts",
        userEmail: "julia@example.com",
        date: "2026-01-19",
        status: "pending",
        products: [
            { id: 4657, name:"JBL Flip 8 Speaker", type:"Speakers", date:"2026-01-20", price:99, stock:50, status:"active" },
            { id: 1048, name:"Fitbit Charge 6", type:"Wearables", date:"2026-01-05", price:179, stock:30, status:"active" }
        ],
        total: 278
    },
    {
        id: 1006,
        userId: 106,
        userName: "Fiona Gallagher",
        userEmail: "fiona@example.com",
        date: "2026-01-18",
        status: "completed",
        products: [
            { id: 1023, name:"Canon EDS R5 Camera", type:"Camera", date:"2026-01-21", price:3499, stock:8, status:"active" }
        ],
        total: 3499
    },
    {
        id: 1007,
        userId: 109,
        userName: "Ian Fleming",
        userEmail: "ian@example.com",
        date: "2026-01-17",
        status: "pending",
        products: [
            { id: 6723, name:"Google Pixel 7", type:"Smartphones", date:"2026-01-19", price:699, stock:20, status:"active" },
            { id: 5642, name:"Samsung Galaxy Buds 2", type:"Headphones", date:"2026-01-16", price:149, stock:18, status:"active" }
        ],
        total: 848
    },
    {
        id: 1008,
        userId: 102,
        userName: "Bob Smith",
        userEmail: "bob@example.com",
        date: "2026-01-16",
        status: "canceled",
        products: [
            { id: 3215, name:"Corsair K95 Keyboard", type:"Accessories", date:"2026-01-11", price:199, stock:18, status:"active" }
        ],
        total: 199
    },
    {
        id: 1009,
        userId: 105,
        userName: "Ethan Hunt",
        userEmail: "ethan@example.com",
        date: "2026-01-15",
        status: "completed",
        products: [
            { id: 2378, name:"Instant P9t Duo 7-in-1", type:"Home Appliances", date:"2026-01-15", price:89, stock:20, status:"active" }
        ],
        total: 89
    },
    {
        id: 1010,
        userId: 108,
        userName: "Hannah Baker",
        userEmail: "hannah@example.com",
        date: "2026-01-14",
        status: "pending",
        products: [
            { id: 5432, name:"Nintendo Switch OLED", type:"Gaming", date:"2026-01-08", price:349, stock:10, status:"active" }
        ],
        total: 349
    },
    {
        id: 1011,
        userId: 101,
        userName: "Alice Johnson",
        userEmail: "alice@example.com",
        date: "2026-01-13",
        status: "completed",
        products: [
            { id: 8432, name:"Apple Watch Series 8", type:"Wearables", date:"2026-01-18", price:399, stock:25, status:"active" }
        ],
        total: 399
    },
    {
        id: 1012,
        userId: 102,
        userName: "Bob Smith",
        userEmail: "bob@example.com",
        date: "2026-02-01",
        status: "completed",
        products: [
            { id: 3456, name:"Apple iPhone 14", type:"Smartphones", date:"2026-01-20", price:799, stock:25, status:"active" }
        ],
        total: 799
    },
    {
        id: 1013,
        userId: 103,
        userName: "Charlie Brown",
        userEmail: "charlie@example.com",
        date: "2026-02-01",
        status: "completed",
        products: [
            { id: 6789, name:"MacBook Air M2", type:"Laptops", date:"2026-01-12", price:1099, stock:5, status:"active" },
            { id: 2301, name:"Logitech MX Master 3", type:"Accessories", date:"2026-01-18", price:99, stock:40, status:"active" }
        ],
        total: 1198
    },
    {
        id: 1014,
        userId: 104,
        userName: "Diana Prince",
        userEmail: "diana@example.com",
        date: "2026-01-31",
        status: "completed",
        products: [
            { id: 4567, name:"Adidas Ultraboost", type:"Footwear", date:"2025-11-30", price:180, stock:20, status:"active" }
        ],
        total: 180
    },
    {
        id: 1015,
        userId: 105,
        userName: "Ethan Hunt",
        userEmail: "ethan@example.com",
        date: "2026-01-30",
        status: "pending",
        products: [
            { id: 4657, name:"JBL Flip 8 Speaker", type:"Speakers", date:"2026-01-20", price:99, stock:50, status:"active" },
            { id: 5432, name:"Nintendo Switch OLED", type:"Gaming", date:"2026-01-08", price:349, stock:10, status:"active" }
        ],
        total: 448
    },
    {
        id: 1016,
        userId: 106,
        userName: "Fiona Gallagher",
        userEmail: "fiona@example.com",
        date: "2026-01-29",
        status: "completed",
        products: [
            { id: 1023, name:"Canon EDS R5 Camera", type:"Camera", date:"2026-01-21", price:3499, stock:8, status:"active" }
        ],
        total: 3499
    },
    {
        id: 1017,
        userId: 107,
        userName: "George Martin",
        userEmail: "george@example.com",
        date: "2026-01-28",
        status: "completed",
        products: [
            { id: 6723, name:"Google Pixel 7", type:"Smartphones", date:"2026-01-19", price:699, stock:20, status:"active" }
        ],
        total: 699
    },
    {
        id: 1018,
        userId: 108,
        userName: "Hannah Baker",
        userEmail: "hannah@example.com",
        date: "2026-01-27",
        status: "completed",
        products: [
            { id: 5642, name:"Samsung Galaxy Buds 2", type:"Headphones", date:"2026-01-16", price:149, stock:18, status:"active" },
            { id: 1048, name:"Fitbit Charge 6", type:"Wearables", date:"2026-01-05", price:179, stock:30, status:"active" }
        ],
        total: 328
    },
    {
        id: 1019,
        userId: 109,
        userName: "Ian Fleming",
        userEmail: "ian@example.com",
        date: "2026-01-26",
        status: "completed",
        products: [
            { id: 3215, name:"Corsair K95 Keyboard", type:"Accessories", date:"2026-01-11", price:199, stock:18, status:"active" }
        ],
        total: 199
    },
    {
        id: 1020,
        userId: 110,
        userName: "Julia Roberts",
        userEmail: "julia@example.com",
        date: "2026-01-25",
        status: "pending",
        products: [
            { id: 2378, name:"Instant P9t Duo 7-in-1", type:"Home Appliances", date:"2026-01-15", price:89, stock:20, status:"active" }
        ],
        total: 89
    },
    {
        id: 1021,
        userId: 101,
        userName: "Alice Johnson",
        userEmail: "alice@example.com",
        date: "2025-12-25",
        status: "completed",
        products: [
            { id: 3456, name:"Apple iPhone 14", type:"Smartphones", date:"2026-01-20", price:799, stock:25, status:"active" },
            { id: 4567, name:"Adidas Ultraboost", type:"Footwear", date:"2025-11-30", price:180, stock:20, status:"active" }
        ],
        total: 979
    },
    {
        id: 1022,
        userId: 102,
        userName: "Bob Smith",
        userEmail: "bob@example.com",
        date: "2025-12-20",
        status: "completed",
        products: [
            { id: 6789, name:"MacBook Air M2", type:"Laptops", date:"2026-01-12", price:1099, stock:5, status:"active" }
        ],
        total: 1099
    },
    {
        id: 1023,
        userId: 103,
        userName: "Charlie Brown",
        userEmail: "charlie@example.com",
        date: "2025-12-15",
        status: "completed",
        products: [
            { id: 1023, name:"Canon EDS R5 Camera", type:"Camera", date:"2026-01-21", price:3499, stock:8, status:"active" }
        ],
        total: 3499
    },
    {
        id: 1024,
        userId: 104,
        userName: "Diana Prince",
        userEmail: "diana@example.com",
        date: "2025-12-10",
        status: "completed",
        products: [
            { id: 6723, name:"Google Pixel 7", type:"Smartphones", date:"2026-01-19", price:699, stock:20, status:"active" },
            { id: 5642, name:"Samsung Galaxy Buds 2", type:"Headphones", date:"2026-01-16", price:149, stock:18, status:"active" }
        ],
        total: 848
    },
    {
        id: 1025,
        userId: 105,
        userName: "Ethan Hunt",
        userEmail: "ethan@example.com",
        date: "2025-11-30",
        status: "completed",
        products: [
            { id: 4657, name:"JBL Flip 8 Speaker", type:"Speakers", date:"2026-01-20", price:99, stock:50, status:"active" }
        ],
        total: 99
    },
    {
        id: 1026,
        userId: 106,
        userName: "Fiona Gallagher",
        userEmail: "fiona@example.com",
        date: "2025-11-20",
        status: "completed",
        products: [
            { id: 1048, name:"Fitbit Charge 6", type:"Wearables", date:"2026-01-05", price:179, stock:30, status:"active" },
            { id: 2301, name:"Logitech MX Master 3", type:"Accessories", date:"2026-01-18", price:99, stock:40, status:"active" }
        ],
        total: 278
    },
    {
        id: 1027,
        userId: 107,
        userName: "George Martin",
        userEmail: "george@example.com",
        date: "2025-11-15",
        status: "completed",
        products: [
            { id: 5432, name:"Nintendo Switch OLED", type:"Gaming", date:"2026-01-08", price:349, stock:10, status:"active" }
        ],
        total: 349
    },
    {
        id: 1028,
        userId: 108,
        userName: "Hannah Baker",
        userEmail: "hannah@example.com",
        date: "2025-10-25",
        status: "completed",
        products: [
            { id: 3215, name:"Corsair K95 Keyboard", type:"Accessories", date:"2026-01-11", price:199, stock:18, status:"active" },
            { id: 8432, name:"Apple Watch Series 8", type:"Wearables", date:"2026-01-18", price:399, stock:25, status:"active" }
        ],
        total: 598
    },
    {
        id: 1029,
        userId: 109,
        userName: "Ian Fleming",
        userEmail: "ian@example.com",
        date: "2025-09-30",
        status: "completed",
        products: [
            { id: 2378, name:"Instant P9t Duo 7-in-1", type:"Home Appliances", date:"2026-01-15", price:89, stock:20, status:"active" }
        ],
        total: 89
    },
    {
        id: 1030,
        userId: 110,
        userName: "Julia Roberts",
        userEmail: "julia@example.com",
        date: "2025-09-15",
        status: "completed",
        products: [
            { id: 3456, name:"Apple iPhone 14", type:"Smartphones", date:"2026-01-20", price:799, stock:25, status:"active" }
        ],
        total: 799
    }
];

export default mockOrders;