import { defineStore } from 'pinia';
import { pick } from '@/scripts/helpers/pick.js';
import { createOneResource, getAllResources, getOneResource } from '@/API/resource.req';
import { useUserStore } from './user.store';

const resourceStoreDefaultState = () => {
	return {
		resources: [],
	}
}

export const useResourceStore = defineStore('resource', {
	state: () => resourceStoreDefaultState(),
	getters: {
		displayUserRss: state => {
			const userStore = useUserStore();
			const inventory = userStore.inventory;
			const allResources = state.resources;
			const unfound = [];
			const found = [];

			for (let n = 0; n < allResources.length; n++) {
				const resource = allResources[n];
				const invRss = inventory.inventory_resources || [];
				const index = invRss.findIndex((rss) => rss.resource.id === resource.id);
				if (index === -1) unfound.push({ name: resource.name, quantity: 0, id: resource.id });
				else found.push({ name: resource.name, quantity: invRss[index].quantity, id: resource.id });
			}

			return {
				unfound,
				found,
			}
		}
	},
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
			console.log("ressou", this.resources);
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