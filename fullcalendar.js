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
                    if (!eventTimeElement) return;
                
                    let startDate = new Date(info.event.start);
                    let endDate = info.event.end ? new Date(info.event.end) : startDate;
                
                    let startDay = getOrdinalSuffix(startDate.getDate()); // "1st"
                    let startMonth = startDate.toLocaleDateString(undefined, { month: 'short' }); // "Mar"
                    let startTime = startDate.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit', hour12: false });
                
                    let endDay = getOrdinalSuffix(endDate.getDate());
                    let endMonth = endDate.toLocaleDateString(undefined, { month: 'short' });
                    let endTime = endDate.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit', hour12: false });
                
                    // 🔥 Check how many instances of this event exist
                    let eventElements = document.querySelectorAll(".fc-list-event");
                    let matchingEvents = Array.from(eventElements).filter(el => el.innerText.includes(info.event.title));
                
                    //console.log(`🔍 Found ${matchingEvents.length} instances of "${info.event.title}"`);
                
                    // ✅ If there are multiple instances, only keep the first one
                    if (matchingEvents.length > 1) {
                        let firstEventElement = matchingEvents[0];
                
                        if (info.el !== firstEventElement) {
                            //console.log(`🛑 Hiding duplicate for: ${info.event.title}`);
                            info.el.style.display = "none";
                            return;
                        }
                    }
                
                    // ✅ Format the event display
                    if (info.event.allDay) {
                        eventTimeElement.textContent = `${startDay} ${startMonth}, All-Day`;
                    } else if (startDate.toDateString() === endDate.toDateString()) {
                        eventTimeElement.textContent = `${startDay} ${startMonth}, ${startTime} - ${endTime}`;
                    } else {
                        eventTimeElement.textContent = `${startDay} ${startMonth}, ${startTime} - ${endDay} ${endMonth}, ${endTime}`;
                    }
                
                    //console.log(`✅ Keeping main event: ${info.event.title}`);
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
