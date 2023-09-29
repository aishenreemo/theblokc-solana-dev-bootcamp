import bs58 from "bs58";
import * as Web3 from "@solana/web3.js";

async function main() {
    const connection = new Web3.Connection(Web3.clusterApiUrl("devnet"));
    const publicKey = new Web3.PublicKey(process.env.SOLANA_PUBLIC_KEY);
    const privateKey = bs58.decode(process.env.SOLANA_PRIVATE_KEY);
    const signer = Web3.Keypair.fromSecretKey(privateKey);
    const transaction = new Web3.Transaction();
    
    transaction.add(Web3.SystemProgram.transfer({
        fromPubkey: publicKey,
        toPubkey: new Web3.PublicKey("3chLbWQgVyyFV3yUVqhp74NGH4JuVUDQzpySESCRjUZt"),
        lamports: 0.1 * Web3.LAMPORTS_PER_SOL
    }))

    console.log(await Web3.sendAndConfirmTransaction(connection, transaction, [signer]));
}

main();
