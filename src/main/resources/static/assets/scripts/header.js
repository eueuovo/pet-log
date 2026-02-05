const $friendWrapper = document.querySelector('.friend-wrapper');
const $view = document.querySelector('.view');
const $friendContainer = document.querySelector('.friend-container');
const $chatContainer = document.querySelector('.chat-container');
const $viewBtn = document.querySelector('.view-btn');
const $friendBtn = document.querySelector('.friend');
const $chatBtn = document.querySelector('.chat');

// 친구&채팅 창 띄우기
$viewBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    $view.classList.toggle('active');
});

// 바깥 클릭하면 닫기
document.addEventListener('click', (e) => {
    if(!$friendWrapper.contains(e.target)) {
        $view.classList.remove('active');
    }
});

$friendBtn.addEventListener('click', (e) => {
    $chatContainer.classList.remove('active');
    $friendContainer.classList.add('active');
    $chatBtn.classList.remove('active');
    $friendBtn.classList.add('active');
});
$chatBtn.addEventListener('click', (e) => {
    $friendContainer.classList.remove('active');
    $chatContainer.classList.add('active');
    $friendBtn.classList.remove('active');
    $chatBtn.classList.add('active');
});