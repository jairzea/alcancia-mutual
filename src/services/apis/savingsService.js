import http from "../http";
import { COIN } from "../../constants/endpoints";

export const getShowCoin = async (coin) => {
    let currentValue = localStorage.getItem(coin)
    currentValue = currentValue ? JSON.parse(currentValue) : {
        currentValue : 0,
        currentAmount : 0
    }
    
    return currentValue
//   const { data = {} } = await http.get(COIN(coin));
//   return data;
};

export const getCurrentValue = async () => {
    let currentValue = localStorage.getItem("currentFullValue")
    return currentValue ? currentValue : 0
//   const { data = {} } = await http.get(COIN(coin));
//   return data;
};

export const getCurrentAmount = async () => {
    let currentAmount = localStorage.getItem("currentAmount")
    return currentAmount ? currentAmount : 0
}

export const save = async (coin) => {

    let currentFullValue = await getCurrentValue();
    let currentAmount = await getCurrentAmount();

    const currentCoin = addCurrency(coin)

    currentFullValue = Number(currentFullValue) + Number(coin)
    localStorage.setItem("currentFullValue", currentFullValue)

    localStorage.setItem("currentAmount", ++currentAmount)

    return currentCoin

}

const addCurrency = async (coin) => {

    let coinStatus = await getShowCoin(coin);
    let currentAmount = coinStatus?.currentAmount
    let currentValue = coinStatus?.currentValue

    const amount = {
        currentValue : Number(currentValue) + Number(coin),
        currentAmount : ++currentAmount
    }

    localStorage.setItem(coin, JSON.stringify(amount))

    return localStorage.getItem(coin);
}