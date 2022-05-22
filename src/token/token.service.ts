import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/sequelize';
import { EntityDTO } from 'src/entity/entityDTO.model';
import { NotFoundError } from 'src/errors';
import { EntityToken } from './token.model';

@Injectable()
export class TokenService {
  constructor(
    @InjectModel(EntityToken)
    private tokenModel: typeof EntityToken,
    private jwtService: JwtService,
  ) {}

  async create(entity: EntityDTO) {
    const refreshToken = this.jwtService.sign(
      {
        id: entity.id,
      },
      {
        algorithm: 'RS512',
        privateKey: `-----BEGIN RSA PRIVATE KEY-----
MIIEowIBAAKCAQB51/cNINZop9YWYbPLc9y0SXZdfEa+a7EwgAU/DWAXnas3r6tbqfGAlMJXAkvWeIN2f/KLrpV3ZgONffycpWCo+NQZE9NUUmdxrtiLzqbTSNYFAAnLUKU0uJo2lY0ntSMNhx9/8+C2YUwRNUVnIZ4ASdPOOC06pT5t25Xvzk8vpsNy3E5fGoRQaxwenD4/dMHmuxg+lwyMof2g2JadMrAzx28lgwe3yTbseGvh/EeJ4fyWO/+H63NInnNXZp7fq+DcFgcGVWgacf8dNjc9KaGJQeJbj9qogge/uXyVaUlMF3Z2Q5rxpwfJ5gGJgxeJ2zSwrXRxGT1UBRuWzL9aeVr5AgMBAAECggEAYgn5OrIKc6lgpR+2aOVwWAyoVi6SSdQjfc/06LgdcsMmKqeKLTaAISMRgKtTVF4iAa6P/f7bO3h1MVuHcI/NSAj3uLnwGHA51gqHKW99YpK/ysQuHU9lrxc+1t7c9m9UpiTsnqsgS//cEhiYIJS3Kqo86Djhg8fEhObkLVIG+2KDx1dE2lR0JK88Rm/zIp+LR+vxN+EaV/lBkVehUnmsFcQ5I4iK22bX0bAhjjCzTs2bq758LJaWdVeFpP/P+ajqA+6ptQ18NViqXvs7e/kwGW6+3E840P1iK761G9WFGErxc9mtni2rpCGfUNJUNZWasfPBqITAbc/r/qTu12g/UQKBgQDcLxz+jJ7rS4eL12iQYohW0d3/BCraJDkhJYUZyeRw0X79ClTBvlvw4kGSvQRULajdk/Fl05/zMDk0HoqDLk5dgvj1Y80KdSuwTtsS+yX8lD54EStmuFUR7o1J2/KecgB0+GXqkL6E+UINDIg6NQHm2arkAQ1gONRBSOfpadT2ZQKBgQCNqcR3bGmTMpzsgN+8FZVosNUmm8Vyzye/hVhbwompLxWbvGZ0SbRoWtSqrJdu2arlq0VpQ6dcF/Vrl04AzPgmUH5GczByaOSnNfw2LiLUi03f0331ZV7idgNBOQBxS9CJeyHWEhn02MLQV9zwvaCnYs6aG1crURDkBUESVIQvBQKBgQCby6pUYuO/0b2jMVQHdfDKnczauPQpTiAuWAIJ8VT2jwWvvjOiszMTCsUjMyNw/K3Tuu7AAjHXPXP8cO/JSmagvB+0Yl2e3LGBGwrgL1z9j1d0VZHEKQHookbO0BaoDjpMicZzZt+n70bRPODXbtJdqf7FPglc4FkvqIqQGhZaEQKBgColegg1vutGQZ2zcd0ZZsww4BmOep3/t8mpOHKEXERzd7BPywOJ8hyh+WeV1a/rHocZ/5qjwCUME74g09o1IRb1F7yKBL3lKzH8Q78y1rX5g/+1gmIB+MrTZYCAHvuWHMLqWVTBKevImZ02pssQ/70NDn6W58ZBZg8Q6R00++apAoGBALYY/tIU7t0Fcf5Frb82+HEirTKQuHyhWENysEDjlP+iWMswXJ040D0QmjYQWkmUWsE9Pg6Yp4JLEU27q9zem5GaMJl7sCG37nCqm6FDNVFBMaX5wZGDF8YH9YD0Ojr8nTIEYavbEwF53vj0Uba8yJknOxnTaHKw0t7wFyQbHR4r
-----END RSA PRIVATE KEY-----`,
      },
    );

    this.tokenModel.create({
      entityId: entity.id,
      hashedRefreshToken: refreshToken,
    });
  }

  async findById(id: string) {
    return this.tokenModel.findByPk(id);
  }

  async createAccessToken(userId: string): Promise<string> {
    const user = await this.findById(userId);

    if (!user) {
      throw new NotFoundError('User not found');
    }

    const accessToken = this.jwtService.sign(
      {
        id: userId,
      },
      {
        algorithm: 'RS512',
        privateKey: `-----BEGIN RSA PRIVATE KEY-----
MIIEowIBAAKCAQEAjTHrYO+iGAg4ii4R62AR/Pm96L8LHGoK0e1mXsBiXPnAy5KYrLdq7OpZntwDrg3X0CtGo1JCp1V/nBlfu4pGBUs232yChnLNyi+ib6H8yi2lbE2w+vgt8V13Gg6CsedwWv5ObEum6OcfiV9rUMyfEYAlzdxaRM5NL3Ofkm9mKA/Xn2QGz1xzf53b5NcfEaCfV1c4F4Vqq9tFL4K2hO5gyIIhOwrMTDq6txTEOsuym0sz4kAwRZoveGgk3b/BmRSm1hTaGtbbEGpGD+I9PKQF8NnS2sYqOPzSFreXkB3hnrXcxonInSljpxNCOVGIM7mtgje4BnoWtfGQU8QouP/qLQIDAQABAoIBAGYf1ynT6aAMQijfzaI7aIdbc9rmY3j30j+owESETiEFnEciDz/Noo8dqhjW9epspM4ynvL+SquRka0sRSv2hVLK5jOP3pC0dNhqv8iSl678eQvu3bWI0GIlwkGcgTeAOKn4Cm0WAvGuSgcodwyIE/2qfK17VecyeG176c0WugL67cJ60JYAzkN2AtuS3X/w4Hr8MbzCzdk/5GqgBm2/6Do26LnOEtzq3FybbXI2s+6c9DPVlx0SCysIeQRr6+peyFTSV6M+g1GLInCr9aCdUpbqiH1d5pqZhxWwrTUF6yBTZojrRT1bbxeGnFmDi13xoz0p8B5JNZBo+BL+/vJ594ECgYEA1CL/DOaJcLywpi3BifuxoXykfyhNeDpHfnFWoeMILsyrsobDX4VRpyXwnvMUdzufkYeNrEVjHK15g26H0YPh+P2ZYQOJ87dGkeMc83wulX1sU+PNOQkSevu7RS68oUkgErHjrKRvs0NIlLUrEBeoeCrMzVirHz6lygaAYHNoQh0CgYEAqmPGe+XbcfKn3/+z1hKEscVqgyOfidKYZqyFRX+XuXO/LBxa+LZgERMimcuC9sdeSDw/8Rx/T437lLz4tKGZcvLa9BN52DcifoEuHMh9XyVh/CxUEoGaueBIP+auv9SraKbdvtyQGhMecSiDYGocixPLqs9fHCNjnwHSvKcOy1ECgYB8G/Vn0MB8KoiW0JI4bf6gYdHDawrX2hDV0u1CTRcOekPBcMKA8fixd6rs8333u/RBKjMipH2123AKCvJ/C097YrMHZRCie4lX9K2Nbgu6/eQQuGfqhHpBZWFMumk1WxjelyCCcrm/ARBHoC6Pfafclf237bY/02EfbupQg3RtqQKBgQCa+ZUWK8KkqWg3PIN9OeqnJj/ydvwshvdGq7Oruplte/FtVX0IqhhGb3kRGSFNA5ilauddjeXdne4tIpOy9yhyfKDZTr2MAtnE5gni9BfT6lRs4IS3MFpipbQRKufWYsBktyEI7+PBU5JkqcyUbO75MFAWU/bVyPpbLXVXUTsLgQKBgH65HuYeddu3DZGnhDFjRGJcQt50APH9PvtHGjNDC2TXQ/cKFyNrBhO4bSaeGVu1vGSldJ2PFONgZJ6Rl1GQbTmF1xcv49uQDJmZTYve7wxrOoLRi7urQdNBGm233R4/6FrmhbwTws69paNoZXc+kh3w9LW3ad2K/VDQjsd/IFY7
-----END RSA PRIVATE KEY-----`,
        expiresIn: '30s',
      },
    );

    user.hashedAccessToken = accessToken;
    await user.save();

    return accessToken;
  }
}
