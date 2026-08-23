// App.tsx
import { useEffect } from 'react';
import '@n8n/chat/style.css';
import { createChat } from '@n8n/chat';

export const App = () => {
	useEffect(() => {
		createChat({
			webhookUrl: 'https://ivantranix.onrender.com/webhook/61ed4284-23fd-482f-b4ca-2a9e11156db1/chat'
		});
	}, []);

	return (<div></div>);
};