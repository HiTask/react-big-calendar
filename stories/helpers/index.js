import { addDecorator } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import moment from 'moment'
import React from 'react'

import { Calendar as BaseCalendar, momentLocalizer } from '../../src'

// For Testing SASS styling
import '../../src/sass/styles.scss'
import '../../src/addons/dragAndDrop/styles.scss'

import withDragAndDrop from '../../src/addons/dragAndDrop'

export { Views } from '../../src'

addDecorator(function WithHeight(fn) {
  return <div style={{ height: 600 }}>{fn()}</div>
})

const localizer = momentLocalizer(moment)

export resourcesEvents from './resourceEvents'

export const date = (...args) => moment(...args).toDate()

export const Calendar = props => (
  <BaseCalendar localizer={localizer} {...props} />
)

export const DragAndDropCalendar = withDragAndDrop(Calendar)

export const DragableCalendar = props => {
  return (
    <DragAndDropCalendar
      popup
      selectable
      localizer={localizer}
      onEventDrop={action('event dropped')}
      onSelectEvent={action('event selected')}
      onSelectSlot={action('slot selected')}
      {...props}
    />
  )
}

export const events = [
  {
    title: 'test',
    start: moment()
      .add(1, 'days')
      .subtract(5, 'hours')
      .toDate(),
    end: moment()
      .add(1, 'days')
      .subtract(4, 'hours')
      .toDate(),
    allDay: false,
  },
  {
    title: 'test larger',
    start: moment()
      .startOf('day')
      .add(5, 'hours')
      .toDate(),
    end: moment()
      .startOf('day')
      .add(10, 'hours')
      .toDate(),
    allDay: false,
  },

  {
    title: 'test larger',
    start: moment()
      .startOf('day')
      .add(15, 'hours')
      .toDate(),
    end: moment()
      .startOf('day')
      .add(23, 'hours')
      .toDate(),
    allDay: false,
  },
  {
    title: 'test all day',
    start: moment()
      .startOf('day')
      .toDate(),
    end: moment()
      .startOf('day')
      .add(1, 'day')
      .toDate(),
    allDay: true,
  },
  {
    title: 'test 2 days',
    start: moment()
      .startOf('day')
      .toDate(),
    end: moment()
      .startOf('day')
      .add(2, 'days')
      .toDate(),
    allDay: true,
  },
  {
    title: 'test multi-day',
    start: moment().toDate(),
    end: moment()
      .add(3, 'days')
      .toDate(),
    allDay: false,
  },
]

const duplicateEvents = (events, filter, times) => {
  if (!times) return events
  return duplicateEvents(events, filter, times - 1).concat(
    events.filter(filter).map(event => ({
      ...event,
      title: `${Math.floor(Math.random() * 100)} ${event.title}`,
    }))
  )
}

export const duplicateAllDayEvents = (events, times) =>
  duplicateEvents(events, event => event.allDay, times)

export const duplicateTodayEvents = (events, times) =>
  duplicateEvents(
    events,
    event => moment(event.start).isSame(new Date(), 'day'),
    times
  )
