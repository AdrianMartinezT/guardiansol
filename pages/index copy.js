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
import axios from "axios";

const SOLANA_NETWORK = "devnet";

const Home = () => {
    
    const [publicKey, setPublicKey] = useState(null);
    const [balance, setBalance] = useState(0);
    const [receiver, setReceiver] = useState(null);
    const [amount, setAmount] = useState(null);
    const [activeTab, setActiveTab] = useState("stake"); // Nueva lógica para las pestañas

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

    const handleSubmit = () => {
        console.log("Receiver:", receiver);
        console.log("Amount:", amount);
        // Agrega la lógica para enviar la transacción
    };

    // Componente para Stake
    const StakeComponent = () => (

        
        <div>
            
            <div className="mt-6">
                <label className="block text-sm mb-2">Amount</label>
                <div className="relative">
                    <input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        className="block w-full px-4 py-2 bg-black border border-yellow-600 rounded-lg focus:outline-none"
                    />
                    <button
                        onClick={() => setAmount(balance)} // Usar el balance máximo
                        className="absolute top-0 right-0 h-full px-4 bg-yellow-600 text-black rounded-r-lg"
                    >
                        MAX
                    </button>
                </div>
                <p className="mt-4">
                    You will receive <span className="font-bold">{amount} gSOL</span>
                </p>
            </div>
            <div className="mt-6 space-y-2">
                <div className="flex justify-between">
                    <span>Stake APY%</span>
                    <span>4.00%</span>
                </div>
                <div className="flex justify-between">
                    <span>Staking Fee</span>
                    <span>0.0%</span>
                </div>
                <div className="flex justify-between">
                    <span>Reward Fee</span>
                    <span>10%</span>
                </div>
            </div>
            <div className="mt-6">
                <button onClick={handleSubmit} className="w-full py-2 bg-yellow-600 text-black rounded-lg">
                    Stake
                </button>
            </div>
        </div>
    );

    // Componente para Unstake
    const UnstakeComponent = () => (
        <div>
            <div className="mt-6">
                <label className="block text-sm mb-2">Amount</label>
                <div className="relative">
                    <input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        className="block w-full px-4 py-2 bg-black border border-yellow-600 rounded-lg focus:outline-none"
                    />
                    <button
                        onClick={() => setAmount(balance)} // Usar el balance máximo
                        className="absolute top-0 right-0 h-full px-4 bg-yellow-600 text-black rounded-r-lg"
                    >
                        MAX
                    </button>
                </div>
                <div className="mt-2 text-right">
                    <span>Available: {balance} gSOL</span>
                </div>
                <p className="mt-4">
                    You will receive <span className="font-bold">{amount} SOL</span>
                </p>
            </div>
            <div className="mt-6 space-y-2">
                <div className="flex justify-between">
                    <span>Stake APY%</span>
                    <span>4.00%</span>
                </div>
                <div className="flex justify-between">
                    <span>Staking Fee</span>
                    <span>0.0%</span>
                </div>
                <div className="flex justify-between">
                    <span>Reward Fee</span>
                    <span>10%</span>
                </div>
            </div>
            <div className="mt-6">
                <button onClick={handleSubmit} className="w-full py-2 bg-yellow-600 text-black rounded-lg">
                    Unstake
                </button>
            </div>
        </div>
    );

    // Componente para Withdraw
    const WithdrawComponent = () => (
        <div>
            <div className="mt-6">
                <label className="block text-sm mb-2">Amount</label>
                <div className="relative">
                    <input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        className="block w-full px-4 py-2 bg-black border border-yellow-600 rounded-lg focus:outline-none"
                    />
                    <button
                        onClick={() => setAmount(balance)} // Usar el balance máximo
                        className="absolute top-0 right-0 h-full px-4 bg-yellow-600 text-black rounded-r-lg"
                    >
                        MAX
                    </button>
                </div>
                <div className="mt-2 text-right">
                    <span>Available: {balance} gSOL</span>
                </div>
                <p className="mt-4">
                    You will receive <span className="font-bold">{amount} SOL</span>
                </p>
            </div>
            <div className="mt-6 space-y-2">
                <div className="flex justify-between">
                    <span>Stake APY%</span>
                    <span>4.00%</span>
                </div>
                <div className="flex justify-between">
                    <span>Staking Fee</span>
                    <span>0.0%</span>
                </div>
                <div className="flex justify-between">
                    <span>Reward Fee</span>
                    <span>10%</span>
                </div>
            </div>
            <div className="mt-6">
                <button onClick={handleSubmit} className="w-full py-2 bg-yellow-600 text-black rounded-lg">
                    Withdraw
                </button>
            </div>
        </div>
    );

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-900">
            <div className="bg-black text-white p-6 border border-yellow-600 rounded-lg w-full max-w-lg">
                <div className="flex border-b border-yellow-600">
                    <button
                        onClick={() => setActiveTab("stake")}
                        className={`py-2 px-4 w-1/3 focus:outline-none ${activeTab === "stake" ? "bg-yellow-600 text-white" : "text-yellow-600"
                            }`}
                    >
                        Stake
                    </button>
                    <button
                        onClick={() => setActiveTab("unstake")}
                        className={`py-2 px-4 w-1/3 focus:outline-none ${activeTab === "unstake" ? "bg-yellow-600 text-white" : "text-yellow-600"
                            }`}
                    >
                        Unstake
                    </button>
                    <button
                        onClick={() => setActiveTab("withdraw")}
                        className={`py-2 px-4 w-1/3 focus:outline-none ${activeTab === "withdraw" ? "bg-yellow-600 text-white" : "text-yellow-600"
                            }`}
                    >
                        Withdraw
                    </button>
                </div>

                {/* Mostrar el contenido dependiendo de la pestaña activa */}
                {activeTab === "stake" && <StakeComponent />}
                {activeTab === "unstake" && <UnstakeComponent />}
                {activeTab === "withdraw" && <WithdrawComponent />}
            </div>
            
        </div>

        
    );
};

export default Home;
