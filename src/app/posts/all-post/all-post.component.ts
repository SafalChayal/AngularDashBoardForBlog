import { Component, OnInit } from '@angular/core';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-all-post',
  templateUrl: './all-post.component.html',
  styleUrls: ['./all-post.component.css']
})
export class AllPostComponent implements OnInit {


  

  
  postArray:Array<any>=[];
  constructor(private service:PostsService){}
  ngOnInit(): void {
      this.service.loadData().subscribe(
        val =>{
          console.log(val);
          this.postArray = val;
        }
      )
  }

  onDelete(postImgPath:any,id:any) {
      this.service.deleteImg(postImgPath,id);
  }

  onFeatured(id: any,value: boolean) {
    const featuredData = {
      isFeatured : value
    }

    this.service.markFeatured(id,featuredData);
    
    }
}
