<script setup lang="ts">
import { Ref, ref } from 'vue';
const move = ref('move');
const jump = ref('');
const rotated = ref('');
const rotating = ref('');

type Props = {
  costumeName: string;
};
defineProps<Props>()

  function animate() {
    let isDone = rotated.value === "rotated";

    if (!isDone) {
      rotating.value = 'rotating';
      setTimeout(() => {
        jump.value = 'jump';
      }, 300);
      setTimeout(() => {
        rotated.value = 'rotated'
      }, 1000);
    } else {
      move.value = 'move';
      jump.value = '';
      rotated.value = '';
      rotating.value = '';
    }
    move.value = move.value === "move" ? "" : "move";
  }

  animate();
</script>

<template>
    <div class="img-container">
      <span class="kuku" :class="jump">{{ costumeName }}</span>
      <button class="box" @click="() => null">
      <img src="@/assets/box.png" alt="box" />
      </button>
      <img
          :class="[`lid ${move} ${rotating} ${rotated}`]"
          src="@/assets/box-lid.png"
          alt="box-lid"
      />
    </div>
</template>

<style scoped>
.box {
  background: transparent;
  border: 0;
  margin: 0;
  padding: 0;
  position: absolute;
  left: 50%;
  transform: translate(-50%);
  bottom: 0;
  cursor: pointer;
  outline: none;
  z-index: 2;
}

.box img {
  margin: -5px;
}

.kuku {
  position: absolute;
  left: 50%;
  transform: translate(-50%);
  bottom: 0;
  z-index: 1;
  color: #fff;
  font-weight: bold;
  font-size: 30px;
}

.lid {
  position: absolute;
  left: 50%;
  transform: translate(-50%);
  bottom: 5.8em;
}

.jump {
  animation: 1s jump infinite alternate;
}

.move {
  animation: 1s wiggle infinite linear;
}

.rotating {
  animation: 1s rotating;
}

.rotated {
  transform: rotate(145deg) translate(-70%, -170px);
}

@keyframes wiggle {
  10%,
  90% {
    transform: translate(-50%) translate3d(-1px, 0, 0);
  }

  20%,
  80% {
    transform: translate(-50%) translate3d(2px, 0, 0);
  }

  30%,
  50%,
  70% {
    transform: translate(-50%) translate3d(-4px, 0, 0);
  }

  40%,
  60% {
    transform: translate(-50%) translate3d(4px, 0, 0);
  }
}

@keyframes rotating {
  0% {
    transform: rotate(0deg) translate(-50%, 0);
  }

  100% {
    transform: rotate(145deg) translate(-70%, -170px);
  }
}

@keyframes jump {
  from {
    bottom: 0;
  }
  to {
    bottom: 5em;
  }
}

</style>
