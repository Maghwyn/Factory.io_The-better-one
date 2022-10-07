<template>
		<tr>
		<td class="px-5 py-5 border-b border-gray-200 bg-white text-sm w-2/5">
			<div class="flex items-center">
				<div class="ml-3">
					<p class="text-gray-900 whitespace-no-wrap">
						{{user.username}}
					</p>
				</div>
			</div>
		</td>
		<td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
			<p class="text-gray-900 whitespace-no-wrap text-center">{{user.id}}
			</p>
		</td>
		<td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
			<p class="text-gray-900 whitespace-no-wrap text-center">{{user.factory_limit}}
			</p>
		</td>
		<td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
			<p class="text-gray-900 whitespace-no-wrap text-center">{{ new Date(user.createdAt).toLocaleDateString()}}
			</p>
		</td>
	</tr>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
	props: {
		user: { type: Object, required: true}
	}
})

</script>

<style lang="scss" scoped>

</style>