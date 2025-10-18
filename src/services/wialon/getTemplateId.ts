import axios from "axios";
import { WIALON_BASE_URL } from "../../config/config"

interface Template {
  id: number;
  n: string;
  [key: string]: unknown;
}

interface ResourceItem {
  id: number;
  rep: Record<string, Template>;
  [key: string]: unknown;
}

interface SearchResponse {
  items: ResourceItem[];
}

export const getTemplateId = async (templateName: string, objectId: number, sid: string): Promise<number> => {
    const params = {
        spec: {
            itemsType: "avl_resource",
            propName: "",
            propValueMask: "",
            sortType: "",
            propType: "",
            or_logic: false,
        },
        force: 1,
        flags: 8193,
        from: 0,
        to: 0
    }
    const url = `${WIALON_BASE_URL}?svc=core/search_items&params=${JSON.stringify(params)}&sid=${sid}`;

    try {
        const response = await axios.get<SearchResponse>(url);
        const { items } = response.data;

        const resourceItem = items.find((item) => item.id === objectId);
        if (!resourceItem) throw new Error('Resource not found');

        const template = Object.values(resourceItem.rep).find((template) => template.n === templateName);
        if (!template) throw new Error('Template not found');

        console.log(template.id);
        return template.id;
    } catch (error) {
        throw new Error('Template not found');
    }
}
