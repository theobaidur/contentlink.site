import { WidgetConfig } from '../../model/widget-config'
import { Widget } from '../../model/widget.model'
export class BaseWidget<C = {}>{
    _widget: Widget;
    status = 'loading';
    loading = false;
    fields = [];
    get type(): string{
      return null;
    }
    get widget(): Widget{
      return this._widget || {};
    }
    get config(): WidgetConfig<C>{
      if(this.widget && this.widget.widget_config){
        return JSON.parse(this.widget?.widget_config || '{}');
      }
      return {} as C;
    }

    get dataDetail(){
      if(this.widget && this.widget.data_type_detail){
        return this.widget.data_type_detail
      }
      return {};
    }
  
    get map(){
      return this.config.map || {}
    }

    trackByFn(model: any){
        return model.id;
      }
}