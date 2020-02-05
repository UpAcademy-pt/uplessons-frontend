import { TestBed } from '@angular/core/testing';

import { ScriptPdfService } from './script-pdf.service';

describe('ScriptPdfService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ScriptPdfService = TestBed.get(ScriptPdfService);
    expect(service).toBeTruthy();
  });
});
