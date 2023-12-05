import { defineStore } from 'pinia';
import { computed, Ref, ref } from 'vue';
import { useCostumeStore } from '@/store/costume-store';
import { useAuthStore } from '@/store/auth-store';
import { Connection, Connections, Costume } from '@/types';

export type BroadcastMessage = {
    type: string;
    body: string;
}

export const useGuiPreferencesStore = defineStore('gui-preferences', () => {
    let websocket: WebSocket | null = null;
    const messages: Ref<string[]> = ref([])
    const isSpinWheel = ref(false);
    const connected = ref(0);
    const players: Ref<Connection[]>= ref([]);
    const currentPlayer: Ref<Connection> = ref({} as Connection);


    const triggerConnections = () => {
        if (!websocket) {
            return;
        }
        websocket.send(
            JSON.stringify({ action: 'connections', data: 'connections' })
        );
    };

    const connect = (userId: string, name: string) => {
        /*
         * See https://html.spec.whatwg.org/multipage/indices.html#events-2
         * for details around each WebSocket event type.
         */
        if (websocket !== null) {
            return;
        }
        const { setWinCostume, setCostumes } = useCostumeStore();
        // WebSocket sends a message to API Gateway on creation that gets
        // routed to the '$connect' route
        websocket = new WebSocket(`wss://iijoc4f228.execute-api.us-east-1.amazonaws.com/dev?userId=${userId}&name=${name}`);
        websocket.onclose = ({ wasClean, code, reason }) => {
        };

        websocket.onerror = error => {
            console.log(error);
            console.log(
                'onerror:   An error has occurred. See console for details.'
            );
        };

        websocket.onmessage = ({ data }) => {
            console.log(`onmessage: ${data}`);
            const parsed: BroadcastMessage = JSON.parse(data);
            if (parsed.type === 'SpinWheel') {
                isSpinWheel.value = true;
            }
            if (parsed.type === 'Connections') {
                const connections: Connection[] = JSON.parse(parsed.body);
                connected.value = connections.length;
                players.value = connections;
                currentPlayer.value = connections[0];
                console.log('Connections', currentPlayer.value);
                messages.value.push(`${connections[0].name} теперь с нами!`);
            }
            if (parsed.type === 'WinCostume') {
                const costume = JSON.parse(parsed.body) as Costume;
                console.log('WinCostume', costume);
                setWinCostume(costume);
            }
            if (parsed.type === 'SetCostumes') {
                const costumes = JSON.parse(parsed.body) as Costume[];
                setCostumes(costumes);
            }
        };

        websocket.onopen = (ws) => {
            console.log(ws);
            console.log('onopen:    Connected successfully.');
            triggerConnections();
        };
    };
    const disconnect = () => {
        if (!websocket) {
            return;
        }
        // WebSocket sends a message to API Gateway that gets routed to the
        // '$disconnect' route.
        console.log('client:    Closing the connection.');
        websocket.close();
    }

    const setSpinWheel = (value: boolean) => {
        isSpinWheel.value = value;
    }

    const sendMessage = (message: string, action?: string) => {
        websocket?.send(JSON.stringify({ action: action ?? 'routeA', data: message }))
    }

    const sendSpinWheel = () => {
      sendMessage('SpinWheel');
    }

    const triggerChooseCostume = () => {
        sendMessage('', 'chooseCostume')
    }

    const isCurrentPlayerTurn = computed(() => {
        const { user } = useAuthStore();
        console.log(currentPlayer.value.userId, user.id);
        return user.id === currentPlayer.value.userId;
    });

    const nextTurn = () => {
        console.log(currentPlayer.value);
        const index = players.value.findIndex((p) => p.userId === currentPlayer.value.userId);
        if (players.value.length <= index + 1) {
            currentPlayer.value = players.value[0];
            return;
        }
        console.log(players.value.length, index + 1);
        currentPlayer.value = players.value[index + 1];
    }

  return {
      sendSpinWheel,
      setSpinWheel,
      triggerChooseCostume,
      isSpinWheel,
      nextTurn,
      disconnect,
      connect,
      messages,
      connected,
      currentPlayer,
      players,
      isCurrentPlayerTurn,
  };
});
