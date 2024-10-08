import { Injectable } from "@angular/core";
import { UserIdentity } from "../app/model/user-identity";


[Injectable()]
export class ApplicationState {
    private storage: Storage;
    private userIdentityKey = 'USER_IDENTITY';

    constructor() {
        this.storage = localStorage;
    }

    getAuthToken() {
        const userJson = this.storage.getItem(this.userIdentityKey);
        return userJson ? (JSON.parse(userJson) as UserIdentity).token : undefined;
    }

    getUserIdentity() {
        const userJson = this.storage.getItem(this.userIdentityKey);
        return userJson ? (JSON.parse(userJson) as UserIdentity) : undefined;
    }

    setUserIdentity(userIdentity: UserIdentity) {
        this.storage.setItem(this.userIdentityKey, JSON.stringify(userIdentity));
    }

    removeUserIdentity() {
        this.storage.removeItem(this.userIdentityKey);
    }
}