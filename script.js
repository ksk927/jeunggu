let posts = [];
for (let i = 1; i <= 50; i++) {
    posts.push({
        number: i,
        title: `외국농구 게시글 ${i}`,
        userId: `user${i}`,
        date: new Date(Date.now() - i * 1000 * 60 * 60).toLocaleDateString(), // 날짜에서 시간 제거
        views: Math.floor(Math.random() * 1000),
    });
}

function displayPosts(page = 1) {
    const postList = document.getElementById('postList');
    const pagination = document.getElementById('pagination');
    postList.innerHTML = '';
    pagination.innerHTML = '';

    const start = (page - 1) * 30;
    const end = start + 30;
    const currentPosts = posts.slice(start, end);

    for (let i = start; i < end; i++) {
        if (currentPosts[i - start]) {
            const post = currentPosts[i - start];
            const postElement = document.createElement('tr');
            postElement.innerHTML = `
                <td>${post.number}</td>
                <td><a href="#" onclick="incrementViews(${post.number})">${post.title}</a></td>
                <td>${post.userId}</td>
                <td>${post.date}</td>
                <td>${post.views}</td>
            `;
            postList.appendChild(postElement);
        }
    }

    const totalPages = Math.ceil(posts.length / 30);
    for (let i = 1; i <= totalPages; i++) {
        const pageLink = document.createElement('a');
        pageLink.href = '#';
        pageLink.innerText = i;
        pageLink.onclick = (e) => {
            e.preventDefault();
            displayPosts(i);
        };
        pagination.appendChild(pageLink);
        if (i < totalPages) {
            pagination.appendChild(document.createTextNode(' | '));
        }
    }
}

function incrementViews(postNumber) {
    const post = posts.find(p => p.number === postNumber);
    if (post) {
        post.views += 1;
        displayPosts();
    }
}

function searchPosts() {
    const searchInput = document.getElementById('searchInput').value.toLowerCase();
    const searchType = document.getElementById('searchType').value;

    const filteredPosts = posts.filter(post => {
        switch (searchType) {
            case 'titleAndContent':
                return post.title.toLowerCase().includes(searchInput) || post.content.toLowerCase().includes(searchInput);
            case 'title':
                return post.title.toLowerCase().includes(searchInput);
            case 'userId':
                return post.userId.toLowerCase().includes(searchInput);
            case 'nickname':
                return post.nickname && post.nickname.toLowerCase().includes(searchInput);
            case 'views':
                return post.views.toString().includes(searchInput);
            default:
                return false;
        }
    });

    posts = filteredPosts;
    displayPosts();
}

document.addEventListener('DOMContentLoaded', () => {
    displayPosts();
});
