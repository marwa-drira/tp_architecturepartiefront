import { Component, OnInit } from '@angular/core';
import { Produit } from '../model/produit';
import { NgForm } from '@angular/forms';
import { ProduitsService } from '../services/produits.service';
import { CategoriesService } from '../services/categories.service';
import { Categorie } from '../model/categorie';

@Component({
  selector: 'app-produits',
  templateUrl: './produits.component.html',
  styleUrls: ['./produits.component.css']
})

export class ProduitsComponent implements OnInit {

  constructor(private produitsService: ProduitsService, private categoriesService: CategoriesService) {
  }

  ngOnInit(): void {
    //Message affiché au moment de l'affichage du composant
    console.log("Initialisation du composant:.....");
    //charger les données
    this.initFilter();
    this.consulterProduits(this.filter);
    this.consulterCategorie(this.filter);
  }
  consulterProduits(filter: object) {
    console.log("Récupérer la liste des produits");
    //Appeler la méthode 'getProduits' du service pour récupérer les données du JSON
    this.produitsService.getProduits(filter)
      .subscribe(
        {
          //En cas de succès
          next: data => {
            console.log("Succès GET");
            this.produits = data;
          },
          //En cas d'erreur
          error: err => {
            console.log("Erreur GET");
          }
        }
      )
  }
  consulterCategorie(filter: object) {
    console.log("Récupérer la liste des categories");
    //Appeler la méthode 'getProduits' du service pour récupérer les données du JSON
    this.categoriesService.getCategories(filter)
      .subscribe(
        {
          //En cas de succès
          next: data => {
            console.log("Succès GET");
            this.categories = data;
          },
          //En cas d'erreur
          error: err => {
            console.log("Erreur GET");
          }
        }
      )
  }
  filter = {
    code: '',
    designation: '',
    prix: null,
    categorieId: null
  };
  produitCourant = new Produit();
  produits: Array<Produit> = [];
  categories: Array<Categorie> = [];
  initFilter() {
    this.filter = {
      code: '',
      designation: '',
      prix: null,
      categorieId: null
    };
  }
  supprimerProduit(p: Produit) {
    //Afficher une boite de dialogue pour confirmer la suppression
    let reponse: boolean = confirm("Voulez vous supprimer le produit :" + p.designation + " ?");
    if (reponse == true) {
      console.log("Suppression confirmée...");
      //chercher l'indice du produit à supprimer
      let index: number = this.produits.indexOf(p);
      console.log("indice du produit à supprimer: " + index);
      if (index !== -1) {
        // supprimer le produit référencé
        this.produits.splice(index, 1);
      }
    }
    else {
      console.log("Suppression annulée...");
    }
  }
  validerFormulaire(form: NgForm) {
    console.log(form.value);
    //this.produits.push(this.produitCourant);
    /*if (form.value.id != undefined) {
      console.log("id non vide...");
      //flag pour distinguer entre le mode AJOUT et le mode EDIT
      let nouveau: boolean = true;
      let index = 0;
      do {
        let p = this.produits[index];
        console.log(
          p.code + ' : ' + p.designation + ': ' + p.prix);
        if (p.id == form.value.id) {
          //rendre le mode à EDIT
          nouveau = false;
          console.log('ancien');
          let reponse: boolean =
            confirm("Produit existant. Confirmez vous la mise à jour de :" + p.designation + " ?");
          if (reponse == true) {
            //mettre à jour dans le BackEnd
            this.http.put<Array<Produit>>("http://localhost:3333/produits/" +
              form.value.id, form.value)
              .subscribe(
                {
                  next: updatedProduit => {
                    console.log("Succès PUT");
                    //mettre à jour le produit aussi dans le tableau "produits" (FrontEnd)
                    p.code = form.value.code;
                    p.designation = form.value.designation;
                    p.prix = form.value.prix;
                    console.log('Mise à jour du produit:'
                      + p.designation);
                  },
                  error: err => {
                    console.log("Erreur PUT");
                  }
                }
              )
          }
          else {
            console.log("Mise à jour annulée");
          }
          //Arrêter la boucle
          return;
        }
        else {
          //continuer à boucler
          index++;
        }
      }
      while (nouveau && index < this.produits.length);
      //en cas d'ajout
      if (nouveau) {
        console.log('nouveau');
        this.produits.push(form.value);
        console.log("Ajout d'un nouveau produit:" + form.value.designation);
      }
    }
    else {
      console.log("id vide...");
    }*/
  }
}
