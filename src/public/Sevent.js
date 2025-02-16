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

// Wait for DOM to be fully loaded
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
    // Add your form submission logic here
    const formData = new FormData(eventForm);
    console.log('Form submitted:', Object.fromEntries(formData));
    closeModal();
  });
});

//===================================================================================================================

// Sample event data (this could come from your form submission)
async function fetchAndTransformEvents() {
  const apiUrl = 'http://localhost:5000/api/events/approved';
  const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJqb2huMUBleGFtcGxlLmNvbSIsImlhdCI6MTczOTY5ODAyMCwiZXhwIjoxNzM5NzAxNjIwfQ.4CAkoUgjX74Ab0q8q7X05Gs_1AQlSf1Vz558XJxW70o';

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

    // Transform the data
    const transformedEvents = data.events.map((event, index) => ({
      id: event.id,
      userName: event.created_by ? `User ${event.created_by}` : 'Anonymous',
      location: event.location || 'Unknown Location',
      time: new Date(event.created_at).toLocaleString(), // Format time
      description: event.description || 'No description available',
      image: event.image
        ? `/uploads/events/${event.image}`
        : '/assets/images/default-event.jpg',
      profilePic: '/assets/images/profile-00.jpg',
      tickets: {
        total: event.total_tickets,
        sold: event.total_tickets - event.available_tickets,
        price: 1500, // Default price (adjust if needed)
      },
    }));

    console.log(transformedEvents);
    return transformedEvents;
  } catch (error) {
    console.error('Error fetching events:', error);
  }
}

// Call the function
events = fetchAndTransformEvents();

// Function to create a single event feed
function createEventFeed(event) {
  // Calculate available tickets
  const availableTickets = event.tickets.total - event.tickets.sold;
  const ticketAvailabilityClass =
    availableTickets > 0 ? 'available' : 'sold-out';

  return `
        <div class="memo-feed">
            <div class="head">
                <div class="user">
                    <div class="profile-pic">
                        <img src="${event.profilePic}" alt="" />
                    </div>
                    <div class="info">
                        <h3>${event.userName}</h3>
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
                        <button class="btn btn-purchase" id="ticket-purches-modal" data-event-id="${event.id}">
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

// Function to render all events
function renderEvents() {
  const memoFeedsContainer = document.querySelector('.memo-feeds');
  console.log(memoFeedsContainer);
  memoFeedsContainer.innerHTML = events
    .map((event) => createEventFeed(event))
    .join('');
}

// Handle modal toggles and actions
document.addEventListener('DOMContentLoaded', async () => {
  events = await fetchAndTransformEvents(); // Wait for events to load
  renderEvents(); // Render after data is fetched

  // Handle ellipsis click (show/hide modal)
  document.querySelector('.memo-feeds').addEventListener('click', (e) => {
    if (e.target.classList.contains('uil-ellipsis-v')) {
      const eventId = e.target.dataset.eventId;
      const modal = document.getElementById(`modal-${eventId}`);

      // Close all other open modals first
      document.querySelectorAll('.modal').forEach((m) => {
        if (m !== modal) m.style.display = 'none';
      });

      // Toggle current modal
      modal.style.display = modal.style.display === 'block' ? 'none' : 'block';
    }
  });

  // Handle modal actions (delete/update)
  document.querySelector('.memo-feeds').addEventListener('click', (e) => {
    if (e.target.classList.contains('modal-text')) {
      const action = e.target.dataset.action;
      const eventId = e.target.dataset.eventId;

      if (action === 'delete') {
        // Remove event from array
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
    userName: 'Current User', // Get from your user system
    location: 'Sri Lanka, Kegalle',
    time: 'just now',
    description: eventData.description,
    image: eventData.image, // You'll need to handle image upload
    profilePic: '/assets/images/profile-00.jpg', // Get from user profile
  };

  events.unshift(newEvent); // Add to beginning of array
  renderEvents(); // Re-render all events
}

document.addEventListener('DOMContentLoaded', function () {
  var modalButton = document.getElementById('ticket-purches-modal');
  var purchaseModal = document.getElementById('purchaseModal');
  var cancelButton = document.getElementById('cancelPurchaseBtn');

  // Open modal
  modalButton.addEventListener('click', function () {
    purchaseModal.style.display = 'block';
    console.log(cancelButton);
  });

  // Close modal when clicking the cancel button
  cancelButton.addEventListener('click', function () {
    purchaseModal.style.display = 'none';
  });
});

// Add this JavaScript code to handle comment functionality

document.addEventListener('DOMContentLoaded', function () {
  // Handle comment submission
  document.addEventListener('click', function (e) {
    console.log(e.target.dataset.eventId, 'sssssssssssss');
    if (e.target.matches('.comment-submit')) {
      const eventId = e.target.dataset.eventId;
      const inputElement = document.querySelector(
        `.comment-input[data-event-id="${eventId}"]`,
      );
      const commentText = inputElement.value.trim();

      if (commentText) {
        const comment = {
          id: Date.now(),
          userName: 'Current User', // Replace with actual user name
          profilePic: 'path/to/profile-pic.jpg', // Replace with actual profile pic
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

    // Bearer token
    const token =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJqb2huMUBleGFtcGxlLmNvbSIsImlhdCI6MTczOTY1MjQyNSwiZXhwIjoxNzM5NjU2MDI1fQ.nc1qdkHsa-bYeF0oDOWde284bxUDps88ndEuE1rWqtQ';

    // Get form values
    const title = document.getElementById('eventTitle').value;
    const description = document.getElementById('eventDescription').value;
    const date = document.getElementById('eventDate').value;
    const categoryId = document.getElementById('eventCategory').value;
    const imageFile = document.getElementById('eventImage').files[0];
    const availableTickets = document.getElementById('availableTickets').value;

    console.log(availableTickets), 'availableTickets';
    // Create FormData object for file upload
    const formData = new FormData();

    // Append form data fields separately
    formData.append('title', title);
    formData.append('description', description);
    formData.append('date', date.split('T')[0]);
    formData.append('location', 'New York');
    formData.append('totalTickets', availableTickets);
    formData.append('availableTickets', availableTickets);
    formData.append('categoryId', categoryId);
    formData.append('createdAt', new Date().toISOString()); // Corrected field name
    formData.append('payload', ''); // Keeping this for consistency, adjust if needed

    // Append the image file
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

      // Clear form and close modal
      document.getElementById('eventForm').reset();
      document.getElementById('eventModal').style.display = 'none';
      document.getElementById('selectedFileName').textContent = '';

      // Show success message
      alert('Event created successfully!');
      window.location.reload();
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to create event. Please try again.');
    }
  });

// Handle image upload UI
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
