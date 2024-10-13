module domains_proofs::domains_proofs {
  use std::string::String;

  public struct DomainProof has key, store {
    id: UID,
    domain: String,
    proof: vector<u8>,
    signature: vector<u8>,
  }

  
}
