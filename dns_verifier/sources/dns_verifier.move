/// Module: dns_verifier
module dns_verifier::dns_verifier {
    // Imports the `String` type from the Standard Library
    use std::string::String;

    /// Returns the "Hello, World!" as a `String`.
    public fun hello_world(): String {
        b"Hello, World!".to_string()
    }
}
