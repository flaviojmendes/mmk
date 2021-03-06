import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderComponent } from './order.component';

describe('PedidoComponent', () => {
  let component: OrderComponent;
  let fixture: ComponentFixture<OrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });



  it('should update total', () => {
    component.item1 = 1;
    component.item2 = 2;
    component.updateTotal();
    expect(component.total).toBe(36.97);
  });

  it('should update order with 4 items', () => {
    component.item1 = 1;
    component.item2 = 2;
    component.item3 = 1;
    component.item4 = 1;
    component.comments = 'Hello World';
    component.updateOrder();
    expect(component.order).toBe('%60%60%60Ol%C3%A1%2C%20gostaria%20de%20pedir%3A%20%0A---------------' +
      '%0ADog%20no%20Molho%3A%201%20unidades.%20%0ADog%20no%20Molho%20Especial%3A%202%20unidades.%20%0ABombom%20de' +
      '%20Uva%20140ml%3A%201%20unidades.%20%0ABombom%20de%20Uva%20220ml%3A%201%20unidades.%20%0A---------------%0' +
      'AAs%20bebidas%20ser%C3%A3o%3A%0A%20%0A---------------%0AOs%20extras%20ser%C3%A3o%3A%0A%20%0A---------------%0AObserva%C' +
      '3%A7%C3%B5es%3A%20%0A%20Hello%20World%60%60%60');
  });

  it('should update order with no items', () => {

    component.updateOrder();
    expect(component.order).toBe('%60%60%60Ol%C3%A1%2C%20gostaria%20de%20pedir%3A%20%0A---------------' +
      '%0A---------------%0AAs%20bebidas%20ser%C3%A3o%3A%0A%20%0A---------------%0AOs%20extras%20ser%C3%A3o%3A%0A%20%0A' +
      '---------------%0A%60%60%60');
  });
});
