export const lineToData = (line, showNone) => {
  if (!line) return [{}, []];
  const [
    height,
    date,
    unspendable,
    coinbase,
    faucet,
    airdrop,
    none,
    open,
    bid,
    claim,
    reveal,
    redeem,
    register,
    update,
    transfer,
    finalize,
    renew,
    revoke
  ] = line.split(",");

  const data = [
    { type: "unspendable", value: unspendable },
    { type: "coinbase", value: coinbase },
    { type: "faucet", value: faucet },
    { type: "airdrop", value: airdrop },
    { type: "none", value: none },
    { type: "open", value: open },
    { type: "bid", value: bid },
    { type: "claim", value: claim },
    { type: "reveal", value: reveal },
    { type: "redeem", value: redeem },
    { type: "register", value: register },
    { type: "update", value: update },
    { type: "transfer", value: transfer },
    { type: "finalize", value: finalize },
    { type: "renew", value: renew },
    { type: "revoke", value: revoke }
  ]
    .filter(({ value, type }) => !!+value && (showNone || type !== "none"))
    .sort((a, b) => a.value - b.value);

  return [{ date, height }, data];
};
