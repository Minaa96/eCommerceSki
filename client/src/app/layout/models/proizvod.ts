export interface Proizvod {
    id: number;
    ime: string;
    opis: string;
    velicina: string;
    boja: string;
    cena: number;
    pictureUrl: string;
    tip?: string;
    brend: string;
    kolicinaNaStanju?: string;
    
}