import {
  Box, Button, DatePicker, HorizontalGrid, HorizontalStack, Icon, OptionList,
  Popover, Scrollable, Select, TextField, VerticalStack, useBreakpoints
} from '@shopify/polaris'
import {
  CalendarMinor, ArrowRightMinor
} from '@shopify/polaris-icons'
import React, { useEffect, useRef, useState } from 'react'

// This example is for guidance purposes. Copying it will come with caveats.
const DateRangePicker = ({ initDateRange, onChangeDate }) => {
  const { mdDown, lgUp } = useBreakpoints()
  const shouldShowMultiMonth = lgUp
  const today = new Date(new Date().setHours(0, 0, 0, 0))
  const yesterday = new Date(
    new Date(new Date().setDate(today.getDate() - 1)).setHours(0, 0, 0, 0)
  )
  const ranges = [
    {
      title: 'Today',
      alias: 'today',
      period: {
        since: today,
        until: today
      }
    },
    {
      title: 'Yesterday',
      alias: 'yesterday',
      period: {
        since: yesterday,
        until: yesterday
      }
    },
    {
      title: 'Last 7 days',
      alias: 'last7days',
      period: {
        since: new Date(
          new Date(new Date().setDate(today.getDate() - 7)).setHours(0, 0, 0, 0)
        ),
        until: yesterday
      }
    }
  ]
  const [popoverActive, setPopoverActive] = useState(false)
  const [activeDateRange, setActiveDateRange] = useState(initDateRange)
  const [inputValues, setInputValues] = useState({})
  const [{ month, year }, setDate] = useState({
    month: activeDateRange.period.since.getMonth(),
    year: activeDateRange.period.since.getFullYear()
  })
  const datePickerRef = useRef(null)
  const VALID_YYYY_MM_DD_DATE_REGEX = /^\d{4}-\d{1,2}-\d{1,2}/
  function isDate (date) {
    return !isNaN(new Date(date).getDate())
  }
  function isValidYearMonthDayDateString (date) {
    return VALID_YYYY_MM_DD_DATE_REGEX.test(date) && isDate(date)
  }
  function isValidDate (date) {
    return date.length === 10 && isValidYearMonthDayDateString(date)
  }
  function parseYearMonthDayDateString (input) {
    // Date-only strings (e.g. "1970-01-01") are treated as UTC, not local time
    // when using new Date()
    // We need to split year, month, day to pass into new Date() separately
    // to get a localized Date
    const [year, month, day] = input.split('-')
    return new Date(Number(year), Number(month) - 1, Number(day))
  }
  function formatDateToYearMonthDayDateString (date) {
    const year = String(date.getFullYear())
    let month = String(date.getMonth() + 1)
    let day = String(date.getDate())
    if (month.length < 2) {
      month = String(month).padStart(2, '0')
    }
    if (day.length < 2) {
      day = String(day).padStart(2, '0')
    }
    return [year, month, day].join('-')
  }
  function formatDate (date) {
    return formatDateToYearMonthDayDateString(date)
  }
  function nodeContainsDescendant (rootNode, descendant) {
    if (rootNode === descendant) {
      return true
    }
    let parent = descendant.parentNode
    while (parent != null) {
      if (parent === rootNode) {
        return true
      }
      parent = parent.parentNode
    }
    return false
  }
  function isNodeWithinPopover (node) {
    return datePickerRef?.current
      ? nodeContainsDescendant(datePickerRef.current, node)
      : false
  }
  function handleStartInputValueChange (value) {
    setInputValues((prevState) => {
      return { ...prevState, since: value }
    })
    if (isValidDate(value)) {
      const newSince = parseYearMonthDayDateString(value)
      const newPeriod =
          activeDateRange.period && newSince <= activeDateRange.period.until
            ? { since: newSince, until: activeDateRange.period.until }
            : { since: newSince, until: newSince }
      setActiveDateRange({
        ...activeDateRange,
        period: newPeriod
      })
    }
  }
  function handleEndInputValueChange (value) {
    setInputValues((prevState) => ({ ...prevState, until: value }))
    if (isValidDate(value)) {
      const newUntil = parseYearMonthDayDateString(value)
      const newPeriod =
          activeDateRange.period && newUntil >= activeDateRange.period.since
            ? { since: activeDateRange.period.since, until: newUntil }
            : { since: newUntil, until: newUntil }
      setActiveDateRange({
        ...activeDateRange,
        period: newPeriod
      })
    }
  }
  function handleInputBlur ({ relatedTarget }) {
    const isRelatedTargetWithinPopover =
      relatedTarget != null && isNodeWithinPopover(relatedTarget)
    // If focus moves from the TextField to the Popover
    // we don't want to close the popover
    if (isRelatedTargetWithinPopover) {
      return
    }
    setPopoverActive(false)
  }
  function handleMonthChange (month, year) {
    setDate({ month, year })
  }
  function handleCalendarChange ({ start, end }) {
    const newDateRange = (ranges.find((range) => {
      return (
        range.period.since.valueOf() === start.valueOf() &&
        range.period.until.valueOf() === end.valueOf()
      )
    }) != null) || {
      alias: 'custom',
      title: 'Custom',
      period: {
        since: start,
        until: end
      }
    }
    setActiveDateRange(newDateRange)
  }
  function apply () {
    setPopoverActive(false)
    onChangeDate(activeDateRange)
  }
  function cancel () {
    setPopoverActive(false)
  }
  useEffect(() => {
    if (activeDateRange) {
      setInputValues({
        since: formatDate(activeDateRange.period.since),
        until: formatDate(activeDateRange.period.until)
      })
      function monthDiff (referenceDate, newDate) {
        return (
          newDate.month -
          referenceDate.month +
          12 * (referenceDate.year - newDate.year)
        )
      }
      const monthDifference = monthDiff(
        { year, month },
        {
          year: activeDateRange.period.until.getFullYear(),
          month: activeDateRange.period.until.getMonth()
        }
      )
      if (monthDifference > 1 || monthDifference < 0) {
        setDate({
          month: activeDateRange.period.until.getMonth(),
          year: activeDateRange.period.until.getFullYear()
        })
      }
    }
  }, [activeDateRange])
  const buttonValue =
    activeDateRange.title === 'Custom'
      ? activeDateRange.period.since.toDateString() +
        ' - ' +
        activeDateRange.period.until.toDateString()
      : activeDateRange.title
  return (
    <Popover
      active={popoverActive}
      autofocusTarget="none"
      preferredAlignment="left"
      preferredPosition="below"
      fluidContent
      sectioned={false}
      fullHeight
      activator={
        <Button
          // size="slim"
          icon={CalendarMinor}
          onClick={() => { setPopoverActive(!popoverActive) }}
        >
          {buttonValue}
        </Button>
      }
      onClose={() => { setPopoverActive(false) }}
    >
      <Popover.Pane fixed>
        <HorizontalGrid
          columns={{
            xs: '1fr',
            mdDown: '1fr',
            md: 'max-content max-content'
          }}
          gap={0}
          ref={datePickerRef}
        >
          <Box
            maxWidth={mdDown ? '516px' : '212px'}
            width={mdDown ? '100%' : '212px'}
            padding={{ xs: 5, md: 0 }}
            paddingBlockEnd={{ xs: 1, md: 0 }}
          >
            {mdDown
              ? (
              <Select
                label="dateRangeLabel"
                labelHidden
                onChange={(value) => {
                  const result = ranges.find(
                    ({ title, alias }) => title === value || alias === value
                  )
                  setActiveDateRange(result)
                }}
                value={activeDateRange?.title || activeDateRange?.alias || ''}
                options={ranges.map(({ alias, title }) => title || alias)}
              />
                )
              : (
              <Scrollable style={{ height: '334px' }}>
                <OptionList
                  options={ranges.map((range) => ({
                    value: range.alias,
                    label: range.title
                  }))}
                  selected={activeDateRange.alias}
                  onChange={(value) => {
                    setActiveDateRange(
                      ranges.find((range) => range.alias === value[0])
                    )
                  }}
                />
              </Scrollable>
                )}
          </Box>
          <Box padding={{ xs: '5' }} maxWidth={mdDown ? '320px' : '516px'}>
            <VerticalStack gap="4">
              <HorizontalStack gap="2">
                <div style={{ flexGrow: 1 }}>
                  <TextField
                    role="combobox"
                    label={'Since'}
                    labelHidden
                    prefix={<Icon source={CalendarMinor} />}
                    value={inputValues.since}
                    onChange={handleStartInputValueChange}
                    onBlur={handleInputBlur}
                    autoComplete="off"
                  />
                </div>
                <Icon source={ArrowRightMinor} />
                <div style={{ flexGrow: 1 }}>
                  <TextField
                    role="combobox"
                    label={'Until'}
                    labelHidden
                    prefix={<Icon source={CalendarMinor} />}
                    value={inputValues.until}
                    onChange={handleEndInputValueChange}
                    onBlur={handleInputBlur}
                    autoComplete="off"
                  />
                </div>
              </HorizontalStack>
              <div>
                <DatePicker
                  month={month}
                  year={year}
                  selected={{
                    start: activeDateRange.period.since,
                    end: activeDateRange.period.until
                  }}
                  onMonthChange={handleMonthChange}
                  onChange={handleCalendarChange}
                  multiMonth={shouldShowMultiMonth}
                  allowRange
                />
              </div>
            </VerticalStack>
          </Box>
        </HorizontalGrid>
      </Popover.Pane>
      <Popover.Pane fixed>
        <Popover.Section>
          <HorizontalStack align="end">
            <Button onClick={cancel}>Cancel</Button>
            <Button primary onClick={apply}>
              Apply
            </Button>
          </HorizontalStack>
        </Popover.Section>
      </Popover.Pane>
    </Popover>
  )
}

export default DateRangePicker
