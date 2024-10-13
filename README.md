# DNSproof

Install pnpm: `npm install -g pnpm`.

ShadcnUI docs: https://ui.shadcn.com/docs.

Mysten dapp kit: https://sdk.mystenlabs.com/dapp-kit

Counter tutorial: https://docs.sui.io/guides/developer/app-examples/e2e-counter

### SSL Certificates

See `docs/ssl.md` for SSL cert generation using Let's Encrypt and certbot.

See `dns_verifier/examples/ssl.md` self-signed SSL cert generation (for debugging purposes).

Useful website to play with X.509 certificates: https://lapo.it/asn1js/

This project only support ssl certificates with the `ecdsa-with-SHA256` signature algorithm because it is the only signature algorithm supported by the `sui::ecdsa_r1` library.
