<template>
    <div class="user-card">
        <CardProfile :user="userData"></CardProfile>
        <div class="user-card-separator"></div>
        <CardResource :rss="rss"></CardResource>
    </div>

</template>

<script>
import { defineComponent, computed } from "vue";
import CardProfile from "@/components/cards/CardProfile.vue"
import CardResource from "@/components/cards/CardResource.vue"

export default defineComponent({
    components: {
        CardProfile,
        CardResource,
    },
    props: {
        user: {
            type: Object,
            required: false,
            default: () => { },
        },
        rss: {
            type: Array,
            required: false,
            default: () => [],
        }
    },
    setup(props) {
        const userData = computed(() => props.user);

        return {
            userData,
        }
    }
})
</script>

<style lang="scss">
.user-card {
    width: fit-content;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 15px;
    box-shadow: 0px 0px 5px black;
    padding: 15px 40px;
    overflow: hidden;
    gap: 2rem;
    height: 40vh;

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
</style>