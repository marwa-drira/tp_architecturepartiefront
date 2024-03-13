import { Categorie } from '../model/categorie';
export class Produit {
    id: number | undefined;
    code: string | undefined;
    designation: string | undefined;
    categorie: Categorie | undefined | null;
    categorie_id: number | undefined;
    prix: number | undefined;
}