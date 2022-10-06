<template>
    <div class="box-factory-card shadow-xl">
        <div class="w-full flex justify-between filterDiv">

            <!-- <DropdownFilter></DropdownFilter> -->

            <DropdownFilter id="factories" row="single" mode="tags" :options="test" :canClear="true"
                :placeholder="`Filters`" verbose="no-verbose" tag_color="blue" caret_size="22px" :caret_up="true"
                dropdown_gap="medium" class="w-3/4 ml-2 mt-2 h-fit" />

            <button @click="addFactory()" type="button"
                class="text-gray-900 hover:text-white border border-gray-800 hover:bg-gray-900 font-medium rounded-lg text-sm px-5 py-2 text-center mr-2 mb-2 mt-2 dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800 h-9">Add
                Factory</button>

        </div>

        <div v-if="factories.length > 0" class="flex w-full flex-wrap justify-around">
            <FactoryCard v-for="(item, index) in factories" :key="index" :level="item.level" @click="getModal($event)"
                :resource_type="item.model.resource.name" :resource_prod="item.generate_per_minute"></FactoryCard>
        </div>

        <div v-if="visible"
            class=" bg-slate-800 bg-opacity-50 flex justify-center items-center absolute top-0 right-0 bottom-0 left-0">
            <div class="box_gacha px-16 py-14 rounded-md text-center">
                <FactoryCard @click="chooseFactory(id[key])" v-for="(level_simple, key) in level" class="card_choose"
                    :resource_type="resource_type[key]" :resource_prod="resource_prod[key]" :level="level_simple"
                    :key="key">
                </FactoryCard>
            </div>
        </div>
        <OverlayComp v-model:active="active" :fullSize="false">
            <div class="bg-slate-800 bg-opacity-50 flex justify-center items-center">
                <div class="bg-white px-16 py-14 rounded-md text-center">
                    <h3 class="text-xl mb-4 font-bold text-slate-500">Do you want to buy a factory ? ({{
                    userStore.nextFactoryPrice.cost }})</h3>
                    <p> Current money : {{ userStore.inventory.money }}</p>
                    <div class="btn_div">
                        <div class="btn_parent">
                            <button @click="cancel()" class="btn_child_cancel">Cancel</button>
                        </div>
                        <div class="btn_parent">
                            <button v-if="userStore.nextFactoryPrice.cost > userStore.inventory.money" disabled
                                class="btn_child_disabled">Pay
                                {{userStore.nextFactoryPrice.cost}}</button>
                            <button v-else @click="gacha()" class="btn_child">
                                Pay {{userStore.nextFactoryPrice.cost}}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </OverlayComp>

    </div>
</template>



<script>
import OverlayComp from '@/components/utils/OverlayComp.vue'
import FactoryCard from "./cards/FactoryCard.vue";
import DropdownFilter from "./filter/DropdownFilter.vue";
import { useGameStore } from "@/stores/game.store";
import { defineComponent, computed, ref, watch } from "vue";
import { createFactoriesSelector } from "@/scripts/helpers/ValidateOffer";
import { useUserStore } from '@/stores/user.store'

export default defineComponent({
    components: { FactoryCard, DropdownFilter, OverlayComp },
    setup() {
        const active = ref(false)
        const userStore = useUserStore();
        const gameStore = useGameStore();
        const models = computed(() => gameStore.models);
        const visible = ref(false)
        const factories = computed(() => gameStore.factories);
        const form = createFactoriesSelector();
        const test = [
            "Hello", "Welcome", "Whatever"
        ]
        var resource_type = []
        var resource_prod = []
        var level = []
        var id = []

        userStore.checkPriceFactoryLimit()
        gameStore.getFactoriesModels();
        gameStore.getAllUserFactories();

        watch(form.values, val => {
            console.log(val);
        }, { deep: true })

        const addFactory = () => {
            active.value = true

        }

        const cancel = () => {
            active.value = false
        }

        const gacha = () => {
            active.value = false
            var array = models.value[0]
            for (let i = array.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                const temp = array[i];
                array[i] = array[j];
                array[j] = temp;
            }

            for (let i = 0; i < 3; i++) {
                resource_type.push(models.value[0][i].resource.name)
                resource_prod.push(models.value[0][i].generate_per_minute)
                level.push(models.value[0][i].upgrade_base_value)
                id.push(models.value[0][i].id)
            }
            visible.value = true
        }

        const chooseFactory = (id_choosed) => {
            gameStore.createFactory(id_choosed)
            gameStore.getFactoriesModels();
            visible.value = false
        }


        const getModal = (event) => {
            const factoryId = event.target.id
            gameStore.getFactoryModal(factoryId)
        }


        return {
            cancel,
            gacha,
            addFactory,
            chooseFactory,
            getModal,
            visible,
            test,
            resource_type,
            resource_prod,
            level,
            factories,
            userStore,
            active,
            id

        }
    }
})

</script>

<style lang="scss">
.btn_div {
    display: flex;
}


.btn_parent {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

    .btn_child {
        max-width: 80px;
        height: 110%;
        flex: 1 0;
        padding: 5px 0;
        border-radius: 8px;
        width: fit-content;
        background-color: #165ed2;
        color: white;
        font-size: 12px;
    }

    .btn_child_disabled {
        max-width: 80px;
        height: 110%;
        flex: 1 0;
        padding: 5px 0;
        border-radius: 8px;
        width: fit-content;
        background-color: #505050;
        color: white;
        text-decoration: line-through;
        font-size: 12px;
    }

    .btn_child_cancel {
        max-width: 80px;
        height: 110%;
        flex: 1 0;
        padding: 5px 0;
        border-radius: 8px;
        width: fit-content;
        background-color: #d21616;
        color: white;
        font-size: 12px;
    }
}


.box_gacha {
    display: flex;
    justify-content: space-evenly;
    z-index: 1000;
    background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab);
    background-size: 400% 400%;
    animation: gradient 25s ease infinite;

    @keyframes gradient {
        0% {
            background-position: 0% 50%;
        }

        50% {
            background-position: 100% 50%;
        }

        100% {
            background-position: 0% 50%;
        }
    }

}


.box-factory-card {
    width: 60%;
    border-style: solid;
    border-color: rgb(94, 94, 94);
    border-width: thin;
    border-radius: 15px;
    justify-content: center;
    margin-left: 5%;
    min-height: 80vh;
}

.filterDiv {
    height: fit-content;
}
</style>
