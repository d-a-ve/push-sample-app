import { useState } from "react";
import usePush from "./hooks/push";
import "./App.css";

function App() {
	const [query, setQuery] = useState("");
	const {
		connectWallet,
		signer,
		optIntoChannel,
		optOutOfChannel,
		getChannelData,
		getUserSubscribedChannels,
		searchForChannel,
	} = usePush();

	return (
		<div>
			Push Notification sample app
			<br />
			<button onClick={connectWallet}>
				{signer ? "Disconnect" : "Connect"}
			</button>
			<br />
			<button onClick={optIntoChannel}>Opt Into Channel</button>
			<br />
			<button onClick={optOutOfChannel}>Opt out of channel</button>
			<br />
			<button onClick={getChannelData}>Get Channel Data</button>
			<br />
			<button onClick={getUserSubscribedChannels}>
				Get Channels Subscribed by User
			</button>
			<form
				onSubmit={(e) => {
					e.preventDefault();
					searchForChannel(query);
				}}>
				<input
					type="text"
					value={query}
					onChange={(e) => setQuery(e.target.value)}
				/>
				<button>Search for Channel</button>
			</form>
		</div>
	);
}

export default App;
