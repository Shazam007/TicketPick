import { scrypt, randomBytes } from "crypto";
import { promisify } from "util";

const scryptAsync = promisify(scrypt);

export class PasswordManager {
  static async toHash(password: string) {
    const secret = randomBytes(8).toString("hex");
    const buffer = (await scryptAsync(password, secret, 64)) as Buffer;

    return `${buffer.toString("hex")}.${secret}`;
  }

  static async comparePasswords(
    storedPassword: string,
    enteredPassword: string
  ) {
    const [hashedStoredPassword, secret] = storedPassword.split(".");

    const buffer = (await scryptAsync(enteredPassword, secret, 64)) as Buffer;

    return hashedStoredPassword === buffer.toString("hex");
  }
}
