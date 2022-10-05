<template>
	<div>
		<RessourcesCells />


	</div>
</template>

<script>
import { useAdminStore } from "../../stores/admin.store";
import { onMounted } from "vue";
import RessourcesCells from '@/components/Admin/RessourcesCells.vue';

export default {
	components: { RessourcesCells },
    setup() {
        const adminStore = useAdminStore();

        onMounted(() => {
            adminStore.getAllFactories();
            adminStore.getAllUsers();
            adminStore.getAllRessources();
        });
        return {
            adminStore,
        };
    },
}
</script>