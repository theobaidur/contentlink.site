import { PageWidget } from 'src/json';

export class BaseWidget<C = {}>{
    _widget: PageWidget;
    status = 'loading';
    loading = false;
    fields = [];

    get type(): string{
      return null;
    }
    get widget(): PageWidget{
      return this._widget || {};
    }

    trackByFn(model: any){
        return model.Id;
      }
}
