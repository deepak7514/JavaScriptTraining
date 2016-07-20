var notes = [],
	$addNote = $('#add-note'),
	$notesContainer = $('.note-container'),
	$noteTitle = $('input[name="note_title"]'),
	$noteContent = $('textarea[name="note_content"]'),
	counter = 0;

function appendsingleNote(data){
	counter += 1;
	var title = data.title, content = data.content, count = data.id;
	var html = '<div class="note" id="' + count + '" style="background-color:' + getRandomColor() + '; border-radius: 25px;">' +
                    '<div>' + 
                    '<button onclick="removeNote(' + count + ')" type="button" class="btn btn-default" aria-label="Delete" style="position:relative; float: right ; background: transparent;border: none;">' + 
                    '<span class="glyphicon glyphicon-trash" aria-hidden="true"></span></button>' + 
                    '<p class="note-title" style="display: inline;">' +
                    	title + 
                    '</p>' +
                    '</div>' + 
                    '<p class="note-content">' +
                        content + 
                    '</p>' + 
                '</div>';
    $notesContainer.append(html);
}

function storeNote(data) {
	notes.push(data);
	window.localStorage.setItem('notes', JSON.stringify(notes));
	appendsingleNote(data);
}

function init() {
	if(!!window.localStorage.getItem('notes')) {
		notes = JSON.parse(window.localStorage.getItem('notes'));
	}
	else {
		notes = [];
	}

	var i = 0;
	for(i=0; i<notes.length; i++) {
		appendsingleNote(notes[i]);
	}
}

$addNote.on('submit', function(e) {
	e.preventDefault();
	storeNote({
		'title':$noteTitle.val(),
		'content':$noteContent.val(),
		'id':counter
	});
});

function removeNote(id) {

    notes = notes.filter(function(e) {
        return e.id !== id;
    });
    window.localStorage.setItem('notes', JSON.stringify(notes));
    
    var parent = document.getElementById('notes_all');
    var child = document.getElementById(id);
}

function getRandomColor() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

init();
