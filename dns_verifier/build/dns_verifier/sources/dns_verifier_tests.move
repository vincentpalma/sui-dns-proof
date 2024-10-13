#[test_only]
module dns_verifier::dns_verifier_tests {
    use dns_verifier::dns_verifier;

    #[test]
    fun test_hello_world() {
        assert!(dns_verifier::hello_world() == b"Hello, World!".to_string(), 0);
    }
}
