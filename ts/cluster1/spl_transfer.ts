import { Commitment, Connection, Keypair, PublicKey } from "@solana/web3.js";
import wallet from "../../Turbin3-wallet.json";
import { getOrCreateAssociatedTokenAccount, transfer } from "@solana/spl-token";

// We're going to import our keypair from the wallet file
const keypair = Keypair.fromSecretKey(new Uint8Array(wallet));

//Create a Solana devnet connection
const commitment: Commitment = "confirmed";
const connection = new Connection("https://api.devnet.solana.com", commitment);

// Mint address
const mint = new PublicKey("CGYqnAvoiXrLPut8bDLjxf7xCnhhGKchuwbzu1Tharqu");

// Recipient address
const to = new PublicKey("4K74F3kgKSwy7dCjrs8trz2x6eo89xTqC44ZRD9wKuuq");
const token_decimals = 1_000_000;

(async () => {
  try {
    // Get the token account of the fromWallet address, and if it does not exist, create it
    const ata = await getOrCreateAssociatedTokenAccount(
      connection,
      keypair,
      mint,
      keypair.publicKey,
    );
    // Get the token account of the toWallet address, and if it does not exist, create import

    const toAta = await getOrCreateAssociatedTokenAccount(
      connection,
      keypair,
      mint,
      to,
    );
    // Transfer the new token to the "toTokenAccount" we just created
    const tx = await transfer(
      connection,
      keypair,
      ata.address,
      toAta.address,
      keypair,
      token_decimals * 50,
    );
    console.log(`Transfer successfull ${tx}`);
  } catch (e) {
    console.error(`Oops, something went wrong: ${e}`);
  }
})();