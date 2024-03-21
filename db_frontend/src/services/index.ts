import { FetchArgs } from "@reduxjs/toolkit/query";
// eslint-disable-next-line import/no-extraneous-dependencies
import { Base64 } from "js-base64";

const getQueryObject = (url: string, body?: any): FetchArgs => ({
    url,
    body,
    method: 'POST',
    headers: {
        'Authorization': `Basic ${Base64.encode('admin:admin')}`
    }
});

export default getQueryObject;