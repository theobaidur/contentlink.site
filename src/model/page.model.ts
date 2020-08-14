import { Model } from "./_base.model";
import { Widget } from "./widget.model";
import { PageLayout } from "./page-layout.model";

export type Page = Model<{
    title?: string;
    page_config?: string;
    page_config_parsed?: {[key: string]: any},
    slug?: string;
    default_page?: number;
    widgets?: Widget[],
    pageLayout?: PageLayout,
    selected_data?: Model<{}>,
}>