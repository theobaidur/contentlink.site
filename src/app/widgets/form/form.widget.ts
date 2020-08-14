import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { Widget } from 'src/model/widget.model';
import { BaseWidget } from '../base.widget';
import { FormWidgetConfig } from 'src/model/widget-config';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { PaginatedResult } from 'src/model/paginated-result.model';
import { HttpClient } from '@angular/common/http';
import { AppDataService } from 'src/app/services/app-data.service';
import { NgForm } from '@angular/forms';
import { tSuccess } from 'src/app/util/toast';

@Component({
  selector: 'widget-form',
  templateUrl: './form.widget.html',
  styleUrls: ['./form.widget.scss']
})
export class FormWidget extends BaseWidget<FormWidgetConfig> {
  @Input('widget') _widget: Widget;
  submitting = false;
  form: any = {};
  model: any = {}
  get formFields(){
    if(this.form && this.form.fields_config){
      const configs = JSON.parse(this.form.fields_config);
      return configs.fields;
    }

    return [];
  }
  get type(){
    return this.config.card_type;
  }

  get addresses(){
    return this.config.addresses || [];
  }

  getForm(): Observable<any | null>{
    if(this.config.form_config){
      return of(this.config.form_config);
    }
    if(this.widget.data_type === 'selected_data'){
      return this.dataService.currentPageResponse.pipe(
        map(page=> page?.selected_data)
      )
    }

    if(this.widget.data_type === 'data'){
      return this.http.get<PaginatedResult<any[]>>(`${environment.apiRoot}/api/widget/${this.widget.id}?page[size]=1`).pipe(
        map(response=>{
          return response.data[0];
        })
      )
    }
    return of([]);
  }

  ngOnInit() {
    this.getForm().subscribe(result=>{
      if(result){
        this.form = result;
        this.status = 'loaded';
      } else { 
        this.status = 'loading';
      }
      this.loading = false;
      this.cdr.detectChanges();
    });
  }
  constructor(
    private http: HttpClient,
    private dataService: AppDataService,
    private cdr: ChangeDetectorRef
  ) { 
    super();
  }

  trackByFn(field: any){
    return field.name;
  }

  trackByAddress(addr: any){
    return addr.address;
  }

  submit(form: NgForm){
    this.submitting = true;
    const form_id = this.form.id;
    const submitted_data = JSON.stringify(form.value);
    this.http.post(`${environment.apiRoot}/api/save-form`, {form_id, submitted_data})
              .subscribe(response=>{
                tSuccess(this.form.success_message);
                this.submitting = false;
                form.reset();
              });
  }

}
