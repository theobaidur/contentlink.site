import { Model } from './_base.model';
export type MenuItem = Model<{
    title?: string,
    url?: string,
    target?: string;
    icon_class?: string,
    color?: string,
    parent_id?: number,
    order?: number
}>