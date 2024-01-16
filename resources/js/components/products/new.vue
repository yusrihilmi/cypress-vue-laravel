<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router';

let form = ref({
    name:'',
    description:'',
    photo:'',
})

const router = useRouter()

const getPhoto = () => {
    let photo = '/upload/image.png'
    if(form.value.photo){
        if (form.value.photo.indexOf('base64') != -1 ) {
            photo = form.value.photo
        } else {
            photo = '/upload/'+form.value.photo
        }
    }
    return photo
}

const updatePhoto = (e) => {
    let file = e.target.files[0];
    let reader = new FileReader();
    let limit = 1024 * 1024 * 2;
    if(file['size'] > limit) {
        return false
    }
    reader.onloadend = (file) => {
        form.value.photo = reader.result;
    }
    reader.readAsDataURL(file);
}

const saveProduct = () => {

    const formData = new FormData()
    formData.append('name',form.value.name)
    formData.append('description',form.value.description)
    formData.append('photo',form.value.photo)

    axios.post("/api/add_product/",formData)
    .then((response)=>{
        form.value.name='',
        form.value.description='',
        form.value.photo='',

        router.push('/')

        toast.fire({
            icon:"success",
            title:"product Add Successfully"
        })

    })
    .catch((error)=>{

    })

}

</script>


<template>
    <section>
        <div class="container">
            <div class="titlebar">
                <h1>Add Product</h1>
            </div>
            <div class="card">
                <div>
                    <label>Name</label>
                    <input id="name-input" type="text" v-model="form.name">
                    <label>Description</label>
                    <textarea id="desc-input" cols="10" rows="5" v-model="form.description"></textarea>
                    <label>Add Image</label>
                    <img :src="getPhoto()" alt="" class="img-product" />
                    <input id="file-input" type="file" @change="updatePhoto">
                </div>
            </div>
            <div class="titlebar">
                <h1></h1>
                <button id="save-button" @click="saveProduct()">Save</button>
            </div>
        </div>
    </section>
</template>