import * as PushAPI from "@pushprotocol/restapi";
import { useState } from "react";
import { ethers } from "ethers";

const channelAddress = "";

export default function usePush() {
	const [account, setAccount] = useState("");
	const [signer, setSigner] = useState<any>();

	/* Function to connect with MetaMask wallet */
	const connectWallet = async () => {
		try {
			const ethereum = (window as any).ethereum;
			await ethereum.request({ method: "eth_requestAccounts" });
			const web3Provider = new ethers.providers.Web3Provider(ethereum);

			/* Get the signer from the provider */
			const signer = web3Provider.getSigner();
			setSigner(signer);

			/* Get the address from the provider */
			const account = await signer.getAddress();
			setAccount(account);

		} catch (error: any) {
			const message = error.message as string;
			console.log("error", message);
		}
	};

	const optIntoChannel = async () => {
		await PushAPI.channels.subscribe({
			signer: signer,
			channelAddress: `eip155:5:${channelAddress}`, // channel address in CAIP
			userAddress: `eip155:5:${account}`, // user address in CAIP
			onSuccess: () => {
				console.log("opt in success");
			},
			onError: () => {
				console.error("opt in error");
			},
			env: "staging", // other values allowed "prod", "dev"
		});
	};

	const optOutOfChannel = async () => {
		await PushAPI.channels.unsubscribe({
			signer: signer,
			channelAddress: `eip155:5:${channelAddress}`, // channel address in CAIP
			userAddress: `eip155:5:${account}`, // user address in CAIP
			onSuccess: () => {
				console.log("opt out successul");
			},
			onError: () => {
				console.error("opt out error");
			},
			env: "staging", // other values allowed "prod", "dev"
		});
	};

	const getNotifications = async () => {
		try {
			const notifs = await PushAPI.user.getFeeds({
				user: `eip155:5:${account}`, // user address in CAIP
				env: "staging",

				// Other Params if needed
				// page: defaults to 1
				// limit: defaults to 10
				// spam: defaults to false
			});
			return notifs;
		} catch (e: any) {
			const message = e.message as string;
			console.log("error", message);
		}
	};

	const getSpams = async () => {
		try {
			const spam = await PushAPI.user.getFeeds({
				user: `eip155:5:${account}`, // user address in CAIP
				spam: true,
				env: "staging",
			});
			return spam;
		} catch (e: any) {
			const message = e.message as string;
			console.log("error", message);
		}
	};

	const getUserSubscribedChannels = async () => {
		try {
			const subscriptions = await PushAPI.user.getSubscriptions({
				user: `eip155:5:${account}`, // user address in CAIP
				env: "staging",
			});
return subscriptions
		} catch (e: any) {
			const message = e.message as string;
			console.log("error", message);
		}
	};

	const getChannelData = async () => {
		try {
			const channelData = await PushAPI.channels.getChannel({
				channel: `eip155:5:${channelAddress}`, // user address in CAIP
				env: "staging",
			});
return channelData
		} catch (e: any) {
			const message = e.message as string;
			console.log("error", message);
		}
	};

	const searchForChannel = async (query: string) => {
		try {
			const channelsData = await PushAPI.channels.search({
				query: query, // a search query
				page: 1, // page index
				limit: 20, // no of items per page
				env: "staging",
			});
return channelsData
		} catch (e: any) {
			const message = e.message as string;
			console.log("error", message);
		}
	};

	return {
		connectWallet,

		optIntoChannel,
		optOutOfChannel,
		getChannelData,
		searchForChannel,

		getNotifications,
		getSpams,
		getUserSubscribedChannels,
		signer,
		account
	};
}
