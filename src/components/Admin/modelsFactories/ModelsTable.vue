<template>
	<div class="container mx-auto px-4 sm:px-8">
		<div class="py-8">
			<div>
				<h2 class="text-2xl font-semibold leading-tight">Models</h2>
				<div>
					<button @click="addModels" class="container flex justify-end">Ajouter un model</button>
				</div>
			</div>
			<div class="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
				<div class="inline-block min-w-full shadow rounded-lg overflow-hidden">
					<table class="min-w-full leading-normal">
						<thead>
							<tr>
								<th
									class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
									Name
								</th>
								<th
									class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
									ressource ID
								</th>
								<th
									class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
									Base Value
								</th>
								<th
									class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
									upgrade_coef
								</th>
								<th
									class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
									upgrade_resource_id
								</th>
								<th
									class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
									generate_per_minute
								</th>
								<th
									class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
									edit
								</th>
							</tr>
						</thead>
						<tbody>
							<ModelCard v-for="(model, index) in models" :key='index' :model="model" />
						</tbody>
					</table>
				</div>
			</div>
		</div>
		<OverlayComp v-model:active="active" :fullSize="false">
			<CreateModel v-model:active="active" />
		</OverlayComp>
	</div>
</template>

<script>
import { useAdminStore } from '@/stores/admin.store';
import { computed, ref } from "vue";
import ModelCard from "./ModelCard.vue";
import OverlayComp from '@/components/utils/OverlayComp.vue';
import CreateModel from './CreateModel.vue';

export default {
	components: {
		ModelCard,
		OverlayComp,
		CreateModel
	},
	setup() {
		const adminStore = useAdminStore();
		const models = computed(() => adminStore.modelsFactories)
		const active = ref(false);


		const addModels = () => {
			active.value = true
		}

		return {
			models,
			addModels,
			active
		}
	}
}
</script>