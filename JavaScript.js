const students = [
    { name: 'فارس أمير حسن', image: 'student images/01.jpg' },
    { name: 'محمد عبدالإله حمادة', image: 'student images/02.jpg' },
    { name: 'سيد علي كامل', image: 'student images/03.jpg' },
    { name: 'سيد هاشم محمد', image: 'student images/04.jpg' },
    { name: 'محمد عباس فتر', image: 'student images/05.jpg' },
    { name: 'حسين علي عيسى', image: 'student images/06.jpg' },
    { name: 'منتظر حسن علي', image: 'student images/07.jpg' },
    { name: 'حسن علي معيوف', image: 'student images/08.jpg' },
    { name: 'علي حسين الرحيم', image: 'student images/09.jpg' },
    { name: 'محمد عبدالله محمد', image: 'student images/10.jpg' },
    { name: 'محمد ناجي محمد', image: 'student images/11.jpg' },
    { name: 'مهدي شاكر الزاكي', image: 'student images/12.jpg' },
    { name: 'جعفر حسن جعفر', image: 'student images/13.jpg' },
    { name: 'جعفر حميد جعفر', image: 'student images/14.jpg' },
    { name: 'محمد جعفر الكايد', image: 'student images/15.jpg' },
    { name: 'محمد صادق عطية', image: 'student images/16.jpg' },
    { name: 'حسين هاني الحواج', image: 'student images/17.jpg' },
    { name: 'محمد حسين خليل', image: 'student images/18.jpg' },
    { name: 'عمران يحيى مهدي', image: 'student images/19.jpg' },
    { name: 'ياسين محمد لطف الله', image: 'student images/20.jpg' },
    { name: 'علي حسين علي', image: 'student images/21.jpg' },
    { name: 'جعفر علي حسن', image: 'student images/22.jpg' },
    { name: 'حسن عبدالهادي فتيل', image: 'student images/23.jpg' },
    { name: 'حسين علي الصالح', image: 'student images/24.jpg' },
    { name: 'أسلم أحمد كامل', image: 'student images/25.jpg' },
    { name: 'محمد عبدالهادي الخياط', image: 'student images/26.jpg' },
    { name: 'علي حسن مكي  العكري', image: 'student images/27.jpg' },
    { name: 'علي عبدالحسين مهدي', image: 'student images/28.jpg' },
    { name: 'أحمد هاني ميرزا', image: 'student images/29.jpg' },
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
            if (!card.classList.contains('completed')) {
                showStudentPopup(index);
            }
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
        selectedCard.removeEventListener('click', showStudentPopup);

        checkAllCompleted();
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
    cards.forEach((card, index) => {
        card.classList.remove('completed');
        card.addEventListener('click', () => {
            if (!card.classList.contains('completed')) {
                showStudentPopup(index);
            }
        });
    });

    document.querySelector('.button-container').style.display = 'flex';
    document.getElementById('resetAllButton').style.display = 'none';
}

function checkAllCompleted() {
    const allCompleted = Array.from(document.querySelectorAll('.student-card')).every(card => card.classList.contains('completed'));
    if (allCompleted) {
        document.querySelector('.button-container').style.display = 'none';

        let resetAllButton = document.getElementById('resetAllButton');
        if (!resetAllButton) {
            resetAllButton = document.createElement('button');
            resetAllButton.id = 'resetAllButton';
            resetAllButton.textContent = 'إعادة تعيين الكل';
            resetAllButton.className = 'random-btn';
            resetAllButton.onclick = resetstudents;

            // Center the button:
            resetAllButton.style.display = 'block';
            resetAllButton.style.margin = '20px auto'; // Add top margin and center
            resetAllButton.style.textAlign = 'center'; // Center the text within the button (optional)

            document.querySelector('.all').appendChild(resetAllButton);
        } else {
            // Make sure button is visible and centered if it already exists
            resetAllButton.style.display = 'block';
            resetAllButton.style.margin = '20px auto';
            resetAllButton.style.textAlign = 'center';
        }


    } else {
        document.querySelector('.button-container').style.display = 'flex';
        let resetAllButton = document.getElementById('resetAllButton');
        if (resetAllButton) {
            resetAllButton.style.display = 'none';
        }
    }
}
window.onload = () => {
    createStudentCards();
    checkAllCompleted();
};