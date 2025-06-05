import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProjectFormComponent } from './project-form.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ProjectFormComponent', () => {
  let component: ProjectFormComponent;
  let fixture: ComponentFixture<ProjectFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ProjectFormComponent,
        RouterTestingModule,
        HttpClientTestingModule,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ProjectFormComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
