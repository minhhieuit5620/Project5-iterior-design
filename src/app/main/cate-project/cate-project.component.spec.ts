import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CateProjectComponent } from './cate-project.component';

describe('CateProjectComponent', () => {
  let component: CateProjectComponent;
  let fixture: ComponentFixture<CateProjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CateProjectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CateProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
