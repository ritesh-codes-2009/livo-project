/* =====================================================
   LIVO - HOSPITALITY RESOURCE EXCHANGE
   Marketplace JavaScript
===================================================== */

/* =====================================================
   1. RESOURCE DATA
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
   2. RENDER RESOURCE CARDS
===================================================== */

function render() {
    const container = document.getElementById("resources");
    const searchInput = document.getElementById("search");
    const typeSelect = document.getElementById("type");
    const locationSelect = document.getElementById("location");

    if (!container) return;

    const search = searchInput ? searchInput.value.toLowerCase().trim() : "";
    const type = typeSelect ? typeSelect.value : "";
    const location = locationSelect ? locationSelect.value : "";

    const filteredResources = resources.filter(function (resource) {
        const matchesSearch =
            !search ||
            resource.name.toLowerCase().includes(search) ||
            resource.type.toLowerCase().includes(search) ||
            resource.location.toLowerCase().includes(search) ||
            resource.provider.toLowerCase().includes(search);

        const matchesType = !type || resource.type === type;
        const matchesLocation = !location || resource.location === location;

        return matchesSearch && matchesType && matchesLocation;
    });

    if (filteredResources.length === 0) {
        container.innerHTML = `
            <div class="card" style="grid-column: 1 / -1; text-align:center; padding: 40px 20px;">
                <h3>No resources found</h3>
                <p>Try changing your search, resource type or location filter.</p>
            </div>
        `;
        return;
    }

    container.innerHTML = filteredResources
        .map(function (resource) {
            return createResourceCard(resource);
        })
        .join("");
}

/* =====================================================
   3. CREATE RESOURCE CARD
===================================================== */

function createResourceCard(resource) {
    return `
        <div class="resource-card">
            <div class="resource-image">
                ${resource.icon}
            </div>
            <div class="resource-content">
                <h3>${resource.name}</h3>
                <p class="meta">📍 ${resource.location}</p>
                <p class="meta">📦 ${resource.type}</p>
                <p class="meta">👥 Capacity: ${resource.capacity}</p>
                <p class="meta">⏰ ${resource.availability}</p>
                <p class="meta">⭐ ${resource.rating} &nbsp; • &nbsp; ${resource.provider}</p>
                <div class="price">
                    ₹${resource.price.toLocaleString("en-IN")}
                    <small style="font-size:12px; color:#64748b; font-weight:normal;">
                        / ${resource.unit}
                    </small>
                </div>
                <div style="display:flex; justify-content:space-between; align-items:center; gap:8px; margin-top:12px;">
                    ${resource.verified ? `<span class="badge">✓ Verified</span>` : `<span></span>`}
                    <button class="btn" onclick="viewResource(${resource.id})">
                        View Resource
                    </button>
                </div>
            </div>
        </div>
    `;
}

/* =====================================================
   4. VIEW RESOURCE MODAL
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
   5. BOOKING REQUEST FORM IN MODAL
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
}

/* =====================================================
   6. SUBMIT BOOKING
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
   7. MODAL HELPERS
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

const modalElement = document.getElementById("modal");
if (modalElement) {
    modalElement.addEventListener("click", function (event) {
        if (event.target === modalElement) {
            closeModal();
        }
    });
}

/* =====================================================
   8. TOAST NOTIFICATION
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
   9. INITIALIZE
===================================================== */

document.addEventListener("DOMContentLoaded", function () {
    render();
    const modal = document.getElementById("modal");
    if (modal) {
        modal.addEventListener("click", function (event) {
            if (event.target === modal) {
                closeModal();
            }
        });
    }
});

