import { Model } from "./_base.model";

export type PageLayout = Model<{
    title?: string;
    layout_type?: string;
    layout_locations?: string;
}>