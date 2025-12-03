import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { getSecret as prodSecret } from '@aws-amplify/backend';

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

export function getSecret(key) {

  if (process.env.NODE_ENV === "development") {
    return process.env[key]
  } else {
    return prodSecret(key);
  }

}