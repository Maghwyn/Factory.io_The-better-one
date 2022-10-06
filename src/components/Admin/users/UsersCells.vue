<template>
	<div class="container mx-auto px-4 sm:px-8">
		<div class="py-8">
			<div>
				<h2 class="text-2xl font-semibold leading-tight">list Of users</h2>
			</div>
			<div class="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
				<div class="inline-block min-w-full shadow rounded-lg overflow-hidden">
					<table class="min-w-full leading-normal">
						<thead>
							<tr>
								<th
									class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
									userName
								</th>
								<th
									class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
									UserId
								</th>
								<th
									class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
									user Factory limit
								</th>
								<th
									class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
									created AT
								</th>
							</tr>
						</thead>
						<tbody v-if="usersDisplayed.length > 0">
							<UsersCard v-for="(user, index) in usersDisplayed" :key='index' :user="user" />
						</tbody>
						<tbody>
							<thead class="pagination">
								<tr>
									<th class="pagination-content">
										<button @click="previousNav"> - </button>
										<PaginationComponent v-for="item in pagesNumber" :page="item" :key="item" @changePage="changePage">
										</PaginationComponent>
										<button @click="nextNav"> + </button>
									</th>
								</tr>
							</thead>
						</tbody>
					</table>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { useAdminStore } from '@/stores/admin.store';
import { computed, watch, ref, onMounted } from "vue";
import UsersCard from './UsersCard.vue';
import PaginationComponent from '../pagination/PaginationComponent.vue';

export default {
	components: { UsersCard,  PaginationComponent },
    setup() {
        const adminStore = useAdminStore();
        const usersList = computed(() => adminStore.users);
		const usersDisplayed = ref([])
		const indexStart = ref(null);
		const indexEnd = ref(null);
        adminStore.getAllUsers();
		const pagesNumber = computed(() => Math.ceil(adminStore.users.length / 5) );
		
		const changePage = (e) => {
			usersDisplayed.value = []
			indexStart.value = (e * 5) - 5
			if (e*5 >= adminStore.users.length) {
				indexEnd.value = adminStore.users.length
			} else {
				indexEnd.value = (e * 5)
			}
			for (let i = indexStart.value; i < indexEnd.value; i++) {
					usersDisplayed.value.push(usersList.value[i])
				}
		}
		watch(usersList, value => {
			if (value.length > 0) {
				for (let i = indexStart.value; i < indexEnd.value; i++) {
					usersDisplayed.value.push(usersList.value[i])
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
				indexStart.value -= 5
				if (indexEnd.value >= usersList.value.length) {
					indexEnd.value = (pagesNumber.value * 5) - 5
				} else {
					indexEnd.value -= 5
				}
				usersDisplayed.value = []
				for (let i = indexStart.value; i < indexEnd.value; i++) {
					usersDisplayed.value.push(usersList.value[i])
				}
			}
		}

		const nextNav = () => {
			if (indexStart.value === (pagesNumber.value * 5) - 5) {
				return
			}
			else {
				indexStart.value += 5
				indexEnd.value += 5
				
				if (indexEnd.value >= usersList.value.length) {
					indexEnd.value = usersList.value.length
				} 
				usersDisplayed.value = []
				for (let i = indexStart.value; i < indexEnd.value; i++) {
					usersDisplayed.value.push(usersList.value[i])
				}
			}
		}
        return {
            usersList,
			previousNav,
			nextNav,
			pagesNumber,
			changePage,
			usersDisplayed,
			indexStart,
			indexEnd
        };
    },
}
</script>

<style lang="scss" scoped>
	.pagination {
		width: 100%;
		display: flex;
		justify-content: center;

		&-content {
			width: 100%;
			display: flex;
			justify-content: center;
			gap: 0.5rem;
		}
	}
</style>