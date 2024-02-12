import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(private storage : AngularFireStorage,
    private afs : AngularFirestore,
    private toastr:ToastrService,
    private route:Router
    ) { }


  uploadImage(selectedImg: any,postData:any,formStatus:any,id:any){
      const filepath = `postIMG/${Date.now()}`;
      this.storage.upload(filepath,selectedImg).then(
        () =>{
          console.log("Image posted successfully");

          this.storage.ref(filepath).getDownloadURL().subscribe(
            URL => {
              postData.postImgPath = URL;

              if(formStatus==='Edit'){
                this.updateData(id,postData);
                
              }
             else{
              this.afs.collection('posts').add(postData).then( ref =>{
                this.toastr.success("Data inserted successfully ...!");
                this.route.navigate(['/posts']);
             });
             }
            }
          )
        })

  }

  loadData(){
    return this.afs.collection('posts').snapshotChanges().pipe(
      map((actions: any[]) => {
       return  actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return {id, data}
        })
      })
      );
  }


  loadOneQuery(id:any){
    return this.afs.collection('posts').doc(id).valueChanges();
  }

  updateData(id:any,postData:any){

    this.afs.doc(`posts/${id}`).update(postData).then(
      () => {
        this.toastr.success("Data Updated successfully...!");
        this.route.navigate(['/posts']);
      }
    )

  }

  deleteImg(postImgPath:any,id:any){
    this.storage.storage.refFromURL(postImgPath).delete().then(
      () =>{
        this.deleteData(id);
      }
    );
  }

  deleteData(id:any){
    this.afs.doc(`posts/${id}`).delete().then(
      () =>{
          this.toastr.warning("Data deleted ..");
      }
    );
  }

  markFeatured(id:any, featuredData:any){
      this.afs.doc(`posts/${id}`).update(featuredData).then(
        () =>{
          this.toastr.info('Featured status is updated');
        }
      )
  }
}
