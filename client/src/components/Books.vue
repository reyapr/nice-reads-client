<template>
     <div  class="card m-3" style="width: 12rem;">
         {{title}}
            <div class='card-header  text-center' style='background-color:rgb(49, 217, 230);'> {{title}}</div>
            <div class="card-body p-3">
            <img class="card-img-top" :src="bookimage" alt="">
            <br>
            <br>
            </div>
            <div class='card-footer text-center ' style="background-color: beige;">{{author}}</div>
            <div class='card-footer text-center ' style="background-color: beige;">{{publisher}}</div>
            <div class='p-1 text-center' style="background-color: beige">
            <button @click = 'addToCart' type="button" class="btn btn-info col-12">Add to Cart</button>
            </div>
        </div>
</template>

<script>
    export default {
        props:['title','author','publisher','content','bookimage']
    }
</script>
