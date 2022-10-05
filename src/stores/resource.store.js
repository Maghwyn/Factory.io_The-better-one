import { defineStore } from 'pinia';
import { pick } from '@/scripts/helpers/pick.js';
import { createOneResource, getAllResources, getOneResource } from '@/API/resource.req';

const resourceStoreDefaultState = () => {
	return {
		resources: [],
	}
}

export const useResourceStore = defineStore('resource', {
	state: () => resourceStoreDefaultState(),
	actions: {
		async createResource(resourceName, imageUrl, baseValue) {
			const res = await createOneResource(resourceName, imageUrl, baseValue);
			if(res?.response !== undefined) return;

			const resource = res.data;
			if(!resource) return;
			
			this.resources.push(resource);
		},
		async getAllResources() {
			const res = await getAllResources();
			if(res?.response !== undefined) return;

			const resources = res.data || [];
			if(resources.length < 1) return;

			this.resources = resources;
		},
		async getSingleResource(resourceId) {
			const res = await getOneResource(resourceId);
			if(res?.response !== undefined) return {};

			const resource = res.data;
			if(!resource) return {};

			return resource;
		},
		reset(keys) {
			Object.assign(this, keys?.length
				? pick(resourceStoreDefaultState(), keys)
				: resourceStoreDefaultState() // if no keys provided, reset all
			);
		}
	}
})