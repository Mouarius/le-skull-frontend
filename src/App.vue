<script setup lang="ts">
import { onMounted, ref } from "vue";
import DebugPanel from "./components/DebugPanel.vue";
import "./socket.ts";
import { socketClient } from "./socket.ts";

const username = ref("");
const roomId = ref("");

onMounted(() => {
  console.log("mounted");
  socketClient.init((res) => {
    console.log(res)
    username.value = res.username ?? ""
  });
});


const handleUsernameInputChange = () => {
  // Emit event username change
  socketClient.updateUsername(username.value)

}

const handleCreateGameClick = () => {
  try {
    socketClient.connect(username.value);
  } catch (error) {}
};
const handleJoinGameClick = () => {
  console.log("join");
};
</script>
<template>
  <div class="flex flex-col w-full items-center">
    <h1>Le Skull</h1>
    <div class="container flex flex-col items-center mt-8">
      <div
        class="shadow-lg rounded-2xl border-gray-100 border p-4 pt-6 w-full flex flex-col items-stretch max-w-sm"
      >
        <div class="flex flex-col items-stretch gap-2">
          <div>
            <label for="input-username" class="text-xs text-gray-500 sr-only"
              >Pseudonyme</label
            >
            {{username}}
            <input
              type="text"
              name="username"
              id="input-username"
              v-model="username"
              placeholder="Username"
              class="border rounded-md py-1 px-2 w-full"
              @change="handleUsernameInputChange"
            />
          </div>
          <input
            type="button"
            @click="handleCreateGameClick"
            value="Créer une partie"
            class="bg-blue-600 text-white flex items-center justify-center w-full rounded-md py-2 hover:bg-blue-700 hover:cursor-pointer transition-colors ease-in-out mt-12"
          />
          <div class="text-center text-sm">ou</div>
          <div class="flex flex-col p-2 rounded-lg gap-2 bg-blue-600">
            <label for="input-room-id" class="text-xs text-gray-500 sr-only"
              >ID de la partie</label
            >
            <input
              type="text"
              name="username"
              id="input-room-id"
              v-model="roomId"
              placeholder="id de la partie"
              class="border rounded-md py-1 px-2 w-full"
            />
            <input
              type="button"
              @click="handleJoinGameClick"
              value="Rejoindre une partie"
              class="bg-blue-800 text-white flex items-center justify-center w-full rounded-md py-2 hover:bg-blue-900 border-blue-700 border hover:cursor-pointer transition-colors ease-in-out"
            />
          </div>
        </div>
      </div>
    </div>
    <DebugPanel />
  </div>
</template>

<style lang="scss"></style>
