import axios from 'axios';
import { WIALON_BASE_URL } from "../../config/config"

export const getSid = async (token: string): Promise<string> => {
    const url = `${WIALON_BASE_URL}?svc=token/login&params=${JSON.stringify({ token })}`;

    try {
        const response = await axios.get(url);
        const sid = response.data.eid;

        return sid;
    } catch (error) {
        throw new Error('Failed to retrieve SID');
    }
}
