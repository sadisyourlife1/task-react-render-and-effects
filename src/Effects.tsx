import { useEffect, useState } from 'react';
import { subscribe, unsubscribe } from './resources/API';

export function Effects(props: { sourceId: string }) {
    const [lastMessage, setLastMessage] = useState<number>(-1);

    useEffect(() => {
        // При изменении sourceId сбрасываем последнее сообщение
        setLastMessage(-1);

        const handleNewMessage = (message: number) => {
            setLastMessage(message);
        };

        subscribe(props.sourceId, handleNewMessage);

        return () => {
            unsubscribe(props.sourceId, handleNewMessage);
        };
    }, [props.sourceId]);

    return (
        <div>
            {props.sourceId}: {lastMessage}
        </div>
    );
}
