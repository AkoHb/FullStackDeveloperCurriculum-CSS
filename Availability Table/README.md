# Availability Schedule for Next Week

This project generates an availability schedule for a workweek with dynamically updated information based on configurable parameters. It provides a visually structured table to represent daily availability, including various workload levels, lunch breaks, and short workdays.

## Features

- **Dynamic Table Generation**: Automatically generates a table for the upcoming workweek, taking into account various parameters like work hours, lunch breaks, and shorter last workdays.
- **Customizable Work Schedule**: The workdays, start and end times, and lunch break duration are all configurable.
- **Workload Intensity Levels**: Each time slot is assigned a workload intensity level with corresponding descriptions and background colors.
- **Tooltips for Enhanced Information**: Hovering over time slots in the table shows detailed information about the status, including load level and description.

## Configuration Options

The schedule is highly configurable using the `tableConfig` object, where you can customize:

- `workdaysBegin`: Time when workdays start (default: "9:00").
- `workdaysEnd`: Time when workdays end (default: "17:00").
- `lunchBreakStart`: Time when lunch break starts (default: "12:00").
- `lunchBreakDuration`: Duration of the lunch break (default: "1:00").
- `lunchBreakEnabled`: Whether lunch break is enabled (default: true).
- `timeStep`: The time interval between grid cells (default: "0:30").
- `workDayCount`: Number of workdays to generate (default: 5).
- `isLastWorkdayShorter`: Whether the last workday is shorter (default: true).
- `lastWorkdayShortenedBy`: Duration the last workday is shortened by (default: "1:00").
- `trClasses`: CSS classes used to separate table rows (default: `["sharp", "half"]`).
- `tdClasses`: CSS class for table cells (default: "available").

## Workload Intensity Levels

The schedule includes 6 predefined workload intensity levels, each with a background color and a description:

1. **Level 5**: Full capacity
2. **Level 4**: Very busy
3. **Level 3**: Moderate load
4. **Level 2**: Light load
5. **Level 1**: Very light load
6. **Level 0**: Stay home (no work)

## How to Use

1. Clone or download the repository.
2. Open the `index.html` file in your browser to see the generated availability schedule for the next workweek.
3. Modify the configuration settings in the `tableConfig` object to customize the schedule according to your needs.

## Example Usage

To modify the workday start time and lunch break duration, update the `tableConfig` object:

```javascript
const tableConfig = {
    tableTitle: "Availability schedule for next week", // Title displayed above the table
    workdaysBegin: "9:00", // Start time for workdays (default: 9:00)
    workdaysEnd: "17:00", // End time for workdays (default: 17:00)
    lunchBreakStart: "12:00", // Time when lunch break starts
    lunchBreakDuration: "1:00", // Duration of the lunch break in hours (e.g., 1 hour)
    lunchBreakEnabled: true, // Flag to enable/disable the lunch break (false means no lunch break)
    timeStep: "0:30", // Time step for the grid (e.g., 30 minutes)
    workDayCount: 5, // Number of workdays to display (default: 5)
    isLastWorkdayShorter: true, // If true, the last workday will be shorter than the others
    lastWorkdayShortenedBy: "1:00", // Duration by which the last workday is shortened (e.g., 1 hour)
    trClasses: ["sharp", "half"], // Classes for row styling, used to separate rows
    tdClasses: "available", // Class for cells to represent availability based on load level
};
