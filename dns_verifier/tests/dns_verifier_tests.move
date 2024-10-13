// #[test_only]
// module dns_verifier::dns_verifier_tests {
//     use sui::ecdsa_r1;
//     use sui::address;
//     use dns_verifier::dns_verifier;

//     #[test]
//     fun test_signature_check() {
//         // don't work with cert directly
//         // let cert = x"308201EC30820172A003020102021471CF3B24A85637DA9387B9B2E1C74DDDFB701E72300A06082A8648CE3D04030230163114301206035504030C0B6578616D706C652E636F6D301E170D3234313031333032343635365A170D3334313031313032343635365A30163114301206035504030C0B6578616D706C652E636F6D3076301006072A8648CE3D020106052B810400220362000495C2F160B7BD7672FF0879F909B6BFAFD22AEC5C4224DD343F5CDF14BCE9CA9CE6212EB42FD616AD813F6A65604EE722A45FD019B19064215EC3F9159ECADDD52D470EA376563F98AFDE349D3651B5F6994FC02C7AB14D718F76DAE7CB7D7901A38180307E301D0603551D0E041604140DF4220542482DF586ABDB126F575EE6327C28DB301F0603551D230418301680140DF4220542482DF586ABDB126F575EE6327C28DB300F0603551D130101FF040530030101FF302B0603551D1104243022820B6578616D706C652E636F6D820D2A2E6578616D706C652E636F6D87040A000001300A06082A8648CE3D040302036800306502307C8B8EB863DE8D84DCA03F94623C9C15263B7B7D25CA673BADEE96216694109633815AFEB3ED79859C0EE4229F964331023100F1A68AAFAF160F52159F7EAD92BB323B400C041F7D168EC200EB048C32EAC577A8E98D9C1941297F6471D7C96B5C96F5";
//         let cert_msg = x"1111";
//         let cert_sig = x"2222";
        
//         let ca_public_key = x"D3ADB33F";

//         let subject_public_key = x"C0D3B4B5"; // FIXME: actually derived from cert msg
//         let subject_addr: vector<u8> = address::to_bytes(@0x1);
//         let subject_sig = x"3333"; // = sign(subject_addr, subject_public_key), to prove that cert was issued to subject
        
//         let verify_cert = ecdsa_r1::secp256r1_verify(&cert_sig, &ca_public_key, &cert_msg, 1);
//         assert!(verify_cert == true, 0);

//         let verify_subject_key = ecdsa_r1::secp256r1_verify(&subject_sig, &subject_public_key, &subject_addr, 1);
//         assert!(verify_subject_key == true, 0);



//         // submit proof to verifier service
//         let success = dns_verifier::claim_domain(, b"example.com", cert_msg, cert_sig, subject_sig, &mut tx_context::dummy());
//         assert!(success == true, 0);
//     }
// }
