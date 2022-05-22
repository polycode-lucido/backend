import { registerAs } from '@nestjs/config';
import * as Joi from 'joi';

export const validationSchema = Joi.object({
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
  ACCESS_PUBLIC_KEY: Joi.string().default(`-----BEGIN PUBLIC KEY-----
  MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAjTHrYO+iGAg4ii4R62AR
  /Pm96L8LHGoK0e1mXsBiXPnAy5KYrLdq7OpZntwDrg3X0CtGo1JCp1V/nBlfu4pG
  BUs232yChnLNyi+ib6H8yi2lbE2w+vgt8V13Gg6CsedwWv5ObEum6OcfiV9rUMyf
  EYAlzdxaRM5NL3Ofkm9mKA/Xn2QGz1xzf53b5NcfEaCfV1c4F4Vqq9tFL4K2hO5g
  yIIhOwrMTDq6txTEOsuym0sz4kAwRZoveGgk3b/BmRSm1hTaGtbbEGpGD+I9PKQF
  8NnS2sYqOPzSFreXkB3hnrXcxonInSljpxNCOVGIM7mtgje4BnoWtfGQU8QouP/q
  LQIDAQAB
  -----END PUBLIC KEY-----`),
});

export const registerer = registerAs('auth', () => {
  return {
    refreshPublicKey: process.env['REFRESH_PUBLIC_KEY'],
    accessPublicKey: process.env['ACCESS_PUBLIC_KEY'],
  };
});
