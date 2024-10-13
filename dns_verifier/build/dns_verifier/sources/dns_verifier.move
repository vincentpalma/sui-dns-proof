/// Module: dns_verifier
module dns_verifier::dns_verifier {
    use sui::ecdsa_r1;
    use std::string::String;
    use sui::object_table::{Self, ObjectTable};
    use sui::address;
    use std::string;

    const CA_PUBLIC_KEYS: vector<vector<u8>> = vector[
        x"D3ADB33F", // DEBUG
        x"C0D3B4B5", // Let's Encrypt
        x"AAAAAAAA", // Digicert
        // ...
        // TODO: complete list and add mechanism to keep it up to date (https://chromium.googlesource.com/chromium/src/+/main/net/data/ssl/chrome_root_store/root_store.md)
      ];


    public struct DomainProof has key, store {
      id: UID,
      service_id: ID,
      owner: address,
      domains: vector<String>,
    }

    /// verifier service
    public struct Service has key, store {
        id: UID,
        proofs: ObjectTable<address, DomainProof>, // address -> proofs of domain ownership
    }

    public fun create_service(
        ctx: &mut TxContext,
    ): ID {
        let id = object::new(ctx);
        let service_id = id.to_inner();
        let service = Service {
            id,
            proofs: object_table::new(ctx),
        };

        transfer::share_object(service);
        service_id
    }

    #[allow(implicit_const_copy, unused_variable)]
    public fun check_cert(domain: vector<u8>, cert_msg: vector<u8>, cert_sig: vector<u8>): bool {
      // TODO: check that domain matches regex for domain name (example.com and not https://example.com or example)

      let ca_public_key = x"D3ADB33F"; // TODO: get from cert_msg

      if (!CA_PUBLIC_KEYS.contains(&ca_public_key)) {
        false // assert ca_public_key in CA_PUBLIC_KEYS
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
    /// Returns true if successful, false otherwise.
    public fun claim_domain(
      service: &mut Service, 
      domain: vector<u8>, cert_msg: vector<u8>, 
      cert_sig: vector<u8>, subject_sig: vector<u8>, 
      ctx: &mut TxContext
    ): bool {
      let subject_public_key = x"C0D3B4B5"; // TODO: get from cert_msg

      if (check_cert(domain, cert_msg, cert_sig) && check_subject_key(subject_sig, subject_public_key, ctx)) {
        let proof = DomainProof {
          id: object::new(ctx),
          service_id: object::id(service),
          owner: tx_context::sender(ctx),
          domains: vector[string::utf8(domain)],
        };

        // TODO: add support for multiple domains by checking if a proof already exists for the owner and appending to proof.domains

        object_table::add(&mut service.proofs, tx_context::sender(ctx), proof);
        true
      }
      else {
        false
      }
    }

    /// Returns the list of domains owned by the address
    public fun verify_ownership(service: &mut Service, addr: address): &DomainProof {
      let proof = service.proofs.borrow(addr);
      (proof)
    }
}
