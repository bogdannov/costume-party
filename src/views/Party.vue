<script setup lang="ts">
import FortuneWheel from 'vue-fortune-wheel'
import 'vue-fortune-wheel/style.css'
import { computed, onMounted, ref, toRaw, watch } from 'vue';
import GiftAnimation from '@/components/GiftAnimation.vue';
import { useGuiPreferencesStore } from '@/store/gui-preferences-store';
import { storeToRefs } from 'pinia';
import ConnectionPanel from '@/components/ConnectionPanel.vue';
import { useCostumeStore } from '@/store/costume-store';
import { useAuthStore } from '@/store/auth-store';
import TickerLine from '@/components/TickerLine.vue';

const { setSpinWheel, sendSpinWheel, triggerChooseCostume, nextTurn } = useGuiPreferencesStore();
const { isSpinWheel, isCurrentPlayerTurn, currentPlayer } = storeToRefs(useGuiPreferencesStore())
const wheelWrap = ref(null);
const wheelEl = ref();
const isGiftActive = ref(false);
const componentKey = ref(1);
const costumeStore = useCostumeStore();
const { user } = useAuthStore()
const { deleteCostume, setIsCostumeChoosing } = costumeStore;
const { chosenCostume, costumes, isCostumeChoosing } = storeToRefs(costumeStore);
const audio = ref();
// const winSound = new Audio();

const canvasOptions = {
  btnWidth: 140,
  borderColor: '#584b43',
  borderWidth: 6,
  lineHeight: 30
}

watch(costumes, () => {
  componentKey.value = componentKey.value + 1;
})

const preparedCostume = computed(() => {
  return costumes.value.map((c) => ({
    id: c.costumeId,
    name: `Костюм от ${c.userName}`,
    value: c.title,
    bgColor: c.bgColor,
    color: c.color,
    probability: 100 / costumes.value.length,
  }))
})
const canSpinWheel = computed(() => {
  return !isCostumeChoosing.value && !isSpinWheel.value && isCurrentPlayerTurn.value;
})

document.addEventListener("click", (e) => {
    if (!canSpinWheel.value) {
        e.stopPropagation();
        e.preventDefault();
    }
}, true);

watch(isGiftActive, async () => {
  setIsCostumeChoosing(true);
  const isActiveRaw = !!isGiftActive.value;
  if (!isActiveRaw && isCurrentPlayerTurn.value) {
    console.log(`DELETE ${JSON.stringify(chosenCostume.value)}`);
      await deleteCostume(chosenCostume.value.costumeId, chosenCostume.value.userId);
      triggerChooseCostume();
  }
  if (!isActiveRaw) {
    nextTurn();
  }
})

const rotateStart = () => {
  sendSpinWheel();
  setSpinWheel(true);
}

watch(isSpinWheel, () => {
  if (isSpinWheel.value) {
      audio.value.play()
    wheelEl.value.startRotate();
  }
})

const done = () => {
  setTimeout( () => {
    setSpinWheel(false);
    // winSound.play();
    isGiftActive.value = true;
  }, 500)
}

onMounted(() => {
  audio.value = new Audio('/audio.mp3')
  if (isCurrentPlayerTurn.value) {
    triggerChooseCostume();
  }
})


</script>

<template>
  <div class="d-flex justify-center align-center flex-column">
    <TickerLine />
    <h2 class="mt-10 text-black">Крути колесо фортуны и узнай свой костюм!!!</h2>
    <p v-if="isCostumeChoosing">
        Анализруем ситуацию... Все перемешиваем... Ожидаем, не паникуем
        <v-progress-linear
                indeterminate
                color="yellow-darken-2"
        ></v-progress-linear>
    </p>
    <p v-else>  </p>
    <h4> Могу ли я крутить колесо?
        <span v-if="canSpinWheel"> ДА! <v-icon>mdi-emoticon-excited-outline</v-icon></span>
        <span v-else>НЕТ!<v-icon>mdi-emoticon-neutral-outline</v-icon></span>
    </h4>
    <div ref="wheelWrap">
      <FortuneWheel
          :key="componentKey"
        v-if="chosenCostume.costumeId"
        ref="wheelEl"
        style="width: 800px; max-width: 100%;"
        :verify="false"
        :canvas="canvasOptions"
        :prizes="preparedCostume"
        :prizeId="chosenCostume.costumeId"
        @rotateEnd="done"
        @rotateStart="rotateStart"
      />
      <v-dialog v-model="isGiftActive">
        <template v-slot:default >
          <div>
            <h3 class="costume-ttl">Кликни и узнай свой костюм: </h3>
            <GiftAnimation :costume-name="chosenCostume.title" />
          </div>
        </template>
      </v-dialog>
    </div>
    <ConnectionPanel />
  </div>
</template>

<style scoped>
.costume-ttl {
  position: absolute;
  left: 28%;
  top: -400px;
  font-size: 60px;
  color: #fff;
}
:deep(.v-overlay__scrim) {
  opacity: 0.8;
}
</style>
