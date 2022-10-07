<template>
    <div class="box-factory-card">
        <div class="w-full flex justify-between filterDiv">

            <!-- <DropdownFilter></DropdownFilter> -->

            <DropdownFilter id="factories" row="double-no-gap" mode="tags" :options="test" :canClear="true"
                :placeholder="`Filters`" verbose="no-verbose" tag_color="blue" caret_size="22px" :caret_up="true"
                dropdown_gap="medium" />

            <button @click="addFactory" type="button"
                class="text-gray-900 hover:text-white border border-gray-800 hover:bg-gray-900 font-medium rounded-lg text-sm px-5 py-2 text-center mr-2 mb-2 mt-2 dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800 h-9">
                Add Factory
            </button>

        </div>

        <div v-if="factories.length > 0" class="flex w-full flex-wrap justify-around">
            <FactoryCard v-for="(item, index) in factories" :key="index" :level="item.level" @click="getModal($event)"
                :id="item.id" :resource_prod="item.model.generate_per_minute" :resource_type="item.model.resource.name">
            </FactoryCard>
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
                    <h3 class="text-xl mb-4 font-bold text-slate-500" v-if="factories.length == 0">Do you want to buy a
                        factory ? (40)</h3>
                    <h3 v-else class="text-xl mb-4 font-bold text-slate-500">Do you want to buy a factory ? ({{
                    priceOfFactory }})</h3>
                    <p> Current money : {{ money }}</p>
                    <div class="btn_div">
                        <div class="btn_parent">
                            <button @click="cancel()" class="btn_child_cancel">Cancel</button>
                        </div>
                        <div class="btn_parent" v-if="charged">
                            <button @click="gacha()" v-if="factories.length == 0" class="btn_child">
                                Pay 40
                            </button>
                            <button v-else-if="factoryLimit <= factories.length" disabled class="btn_child_disabled">
                                Pay {{priceOfFactory}}
                            </button>
                            <button v-else-if="money < priceOfFactory" disabled class="btn_child_disabled">Pay
                                {{priceOfFactory}}</button>
                            <button v-else @click="gacha()" class="btn_child">
                                Pay {{priceOfFactory}}
                            </button>
                        </div>
                    </div>
                    <p v-if="factoryLimit <= factories.length">You need to
                        upgrade your factory limit in the market</p>
                    <p v-if="money < priceOfFactory">You don't have enought money</p>
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
//import { createFactoriesSelector } from "@/scripts/helpers/ValidateOffer";
import { useUserStore } from '@/stores/user.store'

export default defineComponent({
    components: { FactoryCard, DropdownFilter, OverlayComp },
    setup() {
        const active = ref(false)
        const userStore = useUserStore();
        const gameStore = useGameStore();
        gameStore.getFactoriesModels()
        gameStore.getAllUserFactories();
        userStore.checkPriceFactoryLimit()
        const models = computed(() => gameStore.models);
        const visible = ref(false)
        const factories = computed(() => gameStore.factories);
        //const form = createFactoriesSelector();
        const inventory = computed(() => userStore.inventory)
        const money = computed(() => inventory.value.money)
        const priceOfFactory = computed(() => Math.pow(8, factories.value.length + 1));
        const charged = ref(false)
        const factoryLimit = computed(() => userStore.nextFactoryPrice.factory_limit)
        const test = [
            "Hello", "Welcome", "Whatever"
        ]

        var resource_type = []
        var resource_prod = []
        var level = []
        var id = []



        watch(inventory, val => {
            console.log(val);
            charged.value = true
        }, { deep: true })

        const addFactory = () => {
            console.log(factories.value)
            active.value = true
        }

        const market = () => {
            this.$router.push("/market")
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
                console.log(models.value)
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
            userStore.getMyInventory();
            resource_type = []
            level = []
            resource_prod = []
            id = []
            visible.value = false
        }

        const getModal = (event) => {
            var factoryId = ""
            if (event.target.id == '') {
                factoryId = event.target.parentNode.id
                if (event.target.parentNode.id == '') {
                    factoryId = event.target.parentNode.parentNode.id
                }
            } else {
                factoryId = event.target.id
            }
            gameStore.getFactoryModal(factoryId)
        }

        return {
            market,
            cancel,
            gacha,
            addFactory,
            chooseFactory,
            getModal,
            charged,
            visible,
            test,
            resource_type,
            resource_prod,
            level,
            factories,
            active,
            id,
            priceOfFactory,
            money,
            factoryLimit

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
    border-style: solid;
    border-color: rgb(94, 94, 94);
    background-color: white;
    padding: 15px;
    border-width: thin;
    border-radius: 15px;
    justify-content: center;
    min-height: 100%;
}

.filterDiv {
    height: fit-content;
    display: flex;
    align-items: flex-start;
}
</style>
