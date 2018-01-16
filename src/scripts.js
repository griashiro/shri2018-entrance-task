const form = document.getElementById('form')
const dialog = document.getElementById('dialog')
const successMessage = document.getElementById('successMessage')
const deleteMessage = document.getElementById('deleteMessage')
const successDialogTitle = document.getElementById('successDialogTitle')
const createButton = document.getElementById('createButton')
const calendar = document.getElementById('calendar')
const searchResult = document.getElementById('searchResult')
const cloud = document.getElementById('cloud')
const roomslist = document.getElementById('roomslist')
const meeting = document.getElementById('meetings')
const hoursline = document.getElementById('hoursline')
const hours = document.getElementById('hours')

const enableScroll = (() => {
    const body = document.body;
    const html = body.parentNode;
    return function (hasScroll) {
        if (hasScroll) {
            body.style.overflow = 'auto';
            html.style.overflow = 'auto';
        } else {
            body.style.overflow = 'hidden';
            html.style.overflow = 'hidden';
        }
    }
})();

const toggleCalendar = () => {
    calendar.classList.toggle('hidden')
}

const showForm = () => {
    form.classList.remove('hidden')
    createButton.classList.add('hidden')
    enableScroll(false)
}

const showCreateForm = () => {
    showForm()
    form.classList.add('form_create')
}

const showEditForm = () => {
    showForm()
    form.classList.add('form_edit')
}

const closeForm = () => {
    form.classList.add('hidden')
    form.classList.remove('form_create')
    form.classList.remove('form_edit')
    createButton.classList.remove('hidden')
    enableScroll(true)
}

const showSuccessDialog = (text) => {
    successDialogTitle.innerHTML = text
    dialog.classList.remove('hidden')
    successMessage.classList.remove('hidden')
}
const showDeleteDialog = () => {
    dialog.classList.remove('hidden')
    deleteMessage.classList.remove('hidden')
}

const closeDialog = () => {
    dialog.classList.add('hidden')
    successMessage.classList.add('hidden')
    deleteMessage.classList.add('hidden')
}

cloud.classList.remove('hidden')
document.getElementsByClassName('timelines__half-hour')[137].appendChild(cloud)

cloud.addEventListener('click', (e) => {
    e.stopPropagation()
    showEditForm()
})

timelines.addEventListener('click', (e) => {
    showCreateForm() 
})

let timeoutId = null;
meetings.addEventListener("scroll", function() {
    if (timeoutId) clearTimeout(timeoutId);
    timeoutId = setTimeout(snap, 10);
}, true);

function snap() {
    hours.style.left = -meetings.scrollLeft + 'px';
    if (meeting.scrollLeft > 45 && !roomslist.classList.contains('roomslist_scrolled')) {
        roomslist.classList.add('roomslist_scrolled')
    } else if (meeting.scrollLeft < 45 && roomslist.classList.contains('roomslist_scrolled')) {
        roomslist.classList.remove('roomslist_scrolled')
    }
    setTimeout(snap, 10);
}

const timelinesCollection = document.getElementsByClassName('timelines__line');

for (let i = 0, len = timelinesCollection.length; i < len; ++i) {
    timelinesCollection[i].firstElementChild.classList.add('timelines_disabled')
    timelinesCollection[i].lastElementChild.classList.add('timelines_disabled')
}

const addClickEvents = (elemCollection, eventsCallback) => {
    Array.prototype.map.call(elemCollection, (elem) => {
        elem.addEventListener('click', eventsCallback)
    })
}

const onShowSearch = document.getElementsByClassName('onShowSearch');
addClickEvents(onShowSearch, () => {
    searchResult.classList.toggle('hidden')
})

const onShowCalendar = document.getElementsByClassName('onShowCalendar');
addClickEvents(onShowCalendar, () => {
    toggleCalendar()
})

const onShowCreateForm = document.getElementsByClassName('onShowCreateForm');
addClickEvents(onShowCreateForm, () => {
    showCreateForm()
})

const onCloseFormElems = document.getElementsByClassName('onCloseForm');
addClickEvents(onCloseFormElems, () => {
    closeForm()
})

const onShowSuccessDialog = document.getElementsByClassName('onShowSuccessDialog');
addClickEvents(onShowSuccessDialog, () => {
    closeForm()
    showSuccessDialog('Встреча создана!')
})

const onShowSuccessSaveDialog = document.getElementsByClassName('onShowSuccessSaveDialog');
addClickEvents(onShowSuccessSaveDialog, () => {
    closeForm()
    showSuccessDialog('Встреча сохранена!')
})

const onShowDeleteDialog = document.getElementsByClassName('onShowDeleteDialog');
addClickEvents(onShowDeleteDialog, () => {
    showDeleteDialog()
})

const onCloseDialog = document.getElementsByClassName('onCloseDialog');
addClickEvents(onCloseDialog, () => {
    enableScroll(true)
    closeDialog()
})

const onDeleteReject = document.getElementsByClassName('onDeleteReject');
addClickEvents(onDeleteReject, () => {
    enableScroll(false)
    closeDialog()
})

const onDeleteConfirm = document.getElementsByClassName('onDeleteConfirm');
addClickEvents(onDeleteConfirm, () => {
    closeForm()
    closeDialog()
})
