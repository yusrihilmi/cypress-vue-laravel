<script setup>
import { onMounted, ref } from "vue"
import { useRouter } from 'vue-router';


let form = ref ({
    id:'',
    name:'',
    description:'',
    photo:'',
})

onMounted(async () => {
    getsingleProduct()
})

const props = defineProps({
    id:{
        type:String,
        default:''
    }
})

const router = useRouter()

const getsingleProduct = async () => {
    let response = await axios.get(`/api/get_edit_product/${props.id}`)
    form.value = response.data.product
}

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

const updateProduct = () => {

    const formData = new FormData()
    formData.append('name',form.value.name)
    formData.append('description',form.value.description)
    formData.append('photo',form.value.photo)

    axios.post(`/api/update_product/${form.value.id}`, formData)
    .then((response)=>{
        form.value.name='',
        form.value.description='',
        form.value.photo='',

        router.push('/')

        toast.fire({
            icon:"success",
            title:"product Update Successfully"
        })

    })
    .catch((error)=>{

    })
}

</script>


<template>
    <div class="container">
        <section>
            <div class="titlebar">
                <h1>Edit Product</h1>
            </div>
            <div class="card">
                <div>
                    <label>Name</label>
                    <input type="text" v-model="form.name">
                    <label>Description (optional)</label>
                    <textarea cols="10" rows="5" v-model="form.description"></textarea>
                    <label>Add Image</label>
                    <img :src="getPhoto()" alt="" class="img-product" />
                    <input type="file" @change="updatePhoto">
                </div>
            </div>
            <div class="titlebar">
                <h1></h1>
                <button @click="updateProduct()">Save</button>
            </div>
        </section>
    </div>
</template>