import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentesAduanalesComponent } from './agentes-aduanales.component';

describe('AgentesAduanalesComponent', () => {
  let component: AgentesAduanalesComponent;
  let fixture: ComponentFixture<AgentesAduanalesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgentesAduanalesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgentesAduanalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
