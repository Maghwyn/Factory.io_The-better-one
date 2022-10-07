<template>
    <div class="user-card">
        <CardProfile></CardProfile>
        <div class="user-card-button" v-if:="route.path === '/app/market'">
            <button @click="open()" class="container flex justify-end">Upgrade factory Limit</button>
        </div>
        <div class="user-card-separator">
            <span>Resources</span>
        </div>
        <CardResource></CardResource>


        <OverlayComp v-model:active="active">
            <div class="bg-slate-800 bg-opacity-50 flex justify-center items-center">
                <div class="bg-white px-16 py-14 rounded-md text-center">
                    <h3 class="text-xl mb-4 font-bold text-slate-500">Do you want to uphrade your factory limit ? ({{
                    priceFactoryLimit.cost }})</h3>
                    <p> Current money : {{ inventory.money }}</p>
                    <div class="btn_div">
                        <div class="btn_parent">
                            <button @click="cancel()" class="btn_child_cancel">Cancel</button>
                        </div>
                        <div class="btn_parent">
                            <button v-if="inventory.money < priceFactoryLimit.cost" disabled
                                class="btn_child_disabled">Pay
                                {{priceFactoryLimit.cost}}</button>
                            <button v-else @click="upgradeFactoryLimit()" class="btn_child">
                                Pay {{priceFactoryLimit.cost}}
                            </button>
                        </div>
                    </div>
                    <p v-if="inventory.money < priceFactoryLimit">You don't have enought money</p>
                </div>
            </div>
        </OverlayComp>

    </div>
</template>

<script>
import OverlayComp from '@/components/utils/OverlayComp.vue'
import { defineComponent, computed, ref } from "vue";
import CardProfile from "@/components/cards/CardProfile.vue"
import CardResource from "@/components/cards/CardResource.vue"
import { useUserStore } from "@/stores/user.store";
import { useRoute } from "vue-router";

export default defineComponent({
    components: {
        CardProfile,
        CardResource,
        OverlayComp
    },
    props: {
        user: {
            type: Object,
            required: false,
            default: () => { },
        },
    },
    setup(props) {
        const active = ref(false)
        const route = computed(() => useRoute());
        const userStore = useUserStore();
        const inventory = computed(() => userStore.inventory);
        const userData = computed(() => props.user);
        const priceFactoryLimit = computed(() => userStore.nextFactoryPrice);
        userStore.checkPriceFactoryLimit();
        setInterval(userStore.getMyInventory, 30000);

        const upgradeFactoryLimit = () => {
            userStore.buyFactoryLimit()
            userStore.checkPriceFactoryLimit();
            active.value = false
        }

        const cancel = () => {
            active.value = false
        }
        const open = () => {
            active.value = true
        }

        return {
            cancel,
            open,
            upgradeFactoryLimit,
            priceFactoryLimit,
            userData,
            inventory,
            route,
            active
        }
    }
})
</script>

<style lang="scss">
.user-card-button {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-start;

    button {
        padding: 7.5px 10px;
        border-radius: 8px;
        width: fit-content;
        background-color: #165ed2;
        color: white;
        font-size: 14px;
    }

}

.btn_div {
    display: flex;
    justify-content: space-between;
}

.user-card {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 15px;
    box-shadow: 0px 0px 5px black;
    padding: 15px 40px;
    overflow: hidden;
    gap: 1.5rem;
    background-color: white;

    &-separator {
        height: 1px;
        width: 100%;
        border: .5px solid black;
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;

        span {
            position: absolute;
            background-color: white;
            padding: 10px;
        }
    }
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
</style>