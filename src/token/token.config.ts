import { registerAs } from '@nestjs/config';
import * as Joi from 'joi';

export const validationSchema = Joi.object({
  REFRESH_PRIVATE_KEY: Joi.string().default(`-----BEGIN RSA PRIVATE KEY-----
  MIIEowIBAAKCAQB51/cNINZop9YWYbPLc9y0SXZdfEa+a7EwgAU/DWAXnas3r6tb
  qfGAlMJXAkvWeIN2f/KLrpV3ZgONffycpWCo+NQZE9NUUmdxrtiLzqbTSNYFAAnL
  UKU0uJo2lY0ntSMNhx9/8+C2YUwRNUVnIZ4ASdPOOC06pT5t25Xvzk8vpsNy3E5f
  GoRQaxwenD4/dMHmuxg+lwyMof2g2JadMrAzx28lgwe3yTbseGvh/EeJ4fyWO/+H
  63NInnNXZp7fq+DcFgcGVWgacf8dNjc9KaGJQeJbj9qogge/uXyVaUlMF3Z2Q5rx
  pwfJ5gGJgxeJ2zSwrXRxGT1UBRuWzL9aeVr5AgMBAAECggEAYgn5OrIKc6lgpR+2
  aOVwWAyoVi6SSdQjfc/06LgdcsMmKqeKLTaAISMRgKtTVF4iAa6P/f7bO3h1MVuH
  cI/NSAj3uLnwGHA51gqHKW99YpK/ysQuHU9lrxc+1t7c9m9UpiTsnqsgS//cEhiY
  IJS3Kqo86Djhg8fEhObkLVIG+2KDx1dE2lR0JK88Rm/zIp+LR+vxN+EaV/lBkVeh
  UnmsFcQ5I4iK22bX0bAhjjCzTs2bq758LJaWdVeFpP/P+ajqA+6ptQ18NViqXvs7
  e/kwGW6+3E840P1iK761G9WFGErxc9mtni2rpCGfUNJUNZWasfPBqITAbc/r/qTu
  12g/UQKBgQDcLxz+jJ7rS4eL12iQYohW0d3/BCraJDkhJYUZyeRw0X79ClTBvlvw
  4kGSvQRULajdk/Fl05/zMDk0HoqDLk5dgvj1Y80KdSuwTtsS+yX8lD54EStmuFUR
  7o1J2/KecgB0+GXqkL6E+UINDIg6NQHm2arkAQ1gONRBSOfpadT2ZQKBgQCNqcR3
  bGmTMpzsgN+8FZVosNUmm8Vyzye/hVhbwompLxWbvGZ0SbRoWtSqrJdu2arlq0Vp
  Q6dcF/Vrl04AzPgmUH5GczByaOSnNfw2LiLUi03f0331ZV7idgNBOQBxS9CJeyHW
  Ehn02MLQV9zwvaCnYs6aG1crURDkBUESVIQvBQKBgQCby6pUYuO/0b2jMVQHdfDK
  nczauPQpTiAuWAIJ8VT2jwWvvjOiszMTCsUjMyNw/K3Tuu7AAjHXPXP8cO/JSmag
  vB+0Yl2e3LGBGwrgL1z9j1d0VZHEKQHookbO0BaoDjpMicZzZt+n70bRPODXbtJd
  qf7FPglc4FkvqIqQGhZaEQKBgColegg1vutGQZ2zcd0ZZsww4BmOep3/t8mpOHKE
  XERzd7BPywOJ8hyh+WeV1a/rHocZ/5qjwCUME74g09o1IRb1F7yKBL3lKzH8Q78y
  1rX5g/+1gmIB+MrTZYCAHvuWHMLqWVTBKevImZ02pssQ/70NDn6W58ZBZg8Q6R00
  ++apAoGBALYY/tIU7t0Fcf5Frb82+HEirTKQuHyhWENysEDjlP+iWMswXJ040D0Q
  mjYQWkmUWsE9Pg6Yp4JLEU27q9zem5GaMJl7sCG37nCqm6FDNVFBMaX5wZGDF8YH
  9YD0Ojr8nTIEYavbEwF53vj0Uba8yJknOxnTaHKw0t7wFyQbHR4r
  -----END RSA PRIVATE KEY-----`),
  ACCESS_PUBLIC_KEY: Joi.string().default(`-----BEGIN PUBLIC KEY-----
  MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAjTHrYO+iGAg4ii4R62AR
  /Pm96L8LHGoK0e1mXsBiXPnAy5KYrLdq7OpZntwDrg3X0CtGo1JCp1V/nBlfu4pG
  BUs232yChnLNyi+ib6H8yi2lbE2w+vgt8V13Gg6CsedwWv5ObEum6OcfiV9rUMyf
  EYAlzdxaRM5NL3Ofkm9mKA/Xn2QGz1xzf53b5NcfEaCfV1c4F4Vqq9tFL4K2hO5g
  yIIhOwrMTDq6txTEOsuym0sz4kAwRZoveGgk3b/BmRSm1hTaGtbbEGpGD+I9PKQF
  8NnS2sYqOPzSFreXkB3hnrXcxonInSljpxNCOVGIM7mtgje4BnoWtfGQU8QouP/q
  LQIDAQAB
  -----END PUBLIC KEY-----`),
  ACCESS_PRIVATE_KEY: Joi.string().default(`-----BEGIN RSA PRIVATE KEY-----
  MIIEowIBAAKCAQEAjTHrYO+iGAg4ii4R62AR/Pm96L8LHGoK0e1mXsBiXPnAy5KY
  rLdq7OpZntwDrg3X0CtGo1JCp1V/nBlfu4pGBUs232yChnLNyi+ib6H8yi2lbE2w
  +vgt8V13Gg6CsedwWv5ObEum6OcfiV9rUMyfEYAlzdxaRM5NL3Ofkm9mKA/Xn2QG
  z1xzf53b5NcfEaCfV1c4F4Vqq9tFL4K2hO5gyIIhOwrMTDq6txTEOsuym0sz4kAw
  RZoveGgk3b/BmRSm1hTaGtbbEGpGD+I9PKQF8NnS2sYqOPzSFreXkB3hnrXcxonI
  nSljpxNCOVGIM7mtgje4BnoWtfGQU8QouP/qLQIDAQABAoIBAGYf1ynT6aAMQijf
  zaI7aIdbc9rmY3j30j+owESETiEFnEciDz/Noo8dqhjW9epspM4ynvL+SquRka0s
  RSv2hVLK5jOP3pC0dNhqv8iSl678eQvu3bWI0GIlwkGcgTeAOKn4Cm0WAvGuSgco
  dwyIE/2qfK17VecyeG176c0WugL67cJ60JYAzkN2AtuS3X/w4Hr8MbzCzdk/5Gqg
  Bm2/6Do26LnOEtzq3FybbXI2s+6c9DPVlx0SCysIeQRr6+peyFTSV6M+g1GLInCr
  9aCdUpbqiH1d5pqZhxWwrTUF6yBTZojrRT1bbxeGnFmDi13xoz0p8B5JNZBo+BL+
  /vJ594ECgYEA1CL/DOaJcLywpi3BifuxoXykfyhNeDpHfnFWoeMILsyrsobDX4VR
  pyXwnvMUdzufkYeNrEVjHK15g26H0YPh+P2ZYQOJ87dGkeMc83wulX1sU+PNOQkS
  evu7RS68oUkgErHjrKRvs0NIlLUrEBeoeCrMzVirHz6lygaAYHNoQh0CgYEAqmPG
  e+XbcfKn3/+z1hKEscVqgyOfidKYZqyFRX+XuXO/LBxa+LZgERMimcuC9sdeSDw/
  8Rx/T437lLz4tKGZcvLa9BN52DcifoEuHMh9XyVh/CxUEoGaueBIP+auv9SraKbd
  vtyQGhMecSiDYGocixPLqs9fHCNjnwHSvKcOy1ECgYB8G/Vn0MB8KoiW0JI4bf6g
  YdHDawrX2hDV0u1CTRcOekPBcMKA8fixd6rs8333u/RBKjMipH2123AKCvJ/C097
  YrMHZRCie4lX9K2Nbgu6/eQQuGfqhHpBZWFMumk1WxjelyCCcrm/ARBHoC6Pfafc
  lf237bY/02EfbupQg3RtqQKBgQCa+ZUWK8KkqWg3PIN9OeqnJj/ydvwshvdGq7Or
  uplte/FtVX0IqhhGb3kRGSFNA5ilauddjeXdne4tIpOy9yhyfKDZTr2MAtnE5gni
  9BfT6lRs4IS3MFpipbQRKufWYsBktyEI7+PBU5JkqcyUbO75MFAWU/bVyPpbLXVX
  UTsLgQKBgH65HuYeddu3DZGnhDFjRGJcQt50APH9PvtHGjNDC2TXQ/cKFyNrBhO4
  bSaeGVu1vGSldJ2PFONgZJ6Rl1GQbTmF1xcv49uQDJmZTYve7wxrOoLRi7urQdNB
  Gm233R4/6FrmhbwTws69paNoZXc+kh3w9LW3ad2K/VDQjsd/IFY7
  -----END RSA PRIVATE KEY-----`),
  ACCESS_TOKEN_EXPIRATION: Joi.string().default('60s'),
});

export const registerer = registerAs('token', () => {
  return {
    refreshPrivateKey: process.env['REFRESH_PRIVATE_KEY'],
    accessPrivateKey: process.env['ACCESS_PRIVATE_KEY'],
    accessPublicKey: process.env['ACCESS_PUBLIC_KEY'],
    signOptions: { expiresIn: process.env['ACCESS_TOKEN_EXPIRATION'] },
  };
});
