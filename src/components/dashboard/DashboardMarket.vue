<template>
	<div class="market-dashboard container mx-auto px-4 sm:px-8">
		<div class="market-dashboard-inner">
			<div>
				<h2 class="text-3xl font-semibold leading-tight">Trading market</h2>
				<div class="market-dashboard-filter">
					<div class="market-dashboard-addoffer">
					<button @click="placeAnOffer" class="container flex justify-end">Create an offer</button>
					</div>
					<div class="market-dashboard-select">
						<span>Sort options :</span>
						<DropdownFilter id="sort" row="single" mode="single" :selected="1" :options="sortOptions"
							:placeholder="`Sort method`" verbose="no-verbose" tag_color="blue" caret_size="22px" :caret_up="false"
							dropdown_gap="medium" @select="updateSortBy" class="max-width"/>
					</div>
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
		<FilterPagination
			v-model:page="page" :max="maxPage"
		>
		</FilterPagination>

		<OverlayComp
			v-model:active="active"
			:fullSize="false"
			crossColor="#165ed2"
		>
			<MarketNewTrade
				v-model:active="active"
			></MarketNewTrade>
		</OverlayComp>
	</div>
</template>

<script>
import MarketCell from '@/components/dashboard/cells/MarketCell.vue';
import OverlayComp from '@/components/utils/OverlayComp.vue';
import MarketNewTrade from '../forms/MarketNewTrade.vue';
import { ref, computed, watch } from 'vue';
import FilterPagination from '../FilterPagination.vue';
import { useMarketStore } from '@/stores/market.store';
import DropdownFilter from '../filter/DropdownFilter.vue';
// import Swal from 'sweetalert2';

export default {
	components: {
		MarketCell,
		OverlayComp,
		MarketNewTrade,
		FilterPagination,
		DropdownFilter,
	},
	setup() {
		//! Uncomment if trades available.
		const marketStore = useMarketStore();

		// const per_page = ref(8);
		// const sort = computed(() => marketStore.sortBy);
		const page = computed(() => marketStore.paginationPage);
		const maxPage = computed(() => Math.ceil(marketStore.filteredTrades.length / 8) || 0);
		const offers = computed(() => marketStore.paginationTrades);
		const sortOptions = ["None", "Quantity", "Unit Price"];
		//! List

		// const max = computed(() => /* offers.length */ 1 );

		// const offers = computed(() => [
		// 	{
		// 		quantity: 10,
		// 		unitPrice: 100,
		// 		resource: {
		// 			name:"Bois",
		// 		},
		// 		owner: {
		// 			username:"Bill",
		// 		}
		// 	}, 
		// 	{
		// 		quantity: 2,
		// 		unitPrice: 9999,
		// 		resource: {
		// 			name:"Fer",
		// 		},
		// 		owner: {
		// 			username:"Bob",
		// 		}
		// 	},
		// 	{
		// 		quantity: 1,
		// 		unitPrice: 1,
		// 		resource: {
		// 			name:"Plastic",
		// 		},
		// 		owner: {
		// 			username:"Sam",
		// 		}
		// 	},
		// 	{
		// 		quantity: 1,
		// 		unitPrice: 1,
		// 		resource: {
		// 			name:"Plastic",
		// 		},
		// 		owner: {
		// 			username:"Sam",
		// 		}
		// 	},
		// 	{
		// 		quantity: 1,
		// 		unitPrice: 1,
		// 		resource: {
		// 			name:"Plastic",
		// 		},
		// 		owner: {
		// 			username:"Sam",
		// 		}
		// 	},
		// 	{
		// 		quantity: 1,
		// 		unitPrice: 1,
		// 		resource: {
		// 			name:"Plastic",
		// 		},
		// 		owner: {
		// 			username:"Sam",
		// 		}
		// 	},			{
		// 		quantity: 1,
		// 		unitPrice: 1,
		// 		resource: {
		// 			name:"Plastic",
		// 		},
		// 		owner: {
		// 			username:"Sam",
		// 		}
		// 	},
		// 	{
		// 		quantity: 1,
		// 		unitPrice: 1,
		// 		resource: {
		// 			name:"Plastic",
		// 		},
		// 		owner: {
		// 			username:"Sam",
		// 		}
		// 	},
		// ])
 
		const active = ref(false);

		const updateSortBy = (sortName) => {
			marketStore.setSortMethod(sortName);
		}

		const placeAnOffer = () => {
			active.value = true;
		}

		watch(active, val => {
			if(!val) {
				// Swal.fire({
				// 	icon: 'success',
				// 	title: 'Success',
				// 	text: 'Test efzfzefzef',
				// })
			}
		})

		return {
			updateSortBy,
			placeAnOffer,
			sortOptions,
			maxPage,
			offers,
			active,
			page,
		}
	}
}
</script>

<style lang="scss" scoped>
.max-width {
	min-width: 170px;
	max-width: 170px;
}

.market-dashboard {
	display: flex;
	box-shadow: 0px 0px 5px black;
	background-color: white;
	gap: 2rem;
	flex: 1 0;

	&-filter {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	&-select {
		// width: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 1rem;

		span {
			width: 60%;
		}
	}

	&-inner {
		padding-top: 1rem;

		h2 {
			margin-bottom: 20px;
		}
	}

	&-addoffer {
		width: fit-content;
		display: flex;
		align-items: center;
		justify-content: flex-start;

		button {
			display: flex;
			align-items: center;
			justify-content: center;
			padding: 7.5px 10px;
			border-radius: 8px;
			width: fit-content;
			background-color: #165ed2;
			color: white;
			font-size: 14px;
			height: 40px;
		}
	}
}
</style>