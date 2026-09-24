/* =====================================================
   LIVO - HOSPITALITY RESOURCE EXCHANGE
   Reverse Request JavaScript
===================================================== */

/* =====================================================
   1. RESOURCE DATA FOR MATCHING ENGINE
===================================================== */

const resources = [
    {
        id: 1,
        name: "Premium Banquet Hall",
        type: "Banquet Space",
        location: "Andheri",
        capacity: 300,
        price: 30000,
        unit: "event",
        availability: "18:00 - 22:00",
        rating: 4.8,
        provider: "Andheri Hospitality Group",
        verified: true,
        icon: "🏢"
    },
    {
        id: 2,
        name: "Conference & Event Space",
        type: "Banquet Space",
        location: "Bandra",
        capacity: 150,
        price: 22000,
        unit: "event",
        availability: "10:00 - 18:00",
        rating: 4.7,
        provider: "Bandra Business Hotel",
        verified: true,
        icon: "🏨"
    },
    {
        id: 3,
        name: "Event Parking Capacity",
        type: "Parking",
        location: "Powai",
        capacity: 40,
        price: 5000,
        unit: "event",
        availability: "16:00 - 23:00",
        rating: 4.5,
        provider: "Powai Event Centre",
        verified: true,
        icon: "🚗"
    },
    {
        id: 4,
        name: "Event Furniture Package",
        type: "Furniture",
        capacity: 150,
        quantity: 150,
        location: "Lower Parel",
        price: 8500,
        unit: "event",
        availability: "12:00 - 22:00",
        rating: 4.6,
        provider: "Mumbai Event Furnishings",
        verified: true,
        icon: "🪑"
    },
    {
        id: 5,
        name: "Professional AV Package",
        type: "AV Equipment",
        capacity: 300,
        location: "Andheri",
        price: 12000,
        unit: "event",
        availability: "16:00 - 23:00",
        rating: 4.9,
        provider: "EventTech Mumbai",
        verified: true,
        icon: "🔊"
    },
    {
        id: 6,
        name: "Commercial Kitchen Facility",
        type: "Kitchen Capacity",
        capacity: 250,
        location: "Powai",
        price: 15000,
        unit: "day",
        availability: "08:00 - 22:00",
        rating: 4.7,
        provider: "Hospitality Kitchen Hub",
        verified: true,
        icon: "🍳"
    },
    {
        id: 7,
        name: "Event Shuttle Vehicle",
        type: "Vehicles",
        capacity: 20,
        location: "Bandra",
        price: 7000,
        unit: "event",
        availability: "15:00 - 23:00",
        rating: 4.5,
        provider: "City Event Transport",
        verified: true,
        icon: "🚐"
    },
    {
        id: 8,
        name: "Corporate Event Furniture",
        type: "Furniture",
        capacity: 100,
        quantity: 100,
        location: "Andheri",
        price: 6000,
        unit: "event",
        availability: "09:00 - 20:00",
        rating: 4.4,
        provider: "Corporate Setup Solutions",
        verified: true,
        icon: "🪑"
    }
];

/* =====================================================
   2. REVERSE RESOURCE REQUEST FORM HANDLER
===================================================== */

function postRequest() {
    const type = document.getElementById("reqType").value.trim();
    const capacity = document.getElementById("reqCapacity").value.trim();
    const location = document.getElementById("reqLocation").value.trim();
    const budgetText = document.getElementById("reqBudget").value.trim();
    const date = document.getElementById("reqDate").value;
    const time = document.getElementById("reqTime").value.trim();
    const notes = document.getElementById("reqNotes").value.trim();

    /* Validation */
    if (!type) {
        alert("Please enter the resource type.");
        return;
    }

    if (!capacity) {
        alert("Please enter the required capacity or quantity.");
        return;
    }

    if (!location) {
        alert("Please enter your preferred location.");
        return;
    }

    if (!budgetText) {
        alert("Please enter your maximum budget.");
        return;
    }

    if (!date) {
        alert("Please select the required date.");
        return;
    }

    if (!time) {
        alert("Please enter the required time.");
        return;
    }

    const budget = parseFloat(budgetText.replace(/[^0-9.]/g, ""));
    if (isNaN(budget) || budget <= 0) {
        alert("Please enter a valid budget.");
        return;
    }

    /* Find matches */
    const matches = findMatches(type, capacity, location, budget);

    displayMatches(matches, {
        type: type,
        capacity: capacity,
        location: location,
        budget: budget,
        date: date,
        time: time,
        notes: notes
    });
}

/* =====================================================
   3. SMART MATCHING ENGINE
===================================================== */

function findMatches(requestedType, requestedCapacity, requestedLocation, budget) {
    const capacityNumber = parseInt(requestedCapacity.replace(/[^0-9]/g, "")) || 0;

    return resources
        .map(function (resource) {
            let score = 0;
            let reasons = [];

            /* Type - 30% */
            if (resource.type.toLowerCase().includes(requestedType.toLowerCase())) {
                score += 30;
                reasons.push("Resource type matches");
            }

            /* Location - 25% */
            if (
                resource.location.toLowerCase().includes(requestedLocation.toLowerCase()) ||
                requestedLocation.toLowerCase().includes(resource.location.toLowerCase())
            ) {
                score += 25;
                reasons.push("Preferred location matches");
            }

            /* Capacity - 20% */
            if (capacityNumber === 0 || resource.capacity >= capacityNumber) {
                score += 20;
                reasons.push("Capacity requirement met");
            }

            /* Budget - 15% */
            if (resource.price <= budget) {
                score += 15;
                reasons.push("Within your budget");
            } else if (resource.price <= budget * 1.15) {
                score += 8;
                reasons.push("Slightly above budget");
            }

            /* Rating - 10% */
            if (resource.rating >= 4.5) {
                score += 10;
                reasons.push("Highly rated provider");
            } else if (resource.rating >= 4) {
                score += 7;
            }

            return {
                resource: resource,
                score: score,
                reasons: reasons
            };
        })
        .filter(function (match) {
            return match.score >= 30;
        })
        .sort(function (a, b) {
            return b.score - a.score;
        });
}

/* =====================================================
   4. DISPLAY SMART MATCHES
===================================================== */

function displayMatches(matches, request) {
    const container = document.getElementById("matches");

    if (matches.length === 0) {
        container.innerHTML = `
            <div class="card" style="text-align:center; padding:35px 20px;">
                <h3>No suitable providers found</h3>
                <p>Try increasing your budget, changing the location or adjusting the capacity.</p>
            </div>
        `;
        return;
    }

    container.innerHTML = `
        <div style="margin-bottom:18px;">
            <h3 style="color:#0d1838; font-size:20px;">🧠 Smart Matches Found</h3>
            <p style="color:#64748b; font-size:14px;">
                Matching providers based on type, capacity, location, budget and provider rating.
            </p>
        </div>
        ${matches
            .map(function (match) {
                return createMatchCard(match, request);
            })
            .join("")}
    `;
}

/* =====================================================
   5. CREATE MATCH CARD
===================================================== */

function createMatchCard(match, request) {
    const resource = match.resource;

    return `
        <div class="match-card">
            <div style="display:flex; justify-content:space-between; align-items:flex-start; gap:15px;">
                <div>
                    <h3>
                        ${resource.icon} ${resource.name}
                    </h3>
                    <p class="meta">
                        ${resource.provider}
                    </p>
                </div>
                <span class="match-score">
                    ${match.score}% Match
                </span>
            </div>

            <p class="meta">
                📍 ${resource.location} &nbsp; • &nbsp; 👥 Capacity ${resource.capacity}
            </p>

            <p class="meta">
                ⏰ ${resource.availability} &nbsp; • &nbsp; ⭐ ${resource.rating}
            </p>

            <div class="price">
                ₹${resource.price.toLocaleString("en-IN")}
            </div>

            <div style="background:#f8fafc; border-radius:8px; padding:12px; margin:12px 0;">
                <strong style="font-size:13px; color:#0d1838;">
                    Why this match?
                </strong>
                <ul style="margin:7px 0 0 18px; color:#64748b; font-size:13px;">
                    ${match.reasons
                        .map(function (reason) {
                            return `<li>${reason}</li>`;
                        })
                        .join("")}
                </ul>
            </div>

            <div style="display:flex; gap:10px; flex-wrap:wrap;">
                <button class="btn green" onclick="requestBooking(${resource.id})">
                    Contact Provider
                </button>
                <button class="btn secondary" onclick="viewResource(${resource.id})">
                    Compare Resource
                </button>
            </div>
        </div>
    `;
}

/* =====================================================
   6. VIEW RESOURCE MODAL
===================================================== */

function viewResource(resourceId) {
    const resource = resources.find(function (item) {
        return item.id === resourceId;
    });

    if (!resource) return;

    const modalContent = document.getElementById("modalContent");
    if (!modalContent) return;

    modalContent.innerHTML = `
        <h2 style="color:#0d1838; margin-bottom:10px;">
            ${resource.icon} ${resource.name}
        </h2>
        <p style="color:#64748b; margin-bottom:18px;">
            ${resource.provider}
        </p>
        <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px; margin-bottom:20px;">
            <div class="card">
                <strong>Resource Type</strong>
                <p>${resource.type}</p>
            </div>
            <div class="card">
                <strong>Location</strong>
                <p>📍 ${resource.location}</p>
            </div>
            <div class="card">
                <strong>Capacity</strong>
                <p>${resource.capacity}</p>
            </div>
            <div class="card">
                <strong>Availability</strong>
                <p>${resource.availability}</p>
            </div>
            <div class="card">
                <strong>Rating</strong>
                <p>⭐ ${resource.rating}</p>
            </div>
            <div class="card">
                <strong>Price</strong>
                <p style="color:#0da596;font-weight:700;">
                    ₹${resource.price.toLocaleString("en-IN")}
                </p>
            </div>
        </div>
        <button class="btn green" style="width:100%;" onclick="requestBooking(${resource.id})">
            Request Booking
        </button>
    `;

    openModal();
}

/* =====================================================
   7. BOOKING REQUEST MODAL
===================================================== */

function requestBooking(resourceId) {
    const resource = resources.find(function (item) {
        return item.id === resourceId;
    });

    if (!resource) return;

    const modalContent = document.getElementById("modalContent");
    if (!modalContent) return;

    modalContent.innerHTML = `
        <h2 style="color:#0d1838; margin-bottom:8px;">Request Booking</h2>
        <p style="color:#64748b; margin-bottom:20px;">${resource.name}</p>

        <label style="display:block; font-weight:600; margin-bottom:6px;">Required Date</label>
        <input type="date" id="bookingDate" style="width:100%; padding:12px; border:1px solid #d7e0ec; border-radius:8px; margin-bottom:15px;">

        <label style="display:block; font-weight:600; margin-bottom:6px;">Required Time</label>
        <input type="text" id="bookingTime" placeholder="18:00 - 22:00" style="width:100%; padding:12px; border:1px solid #d7e0ec; border-radius:8px; margin-bottom:15px;">

        <label style="display:block; font-weight:600; margin-bottom:6px;">Message</label>
        <textarea id="bookingMessage" placeholder="Enter any additional requirements..." style="width:100%; min-height:100px; padding:12px; border:1px solid #d7e0ec; border-radius:8px; resize:vertical; margin-bottom:18px; font-family:inherit;"></textarea>

        <button class="btn green" style="width:100%;" onclick="submitBooking(${resource.id})">
            Send Booking Request
        </button>
    `;

    openModal();
}

/* =====================================================
   8. SUBMIT BOOKING
===================================================== */

function submitBooking(resourceId) {
    const dateInput = document.getElementById("bookingDate");
    const timeInput = document.getElementById("bookingTime");
    const messageInput = document.getElementById("bookingMessage");

    const date = dateInput ? dateInput.value : "";
    const time = timeInput ? timeInput.value.trim() : "";
    const message = messageInput ? messageInput.value.trim() : "";

    if (!date) {
        alert("Please select a booking date.");
        return;
    }

    if (!time) {
        alert("Please enter the required time.");
        return;
    }

    console.log("Booking Request:", {
        resourceId: resourceId,
        date: date,
        time: time,
        message: message
    });

    closeModal();
    toast("Booking request sent successfully");
}

/* =====================================================
   9. MODAL HELPERS
===================================================== */

function openModal() {
    const modal = document.getElementById("modal");
    if (modal) {
        modal.classList.add("show");
    }
}

function closeModal() {
    const modal = document.getElementById("modal");
    if (modal) {
        modal.classList.remove("show");
    }
}

/* =====================================================
   10. TOAST NOTIFICATION
===================================================== */

function toast(message) {
    const toastElement = document.getElementById("toast");
    if (!toastElement) return;

    toastElement.textContent = message;
    toastElement.classList.add("show");

    setTimeout(function () {
        toastElement.classList.remove("show");
    }, 3000);
}

/* =====================================================
   11. INITIALIZATION
===================================================== */

document.addEventListener("DOMContentLoaded", function () {
    const modal = document.getElementById("modal");
    if (modal) {
        modal.addEventListener("click", function (event) {
            if (event.target === modal) {
                closeModal();
            }
        });
    }
});

