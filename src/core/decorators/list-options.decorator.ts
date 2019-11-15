import { createParamDecorator } from '@nestjs/common';
import { ListOptionsInterface } from '../interfaces/list-options.interface';

export const ListOptions = createParamDecorator(
  (data: Partial<ListOptionsInterface> = {}, req) => {
    let { limit, page, sort, order } = req.query;

    if (limit) {
      limit = parseInt(limit);
    } else if (limit === undefined && data.limit) {
      limit = data.limit;
    } else {
      limit = 10;
    }

    if (page) {
      page = parseInt(page);
    } else {
      page = 1;
    }

    if (sort) {
      sort = sort;
    } else if (sort === undefined && data.sort) {
      sort = data.sort;
    } else {
      sort = 'created';
    }

    if (order) {
      order = order.toUpperCase();
    } else if (order === undefined && data.order) {
      order = data.order;
    } else {
      order = 'DESC';
    }

    req.query.page = page;
    req.query.limit = limit;
    req.query.sort = sort;
    req.query.order = order;

    return req.query;
  },
);
