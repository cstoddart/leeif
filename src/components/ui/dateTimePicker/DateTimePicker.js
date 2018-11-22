import React, { Component, Fragment } from 'react';
import addDays from 'date-fns/add_days';
import addMonths from 'date-fns/add_months';
import format from 'date-fns/format';
import isToday from 'date-fns/is_today';
import isSameDay from 'date-fns/is_same_day';
import isLastDayOfMonth from 'date-fns/is_last_day_of_month';

import { SectionHeader } from '../';
import { 
  StyledDatePicker,
  Days,
  StyledDay,
  DayOfWeek,
  DayOfMonth,
  BackToDateLink,
  StyledTimeOptions,
  TimeOptionsContent,
  TimeOption,
  Time,
  TimeLabel,
  StyledFrequencyOptions,
  FrequencyOptionsContent,
  FrequencyOption,
  FrequencyCheckBox,
} from './dateTimePickerStyles';

const today = new Date();
const dates = [];

for (let i = 0; i < 18; i++) {
  const date = addDays(today, i);
  dates.push(date);
}

function surroundingDates(dateIndex) {
  if (dateIndex < 6) return dates.slice(0, 6);
  else if (dateIndex < 12) return dates.slice(6, 12);
  else return dates.slice(12, 18);
}

const Day = ({ index, day, isSelected, selectDay, currentStep }) => (
  <StyledDay
    index={index}
    isToday={isToday(day)}
    isSelected={isSelected}
    isLastDayOfMonth={isLastDayOfMonth(day)}
    nextMonth={format(addMonths(day, 1), 'MMMM')}
    yearOfNextMonth={format(addMonths(day, 1), 'YYYY')}
    onClick={() => selectDay(day, index)}
    currentStep={currentStep}
  >
    <DayOfWeek>{isToday(day) ? 'Today' : format(day, 'ddd')}</DayOfWeek>
    <DayOfMonth>{format(day, 'D')}</DayOfMonth>
  </StyledDay>
);

const TimeOptions = ({ selectedTime, selectTime }) => (
  <StyledTimeOptions>
    <SectionHeader>Select Your Open Times</SectionHeader>
    <TimeOptionsContent>
      <TimeOption
        onClick={() => selectTime('7am to 12pm')}
        isSelected={selectedTime === '7am to 12pm'}
      >
        <Time>7am - 12pm</Time>
        <TimeLabel>Morning</TimeLabel>
      </TimeOption>
      <TimeOption
        onClick={() => selectTime('12pm to 6pm')}
        isSelected={selectedTime === '12pm to 6pm'}
      >
        <Time>12pm - 6pm</Time>
        <TimeLabel>Midday/Evening</TimeLabel>
      </TimeOption>
      <TimeOption
        onClick={() => selectTime('7am to 6pm')}
        isSelected={selectedTime === '7am to 6pm'}
      >
        <Time>7am - 6pm</Time>
        <TimeLabel>All Day</TimeLabel>
      </TimeOption>
    </TimeOptionsContent>
  </StyledTimeOptions>
);

const FrequencyOptions = ({ selectedFrequency, selectFrequency }) => (
  <StyledFrequencyOptions>
    <SectionHeader>Subscription Options</SectionHeader>
    <FrequencyOptionsContent>
      <FrequencyOption
        onClick={() => selectFrequency('EVERY_WEEK')}
        isSelected={selectedFrequency === 'EVERY_WEEK'}
      >
        <FrequencyCheckBox isSelected={selectedFrequency === 'EVERY_WEEK'} />
        Repeat Every Week
      </FrequencyOption>
      <FrequencyOption
        onClick={() => selectFrequency('EVERY_TWO_WEEKS')}
        isSelected={selectedFrequency === 'EVERY_TWO_WEEKS'}
      >
        <FrequencyCheckBox isSelected={selectedFrequency === 'EVERY_TWO_WEEKS'} />
        Repeat Every Two Weeks
      </FrequencyOption>
      <FrequencyOption
        onClick={() => selectFrequency('EVERY_THREE_WEEKS')}
        isSelected={selectedFrequency === 'EVERY_THREE_WEEKS'}
      >
        <FrequencyCheckBox isSelected={selectedFrequency === 'EVERY_THREE_WEEKS'} />
        Repeat Every Three Weeks
      </FrequencyOption>
      <FrequencyOption
        onClick={() => selectFrequency('EVERY_MONTH')}
        isSelected={selectedFrequency === 'EVERY_MONTH'}
      >
        <FrequencyCheckBox isSelected={selectedFrequency === 'EVERY_MONTH'} />
        Repeat Every Month
      </FrequencyOption>
    </FrequencyOptionsContent>
  </StyledFrequencyOptions>
);

export class DateTimePicker extends Component {
  state = {
    dates,
    currentDateIndex: 0,
    currentStep: 'DATE',
  }

  selectDay = (day, index) => {
    this.setState({
      dates: surroundingDates(index),
      currentDateIndex: index,
      currentStep: 'TIME',
    });
    this.props.selectDay(day);
  }

  backToDate = () => this.setState({ currentStep: 'DATE', dates });

  render() {
    return (
      <StyledDatePicker>
        <SectionHeader>Select Your Date</SectionHeader>
        <Days>
          {this.state.dates.map((date, index) => (
            <Day
              key={`day${index}`}
              index={this.state.currentStep === 'DATE' ? index : this.state.currentDateIndex}
              day={date}
              isSelected={isSameDay(date, this.props.selectedDay)}
              selectDay={this.selectDay}
              currentStep={this.state.currentStep}
            />
          ))}
        </Days>
        {this.state.currentStep === 'TIME' &&
          <Fragment>
            <BackToDateLink onClick={this.backToDate}>Choose Another Date</BackToDateLink>
            <TimeOptions
              selectedTime={this.props.selectedTime}
              selectTime={this.props.selectTime}
            />
            <FrequencyOptions
              selectedFrequency={this.props.selectedFrequency}
              selectFrequency={this.props.selectFrequency}
            />
          </Fragment>
        }
      </StyledDatePicker>
    );
  }
}