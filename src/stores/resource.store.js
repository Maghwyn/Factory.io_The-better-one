import { defineStore } from 'pinia';
import { pick } from '@/scripts/helpers/pick.js';
import { createOneResource, getAllResources, getOneResource } from '@/API/resource.req';

const resourceStoreDefaultState = () => {
	return {
		
	}
}

export const useResourceStore = defineStore('resource', {
	state: () => resourceStoreDefaultState(),
	actions: {
		async createResource() {
			// TODO
			await createOneResource(null);
		},
		async getAllResources() {
			// TODO
			await getAllResources();
		},
		async getSingleResource() {
			// TODO
			await getOneResource(null);
		},
		reset(keys) {
			Object.assign(this, keys?.length
				? pick(resourceStoreDefaultState(), keys)
				: resourceStoreDefaultState() // if no keys provided, reset all
			);
		}
	}
})