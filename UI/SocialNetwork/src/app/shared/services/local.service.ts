import { NgModule, Component, enableProdMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { DxSelectBoxModule, DxDataGridModule } from 'devextreme-angular';

import { locale, loadMessages, formatMessage } from 'devextreme/localization';

import  deMessages from "devextreme/localization/message";
import ruMessages from "devextreme/localization/message";

if (!/localhost/.test(document.location.host)) {
  enableProdMode();
}

export class Dictionary {
  [key: string]: any;
}
​
export class Locale {
  Name: string;

  Value: string;
}

const locales: Locale[] = [{
  Name: 'English',
  Value: 'en',
}, {
  Name: 'Việt Nam',
  Value: 'de',
}, {
  Name: 'Русский',
  Value: 'ru',
}];

const dictionary: Dictionary = {
  en: {
    Hey: 'Hey',
    Hey2: 'what are you thinking?',
    Title: 'Social Network',
    Profile: 'Profile',
    Name: 'Name',
    Date: 'Date',
    Sex: 'Sex',
    Location: 'Location',
    Age: 'Age',
    Update: 'Update',
    Search: 'Search and add friend',
    Number: 'Number',
    Contact: 'Contact',
    Company: 'Company',
    Amount: 'Amount',
    PaymentDate: 'Payment Date',
  },
  de: {
    Hey: 'Chào',
    Hey2: 'bạn đang nghĩ gì thế?',
    Title: 'Mạng xã hội',
    Profile: 'Hồ sơ',
    Name: 'Tên',
    Date: 'Ngày sinh',
    Sex: 'Giới Tính',
    Location: 'Địa Chỉ',
    Age: 'Tuổi',
    Search: 'Tìm kiếm và kết bạn bốn phương',
    Update: 'Cập nhật',
    Number: 'Nummer',
    Contact: 'Ansprechpartner',
    Company: 'Firma',
    Amount: 'Betrag',
    PaymentDate: 'Zahlungsdatum',
  },
  ru: {
    Number: 'Номер',
    Contact: 'Имя',
    Company: 'Организация',
    Amount: 'Сумма',
    PaymentDate: 'Дата оплаты',
  },
};

export class LocalService {

  locale: string;

  locales: Locale[];


  formatMessage = formatMessage;

  constructor() {
    this.locale = this.getLocale();
    this.locales = locales;

    this.initMessages();
    locale(this.locale);
  }

  initMessages() {
    loadMessages(dictionary);
  }

  changeLocale(data: any) {
    debugger
    this.setLocale(data);
    parent.document.location.reload();
  }

  getLocale() {
    const locale = sessionStorage.getItem('locale');
    return locale != null ? locale : 'en';
  }

  setLocale(locale: any) {
    debugger
    sessionStorage.setItem('locale', locale);
  }
}
