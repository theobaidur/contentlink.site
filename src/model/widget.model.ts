import { Model } from './_base.model';
import { WidgetConfig } from './widget-config';

export type Widget = Model<{
    title?: string;
    text?: string;
    data_type?: 'data' | 'selected_data' | 'content' | 'menu';
    widget_type?: string;
    widget_location?: string;
    widget_config?: string;
    widget_config_parsed?: WidgetConfig<{}>;
    content_title?: string;
    content_body?: string;
    data_type_detail?: {[key: string]: any};
}>