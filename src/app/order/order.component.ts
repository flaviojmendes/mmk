import { Component, OnInit } from '@angular/core';
import {OrderService} from '../order.service';

@Component({
  selector: 'app-pedido',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.sass']
})
export class OrderComponent implements OnInit {

  constructor(private orderService: OrderService) {
  }

  qtyAvailable: number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  qtyAvailableExtras: number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  qtyAvailableDrinks: number[] = [0];
  item1 = 0;
  item2 = 0;
  item3 = 0;
  item4 = 0;
  order: string;
  comments = '';
  total: number;

  extras: Items = {
    items: [
    {
      label: 'Bacon',
      price: 3,
      qty: 0
    },
    {
      label: 'Queijo',
      price: 2,
      qty: 0
    },
    {
      label: 'Salsicha',
      price: 2,
      qty: 0
    }]
  };

  drinks = {
    items: [
    {
      label: 'Coca-Cola',
      qty: 0
    },
    {
      label: 'Guaraná',
      qty: 0
    },
    {
      label: 'Suco de Abacaxi',
      qty: 0
    },
    {
      label: 'Suco de Goiaba',
      qty: 0
    },
    {
      label: 'Suco de Laranja',
      qty: 0
    },
    {
      label: 'Suco de Maracujá',
      qty: 0
    },
    {
      label: 'Suco de Uva',
      qty: 0
    }],
  };

  totalDrinks = 0;
  totalDrinksAvailable = 0;

  valid = false;

  ngOnInit() {
    this.updateTotal();
    this.validate();
  }

  updateTotal() {
    this.total = 3;
    this.total += this.item1 ? (this.item1 * 9.99) : 0;
    this.total += this.item2 ? (this.item2 * 11.99) : 0;
    this.total += this.item3 ? (this.item3 * 4) : 0;
    this.total += this.item4 ? (this.item4 * 5) : 0;
    this.total += this.orderService.calculateExtras(this.extras);

    this.updateAvailableDrinks();
    this.validate();
  }

  updateAvailableDrinks() {
    this.totalDrinks = 0;
    for (const drink of this.drinks.items) {
      this.totalDrinks += drink.qty;
    }

    this.totalDrinksAvailable = this.item1 + this.item2;
    this.qtyAvailableDrinks = [];
    for (let i = 0 ; i <= this.totalDrinksAvailable ; i++) {
      this.qtyAvailableDrinks.push(i);
    }
    this.validate();
  }

  updateOrder() {
    this.order = this.orderService.buildOrder(this.item1, this.item2, this.item3, this.item4, this.comments, this.extras, this.drinks);
  }

  validate() {
    if (this.item1 === 0 && this.item2 === 0 && this.item3 === 0 && this.item4 === 0) {
      this.valid = false;
      return;
    }

    if (this.totalDrinks > this.totalDrinksAvailable) {
      this.valid = false;
      return;
    }
    this.valid = true;
  }

}
