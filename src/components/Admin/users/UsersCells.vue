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
						<tbody>
							<UsersCard v-for="(user, index) in usersList" :key='index' :user="user" />
						</tbody>
					</table>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { useAdminStore } from '@/stores/admin.store';
import { computed } from "vue";
import UsersCard from './UsersCard.vue';

export default {
	components: { UsersCard },
    setup() {
        const adminStore = useAdminStore();
        const usersList = computed(() => adminStore.users);
		console.log("user", usersList.value);
        adminStore.getAllUsers();
        return {
            usersList,
        };
    },
}
</script>