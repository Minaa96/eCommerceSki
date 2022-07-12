
    export interface BasketItem {
        proizvodId: number;
        ime: string;
        cena: number;
        pictureUrl: string;
        brend: string;
        tip: string;
        kolicina: number;
    }

    export interface Basket {
        id: number;
        buyerId: string;
        items: BasketItem[];
        paymentIntentId?: string;
        clientSecret?: string;
    }


