import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InnerPageNoSidebarLayoutComponent } from './inner-page-no-sidebar-layout.component';

describe('InnerPageNoSidebarLayoutComponent', () => {
  let component: InnerPageNoSidebarLayoutComponent;
  let fixture: ComponentFixture<InnerPageNoSidebarLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InnerPageNoSidebarLayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InnerPageNoSidebarLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
