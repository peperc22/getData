import axios from "axios";
import { WIALON_BASE_URL } from "../../config/config";

export const getUnitId = async (vin: string, sid: string) => {
    const params = {
        spec: {
            itemsType: "avl_unit",
            propName: "rel_customfield_value",
            propValueMask: vin,
            sortType: ""
        },
        force: 1,
        flags: 1,
        from: 0,
        to: 0,
    };
    const url = `${WIALON_BASE_URL}?svc=core/search_items&params=${JSON.stringify(params)}&sid=${sid}`;

    try {
        const response = await axios.get(url);
        const unitId = response.data.items[0].id;

        return unitId;
    } catch (error) {
        console.error('No unitId found');
        throw new Error(`Wialon error: ${error}`);
    }
}