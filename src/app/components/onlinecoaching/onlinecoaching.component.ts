import { CommonModule } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarOptions, EventInput } from '@fullcalendar/core/index.js';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction';
import { OnlineCoachingService } from '../../services/online-coaching.service';
import { OnlineCoaching } from '../../common/online-coaching';
import { CartService } from '../../services/cart.service';
import { CartItem } from '../../common/cart-item';

@Component({
  selector: 'app-onlinecoaching',
  standalone: true,
  imports: [CommonModule, FullCalendarModule],
  templateUrl: './onlinecoaching.component.html',
  styleUrl: './onlinecoaching.component.css',
})
export class OnlinecoachingComponent implements OnInit {
  isSubscribed: boolean = false;
  onlineCoachings!: OnlineCoaching[];

  constructor(
    private onlineCoachingService: OnlineCoachingService,
    private cartService: CartService
  ) {}

  ngOnInit() {
    this.listOnlineCoachings();
  }

  listOnlineCoachings() {
    this.onlineCoachingService.getOnlineCoachings().subscribe((data) => {
      this.onlineCoachings = data;
    });
  }

  toggleView(): void {
    this.isSubscribed = !this.isSubscribed;
  }

  calendarOptions = signal<CalendarOptions>({
    plugins: [dayGridPlugin, interactionPlugin, timeGridPlugin, listPlugin],
    headerToolbar: {
      left: 'title',
      center: 'prev,next today',
      right: 'dayGridMonth,timeGridWeek',
    },
    initialView: 'dayGridMonth', // Month view by default
    // initialEvents: INITIAL_EVENTS,     // Your predefined events
    // weekends: true,                    // Show Saturdays and Sundays
    editable: true, // Allows events to be dragged/resized
    selectable: true, // Allows day selection (click & drag)
    selectMirror: true, // Visual feedback while selecting
    dayMaxEvents: true, // "+ more" link when too many events
    // eventClick: this.handleEventClick.bind(this), // Event click callback
    // select: this.handleDateSelect.bind(this), // Day selection callback
    // eventDrop: this.handleEventDrop.bind(this), // When an event is dragged
    // eventResize: this.handleEventResize.bind(this), // When event is resized

    dateClick: this.handleDateClick.bind(this),
    // events: [
    //   { title: 'static 1', date: '2025-05-31' },
    //   { title: 'static 2', date: '2025-07-15' },
    // ],
  });
  eventsPromise!: Promise<EventInput[]>;

  handleDateClick(arg: DateClickArg): void {
    console.log(arg.dateStr);
  }

  addToCart(onlineCoaching: OnlineCoaching) {
    const cartItem = new CartItem(
      onlineCoaching.id,
      onlineCoaching.title,
      onlineCoaching.folderPath,
      onlineCoaching.price
    );
    this.cartService.addToCart(cartItem);
  }
}
