<template>
    <div class="modal_lvl_up">
        <div class="modal_header">
            <img class="w-32 object-cover rounded-xl pt-2 ml-2" src="@/assets/factory.png" alt="" />
            <h1>{{nameResource}} Factory</h1>
        </div>
        <div class="prod_div">
            <div class="prod">
                <p>Actual production</p>
                <p>{{generation}}/min</p>
            </div>
            <p class="mt-2">-></p>
            <div class="prod">
                <p>Next level production</p>
                <p>{{nextLvlGeneration}}/min</p>
            </div>
        </div>
        <div class="lvl_up_div">
            <p>Next lvl cost : {{nextLvlCost}} {{upnameResource}}</p>
            <button @click="levelUpModal()" type="button"
                class="text-gray-900 hover:text-white border border-gray-800 hover:bg-gray-900 font-medium rounded-lg text-sm px-5 py-2 text-center mr-2 mb-2 mt-2 dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800 h-9">Level
                up</button>
        </div>
    </div>


    <OverlayComp v-model:active="show" :fullSize="false">
        <div class="bg-slate-800 bg-opacity-50 flex justify-center items-center">
            <div class="bg-white px-16 py-14 rounded-md text-center">
                <h3 class="text-xl mb-4 font-bold text-slate-500">Do you want to upgrade your factory ?
                    ({{ nextLvlCost }} {{nameResource}}) </h3>
                <div class="btn_div">
                    <div class="btn_parent">
                        <button @click="cancel()" class="btn_child_cancel">Cancel</button>
                    </div>
                    <div class="btn_parent">
                        <button v-if=" nextLvlCost > inventoryResources" disabled
                            class="btn_child_disabled">Pay</button>
                        <button v-else @click="levelUp()" class="btn_child">
                            Pay {{nextLvlCost}}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </OverlayComp>

</template>

<script>

import { useGameStore } from '@/stores/game.store';
import { useUserStore } from '@/stores/user.store'
import { defineComponent, computed, ref } from 'vue';
import OverlayComp from '@/components/utils/OverlayComp.vue'

export default defineComponent({
    components: { OverlayComp },
    setup() {
        const gameStore = useGameStore();
        const userStore = useUserStore();

        const factory = computed(() => gameStore?.actualFactory);
        const nameResource = computed(() => factory?.value?.model?.resource.name);
        const upnameResource = computed(() => factory?.value?.model?.upgrade_resource.name);
        const userInventory = computed(() => userStore?.inventory);
        const inventoryResources = computed(() => userInventory?.value?.inventory_resources?.quantity);
        const generation = computed(() => factory?.value?.model?.generate_per_minute * factory?.value?.level);
        const nextLvlGeneration = computed(() => (factory?.value?.model?.generate_per_minute) * (factory?.value?.level + 1));
        const nextLvlCost = computed(() => factory.value?.level ** factory?.value?.model?.upgrade_coef);
        const show = ref(false)

        const levelUp = () => {
            gameStore.factoryLevelUp(factory.value.id)
            userStore.getMyInventory()
            show.value = false
        }
        const levelUpModal = () => {
            show.value = true
        }
        const cancel = () => {
            show.value = false
        }
        return {
            factory,
            nameResource,
            upnameResource,
            generation,
            nextLvlCost,
            nextLvlGeneration,
            levelUp,
            show,
            levelUpModal,
            cancel,
            inventoryResources
        }
    }
})
</script>

<style>
.modal_lvl_up {
    height: 40%;
    width: 100%;
    border-style: solid;
    border-color: rgb(94, 94, 94);
    border-width: thin;
    border-radius: 15px;
    box-shadow: 0px 0px 5px black;

    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background-color: white;
}

.modal_header {
    display: flex;
    align-items: center;
}

.modal_header h1 {
    text-align: center;
    width: 100%;
    font-size: xx-large;
}

.prod {
    display: flex;
    flex-direction: column;
}

.prod_div {
    display: flex;
    justify-content: space-around;
    margin-top: 5px;
}

.lvl_up_div {
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin-bottom: 5px;
}
</style>
