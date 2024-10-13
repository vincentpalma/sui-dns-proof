## Step 1: Add DNS A records pointing to VPS

## Step 2: Setup Nginx server

Follow this tutorial: https://www.digitalocean.com/community/tutorials/how-to-install-nginx-on-ubuntu-22-04

`/etc/nginx/sites-available/your_domain` should look like this:

```
server {
        listen 80;
        listen [::]:80;

        root /var/www/sui.palma.dev/html;
        index index.html index.htm index.nginx-debian.html;

        server_name sui.palma.dev df39872dfc069d213f2266f018b9386b9d3574be7c3bc3b9594339c35912efa.sui.palma.dev;

        location / {
                try_files $uri $uri/ =404;
        }
}
```

Use `server_names_hash_bucket_size 128;` instead of the `server_names_hash_bucket_size 64;` prescribed in the guide.

## Step 3: Install Certbot

Install Cerbot by following this guide until the end of step 3: https://www.digitalocean.com/community/tutorials/how-to-secure-nginx-with-let-s-encrypt-on-ubuntu-22-04.

Use `your_sui_address.your_domain` instead of `www.your_domain`, where `your_sui_address` are the last 63 characters of your Sui address.

Follow the guide until the end, use `certbot` or `certbot certonly` depending on whether you want to install the certificate on your website or just generate it.

```sh
vince@backend:~$ sudo certbot --nginx -d sui.palma.dev -d df39872dfc069d213f2266f018b9386b9d3574be7c3bc3b9594339c35912efa.sui.palma.dev
Saving debug log to /var/log/letsencrypt/letsencrypt.log
Requesting a certificate for sui.palma.dev and df39872dfc069d213f2266f018b9386b9d3574be7c3bc3b9594339c35912efa.sui.palma.dev

Successfully received certificate.
Certificate is saved at: /etc/letsencrypt/live/sui.palma.dev/fullchain.pem
Key is saved at:         /etc/letsencrypt/live/sui.palma.dev/privkey.pem
This certificate expires on 2025-01-10.
These files will be updated when the certificate renews.
Certbot has set up a scheduled task to automatically renew this certificate in the background.

Deploying certificate
Successfully deployed certificate for sui.palma.dev to /etc/nginx/sites-enabled/sui.palma.dev
Successfully deployed certificate for df39872dfc069d213f2266f018b9386b9d3574be7c3bc3b9594339c35912efa.sui.palma.dev to /etc/nginx/sites-enabled/sui.palma.dev
Congratulations! You have successfully enabled HTTPS on https://sui.palma.dev and https://df39872dfc069d213f2266f018b9386b9d3574be7c3bc3b9594339c35912efa.sui.palma.dev

- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
If you like Certbot, please consider supporting our work by:
 * Donating to ISRG / Let's Encrypt:   https://letsencrypt.org/donate
 * Donating to EFF:                    https://eff.org/donate-le
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
```

fullchain.pem:

```
-----BEGIN CERTIFICATE-----
MIIDyjCCA1CgAwIBAgISA+BvPeqAVv6BHzS0WZ7j46bJMAoGCCqGSM49BAMDMDIx
CzAJBgNVBAYTAlVTMRYwFAYDVQQKEw1MZXQncyBFbmNyeXB0MQswCQYDVQQDEwJF
NTAeFw0yNDEwMTIyMDE4MjhaFw0yNTAxMTAyMDE4MjdaMBgxFjAUBgNVBAMTDXN1
aS5wYWxtYS5kZXYwWTATBgcqhkjOPQIBBggqhkjOPQMBBwNCAATKm4EYyOfaDKSU
u0xghAb5bMU09uo8FB8M1CkLW9zB6i034qITeQGEDh5/9qc4tBLT+WnLAFW342rO
UROC2jOzo4ICXjCCAlowDgYDVR0PAQH/BAQDAgeAMB0GA1UdJQQWMBQGCCsGAQUF
BwMBBggrBgEFBQcDAjAMBgNVHRMBAf8EAjAAMB0GA1UdDgQWBBR5I9ZvM+QqEQ/h
8ebOvF7KnE3U5jAfBgNVHSMEGDAWgBSfK1/PPCFPnQS37SssxMZwi9LXDTBVBggr
BgEFBQcBAQRJMEcwIQYIKwYBBQUHMAGGFWh0dHA6Ly9lNS5vLmxlbmNyLm9yZzAi
BggrBgEFBQcwAoYWaHR0cDovL2U1LmkubGVuY3Iub3JnLzBnBgNVHREEYDBegk1k
ZjM5ODcyZGZjMDY5ZDIxM2YyMjY2ZjAxOGI5Mzg2YjlkMzU3NGJlN2MzYmMzYjk1
OTQzMzljMzU5MTJlZmEuc3VpLnBhbG1hLmRldoINc3VpLnBhbG1hLmRldjATBgNV
HSAEDDAKMAgGBmeBDAECATCCAQQGCisGAQQB1nkCBAIEgfUEgfIA8AB2AD8XS0/X
IkdYlB1lHIS+DRLtkDd/H4Vq68G/KIXs+GRuAAABkoKXeZYAAAQDAEcwRQIhALuR
ppLXPJLuskK45Z7zUbQhRSZzcYoCTs0HbyrmA9VaAiA9hMfteVWF76HIZKAqAC9V
FG78iBGrb33tm7zV5hLbfAB2AM8RVu7VLnyv84db2Wkum+kacWdKsBfsrAHSW3fO
zDsIAAABkoKXeeEAAAQDAEcwRQIhALBBaK71SNt5JWPHxOwUd5/83LG8m0d7i529
L4kWlVF0AiBWBX23xRvpBDpgDziw7tEfdqGYhAsVC6FTHRbWgR0FfjAKBggqhkjO
PQQDAwNoADBlAjEAoOSmPrm32ZlxPUf5U61bSjunLHImh+ZcE8idmBcginBaHSHG
NtE1fQQmN147vgEXAjAllkSOiEoWXdr/vAMx70038ZiwMQzyGzld2yj3wJOcXeD4
Ex6Zg9Kf/+j3KU4aztQ=
-----END CERTIFICATE-----
-----BEGIN CERTIFICATE-----
MIIEVzCCAj+gAwIBAgIRAIOPbGPOsTmMYgZigxXJ/d4wDQYJKoZIhvcNAQELBQAw
TzELMAkGA1UEBhMCVVMxKTAnBgNVBAoTIEludGVybmV0IFNlY3VyaXR5IFJlc2Vh
cmNoIEdyb3VwMRUwEwYDVQQDEwxJU1JHIFJvb3QgWDEwHhcNMjQwMzEzMDAwMDAw
WhcNMjcwMzEyMjM1OTU5WjAyMQswCQYDVQQGEwJVUzEWMBQGA1UEChMNTGV0J3Mg
RW5jcnlwdDELMAkGA1UEAxMCRTUwdjAQBgcqhkjOPQIBBgUrgQQAIgNiAAQNCzqK
a2GOtu/cX1jnxkJFVKtj9mZhSAouWXW0gQI3ULc/FnncmOyhKJdyIBwsz9V8UiBO
VHhbhBRrwJCuhezAUUE8Wod/Bk3U/mDR+mwt4X2VEIiiCFQPmRpM5uoKrNijgfgw
gfUwDgYDVR0PAQH/BAQDAgGGMB0GA1UdJQQWMBQGCCsGAQUFBwMCBggrBgEFBQcD
ATASBgNVHRMBAf8ECDAGAQH/AgEAMB0GA1UdDgQWBBSfK1/PPCFPnQS37SssxMZw
i9LXDTAfBgNVHSMEGDAWgBR5tFnme7bl5AFzgAiIyBpY9umbbjAyBggrBgEFBQcB
AQQmMCQwIgYIKwYBBQUHMAKGFmh0dHA6Ly94MS5pLmxlbmNyLm9yZy8wEwYDVR0g
BAwwCjAIBgZngQwBAgEwJwYDVR0fBCAwHjAcoBqgGIYWaHR0cDovL3gxLmMubGVu
Y3Iub3JnLzANBgkqhkiG9w0BAQsFAAOCAgEAH3KdNEVCQdqk0LKyuNImTKdRJY1C
2uw2SJajuhqkyGPY8C+zzsufZ+mgnhnq1A2KVQOSykOEnUbx1cy637rBAihx97r+
bcwbZM6sTDIaEriR/PLk6LKs9Be0uoVxgOKDcpG9svD33J+G9Lcfv1K9luDmSTgG
6XNFIN5vfI5gs/lMPyojEMdIzK9blcl2/1vKxO8WGCcjvsQ1nJ/Pwt8LQZBfOFyV
XP8ubAp/au3dc4EKWG9MO5zcx1qT9+NXRGdVWxGvmBFRAajciMfXME1ZuGmk3/GO
koAM7ZkjZmleyokP1LGzmfJcUd9s7eeu1/9/eg5XlXd/55GtYjAM+C4DG5i7eaNq
cm2F+yxYIPt6cbbtYVNJCGfHWqHEQ4FYStUyFnv8sjyqU8ypgZaNJ9aVcWSICLOI
E1/Qv/7oKsnZCWJ926wU6RqG1OYPGOi1zuABhLw61cuPVDT28nQS/e6z95cJXq0e
K1BcaJ6fJZsmbjRgD5p3mvEf5vdQM7MCEvU0tHbsx2I5mHHJoABHb8KVBgWp/lcX
GWiWaeOyB7RP+OfDtvi2OsapxXiV7vNVs7fMlrRjY1joKaqmmycnBvAq14AEbtyL
sVfOS66B8apkeFX2NY4XPEYV4ZSCe8VHPrdrERk2wILG3T/EGmSIkCYVUMSnjmJd
VQD9F6Na/+zmXCc=
-----END CERTIFICATE-----
```

privkey.pem:

```
-----BEGIN PRIVATE KEY-----
MIGHAgEAMBMGByqGSM49AgEGCCqGSM49AwEHBG0wawIBAQQgvwvc33Xh/+qb85f4
e98IEElcd7whhVpnEqjEx+tL/wehRANCAATKm4EYyOfaDKSUu0xghAb5bMU09uo8
FB8M1CkLW9zB6i034qITeQGEDh5/9qc4tBLT+WnLAFW342rOUROC2jOz
-----END PRIVATE KEY-----
```

generate X.509 certificate with openssl (https://stackoverflow.com/q/75442368/9340318):

```sh
vince ~/Documents/school/sui/template2/src/docs $ openssl x509 -in fullchain.pem -text -noout
Certificate:
    Data:
        Version: 3 (0x2)
        Serial Number:
            03:e0:6f:3d:ea:80:56:fe:81:1f:34:b4:59:9e:e3:e3:a6:c9
        Signature Algorithm: ecdsa-with-SHA384
        Issuer: C = US, O = Let's Encrypt, CN = E5
        Validity
            Not Before: Oct 12 20:18:28 2024 GMT
            Not After : Jan 10 20:18:27 2025 GMT
        Subject: CN = sui.palma.dev
        Subject Public Key Info:
            Public Key Algorithm: id-ecPublicKey
                Public-Key: (256 bit)
                pub:
                    04:ca:9b:81:18:c8:e7:da:0c:a4:94:bb:4c:60:84:
                    06:f9:6c:c5:34:f6:ea:3c:14:1f:0c:d4:29:0b:5b:
                    dc:c1:ea:2d:37:e2:a2:13:79:01:84:0e:1e:7f:f6:
                    a7:38:b4:12:d3:f9:69:cb:00:55:b7:e3:6a:ce:51:
                    13:82:da:33:b3
                ASN1 OID: prime256v1
                NIST CURVE: P-256
        X509v3 extensions:
            X509v3 Key Usage: critical
                Digital Signature
            X509v3 Extended Key Usage:
                TLS Web Server Authentication, TLS Web Client Authentication
            X509v3 Basic Constraints: critical
                CA:FALSE
            X509v3 Subject Key Identifier:
                79:23:D6:6F:33:E4:2A:11:0F:E1:F1:E6:CE:BC:5E:CA:9C:4D:D4:E6
            X509v3 Authority Key Identifier:
                9F:2B:5F:CF:3C:21:4F:9D:04:B7:ED:2B:2C:C4:C6:70:8B:D2:D7:0D
            Authority Information Access:
                OCSP - URI:http://e5.o.lencr.org
                CA Issuers - URI:http://e5.i.lencr.org/
            X509v3 Subject Alternative Name:
                DNS:df39872dfc069d213f2266f018b9386b9d3574be7c3bc3b9594339c35912efa.sui.palma.dev, DNS:sui.palma.dev
            X509v3 Certificate Policies:
                Policy: 2.23.140.1.2.1
            CT Precertificate SCTs:
                Signed Certificate Timestamp:
                    Version   : v1 (0x0)
                    Log ID    : 3F:17:4B:4F:D7:22:47:58:94:1D:65:1C:84:BE:0D:12:
                                ED:90:37:7F:1F:85:6A:EB:C1:BF:28:85:EC:F8:64:6E
                    Timestamp : Oct 12 21:16:58.134 2024 GMT
                    Extensions: none
                    Signature : ecdsa-with-SHA256
                                30:45:02:21:00:BB:91:A6:92:D7:3C:92:EE:B2:42:B8:
                                E5:9E:F3:51:B4:21:45:26:73:71:8A:02:4E:CD:07:6F:
                                2A:E6:03:D5:5A:02:20:3D:84:C7:ED:79:55:85:EF:A1:
                                C8:64:A0:2A:00:2F:55:14:6E:FC:88:11:AB:6F:7D:ED:
                                9B:BC:D5:E6:12:DB:7C
                Signed Certificate Timestamp:
                    Version   : v1 (0x0)
                    Log ID    : CF:11:56:EE:D5:2E:7C:AF:F3:87:5B:D9:69:2E:9B:E9:
                                1A:71:67:4A:B0:17:EC:AC:01:D2:5B:77:CE:CC:3B:08
                    Timestamp : Oct 12 21:16:58.209 2024 GMT
                    Extensions: none
                    Signature : ecdsa-with-SHA256
                                30:45:02:21:00:B0:41:68:AE:F5:48:DB:79:25:63:C7:
                                C4:EC:14:77:9F:FC:DC:B1:BC:9B:47:7B:8B:9D:BD:2F:
                                89:16:95:51:74:02:20:56:05:7D:B7:C5:1B:E9:04:3A:
                                60:0F:38:B0:EE:D1:1F:76:A1:98:84:0B:15:0B:A1:53:
                                1D:16:D6:81:1D:05:7E
    Signature Algorithm: ecdsa-with-SHA384
    Signature Value:
        30:65:02:31:00:a0:e4:a6:3e:b9:b7:d9:99:71:3d:47:f9:53:
        ad:5b:4a:3b:a7:2c:72:26:87:e6:5c:13:c8:9d:98:17:20:8a:
        70:5a:1d:21:c6:36:d1:35:7d:04:26:37:5e:3b:be:01:17:02:
        30:25:96:44:8e:88:4a:16:5d:da:ff:bc:03:31:ef:4d:37:f1:
        98:b0:31:0c:f2:1b:39:5d:db:28:f7:c0:93:9c:5d:e0:f8:13:
        1e:99:83:d2:9f:ff:e8:f7:29:4e:1a:ce:d4
```

```
openssl s_client -showcerts -verify 5 -connect sui.palma.dev:443 < /dev/null | awk '/BEGIN/,/END/{ if(/BEGIN/){a++}; out="cert"a".crt"; print >out}' && for cert in *.crt; do newname=$(openssl x509 -noout -subject -in $cert | sed -n 's/^.*CN=\(.*\)$/\1/; s/[ ,.*]/_/g; s/__/_/g; s/^_//g;p').pem; mv $cert $newname; done
```
