import { TestBed, inject } from '@angular/core/testing';

import { TextutilsService } from './textutils.service';
import { Receipt } from '../model/receipt.model';

describe('TextutilsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TextutilsService]
    });
  });

  it(
    'should be created',
    inject([TextutilsService], (service: TextutilsService) => {
      expect(service).toBeTruthy();
    })
  );

  it(
    'should analyze analyze plain detected text',
    inject([TextutilsService], (service: TextutilsService) => {
      const plain = 'SIGVARIS\nPatient\nPRESCRIPTION\n';
      const converted = service.convertToLines(plain);
      expect(converted.length).toBe(3);
    })
  );
});
