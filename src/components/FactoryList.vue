<template>
    <div></div>
    <div class="flex flex-wrap box-factory-card shadow-xl">
        <FactoryCard></FactoryCard>
        <FactoryCard></FactoryCard>
        <FactoryCard></FactoryCard>
        <FactoryCard></FactoryCard>
        <FactoryCard></FactoryCard>
        <FactoryCard></FactoryCard>

    </div>
</template>

<style>
.box-factory-card{
    width: 60%;
    border-style: solid;
    border-color: rgb(94, 94, 94);
    border-width: thin;
    border-radius: 15px;
    justify-content: center;
    margin-left: 5%;
}    

</style>


<script>
import { defineComponent } from "vue";
import FactoryCard from "./cards/FactoryCard.vue";

export default defineComponent({
    components: { FactoryCard }
})

</script>