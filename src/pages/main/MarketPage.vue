<template>
	<div>
		<div>
			<UserTestCard></UserTestCard>
		</div>
		<div>
		</div>
	</div>
</template>

<script>
import UserTestCard from "@/components/cards/UserTestCard.vue";
import { defineComponent } from "vue";

export default defineComponent({
	components: {
		UserTestCard
	}
})
</script>