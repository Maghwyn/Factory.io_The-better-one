<template>
	<div>
		<RessourcesCells />
		<UsersCells />
	</div>
</template>

<script>
import { useAdminStore } from "../../stores/admin.store";
import RessourcesCells from '@/components/Admin/ressources/RessourcesCells.vue';
import UsersCells from '@/components/Admin/users/UsersCells.vue';

export default {
	components: { RessourcesCells, UsersCells },
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