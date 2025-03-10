// fullcalendar.js

let calendar;

document.addEventListener("DOMContentLoaded", function () {
    const calendarEl = document.getElementById("calendar");
    const calendarCheckbox = document.getElementById("calendarToggle");

    function initializeCalendar() {
        if (!calendar) {
            calendar = new FullCalendar.Calendar(calendarEl, {
                initialView: "listMonth",
                height: 'auto',
                contentHeight: 'auto',
                headerToolbar: { left: "prev", center: "title", right: "next" },
                buttonText: { today: "Today", prev: "<", next: ">" },
                selectable: true,
                editable: false,
                events: dbEvents, // <-- Use shared array
                views: {
                    listMonth: {
                        listDayFormat: false,
                        listDaySideFormat: false
                    }
                },
                eventTimeFormat: {
                    hour: 'numeric', minute: '2-digit', hour12: false,
                    day: 'numeric', month: 'short', year: 'numeric'
                },
                eventDidMount: function(info) {
                    let eventTimeElement = info.el.querySelector('.fc-list-event-time');
                    if (eventTimeElement) {
                        let startDate = new Date(info.event.start);
                        let endDate = info.event.end ? new Date(info.event.end) : startDate;
                        
                        let startDay = getOrdinalSuffix(startDate.getDate()); // "1st"
                        let startTime = startDate.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit', hour12: false });
                
                        let endDay = getOrdinalSuffix(endDate.getDate()); // "2nd"
                        let endTime = endDate.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit', hour12: false });
                
                        if (info.event.allDay) {
                            eventTimeElement.textContent = `${startDay}, All-Day`;
                        } else {
                            eventTimeElement.textContent = `${startDay}, ${startTime} - ${endDay}, ${endTime}`;
                        }
                    }
                }
                
            });

            calendar.render();
        }
    }

    calendarCheckbox.addEventListener("change", function () {
        if (calendarCheckbox.checked) {
            calendarEl.style.display = "block";
            initializeCalendar();
        } else {
            calendarEl.style.display = "none";
        }
    });

    calendarEl.style.display = "none";
});
