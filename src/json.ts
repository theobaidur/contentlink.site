export enum Target{
  Page = 100000000,
  ExternalURL = 100000001
}

export interface MenuItem{
  menu?: string,
  menu_itemid?: string,
  name?: string,
  order?: number,
  page?: string,
  target_url?: Target,
  url?: string
}

export interface Menu{
  menuid?: string;
  name?: string;
  items?: MenuItem[];
  list_page?: string,
  detail_page?: string
}

export enum DataType{
  RichText = 100000000,
  EntityData = 100000001,
  Menu = 100000002,
  Html = 100000003
}

export enum WidgetType{
  CardList = 100000001,
  Carousel = 100000000,
  List = 100000003,
  DynamicDataView = 100000004,
}

export enum CarouselType{
  FullWidth = 100000000,
  MultiSlide = 100000001,
  MultiImage = 100000002,
}

export enum CardType{
  Card = 100000003,
  CardWithIcon = 100000000,
  CardWithImage = 100000001,
  CardWithThumb = 100000002,
}

export enum ListType{
  TitleOnly = 100000000,
  TitleWithSubtitle = 100000001,
  TitleSubtitleImage = 100000002
}

export enum WidgetLocation{
  Sidebar = 100000001,
  Body = 100000000,
}

export interface PageWidget{
  button_1_text?: string,
  button_2_text?: string,
  button_1_url?: string,
  button_2_url?: string,
  button_text?: string,
  button_url?: string,
  card_type?: CardType,
  carousel_type?: CarouselType,
  custom_css_class?: string,
  data_type?: DataType,
  dynamic_button_url?: boolean,
  enable_pagination?: boolean,
  entity?: string,
  html?: string,
  icon_field?: string,
  image_field?: string,
  list_type?: ListType,
  max_item_per_page?: number,
  menu?: string,
  name?: string,
  order_by_field?: string,
  page?: string,
  page_widgetid?: string,
  rich_text?: string,
  rich_text_box_image_url?: string,
  rich_text_box_type?: any,
  rich_text_box_video_url?: string,
  rich_text_title?: string,
  show_in?: WidgetLocation,
  show_widget_title?: boolean,
  text_field?: string,
  sub_title_field?: string,
  title?: string,
  title_field?: string,
  type?: WidgetType,
  widget_order?: number
}

export interface Page{
  background_color?: string,
  background_image_url?: string,
  description?: string,
  has_sidebar?: boolean,
  home_page?: boolean,
  name?: string,
  pageid?: string,
  page_url?: string
}

export interface EntityField{
  name?: string,
  entity?: string,
  entity_fieldid?: string,
  field_name?: string
}

export interface Entity{
  detail_page?: string,
  list_page?: string,
  name?: string,
  entityid?: string,
  system_entity_name?: string
}

export interface Settings{
  name?: string,
  description?: string,
  value?: string,
  file?: string,
  image?: string,
  settingsid?: string
}

export interface Certificate{
  certificatesid?: string,
  detail?: string,
  image?: string,
  name?: string
}

export interface Client{
  clientsid?: string,
  category?: string,
  icon?: string,
  name?: string
  url?: string
}

export interface Project{
  name?: string,
  excerpt?: string,
  project_image?: string,
  secondary_title?: string,
  projectid?: string
}

export interface Service{
  name?: string,
  detail?: string,
  excerpt?: string,
  service_icon?: string,
  serviceid?: string
}

export interface SliderItem{
  name?: string,
  button_text?: string,
  button_text_2?: string,
  button_url?: string,
  button_url_2?: string,
  slider_image?: string,
  slider_itemid?: string,
  text?: string,
  title?: string
}


export interface Feature{
  featureid?: string,
  feature_icon?: string,
  text?: string
  name?: string
}


export interface DynamicResponse{
  entities: {data: Entity[], error?: boolean},
  entity_fields: {data: EntityField[], error?: boolean},
  features: {data: Feature[], error?: boolean},
  menus: {data: Menu[], error?: boolean},
  menu_items: {data: MenuItem[], error?: boolean},
  pages: {data: Page[], error?: boolean},
  page_widgets: {data: PageWidget[], error?: boolean},
  projects: {data: Project[], error?: boolean},
  settingses: {data: Settings[], error?: boolean},
  certificateses: {data: Certificate[], error?: boolean},
  clientses: {data: Client[], error?: boolean},
  services: {data: Service[], error?: boolean},
  slider_items: {data: SliderItem[], error?: boolean},
}
