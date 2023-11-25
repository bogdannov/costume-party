import { defineStore } from 'pinia';
import { chooseCostume as apiChooseCostume, getAllCostumes } from '@/api/costume';
import { Ref, ref } from 'vue';
import { Costume } from '@/types';
export const useCostumeStore = defineStore('costume-store', () => {
  const userCostumes: Ref<Costume[]> = ref([]);  // TODO #costume
  const costumes: Ref<Costume[]> = ref([] as Costume[]);
  const chosenCostume: Ref<Costume> = ref({} as Costume);
  const chosenCostumeIndex: Ref<number | null> = ref(null);
  const fetchCostumes = async () => {
    const response = await getAllCostumes();
    if (response && response?.length > 0) {
      costumes.value = response;
      return;
    }
    console.error('Costumes are empty or request failed');
  }

  const chooseCostume = async () => {
    const costume = await apiChooseCostume();
    if (costume) {
      chosenCostume.value = costume;
      const chosenIndex = costumes.value.findIndex((item) =>
          item.title === costume.title && item.userId === costume.userId
      )
      chosenCostumeIndex.value = chosenIndex >= 0 ? chosenIndex : null;
      return;
    }
    console.error('Something went wrong with choosing costume');
  }

  // TODO #costume
  const  fetchUserCostumes = async () => {}

  return {
      fetchCostumes,
      chooseCostume,
      chosenCostume,
      chosenCostumeIndex,
      costumes,
      userCostumes,
  };
}, {
});
