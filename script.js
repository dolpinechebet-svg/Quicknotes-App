const form = document.getElementById('note-form');
const noteInput = document.getElementById('note-input');
const categorySelect = document.getElementById('category-select');
const notesList = document.getElementById('notes-list');

const notes = [];

function renderNotes() {
  notesList.textContent = '';

  notes.forEach((note, index) => {
    const noteItem = document.createElement('li');
    noteItem.className = 'note-item';

    const noteContent = document.createElement('div');
    noteContent.className = 'note-content';

    const noteText = document.createElement('span');
    noteText.textContent = note.text;

    const noteCategory = document.createElement('span');
    noteCategory.className = 'note-category';
    noteCategory.textContent = note.category;

    noteContent.appendChild(noteText);
    noteContent.appendChild(noteCategory);
    noteItem.appendChild(noteContent);

    const importantLabel = document.createElement('label');
    importantLabel.className = 'important-label';
    importantLabel.textContent = 'Mark as Important';

    const importantCheckbox = document.createElement('input');
    importantCheckbox.type = 'checkbox';
    importantCheckbox.checked = Boolean(note.important);
    importantCheckbox.addEventListener('change', function () {
      note.important = importantCheckbox.checked;
    });

    importantLabel.appendChild(importantCheckbox);
    noteItem.appendChild(importantLabel);

    const deleteButton = document.createElement('button');
    deleteButton.className = 'delete-button';
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', function () {
      notes.splice(index, 1);
      renderNotes();
    });
    noteItem.appendChild(deleteButton);

    notesList.appendChild(noteItem);
  });
}

form.addEventListener('submit', function (event) {
  event.preventDefault();

  const text = noteInput.value.trim();
  if (!text) {
    return;
  }

  const note = {
    id: Date.now(),
    text,
    category: categorySelect.value,
    createdAt: new Date().toLocaleString(),
    important: false
  };

  notes.unshift(note);
  noteInput.value = '';
  renderNotes();
});

renderNotes();
const clearAllBtn = document.querySelector("#clear-all-btn");

clearAllBtn.addEventListener("click", function () {
  if (notes.length === 0) {
    return;
  }
  if (confirm("Delete all notes?")) {
    notes = [];
    saveNotes();
    render();
  }
});







