import { Model } from "./_base.model";
import { MenuItem } from "./menu-item.model";

export type InitialSetting = Model<{
    title?: string,
    description?: string;
    logo?: string;
    default_page?: string,
    main_menu?: MenuItem[],
    footer_menu?: MenuItem[]
}>;