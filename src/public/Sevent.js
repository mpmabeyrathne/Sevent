//----------Signup--------------
const form = document.querySelectorAll('.forms'),
  pwShowHide = document.querySelectorAll('.eye-icon'),
  links = document.querySelectorAll('.elink');
// ------------Side Bar-----------------
const leftsideItems = document.querySelectorAll('.leftside-item');

const createGroupBtn = document.getElementById('create-group-btn');
const createGroupContainer = document.getElementById('create-group-container');
const closeBtn = document.querySelector('.close-btn');

//-------------Theme------------
const theme = document.querySelector('#theme');
const themeModal = document.querySelector('.customize-theme');
const fontSize = document.querySelectorAll('.choose-size span');
var root = document.querySelector(':root');
const colorPalette = document.querySelectorAll('.theme-color span');
const Background_color1 = document.querySelector('.background-color-1');
const Background_color2 = document.querySelector('.background-color-2');

//-----------signup--------------
pwShowHide.forEach((eyeIcon) => {
  eyeIcon.addEventListener('click', () => {
    let pwFields =
      eyeIcon.parentElement.parentElement.querySelectorAll('.password');
    pwFields.forEach((password) => {
      if (password.type === 'password') {
        password.type = 'text';
        eyeIcon.classList.replace('bx-hide', 'bx-show');
        return;
      }
      password.type = 'password';
      eyeIcon.classList.replace('bx-show', 'bx-hide');
    });
  });
});

links.forEach((link) => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    form.forEach((form) => form.classList.toggle('show-signup'));
  });
});

//----------remove active class from all menu items-------
const changerActiveItem = () => {
  leftsideItems.forEach((item) => {
    item.classList.remove('select');
  });
};

leftsideItems.forEach((item) => {
  item.addEventListener('click', () => {
    changerActiveItem();
    item.classList.add('select');

    if (item.id != 'notification') {
      document.querySelector('.notification-pop-up').style.display = 'none';
    } else {
      document.querySelector('.notification-pop-up').style.display = 'block';

      document.querySelector('#notification .notifi-count').style.display =
        'none';
    }
  });
});

//-------------Theme Customization-----------------

//open modal
const openThemeModal = () => {
  themeModal.style.display = 'grid';
};

//close modal
const closeThemeModal = (e) => {
  if (e.target.classList.contains('customize-theme')) {
    themeModal.style.display = 'none';
  }
};

themeModal.addEventListener('click', closeThemeModal);

theme.addEventListener('click', openThemeModal);

//--------font Size----------

//----------remove active class from span-------

const removeSizeSelector = () => {
  fontSize.forEach((size) => {
    size.classList.remove('select');
  });
};

fontSize.forEach((size) => {
  size.addEventListener('click', () => {
    removeSizeSelector();
    let fontSize;
    size.classList.toggle('select');

    if (size.classList.contains('font-size-1')) {
      fontSize = '10px';
      root.style.setProperty('--sticky-top: 5.4rem', '5.4rem');
    } else if (size.classList.contains('font-size-2')) {
      fontSize = '13px';
      root.style.setProperty('--sticky-top: 5.4rem', '5.4rem');
    } else if (size.classList.contains('font-size-3')) {
      fontSize = '16px';
      root.style.setProperty('--sticky-top: 5.4rem', '-2rem');
    } else if (size.classList.contains('font-size-4')) {
      fontSize = '19px';
      root.style.setProperty('--sticky-top: 5.4rem', '-5rem');
    } else if (size.classList.contains('font-size-5')) {
      fontSize = '22px';
      root.style.setProperty('--sticky-top: 5.4rem', '-12rem');
    }

    document.querySelector('html').style.fontSize = fontSize;
  });
});

//----------remove active class from color-------
const changeActiveColorClass = () => {
  colorPalette.forEach((colorPicker) => {
    colorPicker.classList.remove('select');
  });
};

//----------Change Color----------

colorPalette.forEach((color) => {
  color.addEventListener('click', () => {
    let primary;
    changeActiveColorClass();

    if (color.classList.contains('theme-1')) {
      primaryHue = 252;
      color.classList.add('select');
    } else if (color.classList.contains('theme-2')) {
      primaryHue = 52;
    } else if (color.classList.contains('theme-3')) {
      primaryHue = 352;
    } else if (color.classList.contains('theme-4')) {
      primaryHue = 152;
    } else if (color.classList.contains('theme-5')) {
      primaryHue = 202;
    }
    color.classList.add('select');

    root.style.setProperty('--primary-color-hue', primaryHue);
  });
});

//------------change background theme----------

let lightColorLightness;
let whiteColorLightness;
let darkColorLightness;

//-----changes background color
const changeBackground_color = () => {
  root.style.setProperty('--light-color-lightness', lightColorLightness);
  root.style.setProperty('--white-color-lightness', whiteColorLightness);
  root.style.setProperty('--dark-color-lightness', darkColorLightness);
};

//change background color
Background_color1.addEventListener('click', () => {
  lightColorLightness = '95%';
  whiteColorLightness = '100%';
  darkColorLightness = '0%';
  //add active class
  Background_color1.classList.add('select');

  //remove avtive class from Others
  Background_color2.classList.remove('select');
  changeBackground_color();
  //remove customized changes from local storage
  // window.location.reload();
});

Background_color2.addEventListener('click', () => {
  lightColorLightness = '15%';
  whiteColorLightness = '20%';
  darkColorLightness = '95%';

  //add active class
  Background_color2.classList.add('select');
  //remove avtive class from Others
  Background_color1.classList.remove('select');

  changeBackground_color();
});

//Open event modal
document.addEventListener('DOMContentLoaded', () => {
  const eventModal = document.getElementById('eventModal');
  const createBtn = document.getElementById('create-event-btn');
  const closeBtn = document.querySelector('.close-btn');
  const cancelBtn = document.getElementById('cancelBtn');
  const imageUploadArea = document.getElementById('imageUploadArea');
  const imageInput = document.getElementById('eventImage');
  const selectedFileName = document.getElementById('selectedFileName');
  const eventForm = document.getElementById('eventForm');

  // Open modal
  console.log(createBtn);
  createBtn.addEventListener('click', () => {
    eventModal.style.display = 'block';
    console.log(eventModal);
  });

  // Close modal
  function closeModal() {
    eventModal.style.display = 'none';
    eventForm.reset();
    selectedFileName.textContent = '';
  }

  closeBtn.addEventListener('click', closeModal);
  cancelBtn.addEventListener('click', closeModal);

  // Close modal when clicking outside
  window.addEventListener('click', (e) => {
    if (e.target === eventModal) {
      closeModal();
    }
  });

  // Handle image upload
  imageUploadArea.addEventListener('click', () => {
    imageInput.click();
  });

  imageInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
      selectedFileName.textContent = `Selected: ${file.name}`;
    }
  });

  // Handle drag and drop
  imageUploadArea.addEventListener('dragover', (e) => {
    e.preventDefault();
    imageUploadArea.style.borderColor =
      'hsl(var(--primary-color-hue), 75%, 60%)';
  });

  imageUploadArea.addEventListener('dragleave', (e) => {
    e.preventDefault();
    imageUploadArea.style.borderColor = 'hsl(252, 30%, 30%)';
  });

  imageUploadArea.addEventListener('drop', (e) => {
    e.preventDefault();
    imageUploadArea.style.borderColor = 'hsl(252, 30%, 30%)';
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      imageInput.files = e.dataTransfer.files;
      selectedFileName.textContent = `Selected: ${file.name}`;
    }
  });

  // Handle form submission
  eventForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(eventForm);
    console.log('Form submitted:', Object.fromEntries(formData));
    closeModal();
  });
});

//===================================================================================================================

// Sample event data (this could come from your form submission)
async function fetchAndTransformEvents() {
  const apiUrl = 'http://localhost:5000/api/events/approved';
  const token = localStorage.getItem('token');
  try {
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch events');
    }

    const data = await response.json();

    const transformedEvents = data.events.map((event, index) => ({
      id: event.id,
      title: event.title || '',
      userName: event.created_by ? `User ${event.created_by}` : 'Anonymous',
      location: event.location || 'Unknown Location',
      time: new Date(event.created_at).toLocaleString(),
      description: event.description || 'No description available',
      image: event.image
        ? `/uploads/events/${event.image}`
        : '/assets/images/default-event.jpg',
      profilePic: '/assets/images/profile_image.png',
      tickets: {
        total: event.total_tickets,
        sold: event.total_tickets - event.available_tickets,
        price: 1500,
      },
      creator_name: event.creator_name,
      creator_image: event.creator_image,
    }));

    console.log(transformedEvents);
    return transformedEvents;
  } catch (error) {
    console.error('Error fetching events:', error);
  }
}

events = fetchAndTransformEvents();

// Function to create a single event feed
function createEventFeed(event) {
  const availableTickets = event.tickets.total - event.tickets.sold;
  const ticketAvailabilityClass =
    availableTickets > 0 ? 'available' : 'sold-out';
  return `
        <div class="memo-feed">
            <div class="head">
                <div class="user">
                    <div class="profile-pic">
                        <img src="uploads/p_image/${
                          event.creator_image
                        }" alt="" />
                    </div>
                    <div class="info">
                        <h3>${event.creator_name}</h3>
                        <small>${event.location}, ${event.time}</small>
                    </div>
                </div>
                <span class="edit">
                    <i class="uil uil-ellipsis-v" data-event-id="${
                      event.id
                    }"></i>
                    <div id="modal-${event.id}" class="modal">
                        <div class="modal-content">
                            <div class="modal-body">
                                <p class="modal-text" data-action="delete" data-event-id="${
                                  event.id
                                }">Delete</p>
                                <p class="modal-text" data-action="update" data-event-id="${
                                  event.id
                                }">Update</p>
                            </div>
                        </div>
                    </div>
                </span>
            </div>
            <p>${event.description}</p>
            <div class="feed-photo">
                <img src="${event.image}" alt="" />
            </div>
            <!-- Ticket Section -->
            <div class="ticket-section">
                <div class="ticket-info">
                    <div class="ticket-status ${ticketAvailabilityClass}">
                        <span class="tickets-left">${availableTickets} tickets left</span>
                        <span class="ticket-price">Rs. ${
                          event.tickets.price
                        }</span>
                    </div>
                    <div class="ticket-progress">
                        <div class="progress-bar" style="width: ${
                          (event.tickets.sold / event.tickets.total) * 100
                        }%"></div>
                    </div>
                </div>
                ${
                  availableTickets > 0
                    ? `
                        <button class="btn btn-purchase " data-title=${encodeURIComponent(
                          event.title,
                        )}  data-price=${
                        event.tickets.price
                      } id="ticket-purches-modal" data-event-id="${event.id}">
                            Book Ticket
                        </button>
                    `
                    : `
                        <button class="btn btn-sold-out" disabled>
                            Sold Out
                        </button>
                    `
                }
            </div>
            <!-- Comment Section -->
            <div class="comment-section">
                <div class="comment-stats">
                    <i class="uil uil-comment"></i>
                    <span class="comment-count">0 Comments</span>
                </div>
                <div class="comment-form">
                    <div class="profile-pic">
                        <img src="${event.profilePic}" alt="" />
                    </div>
                    <div class="comment-input-wrapper">
                        <input type="text" placeholder="Write a comment..." class="comment-input" data-event-id="${
                          event.id
                        }">
                        <button class="comment-submit" data-event-id="${
                          event.id
                        }">
                            <i class="uil uil-message"></i>
                        </button>
                    </div>
                </div>
                <div class="comments-container" id="comments-${event.id}">
                    <!-- Comments will be dynamically added here -->
                </div>
            </div>
        </div>
    `;
}

// Function to create a comment element
function createCommentElement(comment) {
  return `
        <div class="comment" data-comment-id="${comment.id}">
            <div class="profile-pic">
                <img src="${comment.profilePic}" alt="" />
            </div>
            <div class="comment-content">
                <div class="comment-header">
                    <h4>${comment.userName}</h4>
                    <small>${comment.timestamp}</small>
                </div>
                <p>${comment.text}</p>
                <div class="comment-actions">
                    <button class="like-btn" data-comment-id="${comment.id}">
                        <i class="uil uil-heart"></i>
                        <span class="like-count">${comment.likes}</span>
                    </button>
                    <button class="reply-btn" data-comment-id="${comment.id}">
                        <i class="uil uil-comment"></i>
                        Reply
                    </button>
                </div>
            </div>
        </div>
    `;
}

window.globalEvents = [];
window.events = [];

function formatEventData(event) {
    const soldTickets = event.tickets?.sold || (event.total_tickets - event.available_tickets);
    const eventDate = event.time ? new Date(event.time) : new Date(event.date);
    const formattedTime = eventDate.toLocaleString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });

    return {
        id: event.id,
        creator_name: event.creator_name || event.title,
        creator_image: event.creator_image || 'default-profile.jpg',
        location: event.location,
        time: formattedTime,
        description: event.description,
        image: event.image?.startsWith('/') ? event.image : `/uploads/events/${event.image}`,
        profilePic: event.profilePic || '/assets/images/profile_image.png',
        tickets: {
            total: event.tickets?.total || event.total_tickets,
            sold: soldTickets,
            price: event.tickets?.price || 1000
        }
    };
}
// Function to render all events
function renderEvents() {
  const memoFeedsContainer = document.querySelector('.memo-feeds');

  try {
      if (window.globalEvents && window.globalEvents.length > 0) {
          const formattedEvents = window.globalEvents.map(event => formatEventData(event));
          memoFeedsContainer.innerHTML = formattedEvents
              .map(event => createEventFeed(event))
              .join('');
      } else {
          if (!window.events || window.events.length === 0) {
              window.events = fetchAndTransformEvents();  
          }

          if (window.events && window.events.length > 0) {
              memoFeedsContainer.innerHTML = window.events
                  .map(event => createEventFeed(formatEventData(event)))
                  .join('');
          } else {
              memoFeedsContainer.innerHTML = '<p class="no-events">No events available</p>';
          }
      }

      addEventListeners();
      setupModal(); 
  } catch (error) {
      console.error('Error rendering events:', error);
      memoFeedsContainer.innerHTML = '<p class="error">Error loading events. Please try again later.</p>';
  }
}

function eventDataFe(categoryId) {
    const token = localStorage.getItem('token');

    $.ajax({
        url: `http://localhost:5000/api/events/category/${categoryId}`,
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        },
        success: function(response) {
            window.globalEvents = response.events;
            renderEvents();
        },
        error: function(xhr, status, error) {
            console.error('Error:', error);
        }
    });
}

function addEventListeners() {
    document.querySelectorAll('.uil-ellipsis-v').forEach(element => {
        element.addEventListener('click', function(e) {
            const eventId = this.getAttribute('data-event-id');
            const modal = document.getElementById(`modal-${eventId}`);
            if (modal) {
                modal.style.display = modal.style.display === 'block' ? 'none' : 'block';
            }
        });
    });

    document.querySelectorAll('.btn-purchase').forEach(button => {
        button.addEventListener('click', function(e) {
            const eventId = this.getAttribute('data-event-id');
            console.log(eventId);
        });
    });

    document.querySelectorAll('.comment-submit').forEach(button => {
        button.addEventListener('click', function(e) {
            const eventId = this.getAttribute('data-event-id');
            const inputElement = document.querySelector(`.comment-input[data-event-id="${eventId}"]`);
            if (inputElement && inputElement.value.trim()) {
                console.log('Submit comment for event:', eventId, 'Comment:', inputElement.value);
                inputElement.value = '';
            }
        });
    });

}

document.addEventListener('DOMContentLoaded', async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const categoryId = urlParams.get('category');
    
    if (categoryId) {
        eventDataFe(categoryId);
    } else {
        await renderEvents();
    }

    document.querySelector('.memo-feeds').addEventListener('click', (e) => {
        if (e.target.classList.contains('uil-ellipsis-v')) {
            const eventId = e.target.dataset.eventId;
            const modal = document.getElementById(`modal-${eventId}`);

            document.querySelectorAll('.modal').forEach((m) => {
                if (m !== modal) m.style.display = 'none';
            });

            modal.style.display = modal.style.display === 'block' ? 'none' : 'block';
        }
    });

    document.querySelector('.memo-feeds').addEventListener('click', (e) => {
        if (e.target.classList.contains('modal-text')) {
            const action = e.target.dataset.action;
            const eventId = e.target.dataset.eventId;

            if (action === 'delete') {
                window.events = window.events.filter((event) => event.id !== parseInt(eventId));
                renderEvents();
            } else if (action === 'update') {
                console.log(eventId);
            }
        }
    });

    window.addEventListener('click', (e) => {
        if (!e.target.classList.contains('uil-ellipsis-v')) {
            document.querySelectorAll('.modal').forEach((modal) => {
                modal.style.display = 'none';
            });
        }
    });
});
// Handle modal toggles and actions
document.addEventListener('DOMContentLoaded', async () => {
  events = await fetchAndTransformEvents();
  renderEvents();

  document.querySelector('.memo-feeds').addEventListener('click', (e) => {
    if (e.target.classList.contains('uil-ellipsis-v')) {
      const eventId = e.target.dataset.eventId;
      const modal = document.getElementById(`modal-${eventId}`);

      document.querySelectorAll('.modal').forEach((m) => {
        if (m !== modal) m.style.display = 'none';
      });

      modal.style.display = modal.style.display === 'block' ? 'none' : 'block';
    }
  });

  // Handle modal actions (delete/update)
  document.querySelector('.memo-feeds').addEventListener('click', (e) => {
    if (e.target.classList.contains('modal-text')) {
      const action = e.target.dataset.action;
      const eventId = e.target.dataset.eventId;

      if (action === 'delete') {
        events = events.filter((event) => event.id !== parseInt(eventId));
        renderEvents();
      } else if (action === 'update') {
        console.log('Update event:', eventId);
      }
    }
  });

  // Close modals when clicking outside
  window.addEventListener('click', (e) => {
    if (!e.target.classList.contains('uil-ellipsis-v')) {
      document.querySelectorAll('.modal').forEach((modal) => {
        modal.style.display = 'none';
      });
    }
  });
});

// When creating a new event (from your event creation form)
function addNewEvent(eventData) {
  const newEvent = {
    id: events.length + 1,
    userName: 'Current User',
    location: 'Sri Lanka, Kegalle',
    time: 'just now',
    description: eventData.description,
    image: eventData.image,
    profilePic: '/assets/images/profile_image.png',
  };

  events.unshift(newEvent);
  renderEvents();
}

function setupModal() {
  // Use document.querySelectorAll to get all ticket purchase buttons
  const modalButtons = document.querySelectorAll('[id="ticket-purches-modal"]');
  const purchaseModal = document.getElementById('purchaseModal');
  const eventNameEl = document.getElementById('eventName');
  const ticketPriceEl = document.getElementById('ticketPrice');
  const totalPriceEl = document.getElementById('totalPrice');
  const quantityInput = document.getElementById('ticketQuantity');
  const cancelButton = document.getElementById('cancelPurchaseBtn');
  const confirmButton = document.querySelector('.btn-confirm');

  // Add click event to all purchase buttons
  modalButtons.forEach((button) => {
    button.addEventListener('click', function () {
      const title = decodeURIComponent(this.getAttribute('data-title'));
      const price = parseFloat(this.getAttribute('data-price'));
      const eventId = this.getAttribute('data-event-id');

      // Set modal content
      eventNameEl.innerText = title;
      ticketPriceEl.innerText = price.toFixed(2);
      totalPriceEl.innerText = price.toFixed(2); // Default total for 1 ticket

      // Store current event ID if needed for purchase confirmation
      purchaseModal.setAttribute('data-current-event', eventId);

      // Reset quantity to 1 when opening modal
      quantityInput.value = 1;

      // Update total when quantity changes
      updateTotal(price);

      // Display the modal
      purchaseModal.style.display = 'flex';
    });
  });

  // Function to update total price
  function updateTotal(price) {
    quantityInput.addEventListener('input', function () {
      const quantity = parseInt(this.value) || 1;
      // Limit quantity to min/max attributes
      if (quantity < 1) this.value = 1;
      if (quantity > 10) this.value = 10;

      const calculatedTotal = (
        parseFloat(price) * parseInt(this.value)
      ).toFixed(2);
      totalPriceEl.innerText = calculatedTotal;
    });
  }

  // Close modal on cancel
  cancelButton.addEventListener('click', function () {
    purchaseModal.style.display = 'none';
  });

  // Handle purchase confirmation
  confirmButton.addEventListener('click', function () {
    const eventId = purchaseModal.getAttribute('data-current-event');
    const quantity = parseInt(quantityInput.value);

    purchaseModal.style.display = 'none';

    const tokenForPurches = localStorage.getItem('token');

    fetch('http://localhost:5000/api/tickets/book', {
      method: 'POST', // Specify the request method
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${tokenForPurches}`, // If authentication is required
      },
      body: JSON.stringify({
        eventId: eventId,
        ticketsBooked: quantity,
      }),
    })
      .then((response) => response.json()) // Convert response to JSON
      .then((data) => {
        alert('Booking successful:', data);
      })
      .catch((error) => {
        console.error('Error booking ticket:', error);
      });
  });

  window.addEventListener('click', function (event) {
    if (event.target === purchaseModal) {
      purchaseModal.style.display = 'none';
    }
  });
}
document.addEventListener('DOMContentLoaded', function () {
  const adminBtn = document.getElementById('admin-btn');
  const createPostBtn = document.getElementById('create-event-btn');
  const userRoleForAdmin = localStorage.getItem('role');
  if (adminBtn && userRoleForAdmin === 'admin') {
    adminBtn.style.display = 'inline-block';
    createPostBtn.style.display = 'inline-block';
  }

  // Handle comment submission
  document.addEventListener('click', function (e) {
    if (e.target.matches('.comment-submit')) {
      const eventId = e.target.dataset.eventId;
      const inputElement = document.querySelector(
        `.comment-input[data-event-id="${eventId}"]`,
      );
      const commentText = inputElement.value.trim();

      if (commentText) {
        const comment = {
          id: Date.now(),
          userName: 'Current User',
          profilePic: 'path/to/profile-pic.jpg',
          text: commentText,
          timestamp: new Date().toLocaleString(),
          likes: 0,
        };

        const commentsContainer = document.querySelector(
          `#comments-${eventId}`,
        );
        commentsContainer.insertAdjacentHTML(
          'afterbegin',
          createCommentElement(comment),
        );

        // Update comment count
        const commentCount = document.querySelector(`#comments-${eventId}`)
          .children.length;
        const countElement = e.target
          .closest('.comment-section')
          .querySelector('.comment-count');
        countElement.textContent = `${commentCount} Comments`;

        // Clear input
        inputElement.value = '';
      }
    }
  });

  // Handle like button clicks
  document.addEventListener('click', function (e) {
    if (e.target.closest('.like-btn')) {
      const likeBtn = e.target.closest('.like-btn');
      const likeCount = likeBtn.querySelector('.like-count');
      likeCount.textContent = parseInt(likeCount.textContent) + 1;
    }
  });
});

document
  .getElementById('eventForm')
  .addEventListener('submit', async function (e) {
    e.preventDefault();

    const token = localStorage.getItem('token');

    const title = document.getElementById('eventTitle').value;
    const description = document.getElementById('eventDescription').value;
    const date = document.getElementById('eventDate').value;
    const categoryId = document.getElementById('eventCategory').value;
    const imageFile = document.getElementById('eventImage').files[0];
    const availableTickets = document.getElementById('availableTickets').value;

    const formData = new FormData();

    formData.append('title', title);
    formData.append('description', description);
    formData.append('date', date.split('T')[0]);
    formData.append('location', 'Horizon');
    formData.append('totalTickets', availableTickets);
    formData.append('availableTickets', availableTickets);
    formData.append('categoryId', categoryId);
    formData.append('createdAt', new Date().toISOString());
    formData.append('payload', '');

    if (imageFile) {
      formData.append('image', imageFile);
    }

    try {
      const response = await fetch('http://localhost:5000/api/events/create', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Success:', data);

      document.getElementById('eventForm').reset();
      document.getElementById('eventModal').style.display = 'none';
      document.getElementById('selectedFileName').textContent = '';

      alert('Event created successfully!');
      window.location.reload();
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to create event. Please try again.');
    }
  });

document.getElementById('imageUploadArea').addEventListener('click', () => {
  document.getElementById('eventImage').click();
});

document.getElementById('eventImage').addEventListener('change', (e) => {
  const fileName = e.target.files[0]?.name;
  if (fileName) {
    document.getElementById('selectedFileName').textContent = fileName;
  }
});

// Handle cancel button
document.getElementById('cancelBtn').addEventListener('click', () => {
  document.getElementById('eventForm').reset();
  document.getElementById('selectedFileName').textContent = '';
  document.getElementById('eventModal').style.display = 'none';
});

// Handle close button
document.querySelector('.close-btn').addEventListener('click', () => {
  document.getElementById('eventForm').reset();
  document.getElementById('selectedFileName').textContent = '';
  document.getElementById('eventModal').style.display = 'none';
});

// Function to open the modal and set user values
function openEditModal(user) {
  const modal = document.getElementById('editUserModal');
  modal.style.display = 'flex';

  // Set form values
  document.getElementById('editUserId').value = user.id;
  document.getElementById('editName').value = user.name;
  document.getElementById('editEmail').value = user.email;
  document.getElementById('editPassword').value = '';

  // Set profile image if exists
  const imagePreview = document.getElementById('profileImagePreview');
  if (user.profile_image) {
    imagePreview.src = `/uploads/profiles/${user.profile_image}`;
  } else {
    imagePreview.src = '/api/placeholder/150/150';
  }

  modal.classList.add('active');
}

// Function to close the modal
function closeModal() {
  const modal = document.getElementById('editUserModal');
  modal.style.display = 'none';
}

// Function to preview the selected image
function handleImagePreview(event) {
  const imagePreview = document.getElementById('profileImagePreview');
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      imagePreview.src = e.target.result;
    };
    reader.readAsDataURL(file);
  }
}

// Function to remove the profile image
function removeProfileImage() {
  const imagePreview = document.getElementById('profileImagePreview');
  imagePreview.src = '/api/placeholder/150/150';
}

const username = localStorage.getItem('name');
const profileImage = localStorage.getItem('p_image');

if (username) {
  document.getElementById('LOGIN_USERNAME').textContent = username;
}

if (profileImage) {
  document.getElementById(
    'profileImage',
  ).src = `/uploads/p_image/${profileImage}`;
}

async function saveChanges() {
  const userId = localStorage.getItem('user_id');
  const name = document.getElementById('editName').value.trim();
  const email = document.getElementById('editEmail').value.trim();
  const password = document.getElementById('editPassword').value.trim();
  const profileImage = document.getElementById('profileImageEdit').files[0];

  const formData = new FormData();
  formData.append('name', name);
  formData.append('email', email);
  if (password) {
    formData.append('password', password);
  }
  if (profileImage) {
    formData.append('image', profileImage);
  }

  const token = localStorage.getItem('token');

  try {
    const response = await fetch(
      `http://localhost:5000/api/auth/user/${userId}`,
      {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      },
    );

    const data = await response.json();

    if (response.ok) {
      localStorage.setItem('name', data.user.name);
      localStorage.setItem('name', data.user.name);
      localStorage.setItem('email', data.user.email);
      localStorage.setItem('p_image', data.user.p_image);
      alert('User updated successfully!');
      closeModal();
      window.location.reload();
      // Optionally reload user data
    } else {
      alert(data.message || 'Failed to update user');
    }
  } catch (error) {
    console.error('Error updating user:', error);
    alert('Something went wrong');
  }
}

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++ webscoket ++++++++++++++++++++++

// Client-side notification handling (your frontend JS file)
const socket = io('http://localhost:5000'); // Connect to the server

// Track the notification count
let notificationCount = 0;

// Function to update the notification count
const updateNotificationCount = (count) => {
  const notificationCountElement = document.querySelector('.notifi-count');
  if (notificationCountElement) {
    notificationCountElement.textContent = count > 0 ? `${count}` : '';
    if (count > 0) {
      notificationCountElement.style.display = 'flex';
    } else {
      notificationCountElement.style.display = 'none';
    }
  }
};

// Function to display notifications

// Listen for new event notifications
socket.on('newEventNotification', (data) => {
  notificationCount++;

  const userRole = localStorage.getItem('role');
  if (userRole === 'admin') {
    updateNotificationCount(notificationCount);
    displayMessage(
      `A new event has been announced. please approve it!`,
      data.event.id,
    );
  }
});

socket.on('newApprovedEventNotification', (data) => {
  notificationCount++;
  updateNotificationCount(notificationCount);
  displayMessage(`A new event has been announced.`, data.event.id);
});

// Toggle notification panel
document.getElementById('notification').addEventListener('click', function (e) {
  const notificationsPanel = document.getElementById('notifications');
  if (notificationsPanel) {
    notificationsPanel.classList.toggle('show-notifications');

    // Only reset notification count if the panel is being opened
    if (notificationsPanel.classList.contains('show-notifications')) {
      notificationCount = 0;
      updateNotificationCount(notificationCount);
    }

    // Prevent the click from propagating to the document
    e.stopPropagation();
  }
});

// Close notification panel when clicking outside
document.addEventListener('click', function (e) {
  const notificationsPanel = document.getElementById('notifications');
  const notificationButton = document.getElementById('notification');

  if (
    notificationsPanel &&
    notificationsPanel.classList.contains('show-notifications') &&
    !notificationButton.contains(e.target) &&
    !notificationsPanel.contains(e.target)
  ) {
    notificationsPanel.classList.remove('show-notifications');
  }
});

// Add these additional functions to your client-side code

// Function to initialize the notification panel
const initializeNotifications = () => {
  // Add clear all functionality
  const clearAllButton = document.querySelector('.clear-all');
  if (clearAllButton) {
    clearAllButton.addEventListener('click', (e) => {
      e.stopPropagation();
      clearAllNotifications();
    });
  }

  // Check if there are any stored notifications
  loadNotificationsFromStorage();
};

// Function to clear all notifications
const clearAllNotifications = () => {
  const notificationList = document.getElementById('notification-list');
  if (notificationList) {
    // Remove all notifications except the "no notifications" message
    while (notificationList.firstChild) {
      notificationList.removeChild(notificationList.firstChild);
    }

    // Add the "no notifications" message back
    const noNotificationsMessage = document.createElement('div');
    noNotificationsMessage.classList.add('no-notifications');
    noNotificationsMessage.textContent = 'No notifications yet';
    notificationList.appendChild(noNotificationsMessage);

    // Reset notification count
    notificationCount = 0;
    updateNotificationCount(notificationCount);

    // Clear from local storage
    localStorage.removeItem('notifications');
  }
};

// Function to display notification with improved UI
const displayMessage = (message, eventId) => {
  const notificationList = document.getElementById('notification-list');
  if (!notificationList) return;

  // Remove "no notifications" message if present
  const noNotificationsMessage =
    notificationList.querySelector('.no-notifications');
  if (noNotificationsMessage) {
    notificationList.removeChild(noNotificationsMessage);
  }

  const notificationElement = document.createElement('div');
  notificationElement.classList.add('notification-item');
  notificationElement.dataset.eventId = eventId;

  const timestamp = new Date().toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });
  const today = new Date().toLocaleDateString([], {
    month: 'short',
    day: 'numeric',
  });

  notificationElement.innerHTML = `
    <div class="notification-content">
      <div class="profile-pic">
        <img src="/assets/images/profile-1.jpg" alt="User Profile" />
      </div>
      <div class="notification-body">
        <b>System Notification</b>
        <p>${message}</p>
        <small class="text-muted">${today} at ${timestamp}</small>
      </div>
    </div>
  `;

  notificationList.prepend(notificationElement); // Add new notifications at the top

  // Save notifications to local storage
  saveNotificationsToStorage();
};

// Function to save notifications to local storage
const saveNotificationsToStorage = () => {
  const notificationList = document.getElementById('notification-list');
  if (!notificationList) return;

  const notifications = [];
  notificationList.querySelectorAll('.notification-item').forEach((item) => {
    const message = item.querySelector('p').textContent;
    const timestamp = item.querySelector('.text-muted').textContent;
    const eventId = item.dataset.eventId;

    notifications.push({ message, timestamp, eventId });
  });

  localStorage.setItem('notifications', JSON.stringify(notifications));
};

// Function to load notifications from local storage
const loadNotificationsFromStorage = () => {
  const storedNotifications = localStorage.getItem('notifications');

  if (storedNotifications) {
    const notifications = JSON.parse(storedNotifications);
    const notificationList = document.getElementById('notification-list');

    if (notificationList && notifications.length > 0) {
      // Clear existing content
      notificationList.innerHTML = '';

      // Add stored notifications
      notifications.forEach((notification) => {
        const notificationElement = document.createElement('div');
        notificationElement.classList.add('notification-item');
        notificationElement.dataset.eventId = notification.eventId;

        notificationElement.innerHTML = `
          <div class="notification-content">
            <div class="profile-pic">
              <img src="/assets/images/profile-1.jpg" alt="User Profile" />
            </div>
            <div class="notification-body">
              <b>System Notification</b>
              <p>${notification.message}</p>
              <small class="text-muted">${notification.timestamp}</small>
            </div>
          </div>
        `;

        notificationList.appendChild(notificationElement);
      });
    }
  }
};

// Initialize notifications when document is ready
document.addEventListener('DOMContentLoaded', initializeNotifications);

function signOut() {
  localStorage.clear();
  window.location.href = '/login.html';
}

function redirectToLogin() {
  const username = localStorage.getItem('name');
  const email = localStorage.getItem('email');
  const userId = localStorage.getItem('user_id');

  if (!username || !email || !userId) {
    window.location.href = '/login.html';
  }
}

redirectToLogin();
