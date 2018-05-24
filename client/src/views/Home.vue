<template>
  <div class="home">
    <NavBar
    :token='token'
    />
      <!-- Modal -->
    <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Add Book</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
             <div class="form-group">
                <label for="exampleInputEmail1">Title:</label>
                <input v-model='title' type="text" class="form-control" >
            </div>
            <div>
                <input type="file" class="form-control" @change="getImage"> 
            </div>
            <div class="form-group">
                <label for="exampleInputEmail1">Author:</label>
                <input v-model='author' type="text" class="form-control" >
            </div>
           
            <div class="form-group">
                <label for="exampleInputPassword1">Publisher:</label>
                <input v-model='publisher' type="text" class="form-control" >
            </div>
            <div class="form-group">
                <label for="exampleFormControlTextarea1">Content:</label>
                <textarea v-model='content' class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
            </div>
          </div>
          <div class="modal-footer">
              <button @click='addBook' type="button" class="btn btn-primary" data-dismiss="modal">Add</button>
          </div>
        </div>
      </div>
    </div>

    <div class='container mt-4' style="background-color: azure">
       <div  class='mx-auto row p-4 col-9'>
            <div class='col-sm-12'>
                <h3>Books</h3>
            </div>
            <div  class="card m-3" style="width: 12rem;" v-for = "(book, index) in listBooks" :key = 'index'> 
                <div class='card-header  text-center' style='background-color:rgb(49, 217, 230);'> <p>{{book.title}}</p>  </div>
                    <div class="card-body p-3">
                    <img style="width:70px;height:100px" class="card-img-top" :src="book.image" alt="">
                    <br>
                    <br>
                    </div>
                    <div class='card-footer text-center ' style="background-color: beige;">Author :{{book.author}}</div>
                    <div class='card-footer text-center ' style="background-color: beige;"> Publisher : {{book.publisher}}</div>
                    <div class='p-1 text-center' style="background-color: beige">
                    <router-link :to="{name:'book',params:{id:book._id}}"><button  type="button" class="btn btn-info col-12">Read</button></router-link> <br> <br>
                    <button  @click="removeBook(book._id,index)" v-if="book.userId==user" type="button" class="btn btn-danger col-12">Remove</button>
                  </div>
            </div>
               
        </div>
    </div>
  
    
  </div>

</template>



<script>
// @ is an alias to /src
import NavBar from '@/components/NavBar'
import Books from "@/components/Books";
import {mapActions, mapState} from 'vuex'
import axios from 'axios'
import swal from 'sweetalert'
 
export default {
    name: 'home',
    components :{
      NavBar,
      Books
    },
    data(){
        return {
            token:null,
            title:'',
            content:'',
            author:'',
            publisher:'',
            imgFile:'',
            user:''

        }
    },
    methods:{
      ...mapActions([
        'getAllBooks'
      ]),
      getImage(){
          this.imgFile = event.target.files[0]
      },
      addBook(){
         let formData = new FormData()
          formData.append('image',this.imgFile)
          formData.append('title',this.title)
          formData.append('author',this.author)
          formData.append('content',this.content)
          formData.append('publisher',this.publisher)
          console.log(formData)
          console.log(this.title,this.content,this.author,this.publisher)

          axios.post('http://localhost:3000/books',formData,{
            headers:{
              token:localStorage.getItem('token')
            }
          }).then(result=>{
            this.listBooks.push(result.data.result)
            swal({
              text:result.data.message
            })
          }).catch(err=>{
            console.log(err)
          })
      },
      removeBook(id,position){
         axios.delete(`http://localhost:3000/books/${id}`,{
            headers:{
              token:localStorage.getItem('token')
            }
          }).then(result=>{
            this.listBooks.splice(position,1)
            swal({
              text:result.data.message
            })
          }).catch(err=>{
            console.log(err)
          })
      }
        
    },
    computed:{
      ...mapState([
        'listBooks'
      ])
    },
    mounted(){
        this.getAllBooks()
        console.log(this.listBooks)
    },
    updated(){
      
    },
    created(){
        this.token=localStorage.getItem('token')
        this.user = localStorage.getItem('id')
    },
}
</script>

<style>
  body {
    background-color: blanchedalmond
  }
</style>



