const common = document.getElementById('createFeedBtn');
// 글쓰기 버튼 스크롤 이벤트
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {   // 100px 이상 스크롤하면
        common.classList.add('compact');
    } else {
        common.classList.remove('compact');
    }
});
// 글쓰기 버튼 클릭 시 이동 이벤트
common.addEventListener('click', () => {
    window.location.href = '/feed/create';
});



const $feedContainer = document.getElementById("feed-container");

$feedContainer.addEventListener('click', (e) => {
    handleLike(e);
});

function handleLike(e) {
    const $likeBtn = e.target.closest('.like');
    if (!$likeBtn) return;

    const $iconUse = $likeBtn.querySelector('use');
    const isLiked = $likeBtn.dataset.like === 'true';

    if(isLiked) {
        $likeBtn.dataset.like = 'false';
        $iconUse.setAttribute('href', '#icon-heart');
    } else {
        $likeBtn.dataset.like = 'true';
        $iconUse.setAttribute('href', '#icon-heart-fill');
    }
}