// $(function ENSURES CODE DOESN'T RUN UNTIL BROWSER HAS FINISHED RENDERING HTML 
$(function () {
  // Selects id="planner" Element from HTML
  const WorkdayPlanner = $("#planner");
  // Gets/formats current date
  const currentDate = dayjs().format("YYYY-MM-DD");
  // Calls the generateHourlyPlanner function with the current date properly formatted
  const plannerHTML = generateHourlyPlanner(currentDate);
  // Display the planner to the "planner" Element in HTML
  WorkdayPlanner.html(plannerHTML);
});

function generateHourlyPlanner(date) {
  // Ensures planner element is empty string
  let plannerHTML = "";
  // Gets current hour
  const hourCurrent = dayjs().hour();
  // Set the start and end hours for the planner
  const hourStart = 0;
  const hourEnd = 23;
  // for loop adds one for each hour from startHour to endHour
  for (let hour = hourStart; hour <= hourEnd; hour++) {
    // uses dayjs to grab each hour and format it into 12 hour AM/PM
    const time = dayjs(date).hour(hour);
    const formattedTime = time.format("h A");
    // Assign past/present/future class to CSS style based on comparison to hourCurrent
    let cssTimingColor = "";
    if (hour < hourCurrent) {
      cssTimingColor = "past";
    } else if (hour === hourCurrent) {
      cssTimingColor = "present";
    } else {
      cssTimingColor = "future";
    }

    // Creates HTML structure for each hour block
    const hourBlock = `
    <div id="hour-${hour}" class="row time-block ${cssTimingColor}">
    <div class="col-2 col-md-1 hour text-center py-3">${formattedTime}</div>
    <textarea id="textarea-${hour}" class="col-8 col-md-10 description" rows="3"></textarea>
    <button id="saveBtn-${hour}" class="btn saveBtn col-2 col-md-1" aria-label="save">
      <i class="fas fa-save" aria-hidden="true"></i>
    </button>
  </div>
    `;

// appends each hour block to variable to be added to planner element in HTML
    plannerHTML += hourBlock;
  }

  // append the planner HTML to the DOM
  const WorkdayPlanner = $("#planner");
  WorkdayPlanner.html(plannerHTML);
  // for loop to affect each hour's save button/loaded textarea content
  for (let hour = hourStart; hour <= hourEnd; hour++) {
    // adds event listeners to save buttons
    const saveBtn = $(`#saveBtn-${hour}`);
    saveBtn.on("click", function () {
      // grabs content from textarea
      const textarea = $(`#textarea-${hour}`);
      const text = textarea.val();
      // saves that content to local storage
      localStorage.setItem(`hour-${hour}`, text);
    });
    
      // loads textarea content from local storage
    const text = localStorage.getItem(`hour-${hour}`);
    const textarea = $(`#textarea-${hour}`);
    // puts stored content into corresponding textarea
    textarea.val(text);
  }
}



// $(function () {
  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  //
  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  //
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //
  // TODO: Add code to display the current date in the header of the page.
// });
