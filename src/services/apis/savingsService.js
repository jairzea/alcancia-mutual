import http from "../http";
import { COIN, SHOW_COIN } from "../../constants/endpoints";
import { denominationMapper } from "./servicesMapper";

export const getShowCoin = async (coin) => {
    
    const { data = {} } = await http.get(SHOW_COIN(coin));
    let reduce = data.reduce((sum, coin) => sum + coin.value, 0);
    const currentValue = {
        currentValue : reduce,
        currentAmount : data?.length
    }

    return currentValue

};

export const getCurrentStatus = async () => {
    const { data = {} } = await http.get(COIN);
    const currentStatus = {
        amount : data?.length,
        value : data.reduce((sum, coin) => sum + coin.value, 0)
    }
    return currentStatus;
};

export const save = async (coin) => {

    const body = {
        "denomination" : denominationMapper(coin),
        "value" : coin
    }
    const { data = {} } = await http.post(COIN, body);
    return data

}