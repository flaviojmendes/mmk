import { Injectable } from '@angular/core';
import {CurrencyPipe} from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private currencyPipe: CurrencyPipe) { }

  SEPARATOR = '\n---------------\n';

  buildOrder(cart, comments, deliveryPrice, name, address) {
    let order = '';

    const title = 'Olá, gostaria de pedir: ';
    const orderText = this.buildListItems(cart);
    const commentsTitle = 'Observações: ';
    const totalText = 'Total: ' + this.updateTotal(cart, deliveryPrice);
    const commentsText = comments && comments !== '' ? commentsTitle + '\n' + comments + this.SEPARATOR : '';

    const nameTitle = 'Nome: ';
    const nameText = name && name !== '' ? nameTitle + '\n' + name + this.SEPARATOR : '';
    const addressTitle = 'Endereço: ';
    const addressText = address && address !== '' ? addressTitle + '\n' + address + this.SEPARATOR : '';
    order = '```' +
      title + this.SEPARATOR +
      orderText + this.SEPARATOR +
      commentsText +
      nameText +
      addressText +
      totalText +
      '```';

    return encodeURIComponent(order);
  }

  buildListItems(cart: any) {
    let orderItems = '';
    for (const key of Object.keys(cart)) {
      if (cart[key].quantity !== 0) {
        orderItems += cart[key].quantity + ' - ' + cart[key].label + '\n';
      }
    }

    return orderItems;
  }

  updateTotal(cart: any, deliveryPrice: number) {
    let total = deliveryPrice ? deliveryPrice : 0;

    for (const key of Object.keys(cart)) {
      total += cart[key].quantity * cart[key].price;
    }
    const totalPrice = this.currencyPipe.transform(total, 'BRL');
    return totalPrice;
  }

}
