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

let selectedstudentIndex = null;

// Function to create student cards
function createstudentCards() {
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
    });
}

// Function to select random student
function selectRandomstudent() {
    const availablestudents = students.filter((student, index) => !document.getElementById(`student-${index}`).classList.contains('completed'));
    if (availablestudents.length === 0) {
        alert('All students have been completed!');
        return;
    }

    const randomIndex = Math.floor(Math.random() * availablestudents.length);
    selectedstudentIndex = students.indexOf(availablestudents[randomIndex]);

    // Show popup
    document.getElementById('popupImage').src = students[selectedstudentIndex].image;
    document.getElementById('popupName').textContent = students[selectedstudentIndex].name;
    document.getElementById('popup').style.display = 'block';
    document.getElementById('overlay').style.display = 'block';
}

// Function to close popup and mark student as completed
function closePopup() {
    document.getElementById('popup').style.display = 'none';
    document.getElementById('overlay').style.display = 'none';

    if (selectedstudentIndex !== null) {
        const selectedCard = document.getElementById(`student-${selectedstudentIndex}`);
        selectedCard.classList.add('completed');
    }
}

// Function to reset all students
function resetstudents() {
    const cards = document.querySelectorAll('.student-card');
    cards.forEach(card => {
        card.classList.remove('completed'); // Remove the 'completed' class
    });

}

// Initialize the page
window.onload = createstudentCards;