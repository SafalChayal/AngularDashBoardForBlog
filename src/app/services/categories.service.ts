import { Injectable } from '@angular/core';
import { AngularFirestore} from '@angular/fire/compat/firestore';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private firestore:AngularFirestore,private toastr:ToastrService ) { }

  saveData(categoryData: any){
    this.firestore.collection('categories').add(categoryData).then(docref => 
      {
        console.log(docref);
        this.toastr.success('Data inserted successfully...!');
        
      })
      .catch(err => console.log(err));

  }

  loadData(){
    return this.firestore.collection('categories').snapshotChanges().pipe(
      map(actions => {
       return  actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return {id, data}
        })
      })
      );
  }

  updateData(id: any,editedData: any){
    this.firestore.collection('categories').doc(id).update(editedData).then(
      docref =>{
        this.toastr.success('Data updated successfully...!');

      }
    )
  }

  deleteData(id: any){
    this.firestore.collection('categories').doc(id).delete().then(
       docref => {
        this.toastr.success('Data deleted successfully...!');

       }
      
      )
  }
  }

