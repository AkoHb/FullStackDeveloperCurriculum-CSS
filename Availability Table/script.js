/**
 * workloadIntensity - Contains data and descriptions for each workload level.
 *
 * @param { Number } level - The intensity level. Each level is described with unique parameters.
 * @param { String } description - A short name for the workload level (e.g., "Full capacity").
 * @param { String } message - A detailed description of the level, explaining the state at that workload intensity.
 * @param { String } backgroundColor - The background color used to represent this level.
 * @param { String } textColor - The text color used for displaying content at this level.
 */

const workloadIntensity = [
    {
        level: 5,
        description: "Full capacity",
        message: "Hands in oil, stuck in a mess, I love cars...",
        backgroundColor: "#2C3E50",
        textColor: "#FFFFFF",
    },
    {
        level: 4,
        description: "Very busy",
        message:
            "Sweating a little, but I can still knock out something during a break.",
        backgroundColor: "#E74C3C",
        textColor: "#000000",
    },
    {
        level: 3,
        description: "Moderate load",
        message: "I can still take on 1/3 of the workload.",
        backgroundColor: "#E67E22",
        textColor: "#000000",
    },
    {
        level: 2,
        description: "Light load",
        message: "I can double my tasks.",
        backgroundColor: "#F1C40F",
        textColor: "#000000",
    },
    {
        level: 1,
        description: "Very light load",
        message:
            "Scratching my right egg through the left pant leg of my colleague next to me, using a folding fork...",
        backgroundColor: "#9B59B6",
        textColor: "#FFFFFF",
    },
    {
        level: 0,
        description: "Stay home",
        message:
            "Would have been better staying in bed than dragging my butt here.",
        backgroundColor: "#7F8C8D",
        textColor: "#FFFFFF",
    },
];

/**
 * lunch and shortDay - Contains data and descriptions for each specific time period or schedule state.
 *
 * @param { Number } level - The intensity level. Each level is described with unique parameters.
 * @param { String } description - A brief name for the schedule state (e.g., "Lunch time" or "Have a great weekend").
 * @param { String } message - A detailed description explaining the significance of the time period or the state (e.g., a message about lunch or rest).
 * @param { String } backgroundColor - A custom background color. If not provided, the default background color for the level will be used.
 * @param { String } textColor - A custom text color. If not provided, the default text color for the level will be used.
 */

const lunch = {
    level: 0,
    description: "Lunch time", // The state of lunch break
    message:
        "A break from the madness, where food becomes the hero of the day!", // A fun message to describe lunch
};

const shortDay = {
    level: 0,
    description: "Have a great weekend", // A message indicating the end of the workweek
    message: "Finally, a little rest from your faces...", // A humorous message about the weekend break
};
// END DEFAULT DATA

// CUSTOM DATA

/**
 * tableConfig - Contains all necessary information for properly processing the availability table.
 */
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
// END CUSTOM DATA

// CUSTOM FUNCTIONS TO UPDATE THE CSS DATA DYNAMICALLY

// Access the stylesheet
const styleElement = document.createElement("style");
document.head.appendChild(styleElement);
const styleSheet = styleElement.sheet;

/**
 * updateStyles - Dynamically updates the styles based on the provided selector and properties.
 * @param {String} selector - The CSS selector to modify (e.g., ":root", ".class-name").
 * @param {Object} properties - Key-value pairs representing CSS properties and their new values.
 *
 * This function performs different actions based on the selector:
 * - If the selector is `:root`, it updates CSS variables using `setProperty()`.
 * - For other selectors, it calls the `insertOrUpdateRule` function to modify the CSS rule.
 */
function updateStyles(selector, properties) {
    if (selector === ":root") {
        // For :root, update variables using setProperty()
        const root = document.documentElement;
        Object.entries(properties).forEach(([property, value]) => {
            root.style.setProperty(property, value);
        });
    } else {
        // For other selectors, update the rule in CSS
        insertOrUpdateRule(selector, properties);
    }
}

/**
 * insertOrUpdateRule - Inserts or updates a CSS rule for a given selector.
 * @param {String} selector - The CSS selector to modify (e.g., ".class-name").
 * @param {Object} properties - Key-value pairs of CSS properties and their new values.
 *
 * This function checks if the selector already exists in the stylesheet:
 * - If it exists, the function deletes the old rule and inserts the updated one.
 * - If the selector does not exist, the function creates a new rule with the given properties.
 */
function insertOrUpdateRule(selector, properties) {
    const styleSheet = document.styleSheets[0]; // Get the first stylesheet
    let ruleExists = false;

    // Check if the selector already exists
    for (let i = 0; i < styleSheet.cssRules.length; i++) {
        if (styleSheet.cssRules[i].selectorText === selector) {
            styleSheet.deleteRule(i); // Remove the existing rule
            ruleExists = true;
            break;
        }
    }

    // Construct the new rule
    const rule = `${selector} { ${Object.entries(properties)
        .map(([property, value]) => `${property}: ${value};`)
        .join(" ")} }`;

    // Insert the new rule
    try {
        styleSheet.insertRule(rule, styleSheet.cssRules.length);
    } catch (e) {
        console.error("Error inserting rule:", e);
    }
}
// END CUSTOM FUNCTIONS TO UPDATE THE CSS DATA DYNAMICALLY

// CUSTOM PROPERTIES FUNCTIONS

// the object for custom events
let CUSTOM_EVENTS = [];

/**
 * creatCustomEvent - The function used to create or update the customs event array
 *
 * @param { String } shortDayName - Short day name (valid: Mon, Tue, Wed, Thu< Fri, Sat, Sun )
 * @param { Number } dayIndex - index start from 0. (Sunday = 0, Saturday = 6)
 * @param { String } eventBeginTime - Event start time in format (HH:MM, 10:15)
 * @param { String } eventEndTime - Event end time in format (HH:MM, 10:45)
 * @param { Number } level - The intensity level. Each level is described with unique parameters.
 * @param { String } description - A short name for the workload level (e.g., "Full capacity").
 * @param { String } message - A detailed description of the level, explaining the state at that workload intensity.
 * @param { String } backgroundColor - The background color used to represent this level.
 * @param { String } textColor - The text color used for displaying content at this level.
 *
 *
 */
const creatCustomEvent = (
    shortDayName,
    dayIndex,
    eventBeginTime,
    eventEndTime,
    loadLevel,
    description,
    message,
    backgroundColor,
    textColor
) => {
    const replace = window.confirm(
        `The rule for "HERE" already exists. Do you want to replace it?`
    );
};

/**
 * getRandomIndex - Used to renturn the random value
 *
 * @param { Numver } maxValue - Set the highest integer value ( lowest = 0 )
 * @returns { Number } - Return random number or default value ( default = 0 )
 */
const getRandomIndex = (maxValue = 0) =>
    maxValue > 0 ? Math.floor(Math.random() * maxValue) : 0;

/**
 * getTrClass - Used to get the Table Row className based on defaults valriants
 *
 * @param { Number } i - current data index
 *
 * The function:
 * - check if the index is valid
 * - check the valid data array length
 * - if all right, return the value based on the remainder of division index to array length
 * - if not - return the empty string
 * @returns { String } - return the String
 */
const getTrClass = (i) => {
    if (i < 0 || !tableConfig?.trClasses || !tableConfig.trClasses.length)
        return "";

    if (tableConfig.trClasses.length > 0 && i > 0) {
        let newIndex = i % tableConfig.trClasses.length;
        return tableConfig.trClasses[newIndex];
    } else {
        return tableConfig.trClasses[0];
    }
};

const strTimeToMin = (timeString) => {
    if (typeof timeString === "string" && timeString.includes(":")) {
        const [hours, minutes] = timeString.split(":").map(Number);
        if (!isNaN(hours) && !isNaN(minutes)) {
            return hours * 60 + minutes;
        }
    }
    return 0;
};

const timeToStr = (minutes) => {
    if (typeof minutes === "number" && minutes >= 0) {
        const hours = Math.floor(minutes / 60);
        const mins = minutes % 60;
        return `${String(hours).padStart(2, "0")}:${String(mins).padStart(2, "0")}`;
    }
    return "00:00";
};

const getDayData = (currentData = new Date()) => ({
    dayIndex: currentData.getDay(),
    day: currentData.getDate(),
    dayShortName: currentData.toLocaleDateString("en-US", { weekday: "short" }),
    shortMonthName: currentData.toLocaleDateString("en-US", { month: "short" }),
    hours: currentData.getHours(),
    minutes: currentData.getMinutes(),
});

const getDayTimeData = ({
    time,
    endTime = false,
    loadLevel,
    bgColor = "none",
    description,
    message,
}) => {
    let keyTime = timeToStr(time);

    const defaultCalculateEndTime = time => timeToStr(time + strTimeToMin(tableConfig.timeStep))
    if (!endTime) {
        endTime = defaultCalculateEndTime(time);
    } else {
        if ( typeof endTime === 'string' ) {
            // if the end time looks like "15:45"
            if ( endTime.split(":").length === 2 ) {
                endTime = endTime;
                return;
            } 
        } else if ( typeof endTime === 'number' ) {
            // if the end time looks like "725" min
            if ( time > 0 && time < 7200 )  {
                endTime = timeToStr(endTime);
                return;
            }
        } 
        endTime = defaultCalculateEndTime(time);
    }

    return {
        time: keyTime,
        endTime: endTime,
        data: {
            loadLevel,
            bgColor,
            description,
            message,
        },
    };
};

// END CUSTOM PROPERTIES FUNCTIONS

// FILL THE TABLE DATA
let currentState = getDayData();

let startDate = new Date();

// Check, if the current day is Monday and time less than 12:00
// if there is = don't change the start Monday
// if not = looking for the next Monday

if (!(currentState.dayIndex === 1 && currentState.hours < 12)) {
    const dayOfWeek = startDate.getDay();
    const diffToMonday = dayOfWeek === 0 ? 1 : 1 - dayOfWeek;
    startDate.setDate(startDate.getDate() + diffToMonday);
}

// fill the daily data from the Monday
const fillData = (startData) => {
    startData = !startData ? new Date() : new Date(startData);

    // update the CSS data
    workloadIntensity.forEach((obj) => {
        // Update :root with the background color variable
        updateStyles(":root", {
            [`--color${obj.level}`]: obj.backgroundColor,
        });

        // Update the class with background and text colors
        updateStyles(
            `.${tableConfig.tdClasses}-${obj.level}`, // Add a dot for class selector
            {
                'background-color': `var(--color${obj.level})`, // Use CSS variable directly
                'color': obj.textColor, // No need for template literals here
            }
        );
    });



    const startTime = strTimeToMin(tableConfig.workdaysBegin);
    const endTime = strTimeToMin(tableConfig.workdaysEnd);
    const lunchStartTime = strTimeToMin(tableConfig.lunchBreakStart);
    const lunchEndTime =
        lunchStartTime + strTimeToMin(tableConfig.lunchBreakDuration);
    const shortDayTimeStart =
        endTime - strTimeToMin(tableConfig.lastWorkdayShortenedBy);
    const timeInterval = strTimeToMin(tableConfig.timeStep);

    let res = [];

    // Loop over the workdays
    for (let x = 0; x < tableConfig.workDayCount; x++) {
        let currentDay = new Date(startData);
        currentDay.setDate(currentDay.getDate() + x); // Adjust date for each workday

        let fullDayData = getDayData(currentDay);

        let dayData = [];

        // Check if this is the last workday
        let isLastDay =
            currentDay.getDate() ===
            startData.getDate() + tableConfig.workDayCount - 1;

        // Loop through the work hours and generate data
        for (
            let currentTime = startTime;
            currentTime < endTime;
            currentTime += timeInterval
        ) {
            let isLunchTime =
                currentTime >= lunchStartTime && currentTime < lunchEndTime;

            if (tableConfig.lunchBreakEnabled && isLunchTime) {
                dayData.push(
                    getDayTimeData({
                        time: currentTime,
                        loadLevel: lunch.level,
                        description: lunch.description,
                        message: lunch.message,
                    })
                );
            } else if (
                tableConfig.isLastWorkdayShorter &&
                isLastDay &&
                currentTime >= shortDayTimeStart
            ) {
                dayData.push(
                    getDayTimeData({
                        time: currentTime,
                        loadLevel: shortDay.level,
                        description: shortDay.description,
                        message: shortDay.message,
                    })
                );
            } else {
                let randomIndex = getRandomIndex(workloadIntensity.length);
                let currentObject = workloadIntensity[randomIndex];

                dayData.push(
                    getDayTimeData({
                        time: currentTime,
                        loadLevel: currentObject.level,
                        description: currentObject.description,
                        message: currentObject.message,
                        bgColor: currentObject.backgroundColor,
                    })
                );
            }
        }

        res.push({
            shortday: fullDayData.dayShortName,
            shortMonth: fullDayData.shortMonthName,
            day: fullDayData.day,
            dayData,
        });
    }
    return res;
};

// Fill table and create tooltip
const setUpAvailabilityTable = (data) => {

    // update the table title
    document.querySelector("#title").innerText = tableConfig.tableTitle;

    // update the legend
    document.querySelector('#legend-title').textContent = 'Availability';
    document.querySelector('#legend-length').textContent = workloadIntensity.length - 1;

    // select the table
    const table = document.querySelector("#table");
    const rowsCount = data[0].dayData.length;

    let tableContent = `<thead><tr><th class="header">Time</th>`;

    data.forEach((day) => {
        tableContent += `<th class="header">${day.shortday} <br/> ${day.shortMonth} ${day.day}</th>`;
    });
    tableContent += `</tr></thead><tbody>`;

    for (let rowIdx = 0; rowIdx < rowsCount; rowIdx++) {
        let timeBegin = data[0].dayData[rowIdx].time;
        let timeEnd = data[0].dayData[rowIdx].endTime;
        

        tableContent += `<tr class="${getTrClass(rowIdx)}">`;
        tableContent += `<th class="time">${timeBegin} ${timeEnd}</th>`;

        data.forEach((day) => {
            const timeData = day.dayData[rowIdx];
            const cellData = timeData.data;
            const tooltipContent = `
                <strong>Time interval:</strong> ${timeBegin} - ${timeEnd}<br>
                <strong>Workload level:</strong> ${cellData.loadLevel}<br>
                <strong>Load level status:</strong> ${cellData.description}<br>
                <strong>More info about event:</strong> <br>${cellData.message || "No valid full info..."}
            `;

            tableContent += `<td class="available-${cellData.loadLevel}" 
                                 data-load-level-text="${cellData.description}" 
                                 data-tooltip="${tooltipContent}" >`;
            tableContent += `${cellData.message}`;
            tableContent += `</td>`;
        });

        tableContent += `</tr>`;
    }

    table.innerHTML = tableContent;

    // Tooltip element
    const tooltip = document.createElement("div");
    tooltip.classList.add("tooltip");
    document.body.appendChild(tooltip);

    const cells = table.querySelectorAll("td[data-tooltip]");

    cells.forEach((cell) => {
        cell.addEventListener("mouseenter", function (e) {
            const tooltipContent = this.getAttribute("data-tooltip");
            tooltip.innerHTML = tooltipContent;

            // Get the screen size
            const screenWidth = window.innerWidth;
            const screenHeight = window.innerHeight;

            // Get the cursor position
            const cursorX = e.pageX;
            const cursorY = e.pageY;

            // Show the tooltip temporarily to measure its dimensions
            tooltip.style.visibility = 'hidden';  // Hide the tooltip initially
            tooltip.style.display = 'block'; // Temporarily display it to measure size
            const tooltipWidth = tooltip.offsetWidth;
            const tooltipHeight = tooltip.offsetHeight;
            tooltip.style.display = 'none';  // Hide it again after measuring
            tooltip.style.visibility = 'visible';  // Make sure it's visible

            // Determine which screen quadrant the cursor is in
            const isLeft = cursorX < screenWidth / 2;
            const isTop = cursorY < screenHeight / 2;

            let tooltipLeft, tooltipTop;

            // Calculate position based on the quadrant
            if (isTop) {
                tooltipTop = cursorY + 10; // Tooltip below the cursor
            } else {
                tooltipTop = cursorY - tooltipHeight - 10; // Tooltip above the cursor
            }

            if (isLeft) {
                tooltipLeft = cursorX + 10; // Tooltip to the right of the cursor
            } else {
                tooltipLeft = cursorX - tooltipWidth - 10; // Tooltip to the left of the cursor
            }

            // Ensure the tooltip stays within screen bounds
            if (tooltipLeft + tooltipWidth > screenWidth) {
                tooltipLeft = screenWidth - tooltipWidth - 10;
            }
            if (tooltipTop + tooltipHeight > screenHeight) {
                tooltipTop = screenHeight - tooltipHeight - 10;
            }
            if (tooltipLeft < 0) {
                tooltipLeft = 10;
            }
            if (tooltipTop < 0) {
                tooltipTop = 10;
            }

            // Debugging: Check final position
            // console.log('Tooltip Final Position: ', tooltipLeft, tooltipTop);

            // Set the final position of the tooltip
            tooltip.style.left = `${tooltipLeft}px`;
            tooltip.style.top = `${tooltipTop}px`;

            tooltip.style.display = "block"; // Show the tooltip
        });

        cell.addEventListener("mouseleave", () => {
            tooltip.style.display = "none"; // Hide the tooltip when the mouse leaves
        });
    });
};
// END FILL THE TABLE DATA


// START THE SCRIPT
// startDate equal to the closest Monday
setUpAvailabilityTable(fillData(startDate));
