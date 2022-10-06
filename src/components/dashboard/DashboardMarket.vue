<template>
	<div class="market-dashboard container mx-auto px-4 sm:px-8">
		<div class="py-8">
			<div>
				<h2 class="text-3xl font-semibold leading-tight">Trading market</h2>
				<div class="market-dashboard-addoffer">
					<button @click="placeAnOffer" class="container flex justify-end">Déposer une offre</button>
				</div>
			</div>
			<div class="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
				<div class="inline-block min-w-full shadow rounded-lg overflow-hidden">
					<table class="min-w-full leading-normal">
						<thead>
							<tr>
								<th
									class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
									Seller
								</th>
								<th
									class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
									Resource
								</th>
								<th
									class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
									Quantity
								</th>
								<th
									class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
									Unit Price
								</th>
								<th
									class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
									Action
								</th>
							</tr>
						</thead>
						<tbody>
							<MarketCell v-for="(offer, key) in offers" :key='key' :offer="offer" />
						</tbody>
					</table>
				</div>
			</div>
		</div>
		<OverlayComp
			v-model:active="active"
			:fullSize="false"
			crossColor="#165ed2"
		>
			THIS IS WHERE THE OFFER FORM IS
		</OverlayComp>
	</div>
</template>

<script>
import MarketCell from '@/components/dashboard/cells/MarketCell.vue';
import OverlayComp from '@/components/utils/OverlayComp.vue';
import { ref, computed } from 'vue';

export default {
	components: {
		MarketCell,
		OverlayComp,
	},
	setup() {
		const active = ref(false);
		const offers = computed(() => [
			{
				quantity: 10,
				unitPrice: 100,
				resource: {
					name:"Bois",
				},
				owner: {
					username:"Bill",
				}
			}, 
			{
				quantity: 2,
				unitPrice: 9999,
				resource: {
					name:"Fer",
				},
				owner: {
					username:"Bob",
				}
			},
			{
				quantity: 1,
				unitPrice: 1,
				resource: {
					name:"Plastic",
				},
				owner: {
					username:"Sam",
				}
			}
		])

		const placeAnOffer = () => {
			active.value = true;
		}

		return {
			placeAnOffer,
			offers,
			active,
		}
	}
}
</script>

<style lang="scss" scoped>
.market-dashboard {
	box-shadow: 0px 0px 5px black;
	flex: 1 0;

	&-addoffer {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: flex-start;

		button {
			padding: 7.5px 10px;
			border-radius: 8px;
			width: fit-content;
			background-color: #165ed2;
			color: white;
			font-size: 14px;
		}
	}
}
</style>