import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Post } from 'src/app/models/post';
import { CategoriesService } from 'src/app/services/categories.service';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.css']
})
export class NewPostComponent implements OnInit {

  
 permalink:string='';
 imgSrc:any='./assets/default.avif';
 selectedImg:any;
 categories:Array<any>=[];
 postForm!:FormGroup;
 post: any;
 docId:String='';
 formStatus:string = 'Add New';
  constructor(private service:CategoriesService,private fb:FormBuilder,private postservice:PostsService,private route:ActivatedRoute){
    this.route.queryParams.subscribe(

      val =>{
        this.docId = val['id'];       
         if(this.docId){
          this.postservice.loadOneQuery(val['id']).subscribe( post =>{
            this.post = post;
            this.postForm = this.fb.group({
              title:[this.post.title,[Validators.required,Validators.minLength(7)]],
              permalink:new FormControl(
                { value: this.post.permalink, disabled: true },
                Validators.required
              ),
              excerpt:[this.post.excerpt,[Validators.required,Validators.minLength(20)]],
              category:[`${this.post.category.categoryId}-${this.post.category.category}`,Validators.required],
              postImg:['',Validators.required],
              content:[this.post.content,Validators.required]
            })
            this.imgSrc =this.post.postImgPath;
            this.formStatus='Edit';
          });
         }
         else{
          this.postForm = this.fb.group({
            title:['',[Validators.required,Validators.minLength(7)]],
            permalink:new FormControl(
              { value: '', disabled: true },
              Validators.required
            ),
            excerpt:['',[Validators.required,Validators.minLength(20)]],
            category:['',Validators.required],
            postImg:['',Validators.required],
            content:['',Validators.required]
          })
         }

      }
    );

    
   
  }
  ngOnInit(): void {
    this.service.loadData().subscribe(val => {
      this.categories=val;
    });
  }
  onSubmit() {
    const permalinkControl = this.postForm.get('permalink');
    if (permalinkControl) {
      permalinkControl.enable();
    }

    console.log(this.postForm.value);
   let splited =  this.postForm.value.category.split('-');
   
const postData :Post ={
  title :this.postForm.value.title,
  permalink :this.postForm.value.permalink,
  category:{
    categoryId:splited[0],
    category:splited[1]
  },
  postImgPath:'',
  excerpt:this.postForm.value.excerpt,
  content:this.postForm.value.content,
  isFeatured:false,
  views:0,
  status:'new',
  createdAt : new Date()
  

  


}
    this.postservice.uploadImage(this.selectedImg,postData,this.formStatus,this.docId);
    if (permalinkControl) {
      permalinkControl.disable();
    }
    this.postForm.reset();
    this.imgSrc='./assets/default.avif';
}
  
  onTitleChange($event: any){
    const title = $event.target.value;
    this.permalink=title.replace(/\s/g,'-');
   }
   showPreview($event:any){
    const reader = new FileReader();
    reader.onload= (e) => {
      this.imgSrc = e.target?.result
    };
    reader.readAsDataURL($event?.target.files[0]);
    this.selectedImg =$event?.target.files[0];
   }

}
