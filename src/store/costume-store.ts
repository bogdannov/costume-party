import { defineStore } from 'pinia';
import { getAllCostumes, getUserCostumes, deleteCostume as apiDeleteCostume } from '@/api/costume';
import { Ref, ref } from 'vue';
import { Costume } from '@/types';
export const useCostumeStore = defineStore('costume-store', () => {
  const userCostumes: Ref<Costume[] | undefined> = ref(undefined);  // TODO #costume
  const costumes: Ref<Costume[]> = ref([] as Costume[]);
  const chosenCostume: Ref<Costume> = ref({} as Costume);
  const chosenCostumeIndex: Ref<number | null> = ref(null);
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
  const setWinCostume = (id: string) => {
      const winCostume = costumes.value.find((costume) => costume.costumeId === id);
      if (winCostume) {
        chosenCostume.value = winCostume;
      }
      else {
        console.error(`Costume win cant be found ${JSON.stringify(winCostume)}`)
        return;
      }
      const winIndex = costumes.value.findIndex((item) =>
        item.costumeId === winCostume.costumeId
      )
      chosenCostumeIndex.value = winIndex >= 0 ? winIndex : null;
      return;
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
    chosenCostumeIndex,
    costumes,
    userCostumes,
    isCostumeChoosing
  };
}, {
});
