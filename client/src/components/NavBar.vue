<template>
        <nav class="navbar navbar-expand-sm navbar-light" style="background-color: rgb(49, 217, 230);">
            <router-link to='/' class="navbar-brand"> Nice Reads</router-link>

            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
        
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav mr-auto">
                    <li class="nav-item ">
                        <router-link v-if="token==null"  class="nav-link " to='/login' role="button"
                            aria-expanded="false" > 
                            Login
                        </router-link>
                        <a v-else class="nav-link " href="#" role="button"  aria-haspopup="true"
                            aria-expanded="false" @click='logout'>
                            Logout
                        </a>
                    </li>
                </ul>
           
              
                <form class="form-inline my-2 my-lg-0">
                    <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search">
                    <button class="btn btn-light my-2 my-sm-0 mr-4" type="submit">Search</button>
                    <button class="btn btn-info my-2 my-sm-0" type="submit" data-toggle="modal" data-target="#exampleModal">Add Book</button>
                </form>
            </div>
        </nav>
</template>

<script>
export default {
    props:['token'], 
    methods:{
        logout(){
            this.$emit('logout')
            swal('success to logout')
        }
        
    },
}
</script>
