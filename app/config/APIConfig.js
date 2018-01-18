// @flow

export const HOST = 'https://swastika.io';

export default {
};

export const ARTICLES_URL = (pageSize, pageIndex) => { return `${HOST}/api/vi-vn/articles/${pageSize}/${pageIndex}` };