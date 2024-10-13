/// Module: dns_verifier
module dns_verifier::dns_verifier {
    use sui::ecdsa_r1;
    use std::string::String;
    use sui::object_table::{Self, ObjectTable};
    // use domains_proofs::domains_proofs::{Self, DomainProof};
    use sui::address;
    // use std::option;
    use std::string;


    const CA_PUBLIC_KEYS: vector<vector<u8>> = vector[
        x"D3ADB33F", // DEBUG
        x"C0D3B4B5", // Let's Encrypt
        x"D3ADB33F", // Digicert
        // ...
        // TODO: complete list and add mechanism to keep it up to date (https://chromium.googlesource.com/chromium/src/+/main/net/data/ssl/chrome_root_store/root_store.md)
      ];

    public struct DomainProof has key, store {
      id: UID,
      domain: String,
      proof: vector<u8>,
      signature: vector<u8>,
    }

    /// verifier service
    public struct Service has key, store {
        id: UID,
        proofs: ObjectTable<ID, DomainProof>, // address -> proofs of domain ownership
    }

    public fun check_cert(domain: vector<u8>, cert_msg: vector<u8>, cert_sig: vector<u8>): bool {
      // TODO: check that domain matches regex for domain name (example.com and not https://example.com or example)
      let ca_public_key = x"D3ADB33F"; // DEBUG, TODO: get from cert_msg

      // assert ca_public_key in CA_PUBLIC_KEYS
      if (!CA_PUBLIC_KEYS.contains(&ca_public_key)) {
        false
      } 
      else {
        // TODO: assert that cert_msg contains domain

        let verify_cert = ecdsa_r1::secp256r1_verify(&cert_sig, &ca_public_key, &cert_msg, 1);
        (verify_cert)
      }
    }

    public fun check_subject_key(subject_sig: vector<u8>, subject_public_key: vector<u8>, ctx: &tx_context::TxContext): bool {
      let subject_addr = address::to_bytes(tx_context::sender(ctx));
      let verify_subject_key = ecdsa_r1::secp256r1_verify(&subject_sig, &subject_public_key, &subject_addr, 1);
      verify_subject_key
    }

    /// Checks the X.509 certificate signature against CA_PUBLIC_KEYS
    /// AND the subject signature sign(address) against the certificate's subject public key.
    public fun claim_domain(ctx: &mut TxContext, domain: vector<u8>, cert_msg: vector<u8>, cert_sig: vector<u8>, subject_sig: vector<u8>): Option<DomainProof> {
      let subject_public_key = x"C0D3B4B5"; // TODO: get from cert_msg

      if (check_cert(domain, cert_msg, cert_sig) && check_subject_key(subject_sig, subject_public_key, ctx)) {
        let proof = DomainProof {
          id: object::new(ctx),
          domain: string::utf8(domain),
          proof: cert_msg,
          signature: cert_sig,
        };
        // object::add(&mut proof.id, proof);
        // object::new(ctx, proof);
        option::some(proof)
      }
      else {
        option::none()
      }
    }

    /// Returns the "Hello, World!" as a `String`.
    public fun hello_world(): String {
        b"Hello, World!".to_string()
    }
}
