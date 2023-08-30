import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EasypassFeeComponent } from './easypass-fee.component';

describe('EasypassFeeComponent', () => {
  let component: EasypassFeeComponent;
  let fixture: ComponentFixture<EasypassFeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EasypassFeeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EasypassFeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
