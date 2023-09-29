import {
    clusterApiUrl,
    Connection,
    PublicKey,
    LAMPORTS_PER_SOL,
} from "@solana/web3.js";

async function main() {
    const url = clusterApiUrl("devnet");
    const connection = new Connection(url);
    const publicKey = new PublicKey(process.env.SOLANA_PUBLIC_KEY);
    const balance = await connection.getBalance(publicKey);
    const solBalance = balance / LAMPORTS_PER_SOL;

    console.log(`balance: ${solBalance}`);
}

main();
