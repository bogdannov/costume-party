import { defineStore } from 'pinia';
import { Ref, ref } from 'vue';

export type BroadcastMessage = {
    type: string;
    body: string;
}

export const useGuiPreferencesStore = defineStore('gui-preferences', () => {
    let websocket: WebSocket | null = null;
    const messages: Ref<string[]> = ref([])
    const isSpinWheel = ref(false);
    const connected = ref(0);

    const triggerConnections = (message: string) => {
        if (!websocket) {
            return;
        }
        messages.value.push('client:    Sending a message.');

        websocket.send(
            // This message will be routed to 'routeA' based on the 'action'
            // property
            JSON.stringify({ action: 'routeA', data: message })
        );
    };
    const connect = () => {
        /*
         * See https://html.spec.whatwg.org/multipage/indices.html#events-2
         * for details around each WebSocket event type.
         */
        if (websocket !== null) {
            return;
        }
        // WebSocket sends a message to API Gateway on creation that gets
        // routed to the '$connect' route
        websocket = new WebSocket('wss://iijoc4f228.execute-api.us-east-1.amazonaws.com/dev');

        websocket.onclose = ({ wasClean, code, reason }) => {
            messages.value.push(
                `onclose:   ${JSON.stringify({ wasClean, code, reason })}`);
        };

        websocket.onerror = error => {
            console.log(error);
            messages.value.push(
                'onerror:   An error has occurred. See console for details.'
            );
        };

        websocket.onmessage = ({ data }) => {
            messages.value.push(`onmessage: ${data}`);
            const parsed: BroadcastMessage = JSON.parse(data);
            if (parsed.type === 'SpinWheel') {
                isSpinWheel.value = true;
            }
            if (parsed.type === 'Connections') {
                console.log('Connections', parseInt(parsed.body))
                connected.value = parseInt(parsed.body);
            }
        };

        websocket.onopen = () => {
            messages.value.push('onopen:    Connected successfully.');
            triggerConnections();
        };
    };
    const disconnect = () => {
        if (!websocket) {
            return;
        }
        // WebSocket sends a message to API Gateway that gets routed to the
        // '$disconnect' route.
        messages.value.push('client:    Closing the connection.');
        websocket.close();
    }

    const setSpinWheel = (value: boolean) => {
        isSpinWheel.value = value;
    }

  return {
      setSpinWheel,
      isSpinWheel,
      disconnect,
      triggerConnections,
      connect,
      messages,
      connected,
  };
});
