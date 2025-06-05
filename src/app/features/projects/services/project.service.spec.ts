import { TestBed } from '@angular/core/testing';
import { ProjectService } from './project.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { Project } from '../models/project.model';

/**
 * Pruebas unitarias para el servicio ProjectService
 *
 * Este archivo valida el correcto funcionamiento de los métodos HTTP
 * para obtener, crear, eliminar y actualizar proyectos.
 */
describe('ProjectService', () => {
  let service: ProjectService;
  let httpMock: HttpTestingController;

  /**
   * Configura el entorno de pruebas con el módulo HTTP simulado
   */
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProjectService],
    });

    service = TestBed.inject(ProjectService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  /**
   * Verifica que no queden solicitudes pendientes al finalizar cada prueba
   */
  afterEach(() => {
    httpMock.verify();
  });

  /**
   * Prueba el método getProyectos()
   *
   * Debe retornar un arreglo de proyectos mockeados correctamente
   */
  it('debería obtener todos los proyectos', () => {
    const mockProyectos: Project[] = [
      {
        id: '1',
        nombre: 'Proyecto A',
        descripcion: 'Desc A',
        fechaInicio: '2023-01-01',
        fechaEntrega: '2023-02-01',
        estado: 'pendiente',
      },
      {
        id: '2',
        nombre: 'Proyecto B',
        descripcion: 'Desc B',
        fechaInicio: '2023-02-01',
        fechaEntrega: '2023-03-01',
        estado: 'completado',
      },
    ];

    service.getProyectos().subscribe((proyectos) => {
      expect(proyectos.length).toBe(2);
      expect(proyectos).toEqual(mockProyectos);
    });

    const req = httpMock.expectOne('http://localhost:3000/projects');
    expect(req.request.method).toBe('GET');
    req.flush(mockProyectos);
  });

  /**
   * Prueba el método agregarProyecto()
   *
   * Debe enviar un proyecto y recibir el mismo proyecto como respuesta
   */
  it('debería agregar un nuevo proyecto', () => {
    const nuevoProyecto: Project = {
      id: '3',
      nombre: 'Proyecto Nuevo',
      descripcion: 'Nueva desc',
      fechaInicio: '2023-03-10',
      fechaEntrega: '2023-04-10',
      estado: 'en progreso',
    };

    service.agregarProyecto(nuevoProyecto).subscribe((respuesta) => {
      expect(respuesta).toEqual(nuevoProyecto);
    });

    const req = httpMock.expectOne('http://localhost:3000/projects');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(nuevoProyecto);
    req.flush(nuevoProyecto);
  });

  /**
   * Prueba el método eliminarProyecto()
   *
   * Debe realizar la solicitud DELETE correctamente
   */
  it('debería eliminar un proyecto por ID', () => {
    const id = '1';

    service.eliminarProyecto(id).subscribe((respuesta) => {
      expect(respuesta === undefined || respuesta === null).toBeTrue(); // DELETE no tiene respuesta
    });

    const req = httpMock.expectOne(`http://localhost:3000/projects/${id}`);
    expect(req.request.method).toBe('DELETE');
    req.flush(null); // Simula respuesta sin cuerpo
  });

  /**
   * Prueba el método actualizarProyecto()
   *
   * Debe realizar una solicitud PUT con los datos actualizados
   */
  it('debería actualizar un proyecto existente', () => {
    const proyectoActualizado: Project = {
      id: '2',
      nombre: 'Proyecto Modificado',
      descripcion: 'Descripción modificada',
      fechaInicio: '2023-02-01',
      fechaEntrega: '2023-03-10',
      estado: 'en progreso',
    };

    service.actualizarProyecto(proyectoActualizado).subscribe((respuesta) => {
      expect(respuesta).toEqual(proyectoActualizado);
    });

    const req = httpMock.expectOne(
      `http://localhost:3000/projects/${proyectoActualizado.id}`
    );
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(proyectoActualizado);
    req.flush(proyectoActualizado);
  });
});
