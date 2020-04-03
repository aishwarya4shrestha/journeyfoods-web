import * as storage from '../utils/storage';
import { ACCESS_TOKEN, REFRESH_TOKEN, ROLE } from '../constants/appConstant';

/**
 * Set access token
 * @param {string} token
 */
export function setAccessToken(token: string) {
  storage.set(ACCESS_TOKEN, token);
}

/**
 * Set access token
 * @param {string} token
 */
export function setRefreshToken(token: string) {
  storage.set(REFRESH_TOKEN, token);
}

/**
 * @return {string}
 */
export function getAccessToken() {
  return storage.get(ACCESS_TOKEN);
}

/**
 * @return {string}
 */
export function getRefreshToken() {
  return storage.get(REFRESH_TOKEN);
}

/**
 * Set tenant id
 * @param {string} token
 */
export function setRole(role: string) {
  storage.set(ROLE, role);
}

/**
 * @return {string}
 */
export function getRole() {
  return storage.get(ROLE);
}

/**
 * Make local storage empty
 */
export function clear() {
  storage.clear();
}
