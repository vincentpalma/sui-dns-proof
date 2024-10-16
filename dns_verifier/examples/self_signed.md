# Self-signed SSL Certificate for demo purposes

The `debug` CA in `dns_verifier`.

```sh
openssl req -x509 -newkey ec -pkeyopt ec_paramgen_curve:secp256r1 -days 3650 \
  -nodes -keyout example.com.key -out example.com.crt -subj "/CN=example.com" \
  -addext "subjectAltName=DNS:example.com,DNS:*.example.com,IP:10.0.0.1"
```

=> example.com.crt:

```
-----BEGIN CERTIFICATE-----
MIIB7DCCAXKgAwIBAgIUcc87JKhWN9qTh7my4cdN3ftwHnIwCgYIKoZIzj0EAwIw
FjEUMBIGA1UEAwwLZXhhbXBsZS5jb20wHhcNMjQxMDEzMDI0NjU2WhcNMzQxMDEx
MDI0NjU2WjAWMRQwEgYDVQQDDAtleGFtcGxlLmNvbTB2MBAGByqGSM49AgEGBSuB
BAAiA2IABJXC8WC3vXZy/wh5+Qm2v6/SKuxcQiTdND9c3xS86cqc5iEutC/WFq2B
P2plYE7nIqRf0BmxkGQhXsP5FZ7K3dUtRw6jdlY/mK/eNJ02UbX2mU/ALHqxTXGP
dtrny315AaOBgDB+MB0GA1UdDgQWBBQN9CIFQkgt9Yar2xJvV17mMnwo2zAfBgNV
HSMEGDAWgBQN9CIFQkgt9Yar2xJvV17mMnwo2zAPBgNVHRMBAf8EBTADAQH/MCsG
A1UdEQQkMCKCC2V4YW1wbGUuY29tgg0qLmV4YW1wbGUuY29thwQKAAABMAoGCCqG
SM49BAMCA2gAMGUCMHyLjrhj3o2E3KA/lGI8nBUmO3t9JcpnO63uliFmlBCWM4Fa
/rPteYWcDuQin5ZDMQIxAPGmiq+vFg9SFZ9+rZK7MjtADAQffRaOwgDrBIwy6sV3
qOmNnBlBKX9kcdfJa1yW9Q==
-----END CERTIFICATE-----
```

=> example.com.key:

```
-----BEGIN PRIVATE KEY-----
MIG2AgEAMBAGByqGSM49AgEGBSuBBAAiBIGeMIGbAgEBBDDjL1WO3f73zmDS7iKQ
++FXUDBmAroLflOgKl5FQ8RkAwYEw+de27Ge83sWdAkkJ6ihZANiAASVwvFgt712
cv8IefkJtr+v0irsXEIk3TQ/XN8UvOnKnOYhLrQv1hatgT9qZWBO5yKkX9AZsZBk
IV7D+RWeyt3VLUcOo3ZWP5iv3jSdNlG19plPwCx6sU1xj3ba58t9eQE=
-----END PRIVATE KEY-----
```
