<template>
	<div class="market">
		<div class="market-settings">
			<UserTestCard></UserTestCard>
			<MarketFilter></MarketFilter>
		</div>
		<div>
		</div>
	</div>
</template>

<script>
import UserTestCard from "@/components/cards/UserTestCard.vue";
import MarketFilter from "@/components/filter/MarketFilter.vue";
import { defineComponent } from "vue";

export default defineComponent({
	components: {
		UserTestCard,
		MarketFilter
	}
})
</script>

<style lang="scss">
.market {
	width: 100%;
	height: 100%;
	padding: 15px;
	display: flex;
	align-items: flex-start;
	justify-content: flex-start;
	gap: 1rem;

	&-settings {
		max-width: 320px;
		display: flex;
		flex-direction: column;
		height: 100%;
		gap: 1rem;
	}
}
</style>