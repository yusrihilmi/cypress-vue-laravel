<script setup>
import { onMounted, ref } from "vue"
import { useRouter } from "vue-router";

const router = useRouter()

let products = ref([])

onMounted(async () => {
    getProducts()
})

const newProduct = () => {
    router.push('/product/new')
}

const getProducts = async () => {
    let response = await axios.get("/api/get_all_product")
    products.value = response.data.products
}

const ourImage = (img) => {
    return "/upload/"+img
}

const onEdit = (id) => {
    router.push('/product/edit/'+id)
}

const deleteProduct = (id) => {
    Swal.fire({
        title:'Are you sure?',
        text:"You can't go back again",
        icon:"warning",
        showCancelButton:true,
        confrimButtonColor:'#3085d6',
        cancelButtonColor:'#d33',
        confirmButtonText:'Yes, delete it!'
    })
    .then((result)=>{
        if(result.value){
            axios.get('api/delete_product/'+id)
            .then(()=>{
                Swal.fire(
                    'Delete',
                    'Product Delete Successfully',
                    'Success'
                )

                getProducts()
            })
            .catch(()=>{
                Swal.fire(
                    'Failed',
                    'There was something wrong',
                    'warning'
                )
            })
        }
    })

}

</script>

<template>
    <div class="container">
        <section>
            <div class="titlebar">
                <h1>Products</h1>
                <button id="create-button" @click="newProduct">Add Product</button>
            </div>
            <div class="table">
                <div class="table-filter">
                    <div>
                        <ul class="table-filter-list">
                            <li>
                                <p class="table-filter-link link-active">All</p>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="table-product-head">
                    <p>Image</p>
                    <p>Name</p>
                    <p>Description</p>
                </div>
                <div class="table-product-body" v-for="(item, index) in products" :key="item.id" v-if="products.length > 0">
                    <img :src="ourImage(item.photo)" v-if="item.photo"/>
                    <p>{{ item.name }}</p>
                    <p>{{ item.description }}</p>
                    <div>
                        <button :id="'edit-' + index" class="btn btn-success" @click="onEdit(item.id)">
                            <i class="fas fa-pencil-alt"></i>
                        </button>
                        <button class="btn btn-danger" @click="deleteProduct(item.id)">
                            <i class="far fa-trash-alt"></i>
                        </button>
                    </div>
                </div>
                <div class="table-product-body" v-else>
                    <p>Product Not Found</p>
                </div>
            </div>
        </section>
        
        
        <br>
    </div>
</template>

