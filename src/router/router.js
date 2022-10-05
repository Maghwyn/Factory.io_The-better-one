const routes = [
    {
        path: "/",
        component: () => import("../layouts/GuestLayout.vue"),
        children: [
            {
                path: "",
                component: () => import("../pages/WelcomePage.vue"),
            },
            {
                path: "/login",
                component: () => import("../pages/guest/LoginPage.vue"),
            },
            {
                path: "/signup",
                component: () => import("../pages/guest/SingUpPage.vue"),

            }
        ],
    },
    {
        path: "/app",
        component: () => import("../layouts/MainLayout.vue"),
        children: [
            {
                path: "/game",
                component: () => import("../pages/main/GamePage.vue"),

            },
            {
                path: "/market",
                component: () => import("../pages/main/MarketPage.vue"),
            }
        ]
    },
	{
        path: "/admin",
        component: () => import("../layouts/AdminLayout.vue"),
        children: [
			{
				path: "",
				component: () => import("../pages/admin/DashboardPage.vue"),
			}
        ]
    }
]

export default routes;