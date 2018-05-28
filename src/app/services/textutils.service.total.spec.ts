import { TestBed, inject } from '@angular/core/testing';

import { TextutilsService } from './textutils.service';

describe('TextutilsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TextutilsService]
    });
  });

  describe('analyze total', () => {
    it('should get total from full receipt', inject([TextutilsService], (service: TextutilsService) => {
      // tslint:disable-next-line:max-line-length quotemark
      const plain = "SHOPPERS\nDRUG MART\nVisram Drugs Limited\n100 City Center Dr., MISSISSAUGA ,ON, L5B 209\n905-566-7003\nSep 29, 2017 7:25 PM\n1499 1001 38870 500555 3\nLB LADIES TROU 27.99 GP 27.99\nSUBTOTAL: 27.99\nHST :\n3.64\nTOTAL:\n$31.63\n1 Item\nVISA\n31.63\n********************************************\nShoppers Optimum #\n502***054/00\nREGULAR POINTS:\n270\nTOTAL POINTS EARNED TODAY:\n270\nCurrent Points Balance\n780\nNext Reward Level\n8000\nYou earned the most Bonus Points possible!\nWe've checked all valid in-store, flyer &\ndigital bonus offers to make sure you get\nthe best rewards available to you.\nGet the most out of your Optimum Membership.\n大大大大大大大大大大大大大大文XXXXXXXXXXXXXXXXXXXXXXXXX文★★★\n85784-8238 RT0002\n9990214991001000388709\n*\n******\n******\n*****\n**\n****\n**\n****\n*\n***\n**\n**\n**\n*\n**\nPLEASE TELL US ABOUT THE SERVICE\nYOU RECEIVED IN OUR STORE TODAY\nand you could win 1 of 50 prizes\nof $1000 in Gift Cards\nDOUBLE YOUR CHANCES\nof winning by going online at\nwww.surveysdm.com\nor call 1-800-701-9163\nCertificate Number: 12649709-9729612\n***\n******\n***\n***\n***\n***\n**\n***\n**\n***\n**\n**\n**\n*\n**\n*\n*\nRetain Receipt for return within 30 days.\nVisit shoppersdrugmart.ca for exclusions.\nTYPE : PURCHASE\nACCT : VISA\n$ 31.63\nCARD NUMBER: ************ 1053\nDATE/TIME: 17/09/29 19:25:23\nREFERENCE #: 66342687 0015710290 H\nAUTHOR. #: 437772\nSCOTIABANK VISA\nA0000000031010 0000000000\n01/027 APPROVED - THANK YOU\n-- IMPORTANT --\nRetain This Copy For Your Records\n*** CUSTOMER COPY ***\n";
      const converted = service.convertToLines(plain);
      const receipt = service.stringLinesToReceipt(converted);
      expect(receipt.total[0]).toBe(31.63);
    }));

    it('should return 0 total if nothing found', inject([TextutilsService], (service: TextutilsService) => {
      const plain = 'bla bla';
      const converted = service.convertToLines(plain);
      const receipt = service.stringLinesToReceipt(converted);
      expect(receipt.total.length).toBe(0);
    }));

    it('should float total', inject([TextutilsService], (service: TextutilsService) => {
      const plain = 'Total: 12.55';
      const converted = service.convertToLines(plain);
      const receipt = service.stringLinesToReceipt(converted);
      expect(receipt.total[0]).toBe(12.55);
    }));

    it('should integer total', inject([TextutilsService], (service: TextutilsService) => {
      const plain = 'Total: 12';
      const converted = service.convertToLines(plain);
      const receipt = service.stringLinesToReceipt(converted);
      expect(receipt.total[0]).toBe(12);
    }));

    it('should total with one line skipping', inject([TextutilsService], (service: TextutilsService) => {
      const plain2 = 'total: \n 20';
      const converted2 = service.convertToLines(plain2);
      const receipt2 = service.stringLinesToReceipt(converted2);
      expect(receipt2.total[0]).toBe(20);
    }));
    it('should total ignored dollar sign', inject([TextutilsService], (service: TextutilsService) => {
      const plain2 = 'total: \n $$$$   20';
      const converted2 = service.convertToLines(plain2);
      const receipt2 = service.stringLinesToReceipt(converted2);
      expect(receipt2.total[0]).toBe(20);
    }));
  });

});
