import axios from "axios";
import { WIALON_BASE_URL } from "../../config/config"

const execReport = async (
    resourceId: string,
    templateId: string,
    objectId: string,
    sid: string,
): Promise<string | null> => {
    const params = {
        reportResourceId: resourceId,
        reportTemplateId: templateId,
        reportObjectId: objectId,
        reportObjectSecId: 0,
        interval: {
            from: 1760508001,
            to: 1760594399,
            flags: 0
        },
        remoteExec: 0,
        reportTemplate: []
    };

    const url = `${WIALON_BASE_URL}?svc=report/exec_report&params=${JSON.stringify(params)}&sid=${sid}`;

    try {
        const response = await axios.get(url);
        return response.data
    } catch (error) {
        console.error(error);
        return null;
    }
}

execReport('400081093', '56', '400081059', '41602be2155a5793137f012458e7e36f');

const getData = async (sid: string) => {
    const params = {
        tableIndex: "0",
        config: {
            type: "range",
            data: {
                from: 0,
                to: 100000,
                level: 1,
                unitInfo: 1
            }
        }
    };
    const url = `${WIALON_BASE_URL}?svc=select_result_rows&params=${JSON.stringify(params)}&sid=${sid}`

    try {
        const response = await axios.get(url);

        return response.data;
    } catch (error) {
        console.error(error);
        return null;
    }
}

export const executeReportFlow = async (sid: string, resourceId: string, templateId: string, objectId: string) => {
    const exec = await execReport(resourceId, templateId, objectId, sid);
    if (!exec) throw new Error('Exec report failed');

    const data = await getData(sid);
    if (!data) throw new Error('Get data failed');

    return data;
}