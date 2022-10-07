<template>
	<div class="container mx-auto px-4 sm:px-8">
		<div class="py-8">
			<div>
				<h2 class="text-2xl font-semibold leading-tight">Factories</h2>
			</div>
			<div class="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
				<div class="inline-block min-w-full shadow rounded-lg overflow-hidden">
					<table class="min-w-full leading-normal">
						<thead>
							<tr>
								<th
									class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
									Owner
								</th>
								<th
									class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
									Level
								</th>
								<th
									class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
									Generate Per Minute
								</th>
								<th
									class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
									Resource
								</th>
								<th
									class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
									edit
								</th>
							</tr>
						</thead>
						<tbody>
							<FactoriesCard v-for="(factory, index) in factoriesDisplayed" :key='index' :factory="factory" />
						</tbody>
					</table>
					<div class="min-w-full flex">
						<div class="pagination-content">
							<button @click="previousNav"> - </button>
							<PaginationComponent :class="actualPage === item ? 'active': 'notActive'" v-for="item in pagesNumber" :page="item" :key="item" @changePage="changePage" >
							</PaginationComponent>
							<button @click="nextNav"> + </button>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { useAdminStore } from '@/stores/admin.store';
import { computed, watch, ref, onMounted  } from "vue";
import FactoriesCard from './FactoriesCard.vue';
import PaginationComponent from '../pagination/PaginationComponent.vue';

export default {
	components: { FactoriesCard, PaginationComponent },
    setup() {
        const adminStore = useAdminStore();
        const factories = computed(() => adminStore.factories);

		const factoriesDisplayed = ref([])
		const indexStart = ref(null);
		const indexEnd = ref(null);
		const actualPage = ref(1)
        adminStore.getAllFactories();
		const pagesNumber = computed(() => Math.ceil(adminStore.factories.length / 5) );
		
		const changePage = (e) => {
			actualPage.value = e
			factoriesDisplayed.value = []
			indexStart.value = (e * 5) - 5
			if (e*5 >= adminStore.factories.length) {
				indexEnd.value = adminStore.factories.length
			} else {
				indexEnd.value = (e * 5)
			}
			for (let i = indexStart.value; i < indexEnd.value; i++) {
					factoriesDisplayed.value.push(factories.value[i])
				}
		}
		watch(factories, value => {
			if (value.length > 0) {
				for (let i = indexStart.value; i < indexEnd.value; i++) {
					factoriesDisplayed.value.push(factories.value[i])
				}
			}
		})
		onMounted(() => {
			indexStart.value = 0
			indexEnd.value = 5
		})


		const previousNav = () => {
			if (indexStart.value === 0 && indexEnd.value === 5) {
				return
			}
			else {
				actualPage.value -= 1
				indexStart.value -= 5
				if (indexEnd.value >= factories.value.length) {
					indexEnd.value = (pagesNumber.value * 5) - 5
				} else {
					indexEnd.value -= 5
				}
				factoriesDisplayed.value = []
				for (let i = indexStart.value; i < indexEnd.value; i++) {
					factoriesDisplayed.value.push(factories.value[i])
				}
			}
		}

		const nextNav = () => {
			if (indexStart.value === (pagesNumber.value * 5) - 5) {
				return
			}
			else {
				actualPage.value += 1
				indexStart.value += 5
				indexEnd.value += 5
				
				if (indexEnd.value >= factories.value.length) {
					indexEnd.value = factories.value.length
				} 
				factoriesDisplayed.value = []
				for (let i = indexStart.value; i < indexEnd.value; i++) {
					factoriesDisplayed.value.push(factories.value[i])
				}
			}
		}
        return {
            factories,
			changePage,
			previousNav,
			nextNav,
			factoriesDisplayed,
			pagesNumber,
			actualPage
        };
    },
}
</script>

<style lang="scss" scoped>
.pagination {

	&-content {
		width: 100%;
		display: flex;
		justify-content: center;
		gap: 0.5rem;
	}
}
</style>