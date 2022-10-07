<template>
	<div class="pagination">
		<div class="pagination-content neumorphism">
			<div :class="
				disablePrev
					? 'pagination-content-previous disabled'
					: 'pagination-content-previous'
			" @click="previous">
				<span>▲</span>
			</div>
			<div class="pagination-content-pages">
				<ul class="pages">
					<li v-for="number in displayPages" :class="
						number === page && number !== '...'
							? 'pages-link cursor active'
							: number !== '...'
								? 'pages-link cursor'
								: 'pages-link'
					" :key="number" @click="() => number !== '...' && goto(number)">
						<span>{{ number }}</span>
					</li>
				</ul>
			</div>
			<div :class="
				disableNext
					? 'pagination-content-next disabled'
					: 'pagination-content-next'
			" @click="next">
				<span>▲</span>
			</div>
		</div>
	</div>
</template>

<script>
import { defineComponent, ref, watch, computed, watchEffect } from "vue";

export default defineComponent({
	name: "FilterPagination",
	props: {
		page: { type: Number, required: true },
		max: { type: Number, required: true },
	},
	emits: ["update:page"],
	setup(props, { emit }) {
		const currentPage = computed(() => props.page);
		const updatePage = ref(currentPage.value);
		const maxPage = computed(() => props.max);
		const disablePrev = ref(true);
		const disableNext = ref(false);

		const arr = []; for (let i = 1; i <= maxPage.value; i++) arr.push(i);
		const arrMaxPage = ref(arr);
		const displayPages = ref([]);

		watch(maxPage, (value) => {
			const n = [];
			for (let i = 1; i <= value; i++) n.push(i);
			arrMaxPage.value = n;
		});

		watch(currentPage, (value) => {
			if (value === 1) {
				updatePage.value = 1;
				disableNext.value = false;
				disablePrev.value = true;
			}
		});
		watch(updatePage, (value) => emit("update:page", value));

		const previous = () => {
			if (updatePage.value > 1) {
				updatePage.value--;
				if (disableNext.value) disableNext.value = false;
			}
			if (updatePage.value === 1) disablePrev.value = true;
		};

		const next = () => {
			if (updatePage.value < maxPage.value) {
				updatePage.value++;
				if (disablePrev.value) disablePrev.value = false;
			}
			if (updatePage.value === maxPage.value) disableNext.value = true;
		};

		const goto = (number) => {
			if (number !== updatePage.value) updatePage.value = number;
			if (updatePage.value < maxPage.value && disableNext.value)
				disableNext.value = false;
			if (updatePage.value > 1 && disablePrev.value) disablePrev.value = false;
			if (updatePage.value === 1) disablePrev.value = true;
			if (updatePage.value === maxPage.value) disableNext.value = true;
		};

		watchEffect(() => {
			if (maxPage.value < 7) return (displayPages.value = arrMaxPage.value);

			const cloned = [...arrMaxPage.value];
			if (maxPage.value >= 7 && updatePage.value < 4) {
				return (displayPages.value = [
					...cloned.slice(0, 5),
					"...",
					cloned[cloned.length - 1],
				]);
			}

			if (updatePage.value + 3 >= maxPage.value) {
				return (displayPages.value = [
					cloned[0],
					"...",
					...cloned.slice(cloned.length - 5, cloned.length),
				]);
			}

			if (maxPage.value >= 7 && updatePage.value >= 4) {
				return (displayPages.value = [
					cloned[0],
					"...",
					...cloned.slice(updatePage.value - 2, updatePage.value + 1),
					"...",
					cloned[cloned.length - 1],
				]);
			}
		});

		return {
			updatePage,
			disablePrev,
			disableNext,
			displayPages,
			previous,
			next,
			goto,
		}
	}
})
</script>

<style lang="scss" scoped>
.pagination {
	width: 100%;
	height: 80px;
	min-height: 80px;
	display: flex;
	align-items: center;
	justify-content: center;

	&-content {
		width: 60%;
		height: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 20px;
		border: .5px solid rgb(219, 219, 219);

		&-previous, &-next {
			width: 30px;
			height: 30px;
			display: flex;
			align-items: center;
			justify-content: center;
			cursor: pointer;
			user-select: none;

			&:hover span {
				color: #ffd000;
			}

			span {
				font-size: 17px;
				color: black;
			}

			&.disabled {
				color: gray;

				&:hover span {
					color: currentColor;
				} 
			}
		}

		&-previous > span { transform: rotate(-90deg); }
		&-next > span { transform: rotate(90deg); }

		&-pages {
			height: 100%;
			display: flex;
			align-items: center;
			justify-content: center;

			.pages {
				height: 100%;
				display: flex;
				align-items: center;
				justify-content: center;
				gap: .5rem;

				&-link {
					display: flex;
					align-items: center;
					justify-content: center;

					span {
						font-weight: 700;
					}

					&.cursor {
						cursor: pointer;
					}

					&.active span {
						color: #ffd000;
					}
				}
			}
		}
	}
}
</style>
