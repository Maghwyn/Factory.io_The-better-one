<template>
	<div>
		<RessourcesCells />
		<UsersCells />
		<ModelsTable />
	</div>
</template>

<script>
import { useAdminStore } from "../../stores/admin.store";
import RessourcesCells from '@/components/Admin/ressources/RessourcesCells.vue';
import UsersCells from '@/components/Admin/users/UsersCells.vue';
import ModelsTable from '@/components/Admin/modelsFactories/ModelsTable.vue';

export default {
	components: { RessourcesCells, UsersCells, ModelsTable },
    setup() {
        const adminStore = useAdminStore();

            adminStore.getAllFactories();
            adminStore.getAllRessources();

        return {
            adminStore,
        };
    },
}
</script>