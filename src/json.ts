export enum Target{
  Page = `100000000`,
  ExternalURL = `100000001`
}

export interface MenuItem{
  Id?: string;
  Name?: string;
  TargetURL?: Target;
  URL?: string;
  page?: string;
  Order?: number;
  menu?: string;
}

export interface Menu{
  Id?: string;
  Name?: string;
  ListPage?: string;
  DetailPage?: string;
  MenuItem?: MenuItem[];
}

export enum DataType{
  RichText = `100000000`,
  EntityData = `100000001`,
  Menu = `100000002`,
  Html = `100000003`
}

export enum Type{
  CardList = `100000001`,
  Carousel = `100000000`,
  List = `100000003`,
  DynamicDataView = `100000004`,
}

export enum CarouselType{
  FullWidth = `100000000`,
  MultiSlide = `100000001`,
  MultiImage = `100000002`,
}

export enum CardType{
  Card = `100000003`,
  CardWithIcon = `100000000`,
  CardWithImage = `100000001`,
  CardWithThumb = `100000002`,
}

export enum ListType{
  TitleOnly = `100000000`,
  TitleWithSubtitle = `100000001`,
  TitleSubtitleImage = `100000002`
}

export enum WidgetLocation{
  Sidebar = '100000001',
  Body = '100000000',
}

export interface PageWidget{
  Id?: string;
  Page?: string;
  HomePage?: 'True' | 'False';
  Name?: string;
  ShowWidgetTitle?: 'True' | 'False',
  ShowIn?: WidgetLocation;
  DataType?: DataType;
  Type?: Type;
  CustomCSSClass?: string;
  CarouselType?: CarouselType,
  Entity?: string;
  MaxItemPerPage?: number,
  EnablePagination?: 'True' | 'False',
  CardType?: CardType,
  ListType?: ListType,
  ButtonText?: string,
  ButtonURL?: string,
  DynamicButtonURL?: 'True' | 'False',
  TitleField?: string;
  SubTitleField?: string;
  TextField?: string;
  ImageField?: string;
  IconField?: string;
  RichTextTitle?:string;
  RichText?: string;
  RichTextBoxImageURL?: string;
  RichTextBoxVideoURL?: string;
  Menu?: string;
  Html?: string;
  WidgetOrder?: number;
}

export interface Page{
  Id?: string;
  Name?: string;
  PageURL?: string;
  Description?: string;
  HomePage?: 'True' | 'False',
  HideSlideBar?: 'True' | 'False',
  HasSidebar?: 'True' | 'False',
  BackgroundColor?: string,
  BackgroundImage?: string,
  PageWidgets?: PageWidget[]
}

export interface EntityField{
  Id?: string;
  Name?: string;
  xEntity?: string;
  FieldName?: string;
}

export interface xEntity{
  Id?: string;
  Name?: string;
  SystemEntityName?: string;
  ListPage?: string;
  DetailPage?: string;
  EntityFields?: EntityField[]
}

export interface Project{
  Id?: string;
  Name?: string;
  Detail?: string;
  ImageURL?: string;
  SecondaryTitle?: string;
}

export interface Service{
  Id?: string;
  Name?: string;
  Detail?: string;
  ImageURL?: string;
  SecondaryTitle?: string;
  Icon?: string;
}

export interface Leadership{
  Id?: string;
  Name?: string;
  Designation?: string;
  Biography?: string;
  DisplayOrder?: number;
  PhotoURL?: string;
}


export interface DynamicResponse{
  Menus?: Menu[];
  Pages?: Page[];
  xEntities?: xEntity[];
  Projects?: Project[],
  Services?: Service[],
  Leaderships?: Leadership[]
}
