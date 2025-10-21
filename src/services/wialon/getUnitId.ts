import axios from "axios";
import { WIALON_BASE_URL } from "../../config/config";

export const getUnitId = async (vinOrName: string, searchMode: "vin" | "name" | "group" ,sid: string) => {
    const itemsType = searchMode !== "group" ? "avl_unit" : "avl_unit_group"; 
    const propName = searchMode === "vin" ? "rel_customfield_value" : "sys_name";

    const params = {
        spec: {
            itemsType: itemsType,
            propName: propName,
            propValueMask: vinOrName,
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