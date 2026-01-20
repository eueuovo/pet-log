window.addEventListener('DOMContentLoaded', () => {
    kakao.maps.load(() => {
        initMap();
    });
});

function initMap() {
    const container = document.getElementById('map');

    const options = {
        center: new kakao.maps.LatLng(37.5665, 126.9780), // 임시: 서울
        level: 4
    };

    const map = new kakao.maps.Map(container, options);

    // 다음 단계에서 계속 확장
}
