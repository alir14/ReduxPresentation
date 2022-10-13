import { v4 as uuidv4 } from "uuid";

export const getRandomUserId = (max: number) => {
    return Math.floor(Math.random() * max);
}

export const getID = () => {
    return uuidv4();
}