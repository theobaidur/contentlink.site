export type WidgetConfig<T> = T & {
    [key: string]: any,
    hide_widget_title?: boolean,
    map?: {[key: string]: any},
    widget_class?: string
}

export type CarouselWidgetConfig = WidgetConfig<{
    map?: {
        image?: string,
        title?: string;
        text?: string,
        button_text?: string,
        button_url?: string
    },
    carousel_type?: 'full-width' | 'multi-slide' | 'multi-image',
    slides?: any[]
}>

export type CardWidgetConfig = WidgetConfig<{
    map?: {
        icon_class?: string,
        image?: string,
        title?: string;
        sub_title?: string;
        text?: string,
        button_text?: string,
        button_url?: string
    },
    card_type?: 'card-with-icon' | 'card-with-image' | 'card-with-thumb',
    max_item?: number,
    paginate?: boolean,
    items?: any[],
    excerpt?: boolean,
    detail_page?: string,
    list_page?: string,
}>
export type TextBoxWidgetConfig = WidgetConfig<{
    map?: {
        title?: string,
        sub_title?: string,
        text?: string,
        image?: string,
        button_text?: string,
        button_url?: string
    },
    text_box_type?: 'content-only' | 'content-with-image' | 'content-with-embedded-media',
    data?: any
}>
export type BannerWidgetConfig = WidgetConfig<{}>
export type FormWidgetConfig = WidgetConfig<{
    form_type?: 'form-with-address' | 'form-only',
    addresses?: {title?: string, address?: string, phone?: string, email?: string}[],
    form_config?: any
}>
export type ListWidgetConfig = WidgetConfig<{}>
export type MenuWidgetConfig = WidgetConfig<{
    map?: {
        title?: string,
        sub_title?: string,
        image?: string
    },
    menu_type?: 'title-only' | 'title-subtitle' | 'title-subtitle-image',
    data?: any[],
    detail_page?: string,
    list_page?: string,
}>
