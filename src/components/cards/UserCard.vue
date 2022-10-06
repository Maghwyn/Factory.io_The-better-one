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
            default: () => { },
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

<style>

</style>