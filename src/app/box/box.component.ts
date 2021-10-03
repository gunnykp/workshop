import { Component, NgZone, OnInit, ViewChild } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';
import {
  KtdDragEnd,
  KtdDragStart,
  KtdGridComponent,
  KtdGridLayout,
  KtdGridLayoutItem,
  KtdResizeEnd,
  KtdResizeStart,
  ktdTrackById,
} from '@katoid/angular-grid-layout';
import { fromEvent, merge, Subscription } from 'rxjs';
import { ktdArrayRemoveItem } from '../utils';

import { debounceTime, filter } from 'rxjs/operators';

@Component({
  selector: 'app-box',
  templateUrl: './box.component.html',
  styleUrls: ['./box.component.scss'],
})
export class BoxComponent implements OnInit {
  @ViewChild(KtdGridComponent, { static: true }) grid: KtdGridComponent;
  trackById = ktdTrackById;

  cols = 12;
  rowHeight = 50;
  // compactType: 'vertical' | 'horizontal' | null = 'vertical';
  compactType: 'none';
  layout: KtdGridLayout = [
    // {id: '0', x: 5, y: 0, w: 2, h: 3},
    // {id: '1', x: 2, y: 2, w: 1, h: 2},
    // {id: '2', x: 3, y: 7, w: 1, h: 2},
    // {id: '3', x: 2, y: 0, w: 3, h: 2},
    // {id: '4', x: 5, y: 3, w: 2, h: 3},
    // {id: '5', x: 0, y: 4, w: 1, h: 3},
    // {id: '6', x: 9, y: 0, w: 2, h: 4},
    // {id: '7', x: 9, y: 4, w: 2, h: 2},
    // {id: '8', x: 3, y: 2, w: 2, h: 5},
    // {id: '9', x: 7, y: 0, w: 1, h: 3},
    // {id: '10', x: 2, y: 4, w: 1, h: 4},
    // {id: '11', x: 0, y: 0, w: 2, h: 4}
  ];

  transitions: { name: string; value: string }[] = [
    {
      name: 'ease',
      value: 'transform 500ms ease, width 500ms ease, height 500ms ease',
    },
    {
      name: 'ease-out',
      value:
        'transform 500ms ease-out, width 500ms ease-out, height 500ms ease-out',
    },
    {
      name: 'linear',
      value: 'transform 500ms linear, width 500ms linear, height 500ms linear',
    },
    {
      name: 'overflowing',
      value:
        'transform 500ms cubic-bezier(.28,.49,.79,1.35), width 500ms cubic-bezier(.28,.49,.79,1.35), height 500ms cubic-bezier(.28,.49,.79,1.35)',
    },
    {
      name: 'fast',
      value: 'transform 200ms ease, width 200ms linear, height 200ms linear',
    },
    {
      name: 'slow-motion',
      value:
        'transform 1000ms linear, width 1000ms linear, height 1000ms linear',
    },
    { name: 'transform-only', value: 'transform 500ms ease' },
  ];
  currentTransition: string = this.transitions[0].value;

  dragStartThreshold = 0;
  disableDrag = false;
  disableResize = false;
  disableRemove = false;
  autoResize = true;
  isDragging = false;
  isResizing = false;
  resizeSubscription: Subscription;

  smallClass = false;

  fetchData = [
    { title: 'MU' },
    { title: 'U' },
    { title: 'MU' },
    { title: 'MU' },
    { title: 'MU' },
    { title: 'MU' },
  ];
  constructor(private ngZone: NgZone) {
    // this.ngZone.onUnstable.subscribe(() => console.log('UnStable'));
    setInterval(() => (this.smallClass = !this.smallClass), 2000);
  }

  ngOnInit() {
    this.resizeSubscription = merge(
      fromEvent(window, 'resize'),
      fromEvent(window, 'orientationchange')
    )
      .pipe(
        debounceTime(50),
        filter(() => this.autoResize)
      )
      .subscribe(() => {
        this.grid.resize();
      });
      // this.SearchingChallenge('ggun')
      console.log('xx' ,this.SearchingChallenge('ggun_g'))
    // let a = [9, 2, -3, 0, 5, 11, 19, 2, 1];
    // this.minMax(a);
    // this.minMaxForIf(a)
  }

  ngOnDestroy() {
    this.resizeSubscription.unsubscribe();
  }

  onDragStarted(event: KtdDragStart) {
    console.log('onDragStarted');
    console.log('isInAngularZone: ', NgZone.isInAngularZone());
    this.isDragging = true;
  }

  onResizeStarted(event: KtdResizeStart) {
    this.isResizing = true;
  }

  onDragEnded(event: KtdDragEnd) {
    this.isDragging = false;
  }

  onResizeEnded(event: KtdResizeEnd) {
    this.isResizing = false;
  }

  onLayoutUpdated(layout: KtdGridLayout) {
    console.log('on layout updated', layout);
    this.layout = layout;
  }

  onCompactTypeChange(change: MatSelectChange) {
    console.log('onCompactTypeChange', change);
    this.compactType = change.value;
  }

  onTransitionChange(change: MatSelectChange) {
    console.log('onTransitionChange', change);
    this.currentTransition = change.value;
  }

  onDisableDragChange(checked: boolean) {
    this.disableDrag = checked;
  }

  onDisableResizeChange(checked: boolean) {
    this.disableResize = checked;
  }

  onDisableRemoveChange(checked: boolean) {
    this.disableRemove = checked;
  }

  onAutoResizeChange(checked: boolean) {
    this.autoResize = checked;
  }

  onColsChange(event: Event) {
    this.cols = parseInt((event.target as HTMLInputElement).value, 10);
  }

  onRowHeightChange(event: Event) {
    this.rowHeight = parseInt((event.target as HTMLInputElement).value, 10);
  }

  onDragStartThresholdChange(event: Event) {
    this.dragStartThreshold = parseInt(
      (event.target as HTMLInputElement).value,
      10
    );
  }

  generateLayout() {
    const layout: KtdGridLayout = [];
    for (let i = 0; i < this.cols; i++) {
      const y = Math.ceil(Math.random() * 4) + 1;
      layout.push({
        x: Math.round(Math.random() * Math.floor(this.cols / 2 - 1)) * 2,
        y: Math.floor(i / 6) * y,
        w: 2,
        h: y,
        id: i.toString(),
        // static: Math.random() < 0.05
      });
    }
    console.log('layout', layout);
    this.layout = layout;
  }

  /** Adds a grid item to the layout */
  addItemToLayout(data) {
    const maxId = this.layout.reduce(
      (acc, cur) => Math.max(acc, parseInt(cur.id, 10)),
      -1
    );
    let newLayoutItem: KtdGridLayoutItem;
    const nextId = maxId + 1;
    if (data == 'U') {
      newLayoutItem = {
        id: nextId.toString(),
        x: 0,
        y: 0,
        w: 2,
        h: 2,
      };
    } else {
      newLayoutItem = {
        id: nextId.toString(),
        x: 0,
        y: 0,
        w: 2,
        h: 2,
      };
    }

    // Important: Don't mutate the array, create new instance. This way notifies the Grid component that the layout has changed.
    this.layout = [newLayoutItem, ...this.layout];
  }

  /**
   * Fired when a mousedown happens on the remove grid item button.
   * Stops the event from propagating an causing the drag to start.
   * We don't want to drag when mousedown is fired on remove icon button.
   */
  stopEventPropagation(event: Event) {
    event.preventDefault();
    event.stopPropagation();
  }

  /** Removes the item from the layout */
  removeItem(id: string) {
    // Important: Don't mutate the array. Let Angular know that the layout has changed creating a new reference.
    this.layout = ktdArrayRemoveItem(this.layout, (item) => item.id === id);
  }

  reportDragging() {
    console.log('Dragging: ' + this.isDragging);
  }

  SearchingChallenge(str) {

    if(str.length < 4 || str.length > 25){
        return false
    }
    let s = str.split('');
    if(!/^[a-zA-Z]+$/.test(s[0])){
      return false
    }

    if(!/^\w+$/.test(str)){
      return false
    }

    if(s[s.length - 1] === '_'){
      return false
    }
    console.log('s=',s)

    return true;
  }
//   minMax(data: any) {
//     console.log('Max', Math.max(...data));
//     console.log('Min', Math.min(...data));
//   }
//   minMaxForIf(data: any) {
//     let max_value = -Infinity;
//     let min_value = Infinity;

//     data.forEach((element) => {
//       // find minimum value
//       if (element < min_value) min_value = element;

//       // find maximum value
//       if (element > max_value) max_value = element;
//     });
//     console.log('Max',max_value);
//     console.log('Min',min_value);

//   }

//    factorial(n){
//     let answer = 1;
//     if (n == 0 || n == 1){
//       return answer;
//     }else{
//       for(var i = n; i >= 1; i--){
//         answer = answer * i;
//       }
//       return answer;
//     }
//   }
//   //Error 4xx คือ error ฝั่ง client อาจ URL ผิดเป็นต้น
//   //Error 5xx คือ error ฝั่ง server server อาน down หรือเกิดข้อผิดพลากอื่นๆ
//   /*=============1============*/
// SELECT a.Name,SUM(b.UnitPrice) FROM Products a
// left join OrderDetail b on a.Id = b.ProductId
// GROUP BY a.Id

// /*=============2============*/
// SELECT a.PaymentType,SUM(b.UnitPrice) FROM Orders a
// left join OrderDetail b on a.Id = b.OrderId
// GROUP BY a.PaymentType

// /*=============3============*/
// SELECT a.Id,SUM(b.UnitPrice),AVG(b.UnitPrice) FROM Orders a
// left join sys.OrderDetail b on a.Id = b.OrderId
// GROUP BY a.Id

// /*=============4============*/
// SELECT c.Name,c.Email,SUM(b.UnitPrice) as total FROM Orders a
// left join OrderDetail b on a.Id = b.OrderId
// left join Customer c on a.CustomerId = c.Id
// GROUP BY   c.Name,c.Email
// HAVING total > 5000
}
