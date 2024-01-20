import { Component, OnInit } from '@angular/core';
import { AngularFirestore} from '@angular/fire/compat/firestore';
@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  categoryData!:any;
  
  constructor(private firestore:AngularFirestore){}

  ngOnInit(){

  }

  onSubmit(categoryForm:any){
    
    let categoryData = {
      category: categoryForm.value.category
    }
    let subcategoryData = {
      subcategory: 'sub1'
    }

    this.firestore.collection('categories').add(categoryData).then(docref => 
      {
        console.log(docref);
        this.firestore.collection('categories').doc(docref.id).collection('subcategories').add(subcategoryData).then(docref1=>{
          console.log(docref1);
          this.firestore.collection('categories').doc(docref.id).collection('subcategories').doc(docref1.id).collection('subsubcategories').add(subcategoryData).then(docref2 =>{
            console.log(docref2);
          });
        })
      })
      .catch(err => console.log(err));

  }
}
