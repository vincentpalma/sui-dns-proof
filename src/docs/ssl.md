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
