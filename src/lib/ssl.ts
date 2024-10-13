//@ts-expect-error no types
import { ASN1 } from "@lapo/asn1js";
// import { Hex } from '@lapo/asn1js/hex.js';
//@ts-expect-error no types
import { Base64 } from "@lapo/asn1js/base64.js";

export function decodeArmored(val: string) {
  const der = Base64.unarmor(val);
  return ASN1.decode(der).toHexString();
}
