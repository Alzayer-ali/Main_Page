const students = [
    { name: 'فارس', image: 'photos/1.jpg'},
    { name: 'جعفر حسن', image: 'photos/13.jpg'},
    { name: 'جعفر حميد', image: 'photos/14.jpg'},
    { name: 'ياسين', image: 'photos/20.jpg'},
    { name: 'جعفر علي حسن', image: 'photos/22.jpg'},
    { name: 'حسن عبد الهادي', image: 'photos/23.jpg'},
    { name: 'أسلم', image: 'photos/25.jpg'},
    { name: 'أحمد هاني الوردة', image: 'photos/29.jpg'},
    { name: 'فارس', image: 'photos/1.jpg'},
    { name: 'جعفر حسن', image: 'photos/13.jpg'},
    { name: 'جعفر حميد', image: 'photos/14.jpg'},
    { name: 'ياسين', image: 'photos/20.jpg'},
    { name: 'جعفر علي حسن', image: 'photos/22.jpg'},
    { name: 'حسن عبد الهادي', image: 'photos/23.jpg'},
    { name: 'أسلم', image: 'photos/25.jpg'},
    { name: 'أحمد هاني الوردة', image: 'photos/29.jpg'},
];

let selectedStudentIndex = null;

function createStudentCards() {
    const container = document.getElementById('studentsContainer');

    students.forEach((student, index) => {
        const card = document.createElement('div');
        card.className = 'student-card';
        card.id = `student-${index}`;

        const img = document.createElement('img');
        img.src = student.image;
        img.alt = student.name;

        const nameDiv = document.createElement('div');
        nameDiv.className = 'student-name';
        nameDiv.textContent = student.name;

        card.appendChild(img);
        card.appendChild(nameDiv);
        container.appendChild(card);

        card.addEventListener('click', () => {
            showStudentPopup(index);
        });
    });
}

function showStudentPopup(index) {
    selectedStudentIndex = index;
    document.getElementById('popupImage').src = students[index].image;
    document.getElementById('popupName').textContent = students[index].name;
    document.getElementById('popup').style.display = 'block';
    document.getElementById('overlay').style.display = 'block';

    let dontMarkButton = document.getElementById('dontMarkButton');
    if (!dontMarkButton) {
        dontMarkButton = document.createElement('button');
        dontMarkButton.textContent = "إلفاء";
        dontMarkButton.id = "dontMarkButton";
        dontMarkButton.className = "popup-btn";
        dontMarkButton.onclick = closePopupWithoutMarking;
        document.getElementById('popup').appendChild(dontMarkButton);
    }
}

function closePopup() {
    document.getElementById('popup').style.display = 'none';
    document.getElementById('overlay').style.display = 'none';

    if (selectedStudentIndex !== null) {
        const selectedCard = document.getElementById(`student-${selectedStudentIndex}`);
        selectedCard.classList.add('completed');
    }
}

function closePopupWithoutMarking() {
    document.getElementById('popup').style.display = 'none';
    document.getElementById('overlay').style.display = 'none';
}

function selectRandomstudent() {
    const availableStudents = students.filter((student, index) => !document.getElementById(`student-${index}`).classList.contains('completed'));
    if (availableStudents.length === 0) {
        alert('All students have been completed!');
        return;
    }

    const randomIndex = Math.floor(Math.random() * availableStudents.length);
    selectedStudentIndex = students.indexOf(availableStudents[randomIndex]);

    showStudentPopup(selectedStudentIndex);
}

function resetstudents() {
    const cards = document.querySelectorAll('.student-card');
    cards.forEach(card => {
        card.classList.remove('completed');
    });
}

window.onload = createStudentCards;