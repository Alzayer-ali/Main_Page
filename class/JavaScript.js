const students = [
    { name: 'فارس أمير حسن', image: 'student_images/01.jpg', id:"01" },
    { name: 'محمد عبدالإله حماده', image: 'student_images/02.jpg', id:"02" },
    { name: 'سيد علي كامل', image: 'student_images/03.jpg', id:"03" },
    { name: 'سيد هاشم محمد', image: 'student_images/04.jpg', id:"04" },
    { name: 'محمد عباس فتر', image: 'student_images/05.jpg', id:"05" },
    { name: 'حسين علي عيسى', image: 'student_images/06.jpg', id:"06" },
    { name: 'منتظر حسن علي', image: 'student_images/07.jpg', id:"07" },
    { name: 'حسن علي معيوف', image: 'student_images/08.jpg', id:"08" },
    { name: 'علي حسن الرحيم', image: 'student_images/09.jpg', id:"09" },
    { name: 'محمد عبدالله محمد', image: 'student_images/10.jpg', id:"10" },
    { name: 'محمد ناجي علي', image: 'student_images/11.jpg', id:"11" },
    { name: 'مهدي شاكر الزاكي', image: 'student_images/12.jpg', id:"12" },
    { name: 'جعفر حسن جعفر', image: 'student_images/13.jpg', id:"13" },
    { name: 'جعفر حميد جعفر', image: 'student_images/14.jpg', id:"14" },
    { name: 'محمد جعفر الكايد', image: 'student_images/15.jpg', id:"15" },
    { name: 'محمد صادق عطيه', image: 'student_images/16.jpg', id:"16" },
    { name: 'حسين هاني الحواج', image: 'student_images/17.jpg', id:"17" },
    { name: 'محمد حسين خليل', image: 'student_images/18.jpg', id:"18" },
    { name: 'عمران يحيى مهدي', image: 'student_images/19.jpg', id:"19" },
    { name: 'ياسين محمد لطف الله', image: 'student_images/20.jpg', id:"20" },
    { name: 'علي حسين علي', image: 'student_images/21.jpg', id:"21" },
    { name: 'جعفر علي حسن', image: 'student_images/22.jpg', id:"22" },
    { name: 'حسن عبدالهادي فتيل', image: 'student_images/23.jpg', id:"23" },
    { name: 'حسين علي الصالح', image: 'student_images/24.jpg', id:"24" },
    { name: 'أسلم أحمد كامل', image: 'student_images/25.jpg', id:"25" },
    { name: 'محمد عبدالهادي الخياط', image: 'student_images/26.jpg', id:"26" },
    { name: 'علي محمد مكي  العكري', image: 'student_images/27.jpg', id:"27" },
    { name: 'علي عبدالحسين مهدي', image: 'student_images/28.jpg', id:"28" },
    { name: 'أحمد هاني', image: 'student_images/29.jpg', id:"29" },
];

let selectedStudentIndex = null;

count = 0;

function createStudentCards() {
    const container = document.getElementById('studentsContainer');

    students.forEach((student, index) => {
        const card = document.createElement('div');
        card.className = 'student-card';
        card.id = `student-${index}`;

        const img = document.createElement('img');
        img.src = student.image;
        img.alt = student.name;
        
        const IdDiv = document.createElement('div');
        IdDiv.className = 'student-id';
        IdDiv.textContent = student.id;
        
        const nameDiv = document.createElement('div');
        nameDiv.className = 'student-name';
        nameDiv.textContent = student.name;


        card.appendChild(img);
        card.appendChild(IdDiv);
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
    document.getElementById('popupId').textContent = students[index].id;
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

    count++;
    document.getElementById('count').innerHTML = `${count}`;

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
    count = 0;
    document.getElementById('count').innerHTML = `${count}`;
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
            resetAllButton.className = 'random-btn button-container';
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
