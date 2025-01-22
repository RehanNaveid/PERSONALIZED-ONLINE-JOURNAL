

    const hamburgerMenu = document.getElementById('hamburger-menu');
    const naLinks = document.getElementById('nav-links');

    hamburgerMenu.addEventListener('click', () => {
        naLinks.classList.toggle('show');
    });
    // Initial setup to show the first section by default
    showSection('home-section');

    function showSection(sectionId) {
        // Hide all sections
        const sections = document.querySelectorAll('.content-section');
        sections.forEach(section => {
            section.style.display = 'none';
        });

        // Show the selected section
        const sectionToShow = document.getElementById(sectionId);
        sectionToShow.style.display = 'block';
    }

    // Add event listeners to the navigation links
    const navLinks = document.querySelectorAll('nav ul li a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            // Prevent the default action of the anchor tag
           // event.preventDefault();

            // Get the target section ID from the data-target attribute
            const targetSection = this.getAttribute('data-target');

            // Show the target section
            showSection(targetSection);
        });
    });

    // Function to save notes entry
    function saveNote() {
        const title = document.querySelector('#journal-form input[type="text"]').value;
        const date = document.getElementById('entry-date').value;
        const content = document.getElementById('entry-content').value;

        if (title && date && content) {
            const note = {title,date,content};

            let notes = localStorage.getItem('notesEntries');
            notes = notes ? JSON.parse(notes) : [];
            notes.push(note);
            localStorage.setItem('notesEntries', JSON.stringify(notes));
        }
    }

    // Function to generate a light shaded orange color
    function getRandomPastelColor() {
        return 'lightgrey'; // Light orange shade
    }

    // Function to display notes
    function displayNotes() {
        const notesContainer = document.getElementById('note-entries');
        notesContainer.innerHTML = '';
        const notes = JSON.parse(localStorage.getItem('notesEntries')) || [];

        notes.forEach((note, index) => {
            const noteDiv = document.createElement('div');
            noteDiv.classList.add('note-entry');
            noteDiv.style.backgroundColor = getRandomPastelColor();

            const noteHeader = document.createElement('div');
            noteHeader.classList.add('note-header');

            const noteTitle = document.createElement('h3');
            noteTitle.classList.add('note-title');
            noteTitle.textContent = note.title;

            const deleteButton = document.createElement('button');
            deleteButton.classList.add('delete-note');
            deleteButton.textContent = '×';
            deleteButton.setAttribute('data-index', index);

            deleteButton.addEventListener('click', (event) => {
                //event.stopPropagation();
                deleteNote(index);
            });

            noteHeader.appendChild(noteTitle);
            noteHeader.appendChild(deleteButton);

            const noteDate = document.createElement('p');
            noteDate.classList.add('note-date');
            noteDate.textContent = `Date: ${note.date}`;

            const noteContent = document.createElement('p');
            noteContent.classList.add('note-content');
            noteContent.textContent = note.content;
            noteContent.style.display = 'none';

            noteDiv.appendChild(noteHeader);
            noteDiv.appendChild(noteDate);
            noteDiv.appendChild(noteContent);
            noteDiv.addEventListener('click', () => {
                noteContent.style.display = noteContent.style.display === 'block' ? 'none' : 'block';
            });

            notesContainer.appendChild(noteDiv);
        });
    }

    function deleteNote(index) {
        let notes = JSON.parse(localStorage.getItem('notesEntries')) || [];
        notes.splice(index, 1);
        localStorage.setItem('notesEntries', JSON.stringify(notes));
        displayNotes();
    }

    // Form submission handler
    const journalForm = document.getElementById('journal-form');
    journalForm.addEventListener('submit', (event) => {
        event.preventDefault();
        saveNote();
        displayNotes();
        //journalForm.reset();
    });

    // Display notes on load
    displayNotes();

    // Handle active class switching in navigation
    navLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            navLinks.forEach(link => link.classList.remove('active'));
            event.target.classList.add('active');
        });
    });

    // Handle 'Get Started' button click
    const getStartedButton = document.querySelector('.grid1 button');
    getStartedButton.addEventListener('click', () => {
        showSection('notes-section');
        navLinks.forEach(link => link.classList.remove('active'));
        document.querySelector('nav ul li a[data-target="notes-section"]').classList.add('active');
    });

    //getStartedButton.addEventListener('click', () => {
    //    document.querySelector('a[data-target="notes-section"]').click();
    //});

