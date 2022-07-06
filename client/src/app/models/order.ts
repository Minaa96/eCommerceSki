export interface ShippingAddress {
    punoIme: string;
    addresa1: string;
    addresa2: string;
    grad: string;
    opstina: string;
    postanskiBroj: string;
    drzava: string;
}

export interface OrderItem {
    proizvodId: number;
    ime: string;
    pictureUrl: string;
    cena: number;
    kolicina: number;
}

export interface Order {
    id: number;
    buyerId: string;
    shippingAddress: ShippingAddress;
    orderDate: string;
    orderItems: OrderItem[];
    subtotal: number;
    deliveryFee: number;
    orderStatus: string;
    paymentIntentId: string;
    total: number;
}

