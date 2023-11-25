<script setup lang="ts">
import { Wheel } from "vue3-fortune-wheel";
import type { Datas, imgParams } from "vue3-fortune-wheel";
import { onMounted, onUnmounted, ref, watch } from 'vue';
import GiftAnimation from '@/components/GiftAnimation.vue';
import { useGuiPreferencesStore } from '@/store/gui-preferences-store';
import { storeToRefs } from 'pinia';
import ConnectionPanel from '@/components/ConnectionPanel.vue';
import { useCostumeStore } from '@/store/costume-store';

const { setSpinWheel } = useGuiPreferencesStore();
const { isSpinWheel } = storeToRefs(useGuiPreferencesStore())
let moved = ref(false);
let isSpinning = ref(false);
const wheel = ref(null);
const wheelWrap = ref(null);
const isGiftActive = ref(false);
const costumeStore = useCostumeStore();
const { chooseCostume } = costumeStore;
const { chosenCostume, chosenCostumeIndex } = storeToRefs(costumeStore);


watch(isSpinWheel, () => {
  if (isSpinWheel) {
    wheel.value.spin();
    isSpinning.value = true;
    setTimeout(() => {
      setSpinWheel(false);
    }, 3000);
  } else {
    isSpinning.value = false;
  }
})

const done = () => {
  setTimeout(() => {
    isSpinning.value = false;
    isGiftActive.value = true;
  }, 500)
}

const downListener = () => {
  moved.value = false
}
const moveListener = () => {
  moved.value = true
}
const upListener = () => {
  if (moved.value && !isSpinning.value) {
      chooseCostume()
  }
}

onMounted(() => {
  // console.log(wheel.value.spin())
  console.log(wheelWrap.value)
  wheelWrap.value.addEventListener('mousedown', downListener);
  wheelWrap.value.addEventListener('mousemove', moveListener)
  wheelWrap.value.addEventListener('mouseup', upListener)
})

onUnmounted(() => {
  wheelWrap.value.removeEventListener('mousedown', downListener)
  wheelWrap.value.removeEventListener('mousemove', moveListener)
  wheelWrap.value.removeEventListener('mouseup', upListener)
})

const data = [
  {
    id: 1,
    value: "Егор костюм 1",
    color: '#7d7db3',
    bgColor: '#d50e0e'
  },
  {
    id: 2,
    value: "Богдан костюм 1",
    color: '#ffffff',
    bgColor: '#1e6bce'
  },
  {
    id: 3,
    value: "Вика костюм 1",
    color: '#ffffff',
    bgColor: '#60af45'
  },
  {
    id: 3,
    value: "Катя костюм 1",
    color: '#ffffff',
    bgColor: '#d0b824'
  },
];

</script>

<template>
  <div class="d-flex justify-center align-center flex-column">
    <h2 class="mt-10 text-black">Крути колесо фортуны и узнай свой костюм!!! {{isSpinning}}</h2>
    <div ref="wheelWrap">
      <Wheel
          :gift="chosenCostumeIndex"
          :imgParams="{}"
          @done="done"
          ref="wheel"
          v-model="data"
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
<!--    <v-btn-->
<!--        text="All connected"-->
<!--        @click=""-->
<!--    ></v-btn>-->
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
