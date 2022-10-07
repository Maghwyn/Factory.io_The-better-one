<template>
	<div class="container">
		<div>
			<SelectedOptionsNav :options="options" @changeOption="changeOption" />
		</div>
		<template v-if="isLoading">
			<LoadingComp />
			<div></div>
		</template>
		<template v-else>
			<RessourcesCells v-if="options === 1" />
			<UsersCells v-if="options === 2" />
			<ModelsTable v-if="options === 3" />
			<FactoriesTable v-if="options === 4" />
		</template>
	</div>
</template>

<script>
import RessourcesCells from '@/components/Admin/ressources/RessourcesCells.vue';
import UsersCells from '@/components/Admin/users/UsersCells.vue';
import ModelsTable from '@/components/Admin/modelsFactories/ModelsTable.vue';
import FactoriesTable from '@/components/Admin/factories/FactoriesTable.vue';
import SelectedOptionsNav from '@/components/Admin/SelectedOptionsNav.vue';
import { ref } from "vue";
import LoadingComp from '@/components/utils/LoadingComp.vue';
import { useAdminStore } from '@/stores/admin.store';

export default {
	components: { RessourcesCells, UsersCells, ModelsTable, FactoriesTable, SelectedOptionsNav, LoadingComp },
	setup() {
		const adminStore = useAdminStore()
		const options = ref(1)
		const isLoading = ref(false)

		adminStore.getAllFactories();
		adminStore.getAllModels();
		adminStore.getAllRessources();
		adminStore.getAllUsers();
		const changeOption = (optionSelected) => {
			isLoading.value = true
			options.value = optionSelected
			setTimeout(() => isLoading.value = false, 1000)
		}

		return {
			options,
			changeOption,
			isLoading
		}
	}
}
</script>

<style lang="scss" scoped>
.container {
	display: flex;
	flex-direction: column;
	width: 100%;
	height: 100%
}
</style>