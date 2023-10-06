<script setup lang="ts">
import { ref } from "vue";
import { socketClient } from "../socket.ts"
import { store } from "../store"
const roomId = ref<string>("")
const handleCreateRoom = async (event: MouseEvent) => {
    console.log(event)
    const response = await socketClient.createRoom()
    if (response.status === "SUCCESS" && response.data.room.id) {
        const room = await socketClient.joinRoom(response.data.room.id)
        console.log(room)
    }
}
const handleJoinRoomFormSubmit = async (event: Event) => {
    event.preventDefault()
    const response = await socketClient.joinRoom(roomId.value)
    if (response.status === "SUCCESS" && response.data.room) {
        console.log(`Successfully joined room ${response.data.room.id}`)
    }
}

</script>
<template>
    <div class="border-blue-400 border rounded-lg w-96 absolute bottom-0 right-0 mb-4 mr-4 p-2">
        <h2 class="font-bold">DEBUG PANEL</h2>
        <button @click="handleCreateRoom">create room</button>
        <form action="#" v-on:submit="handleJoinRoomFormSubmit">
            <button>join room : </button>
            <input type="text" v-model="roomId" />
        </form>

        <p>Room info :</p>
        <ul>
            <li v-for="[key, value] in Object.entries(store.state.room)" :key="key"> {{ key }} : {{ value }}</li>
        </ul>
    </div>
</template>