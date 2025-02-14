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

var ellipsisIcon = document.getElementById('ellipsis-icon');
var modalElement = document.getElementById('modal');

ellipsisIcon.addEventListener('click', function () {
  modalElement.style.display = 'block';
});

//update and delete
window.onload = function () {
  // Get the modal element
  var modalElement = document.getElementById('modal');

  // When the user clicks anywhere outside of the modal, close the modal
  window.onclick = function (event) {
    if (event.target == modalElement) {
      modalElement.style.display = 'none';
    }
  };
};

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
const events = [
  {
    id: 1,
    userName: 'John Doe',
    location: 'Sri Lanka, Kegalle',
    time: 'just now',
    description: 'My first memory',
    image: '/assets/images/feed-1.jpg',
    profilePic: '/assets/images/profile-00.jpg',
    tickets: {
      total: 100, // Total number of tickets
      sold: 45, // Number of tickets sold
      price: 1500, // Price per ticket
    },
  },
  {
    id: 2,
    userName: 'Jane Smith',
    location: 'Sri Lanka, Colombo',
    time: '2 hours ago',
    description: 'Beautiful sunset',
    image: '/assets/images/feed-2.jpg',
    profilePic: '/assets/images/profile-00.jpg',
    tickets: {
      total: 100, // Total number of tickets
      sold: 80, // Number of tickets sold
      price: 1500, // Price per ticket
    },
  },
  // Add more events as needed
];

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
                        <img src="${
                          event.profilePic
                        }" alt="" />                     
                    </div>                     
                    <div class="info">                         
                        <h3>${event.userName}</h3>                         
                        <small>${event.location}, ${
    event.time
  }</small>                     
                    </div>                 
                </div>                 
                <span class="edit">                     
                    <i class="uil uil-ellipsis-v" data-event-id="${
                      event.id
                    }"></i>                     
                    <div id="modal-${
                      event.id
                    }" class="modal">                         
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
                    <button class="btn btn-purchase" data-event-id="${event.id}">
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
        </div>     
    `;
}

// Function to render all events
function renderEvents() {
  const memoFeedsContainer = document.querySelector('.memo-feeds');
  memoFeedsContainer.innerHTML = events
    .map((event) => createEventFeed(event))
    .join('');
}

// Handle modal toggles and actions
document.addEventListener('DOMContentLoaded', () => {
  renderEvents();

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
        const index = events.findIndex(
          (event) => event.id === parseInt(eventId),
        );
        if (index !== -1) {
          events.splice(index, 1);
          renderEvents();
        }
      } else if (action === 'update') {
        // Handle update logic
        console.log('Update event:', eventId);
        // You can open your update modal here
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
