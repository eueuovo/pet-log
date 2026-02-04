/* ================= 정렬 드롭다운 ================= */
const $dropdown = document.querySelector(".sort-dropdown");
const $trigger = $dropdown.querySelector("[data-object=button]");
const $valueEl = $dropdown.querySelector(".value");
const $options = $dropdown.querySelectorAll("li");


// 정렬 탭 열기, 닫기
$trigger.addEventListener("click", () => {
    $dropdown.dataset.open =
        $dropdown.dataset.open === "true" ? "false" : "true";
});
// 정렬 탭 선택
$options.forEach(option => {
    option.addEventListener("click", () => { // 정렬 기준 선택 이벤트
        $options.forEach(o => o.classList.remove("select"));
        option.classList.add("select");
        $valueEl.textContent = option.textContent;
        $dropdown.dataset.open = "false";

        loadFeeds(true); // 정렬 변경 시 초기화 후 다시 로딩
        //todo 정렬 기준에 따른 게시물 정렬
    });
});

/* ================= 무한 스크롤 ================= */

const container = document.getElementById("feed-container");
const sentinel = document.getElementById("scroll-sentinel");

let lastFeedId = null;
let loading = false;
let hasNext = true;
const size = 10;

// 피드 불러오기
async function loadFeeds(reset = false) {
    if (loading || (!hasNext && !reset)) return;
    loading = true;

    if (reset) {
        const cards = container.querySelectorAll(".feed-card");
        cards.forEach(card => card.remove());

        lastFeedId = null;
        hasNext = true;
    }

    let url = `/api/feed/?size=${size}`;
    if (lastFeedId !== null) {
        url += `&lastFeedId=${lastFeedId}`;
    }

    const res = await fetch(url);
    const data = await res.json();

    renderFeeds(data.feedResponseVos);

    hasNext = data.hasNext;
    lastFeedId = data.lastFeedId;

    loading = false;
}

// 피드 화면에 추가
function renderFeeds(feeds) {
    feeds.forEach(feed => {
        const card = document.createElement("article");
        card.className = "feed-card";

        card.innerHTML = `
            <header class="feed-user">
                <img class="profile" src="/feed/images/explore/user.png" alt="프로필">
                <div class="meta">
                    <span class="nickname">user_${feed.userId}</span>
                    <span class="place">서울</span>
                </div>
            </header>
            <div class="feed-image">
                ${feed.feedMediaVos.length > 0
            ? `<img src="${feed.feedMediaVos[0].mediaUrl}" alt="게시물 이미지">`
            : `<div class="no-image"></div>`}
            </div>
            <div class="feed-content">
                <span class="caption">${feed.content}</span>
            </div>
            <footer class="feed-action">
                <button class="action like" data-like="false">
                    <svg class="icon heart"><use href="#icon-heart"></use></svg>
                </button>
                <span class="like count">${feed.likeCount}</span>

                <button class="action comment">
                    <svg class="icon comment"><use href="#icon-comment"></use></svg>
                </button>
                <span class="comment count">${feed.commentCount}</span>
            </footer>
        `;

        container.appendChild(card);
    });
    // 스크롤 기준 선 card 밑에 추가해야함
    container.appendChild(sentinel);
}

// 스크롤 하단 감지
const observer = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting) {
        loadFeeds();
    }
}, {
    root: null,
    rootMargin: "400px",
    threshold: 0.01
});

observer.observe(sentinel);


/* ================= 첫 페이지 로딩 ================= */
loadFeeds();
setTimeout(() => loadFeeds(), 100);
