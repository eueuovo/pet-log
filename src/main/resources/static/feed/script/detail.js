const track = document.querySelector('.slide-track');
const slides = document.querySelectorAll('.slide-track img, .slide-track video');
const prevBtn = document.querySelector('.slide-btn.prev');
const nextBtn = document.querySelector('.slide-btn.next');
const indicatorWrap = document.querySelector('.slide-indicators');

let currentIndex = 0;

slides.forEach((_, i) => {
    const dot = document.createElement('span');
    if (i === 0) dot.classList.add('active');
    indicatorWrap.appendChild(dot);
});

// 다음 버튼 클릭 이벤트
nextBtn.addEventListener('click', () => {
    if (currentIndex < slides.length - 1) {
        prevBtn.classList.remove('hidden');
        currentIndex++;
        updateSlide();
        updateButtons();
    }
});
// 이전 버튼 클릭 이벤트
prevBtn.addEventListener('click', () => {
    if (currentIndex > 0) {
        nextBtn.classList.remove('hidden');
        currentIndex--;
        updateSlide();
        updateButtons();
    }
});

const dots = indicatorWrap.querySelectorAll('span');
function updateIndicators() {
    dots.forEach(dot => dot.classList.remove('active'));
    dots[currentIndex].classList.add('active');
}

function updateSlide() {
    track.style.transform = `translateX(-${currentIndex * 100}%)`;
    updateIndicators();
}

function updateButtons() {
    if(currentIndex === 0) {
        prevBtn.classList.add('hidden');
    } else {
        prevBtn.classList.remove('hidden');
    }
    if(currentIndex === slides.length -1) {
        nextBtn.classList.add('hidden');
    } else {
        nextBtn.classList.remove('hidden');
    }
}
