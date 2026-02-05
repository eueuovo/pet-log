let map;
let geocoder;
let currentInfo = null;

const markers = []; // 단일 검색/선택 마커

const categoryMarkers = {
    hospital: [],
    salon: [],
    cafe: [],
    search: []
};

let activeCategory = null;


window.addEventListener('DOMContentLoaded', () => {
    kakao.maps.load(initMap);

    document.querySelectorAll('.category-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            handleCategoryClick(btn.dataset.category);
        });
    });
});

function bindSearch() {
    const $search = document.getElementById('search');
    if (!$search) return;

    const $input = $search.querySelector('.search-input');
    const $button = $search.querySelector('.search-btn');

    const handleSearch = () => {
        const keyword = $input.value.trim();
        if (!keyword) return;

        const ps = new kakao.maps.services.Places();
        ps.keywordSearch(keyword, (places, status) => {
            if (status !== kakao.maps.services.Status.OK) return;

            // UI 초기화
            document.querySelectorAll('.category-btn').forEach(b => b.classList.remove('active'));
            clearAllCategories();
            activeCategory = 'search';

            // 마커 생성 & 지도 영역 맞춤
            const bounds = new kakao.maps.LatLngBounds();
            places.forEach(p => {
                const pos = new kakao.maps.LatLng(p.y, p.x);
                const data = normalizePlaceData(p, 'search')
                if (!data) return;
                createMarker({
                    position: pos,
                    name: p.place_name,
                    address: p.road_address_name,
                    tel: p.phone,
                    category: 'search'
                });
                bounds.extend(pos);
            });
            map.setBounds(bounds);
        });
    };

    $button.addEventListener('click', handleSearch);
    $input.addEventListener('keydown', e => e.key === 'Enter' && handleSearch());
}

function initMap() {
    const container = document.getElementById('map');

    map = new kakao.maps.Map(container, {
        center: new kakao.maps.LatLng(37.5665, 126.9780),
        level: 5
    });

    geocoder = new kakao.maps.services.Geocoder();
    getCurrentLocation();
    bindSearch();

}

function getCurrentLocation() {
    if (!navigator.geolocation) return;

    navigator.geolocation.getCurrentPosition(pos => {
        const latlng = new kakao.maps.LatLng(pos.coords.latitude, pos.coords.longitude);

        const marker = new kakao.maps.Marker({ map, position: latlng });

        const info = new kakao.maps.InfoWindow({
            content: '<div style="padding:5px; color: black">📍 현재 위치</div>'
        });

        info.open(map, marker);
        map.setCenter(latlng);
    });
}
function clearCategory(category) {
    categoryMarkers[category].forEach(marker => marker.setMap(null));
    categoryMarkers[category] = [];

    if (currentInfo) {
        currentInfo.close();
        currentInfo = null;
    }
}

function clearAllCategories() {
    Object.keys(categoryMarkers).forEach(clearCategory);
}

async function handleCategoryClick(category) {

    // 같은 버튼 다시 누르면 OFF
    if (activeCategory === category) {
        clearCategory(category);
        document.querySelector(`[data-category="${category}"]`)?.classList.remove('active');
        activeCategory = null;
        return;
    }

    activeCategory = category;

    document.querySelectorAll('.category-btn').forEach(b => b.classList.remove('active'));
    document.querySelector(`[data-category="${category}"]`)?.classList.add('active');

    clearAllCategories();
    await showCategory(category);
}

function fitMapToCategory(category) {
    const bounds = new kakao.maps.LatLngBounds();
    categoryMarkers[category].forEach(marker => bounds.extend(marker.getPosition()));
    map.setBounds(bounds);
}

async function showCategory(category) {

    // 검색 마커 제거
    markers.forEach(m => m.setMap(null));
    markers.length = 0;

    // 이미 불러왔으면 재사용
    if (categoryMarkers[category].length > 0) {
        categoryMarkers[category].forEach(m => m.setMap(map));
        fitMapToCategory(category);
        return;
    }

    const res = await fetch(`/api/${category}`);
    const hospitals = await res.json(); // 백엔드에서 [{lat,lng,name,address,phone}] 구조로 보내는 게 가장 좋음

    hospitals.forEach(item => {
        if (!item.lat || !item.lng) return;

        const position = new kakao.maps.LatLng(item.lat, item.lng);
        createMarker({ position, ...item, category });
    });

    fitMapToCategory(category);
}
function createMarker({ position, name, address, phone, category }) {

    const marker = new kakao.maps.Marker({ map, position });

    categoryMarkers[category].push(marker);

    const info = new kakao.maps.InfoWindow({
        content: `
        <div style="
            padding:0.75rem 0.9rem;
            width:14rem;
            font-family:'Malgun Gothic', sans-serif;
            font-size:0.85rem;
            line-height:1.5;
            color:#222;
            box-sizing:border-box;
        ">
            <div style="font-size:1rem;font-weight:700;margin-bottom:0.4rem;">
                📍 ${name}
            </div>
            <div style="margin-bottom:0.3rem;color:#555;">
                ${address}
            </div>
            ${tel ? `<div style="color:#007aff;font-weight:500;">📞 ${tel}</div>` : ''}
        </div>
        `,
        removable: true
    });




    kakao.maps.event.addListener(marker, 'click', () => {
        if (currentInfo) currentInfo.close();
        info.open(map, marker);
        currentInfo = info;
    });
}


