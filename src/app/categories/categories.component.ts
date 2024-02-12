import { Component, OnInit } from '@angular/core';
import { CategoriesService } from '../services/categories.service';
import { Category } from '../models/category';
@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
delete(id: any) {
  this.service.deleteData(id);
}
formCategory:string='';
formStatus:string='Add';
categoryId:any;
  update(category : any,id:any) {
  this.formCategory=category;
  this.formStatus='Edit';
  this.categoryId=id;
}
  
  categoryArray: Array<any> = [];
  constructor(private service : CategoriesService){}

  ngOnInit(){
      this.service.loadData().subscribe(
        val => {
          console.log(val);
          this.categoryArray=val;
        }
      );
  }

  onSubmit(categoryForm:any){
    
    let categoryData:Category = {
      category: categoryForm.value.category
    }
    if(this.formStatus =='Add'){
      this.service.saveData(categoryData);

    }
    else{
      this.service.updateData(this.categoryId,categoryData);
      categoryForm.reset();
    }
    categoryForm.reset();
    
  }
}
