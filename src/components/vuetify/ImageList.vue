<template>
    <v-container class="pa-4 text-center">
        <v-row class="fill-height" align="center" justify="center">
            <v-spacer></v-spacer>
            <v-btn @click="addFunc" color="succes" density="compact" icon="mdi-plus"></v-btn>
        </v-row>
        <v-row>
            <v-slide-group selected-class="bg-success" show-arrows>
                <v-slide-group-item v-for="image in props.images" :key="image.id">
                    <v-hover v-slot="{ isHovering, props }">
                        <v-card class="ma-2" color="white" height="200" width="200" :elevation="isHovering ? 12 : 2"
                            :class="{ 'on-hover': isHovering }" v-bind="props">
                            <v-img :src="image.url" aspect-ratio="1" cover class="bg-grey-lighten-2">
                                <template v-slot:placeholder>
                                    <v-row class="fill-height ma-0" align="center" justify="center">
                                        <v-progress-circular indeterminate color="grey-lighten-5"></v-progress-circular>
                                    </v-row>
                                </template>
                                <div class="align-self-center">
                                    <v-btn variant="text" @click="showFullScreen(image.url)"
                                        :class="{ 'show-btns': isHovering }" :color="transparent"
                                        icon="mdi-magnify"></v-btn>

                                    <v-btn variant="text" :class="{ 'show-btns': isHovering }" :color="transparent"
                                        @click="deleteImage(image)" icon="mdi-delete-circle"></v-btn>
                                    <v-btn variant="text" :class="{ 'show-btns': isHovering }" :color="transparent"
                                        @click="setDefault(image)" icon="mdi-cog-stop"></v-btn>
                                </div>
                            </v-img>
                        </v-card>
                    </v-hover>
                </v-slide-group-item>
            </v-slide-group>
        </v-row>


    </v-container>

    <v-dialog persistent v-model="isImageVisible" width="auto">
        <v-card>
            <v-toolbar color="blue-grey-lighten-5" density="compact">

                <v-toolbar-title color="primary">{{ props.title }}</v-toolbar-title>
                <v-btn icon dark @click="isImageVisible = false">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
            </v-toolbar>
            <div class="ml-5 mr-5 mt-5 mb-5"> <img :src="imageUrl" alt="Full screen Image" /></div>

        </v-card>
    </v-dialog>
</template>
<script setup>
import { ref, defineProps,  defineEmits } from "vue";


const emits = defineEmits(["add", "delete","setDef"])

let props = defineProps(["images"])
let transparent = 'rgba(255, 255, 255, 0)';

let addFunc = () => {
    emits('add');
}

let deleteImage = (e) => {
    emits('delete', e);
}

let setDefault = (e) => {
    emits('setDef', e);
}

let imageUrl = '';

let isImageVisible = ref(false);

const showFullScreen = (e) => {
    imageUrl = e;
    isImageVisible.value = true;
}

</script>
<style scoped>
.v-card {
    transition: opacity .4s ease-in-out;
}

.v-card:not(.on-hover) {
    opacity: 1;
}

.show-btns {
    color: #fff !important;
}

.fullscreen-image {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.9);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
}

.fullscreen-image img {
    width: 100%;
    height: 100%;
    object-fit: contain;
}
</style>