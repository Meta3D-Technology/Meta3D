import { nullable } from "meta3d-commonlib-ts/src/nullable";

type account = string

export function saveAccount(account: account): void

export function readAccount(): nullable<account>

export function logOut(): void

export function buildAdminAccount(): account

export function buildTestUserAccount(): account

export function isAdmin(account: account): boolean