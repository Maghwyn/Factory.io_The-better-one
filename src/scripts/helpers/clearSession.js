import { http } from '@/API/axios.config';
import { useAdminStore } from '@/stores/admin.store'
import { useAuthStore } from '@/stores/auth.store';
import { useGameStore } from '@/stores/game.store';
import { useMarketStore } from '@/stores/market.store';
import { useResourceStore } from '@/stores/resource.store';
import { useUserStore } from '@/stores/user.store';

export const clearSession = () => {
	const adminStore = useAdminStore();
	const authStore = useAuthStore();
	const gameStore = useGameStore();
	const marketStore = useMarketStore();
	const resourceStore = useResourceStore();
	const userStore = useUserStore();

	adminStore.reset(["users", "allRessources", "factories", "modelsFactories"]);
	authStore.reset(["isAuth", "isAdmin"]);
	gameStore.reset(["factories"]);
	marketStore.reset(["marketTrades", "userTrades"]);
	resourceStore.reset(["resources"]);
	userStore.reset(["user", "inventory"]);
	http.defaults.headers.common["Authorization"] = null
	localStorage.clear();
}