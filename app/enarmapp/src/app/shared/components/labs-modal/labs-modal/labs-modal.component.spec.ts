import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LabsModalComponent } from './labs-modal.component';

describe('LabsModalComponent', () => {
  let component: LabsModalComponent;
  let fixture: ComponentFixture<LabsModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LabsModalComponent]
    });
    fixture = TestBed.createComponent(LabsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
