<template>
  <div
    class=" box w- bg-white rounded-xl shadow-xl hover:shadow-2xl hover:scale-110 transition-all transform duration-500 ml-10">
    <div>
      <img class=" w-32 object-cover rounded pt-2" src="https://images.unsplash.com/photo-1509223197845-458d87318791"
        alt="" />
      <p class="text-xl font-bold text-gray-700">{{resource_type}} Factory</p>
      <p class="text-sm text-gray-700">{{resource_type}}: {{resource_prod}}/min</p>
    </div>
    <div class="div_level">
      <span class="level">Lv. {{level}}</span>
    </div>
  </div>
</template>


<style>
.div_level {
  display: flex;
  justify-content: flex-end;
  width: 100%;
}

.level {
  border-style: solid;
  border-width: thin;
  border-color: black;
  border-radius: 5px;
  padding: 1%;
  font-size: small;
  margin-right: 7%;
  margin-bottom: 2%;
}

.box {
  width: 25vh;
  height: 30vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1%;
  margin: 3%;
  justify-content: space-between;

}
</style>





<script>

import { useGameStore } from '@/stores/game.store';
import { ref, defineComponent } from 'vue';

export default defineComponent({
  props: {
    resource_type: {
      type: String,
      required: false,
      default: () => "Wood",
    },
    resource_prod: {
      type: Number,
      required: false,
      default: () => 5,
    },
    level: {
      type: Number,
      required: false,
      default: () => 15,
    },
  },
  setup() {
    const gameStore = useGameStore();

    const factories = ref([]);

    const createFactory = async () => {
      gameStore.createFactory(1);
      factories.value = gameStore.factories
      console.log(factories.value)
    }
    return {
      createFactory
    }
  }
})
</script>