<template>
	<div class="container mx-auto px-4 sm:px-8">
		<div class="py-8">
			<div>
				<h2 class="text-2xl font-semibold leading-tight">Factories</h2>
			</div>
			<div class="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
				<div class="inline-block min-w-full shadow rounded-lg overflow-hidden">
					<table class="min-w-full leading-normal">
						<thead>
							<tr>
								<th
									class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
									Owner
								</th>
								<th
									class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
									Level
								</th>
								<th
									class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
									Generate Per Minute
								</th>
								<th
									class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
									Resource
								</th>
								<th
									class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
									edit
								</th>
							</tr>
						</thead>
						<tbody>
							<FactoriesCard v-for="(factory, index) in factories" :key='index' :factory="factory" />
						</tbody>
					</table>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { useAdminStore } from '@/stores/admin.store';
import { computed  } from "vue";
import FactoriesCard from './FactoriesCard.vue';

export default {
	components: { FactoriesCard },
    setup() {
        const adminStore = useAdminStore();
        const factories = computed(() => adminStore.factories);
        adminStore.getAllFactories();
        return {
            factories,
        };
    },
}
</script>