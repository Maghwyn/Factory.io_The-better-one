<template>
	<div>
		<RessourcesCells />


	</div>
</template>

<script>
import { useAdminStore } from "../../stores/admin.store";
import RessourcesCells from '@/components/Admin/ressources/RessourcesCells.vue';

export default {
	components: { RessourcesCells },
    setup() {
        const adminStore = useAdminStore();

            adminStore.getAllFactories();
            adminStore.getAllUsers();
            adminStore.getAllRessources();

        return {
            adminStore,
        };
    },
}
</script>