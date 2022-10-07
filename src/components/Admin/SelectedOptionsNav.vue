<template>
	<div id="contain" class="leading-8 mb-10 text-lg font-light flex">
		<div  class="w-full mt-10 px-6">
			<button @click="$emit('changeOption', 1)" :class="options === 1 ? 'active' : ''"
				class="w-full block bg-gray-900 font-medium text-xl py-4 rounded-xl hover:shadow-lg transition duration-200 ease-in-out hover:bg-indigo-600 text-slate-300 hover:text-white">Ressources</button>
		</div>
		<div  class="w-full mt-10 px-6">
			<button @click="$emit('changeOption', 2)" :class="options === 2 ? 'active' : ''"
				class="w-full block bg-gray-900 font-medium text-xl py-4 rounded-xl hover:shadow-lg transition duration-200 ease-in-out hover:bg-indigo-600 text-slate-300 hover:text-white">List of users</button>
		</div>
		<div  class="w-full mt-10 px-6">
			<button @click="$emit('changeOption', 3)" :class="options === 3 ? 'active' : ''"
				class="w-full block bg-gray-900 font-medium text-xl py-4 rounded-xl hover:shadow-lg transition duration-200 ease-in-out hover:bg-indigo-600 text-slate-300 hover:text-white">Models</button>
		</div>
		<div  class="w-full mt-10 px-6">
			<button @click="$emit('changeOption', 4)" :class="options === 4 ? 'active' : ''"
				class="w-full block bg-gray-900 font-medium text-xl py-4 rounded-xl hover:shadow-lg transition duration-200 ease-in-out hover:bg-indigo-600 text-slate-300 hover:text-white">Factories</button>
		</div>
	</div>
</template>

<script>
	import { defineComponent } from "vue";
	export default defineComponent({
		props: {
			options: { type: Number, required: true }
		}
	})
</script>

<style lang="scss" scoped>

	.active {
		background-color: rgb(79 70 229);
		color: white;
		box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
	}
</style>