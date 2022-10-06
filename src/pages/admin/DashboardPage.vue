<template>
	<div>
		<RessourcesCells />
		<UsersCells />
		<ModelsTable />
		<FactoriesTable />
	</div>
</template>

<script>
import RessourcesCells from '@/components/Admin/ressources/RessourcesCells.vue';
import UsersCells from '@/components/Admin/users/UsersCells.vue';
import ModelsTable from '@/components/Admin/modelsFactories/ModelsTable.vue';
import FactoriesTable from '@/components/Admin/factories/FactoriesTable.vue';

export default {
	components: { RessourcesCells, UsersCells, ModelsTable, FactoriesTable },
    }
</script>