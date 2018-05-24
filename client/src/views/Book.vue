<template>
    <div>
        <NavBar/>
            <div class='col-sm-12 mt-5 mx-auto'>
                <div class='col-sm-12'>
                    <img style="width:70px;height:100px" :src='book.image' />
                    
                    <h4>Title : {{book.title}}</h4>
                    <p>Author : {{book.author}}</p>
                    <p>Publisher : {{book.publisher}}</p>
                </div>
            </div>
            <div class='container' style="background-color:azure;">
                <div 
                v-for="(review,index) in book.reviewsId"
                :key='index'
                >
                 
                    <div>
                        <p>{{review.content}}</p>
                        <button type="submit" @click='remove(review._id)'> Delete</button>
                    </div>

                </div>

              
                </div>
                  <div>
                     <div class="form-group">
                        <label for="exampleFormControlTextarea1">Content:</label>
                        <textarea v-model='content' class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                    </div>
                    <button @click='addReview' type="button" class="btn btn-primary" data-dismiss="modal">Add</button>
                </div>
    </div>
    

</template>

<script>
import {mapActions, mapState} from 'vuex'
import NavBar from '@/components/NavBar'
import axios from 'axios'

    export default {
        name:'book',
        data() {
            return {
                content:''
            }
        },
        components:{
            NavBar
        },
        methods:{
            ...mapActions([
                'getBook'
            ]),
            remove(id){
                axios.delete(`http://localhost:3000/reviews/${id}`,{
                     headers:{
                         token:localStorage.getItem('token')
                     }
                 })
                .then(result=>{
                    swal({
                        text:'succes to delete'
                    })
                }).catch(err=>{
                    console.log(err)
                })
            },
            addReview(){
                let id = this.$route.params.id
                 axios.post(`http://localhost:3000/reviews/${id}`,{
                     content: this.content
                 },{
                     headers:{
                         token:localStorage.getItem('token')
                     }
                 })
                .then(result=>{
                    swal({
                        text:'succes to delete'
                    })
                }).catch(err=>{
                    console.log(err)
                })
            }

        },
        computed:{
            ...mapState([
                'book'
            ])
        },
        mounted(){
            this.getBook(this.$route.params.id)
            console.log(this.book)
        }
    }
</script>

