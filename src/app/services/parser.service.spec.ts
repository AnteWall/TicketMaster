import { TestBed, inject } from '@angular/core/testing';

import { ParserService } from './parser.service';

describe('ParserService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ParserService]
    });
  });

  it('should ...', inject([ParserService], (service: ParserService) => {
    expect(service).toBeTruthy();
  }));
});
