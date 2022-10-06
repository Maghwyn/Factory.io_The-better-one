<template>
	<tr class="market-dashboard-cell">
		<td class="px-5 py-2 border-b border-r border-gray-200 bg-white text-sm">
			<div class="market-dashboard-cell-user flex items-center">
				<div class="flex-shrink-0 w-8 h-8 hidden sm:table-cell">
					<img class="w-full h-full rounded-full" src="https://d.wattpad.com/story_parts/737845095/images/15a2c96351dcd0a5170250432904.jpg" alt="user_img" />
				</div>
				<div class="ml-3">
					<p class="text-gray-900 whitespace-no-wrap">
						{{ offer.owner.username }}
					</p>
				</div>
			</div>
		</td>
		<td class="px-5 py-2 border-b border-r border-gray-200 bg-white text-sm">
			<p class="text-gray-900 whitespace-no-wrap text-center">
				{{ offer.resource.name }}
			</p>
		</td>
		<td class="px-5 py-2 border-b border-r border-gray-200 bg-white text-sm">
			<p class="text-gray-900 whitespace-no-wrap text-center">
				{{ offer.quantity }}
			</p>
		</td>
		<td class="px-5 py-2 border-b border-r border-gray-200 bg-white text-sm">
			<p class="text-gray-900 whitespace-no-wrap text-center">
				{{ offer.unitPrice }}
			</p>
		</td>
		<td class="px-5 py-2 border-b border-gray-200 bg-white text-sm">
			<div class="flex item-center justify-center">
				<div class="action" v-if="isOfferOfUser">
					<button class="offer-buy" @click="buyOffer">BUY</button>
				</div>
				<div class="action" v-else>
					<button class="offer-cancel" @click="cancelOffer">CANCEL</button>
				</div>
			</div>
		</td>
		<OverlayComp
			v-model:active="activeBuy"
			:fullSize="false"
			crossColor="#165ed2"
		>
			<OverlayConfirm
				:tradeId="offer.id"
				v-model:active="activeBuy"
			></OverlayConfirm>
		</OverlayComp>

		<OverlayComp
			v-model:active="activeCancel"
			:fullSize="false"
			crossColor="#f03d3d"
		>
			<OverlayCancel
				:tradeId="offer.id"
				v-model:active="activeCancel"
			></OverlayCancel>
		</OverlayComp>
	</tr>
</template>

<script>
import OverlayComp from '@/components/utils/OverlayComp.vue';
import OverlayCancel from '@/components/overlay/OverlayCancel.vue';
import OverlayConfirm from '@/components/overlay/OverlayConfirm.vue';
import { ref, computed } from "vue";

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

export default {
	props: {
		offer: { type: Object, required: true }
	},
	components: {
		OverlayComp,
		OverlayCancel,
		OverlayConfirm,
	},
	setup() {
		const activeBuy = ref(false);
		const activeCancel = ref(false);
		const isOfferOfUser = computed(() => getRandomInt(2) === 1);

		const buyOffer = () => {
			activeBuy.value = true;
		}

		const cancelOffer = () => {
			activeCancel.value = true;
		}

		return {
			cancelOffer,
			buyOffer,
			isOfferOfUser,
			activeCancel,
			activeBuy,
		}
	}
}
</script>

<style lang="scss" scoped>
div > #app > .market > .market-dashboard-cell {
	max-height: 10px !important;
}


.market-dashboard-cell {
	.action {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		
		.offer {
			&-buy {
				max-width: 80px;
				flex: 1 0;
				padding: 5px 0;
				border-radius: 8px;
				width: fit-content;
				background-color: #165ed2;
				color: white;
				font-size: 12px;
			}

			&-cancel {
				max-width: 80px;
				flex: 1 0;
				padding: 5px 0;
				border-radius: 8px;
				width: fit-content;
				background-color: #f03d3d;
				color: white;
				font-size: 12px;
			}
		}
	}
}
</style>