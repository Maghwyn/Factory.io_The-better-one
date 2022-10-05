<template>
	<tr>
		<td class="px-5 py-5 border-b border-gray-200 bg-white text-sm w-2/5">
			<div class="flex items-center">
				<div class="flex-shrink-0 w-10 h-10 hidden sm:table-cell">
					<img class="w-full h-full rounded-full" :src="ressources.image_url" alt="" />
				</div>
				<div class="ml-3">
					<p class="text-gray-900 whitespace-no-wrap">
						{{ressources.name}}
					</p>
				</div>
			</div>
		</td>
		<td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
			<p class="text-gray-900 whitespace-no-wrap text-center">{{ressources.base_value}}
			</p>
		</td>
		<td>
			<div class="flex item-center justify-center">
				<div @click="openForm" class="w-4 mr-2 transform hover:text-purple-500 hover:scale-110 cursor-pointer">
					<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
							d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
					</svg>
				</div>
				<div @click="deleteRessource" class="w-4 mr-2 transform hover:text-purple-500 hover:scale-110 cursor-pointer">
					<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
							d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
					</svg>
				</div>
			</div>
		</td>
	</tr>
	<OverlayComp v-model:active="active" :fullSize="false">
		<RessourcesEditForm v-model:active="active"/>
	</OverlayComp>
</template>

<script>
import OverlayComp from '../utils/OverlayComp.vue';
import { ref } from "vue";
import RessourcesEditForm from './RessourcesEditForm.vue';

export default {
	props: {
		ressources: { type: Object, required: true }
	},
	components: {
    OverlayComp,
    RessourcesEditForm
},
	setup() {
		const active = ref(false)

		const openForm = () => {
			active.value = true
		}

		const deleteRessource = () => {
			console.log("ressources deleted");
		}
		return {
			active,
			openForm,
			deleteRessource
		}
	}
}
</script>