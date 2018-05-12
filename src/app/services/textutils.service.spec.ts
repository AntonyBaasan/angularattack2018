import { TestBed, inject } from '@angular/core/testing';

import { TextutilsService } from './textutils.service';
import { Receipt } from '../model/receipt.model';

describe('TextutilsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TextutilsService]
    });
  });

  it('should be created', inject([TextutilsService], (service: TextutilsService) => {
    expect(service).toBeTruthy();
  }));

  describe('TODO', () => {
    it('should analyze analyze plain detected text', inject([TextutilsService], (service: TextutilsService) => {
      // tslint:disable-next-line:max-line-length quotemark
      const plain = "SHOPPERS↵DRUG MART↵Visram Drugs Limited↵100 City Center Dr., MISSISSAUGA ,ON, L5B 209↵905-566-7003↵Sep 29, 2017 7:25 PM↵1499 1001 38870 500555 3↵LB LADIES TROU 27.99 GP 27.99↵SUBTOTAL: 27.99↵HST :↵3.64↵TOTAL:↵$31.63↵1 Item↵VISA↵31.63↵********************************************↵Shoppers Optimum #↵502***054/00↵REGULAR POINTS:↵270↵TOTAL POINTS EARNED TODAY:↵270↵Current Points Balance↵780↵Next Reward Level↵8000↵You earned the most Bonus Points possible!↵We've checked all valid in-store, flyer &↵digital bonus offers to make sure you get↵the best rewards available to you.↵Get the most out of your Optimum Membership.↵大大大大大大大大大大大大大大文XXXXXXXXXXXXXXXXXXXXXXXXX文★★★↵85784-8238 RT0002↵9990214991001000388709↵*↵******↵******↵*****↵**↵****↵**↵****↵*↵***↵**↵**↵**↵*↵**↵PLEASE TELL US ABOUT THE SERVICE↵YOU RECEIVED IN OUR STORE TODAY↵and you could win 1 of 50 prizes↵of $1000 in Gift Cards↵DOUBLE YOUR CHANCES↵of winning by going online at↵www.surveysdm.com↵or call 1-800-701-9163↵Certificate Number: 12649709-9729612↵***↵******↵***↵***↵***↵***↵**↵***↵**↵***↵**↵**↵**↵*↵**↵*↵*↵Retain Receipt for return within 30 days.↵Visit shoppersdrugmart.ca for exclusions.↵TYPE : PURCHASE↵ACCT : VISA↵$ 31.63↵CARD NUMBER: ************ 1053↵DATE/TIME: 17/09/29 19:25:23↵REFERENCE #: 66342687 0015710290 H↵AUTHOR. #: 437772↵SCOTIABANK VISA↵A0000000031010 0000000000↵01/027 APPROVED - THANK YOU↵-- IMPORTANT --↵Retain This Copy For Your Records↵*** CUSTOMER COPY ***↵";
      const converted = service.convertToLines(plain);
      const receipt: Receipt = service.stringLinesToReceipt(converted);
      expect(receipt.total).toBe(31.63);
    }));
  });

  describe('DONE', () => {

    it('should analyze analyze plain detected text', inject([TextutilsService], (service: TextutilsService) => {
      const plain = 'SIGVARIS↵Patient↵PRESCRIPTION↵';
      const converted = service.convertToLines(plain);
      expect(converted.length).toBe(3);
    }));

    it('should analyze return 0 total if nothing found', inject([TextutilsService], (service: TextutilsService) => {
      const plain = 'bla bla';
      const converted = service.convertToLines(plain);
      const receipt: Receipt = service.stringLinesToReceipt(converted);
      expect(receipt.total).toBe(0);
    }));

    it('should analyze total (float)', inject([TextutilsService], (service: TextutilsService) => {
      const plain = 'Total: 12.55';
      const converted = service.convertToLines(plain);
      const receipt: Receipt = service.stringLinesToReceipt(converted);
      expect(receipt.total).toBe(12.55);
    }));

    it('should analyze total', inject([TextutilsService], (service: TextutilsService) => {
      const plain = 'Total: 12';
      const converted = service.convertToLines(plain);
      const receipt: Receipt = service.stringLinesToReceipt(converted);
      expect(receipt.total).toBe(12);
    }));

    it('should analyze total with one line skipping', inject([TextutilsService], (service: TextutilsService) => {
      const plain2 = 'total: ↵ 20';
      const converted2 = service.convertToLines(plain2);
      const receipt2: Receipt = service.stringLinesToReceipt(converted2);
      expect(receipt2.total).toBe(20);
    }));
    it('should analyze total ignored dollar sign', inject([TextutilsService], (service: TextutilsService) => {
      const plain2 = 'total: ↵ $$$$   20';
      const converted2 = service.convertToLines(plain2);
      const receipt2: Receipt = service.stringLinesToReceipt(converted2);
      expect(receipt2.total).toBe(20);
    }));
  });

});
