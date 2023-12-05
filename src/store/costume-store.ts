import { defineStore } from 'pinia';
import { getAllCostumes, getUserCostumes, deleteCostume as apiDeleteCostume } from '@/api/costume';
import { Ref, ref } from 'vue';
import { Costume } from '@/types';
export const useCostumeStore = defineStore('costume-store', () => {
  const userCostumes: Ref<Costume[] | undefined> = ref(undefined);  // TODO #costume
  const costumes: Ref<Costume[]> = ref([] as Costume[]);
  const chosenCostume: Ref<Costume> = ref({} as Costume);
  const isCostumeChoosing: Ref<boolean> = ref(false);
  const fetchCostumes = async () => {
    const response = await getAllCostumes();
    if (response && response?.length > 0) {
        setCostumes(response)
        return;
    }
    console.error('Costumes are empty or request failed');
  }

    const setCostumes = (costumesArray: Costume[]) => {
      costumes.value = costumesArray;
    }
  const setWinCostume = (winCostume: Costume) => {
      chosenCostume.value = winCostume;
      setIsCostumeChoosing(false);
  }
  const  fetchUserCostumes = async (userId: string) => {
    userCostumes.value = await getUserCostumes(userId);
  }

    const setIsCostumeChoosing =  (value: boolean) => {
        isCostumeChoosing.value = value;
    }

    const deleteCostume = async (costumeId: string, userId: string) => {
    await apiDeleteCostume(costumeId, userId);
  }

  return {
    fetchUserCostumes,
    fetchCostumes,
    setWinCostume,
    deleteCostume,
    setIsCostumeChoosing,
      setCostumes,
    chosenCostume,
    costumes,
    userCostumes,
    isCostumeChoosing
  };
}, {
});
