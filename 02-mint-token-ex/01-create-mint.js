import * as web3 from "@solana/web3.js";
import * as token from "@solana/spl-token";
import bs58 from "bs58";

const DECIMALS = 9;

async function main() {
    const connection = new web3.Connection(web3.clusterApiUrl("devnet"));
    const privateKey = bs58.decode(process.env.SOLANA_PRIVATE_KEY);
    const signer = web3.Keypair.fromSecretKey(privateKey);

    const tokenMint = await token.createMint(
        connection,
        signer,
        signer.publicKey,
        signer.publicKey,
        DECIMALS,
    );

    console.log(tokenMint.toBase58());

    const mintInfo = await getMint(connection, mint);
    console.log(mintInfo.supply);

    const tokenAccount = await getOrCreateAssociatedTokenAccount(
        connection,
        signer,
        mint,
        signer.publicKey
    )

    console.log(tokenAccount.address.toBase58());

    let signature = await token.mintTo(
        connection,
        signer,
        mint,
        tokenAccount.address,
        signer.publicKey,
        1000000000
    );

    console.log(`mint tx: ${signature}`);

    let transaction = new web3.Transaction().add(token.createSetAuthorityInstruction(
        mint,
        signer.publicKey,
        token.AuthorityType.MintTokens,
        null
    ));

    console.log(await web3.sendAndConfirmTransaction(connection, transaction, [signer]));
}

main();
