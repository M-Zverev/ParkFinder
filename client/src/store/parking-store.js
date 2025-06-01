import { makeAutoObservable } from "mobx";

export default class ParkingStore {
    _parkingLots = [];

    constructor() {
        this._parkingLots = [];
        makeAutoObservable(this);
    }

    setParkingLots(parkingLots) {
        this._parkingLots = parkingLots;
    }

    setParkingLot(parkingLot) {
        const indx = this._parkingLots.findIndex(p => p.id === parkingLot.id);
        if (indx !== -1) {
            this._parkingLots[indx] = parkingLot;
        }
    }

    get parkingLots() {
        return this._parkingLots;
    }

    getParkingLotById(id) {
        return this._parkingLots.find(p => p.id === id);
    }
}
