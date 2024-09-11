import toast, { Toaster } from "react-hot-toast";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import {
    Connection,
    SystemProgram,
    Transaction,
    PublicKey,
    LAMPORTS_PER_SOL,
    clusterApiUrl,
} from "@solana/web3.js";

const SOLANA_NETWORK = "devnet";

const Home = () => {
    const [publicKey, setPublicKey] = useState(null);
    const [balance, setBalance] = useState(0);
    const [amount, setAmount] = useState(0);
    const [activeTab, setActiveTab] = useState("stake"); // Controla las pestañas activas

    const router = useRouter();

    useEffect(() => {
        let key = window.localStorage.getItem("publicKey");
        setPublicKey(key);
        if (key) getBalances(key);
    }, []);

    const getBalances = async (publicKey) => {
        const connection = new Connection(clusterApiUrl(SOLANA_NETWORK), "confirmed");
        const balance = await connection.getBalance(new PublicKey(publicKey));
        setBalance(balance / LAMPORTS_PER_SOL);
    };

    const signIn = async () => {
        const provider = window?.phantom?.solana;
        const { solana } = window;

        if (!provider?.isPhantom || !solana.isPhantom) {
            toast.error("Phantom no está instalado");
            return;
        }

        const { publicKey } = await provider.connect();
        setPublicKey(publicKey.toString());
        window.localStorage.setItem("publicKey", publicKey.toString());

        getBalances(publicKey);
        toast.success("Wallet conectada 👻");
    };

    const signOut = async () => {
        const { solana } = window;
        window.localStorage.removeItem("publicKey");
        setPublicKey(null);
        solana.disconnect();
        router.reload();
    };

    return (
        <div className="h-screen bg-black text-white">
            {/* Barra superior */}
            <div className="bg-yellow-500 flex justify-between items-center px-6" style={{paddingLeft: '3.5rem'}}  >
                <div className="flex items-center">
                    <img src="https://guardiandefi.xyz/assets/GuardianBlack-469d1f43.png" style={{ width: 164 }} alt="Logo" />
                </div>
                <div className="bg-yellow-400 rounded-lg px-4 py-2 ml-6 flex items-center space-x-2">
                        <span className="text-black font-bold"> {balance} SOLANA</span>
                        <span className="text-black font-bold">
                           
                        </span>
                        <span className="text-black font-bold"> 0 gSOL</span>
                    </div>
                <div>
                    {publicKey ? (
                        <button
                            onClick={signOut}
                            className="bg-black text-yellow-500 px-4 py-2 rounded-lg"
                        >
                            Desconectar Wallet
                        </button>
                    ) : (
                        <button
                            onClick={signIn}
                            className="bg-black text-yellow-500 px-4 py-2 rounded-lg"
                        >
                            Conectar Wallet
                        </button>
                    )}
                </div>
            </div>

            {/* Contenido principal */}
            <div className="flex flex-col items-center mt-10">
                {/* Cuadro principal */}
                <div className="bg-black border border-yellow-600 rounded-lg w-full max-w-lg p-6">
                    {/* Pestañas */}
                    <div className="flex mb-6">
                        <button
                            onClick={() => setActiveTab("stake")}
                            className={`w-1/4 py-2 px-4 focus:outline-none ${activeTab === "stake" ? "bg-yellow-500 text-black" : "text-yellow-500"
                                }`}
                        >
                            Stake
                        </button>
                        <button
                            onClick={() => setActiveTab("unstake")}
                            className={`w-1/4 py-2 px-4 focus:outline-none ${activeTab === "unstake" ? "bg-yellow-500 text-black" : "text-yellow-500"
                                }`}
                        >
                            Unstake
                        </button>
                        <button
                            onClick={() => setActiveTab("withdraw")}
                            className={`w-1/4 py-2 px-4 focus:outline-none ${activeTab === "withdraw" ? "bg-yellow-500 text-black" : "text-yellow-500"
                                }`}
                        >
                            Withdraw
                        </button>
                        <button
                            onClick={() => setActiveTab("history")}
                            className={`w-1/4 py-2 px-4 focus:outline-none ${activeTab === "history" ? "bg-yellow-500 text-black" : "text-yellow-500"
                                }`}
                        >
                            History
                        </button>
                    </div>

                    {/* Contenido de Stake */}
                    {activeTab === "stake" && (
                        <div>
                            <label className="block text-sm mb-2">Amount</label>
                            <div className="relative">
                                <input
                                    type="number"
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)}
                                    className="block w-full px-4 py-2 bg-black border border-yellow-600 rounded-lg focus:outline-none"
                                />
                                <button
                                    onClick={() => setAmount(balance)}
                                    className="absolute top-0 right-0 h-full px-4 bg-yellow-500 text-black rounded-r-lg"
                                >
                                    MAX
                                </button>
                            </div>
                            <p className="mt-4 text-yellow-500">The gas fee will be: 0 SOL currently</p>
                            <p className="mt-4">You will receive: <span className="font-bold">{amount} gSOL</span></p>
                            <div className="mt-6 space-y-2">
                                <div className="flex justify-between">
                                    <span>Total Balance</span>
                                    <span>{balance}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Locked</span>
                                    <span>0</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Available</span>
                                    <span>{balance}</span>
                                </div>
                            </div>
                            <button className="w-full mt-6 py-2 bg-yellow-500 text-black rounded-lg"
                                onClick={signIn}
                            >
                                Connect Wallet
                            </button>
                        </div>
                    )}

                    {/* Contenido de Unstake */}
                    {activeTab === "unstake" && (
                        <div>
                            <label className="block text-sm mb-2">Amount</label>
                            <div className="relative">
                                <input
                                    type="number"
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)}
                                    className="block w-full px-4 py-2 bg-black border border-yellow-600 rounded-lg focus:outline-none"
                                />
                                <button
                                    onClick={() => setAmount(balance)}
                                    className="absolute top-0 right-0 h-full px-4 bg-yellow-500 text-black rounded-r-lg"
                                >
                                    MAX
                                </button>
                            </div>
                            <p className="mt-2 text-right text-gray-400">Available to unlock: 0 gSOL</p>
                            <p className="mt-4 text-yellow-500">
                                <i className="fas fa-exclamation-triangle"></i> The gas fee will be: 0 SOL currently
                            </p>
                            <p className="mt-4">You will receive: <span className="font-bold">{amount} SOL</span></p>

                            <button className="w-full mt-6 py-2 bg-yellow-500 text-black rounded-lg">
                                Connect Wallet
                            </button>
                        </div>
                    )}

                    {/* Contenido de Withdraw */}
                    {activeTab === "withdraw" && (
                        <div>
                            <label className="block text-sm mb-2">Withdraw Amount</label>
                            <div className="relative">
                                <input
                                    type="number"
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)}
                                    className="block w-full px-4 py-2 bg-black border border-yellow-600 rounded-lg focus:outline-none"
                                />
                                <button
                                    onClick={() => setAmount(balance)}
                                    className="absolute top-0 right-0 h-full px-4 bg-yellow-500 text-black rounded-r-lg"
                                >
                                    MAX
                                </button>
                            </div>
                            <p className="mt-4 text-yellow-500">
                                The gas fee will be: 0 SOL currently
                            </p>
                            <p className="mt-4">You will receive: <span className="font-bold">{amount} SOL</span></p>

                            <button className="w-full mt-6 py-2 bg-yellow-500 text-black rounded-lg">
                                Withdraw
                            </button>
                        </div>
                    )}

                    {/* Contenido de History */}
                    {activeTab === "history" && (
                        <div className="text-center">
                            <p className="mt-6 text-white font-bold">You have no transaction history</p>
                        </div>
                    )}
                </div>
            </div>

            <Toaster position="bottom-center" />
        </div>
    );
};

export default Home;
