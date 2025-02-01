import supabase from './supabase_client.js'; 

const booksPerPage = 10;
let currentPage = 1;
let totalPages = 1;

async function fetchAndDisplayBooks() {
    try {
        let { data, error } = await supabase
            .from('books_info')
            .select('*');

        if (error) {
            console.error('Error fetching books_info:', error);
            return;
        }

        //デバッグ用のコンソールログ
        console.log('Data:', data);

        //デバック用レコード数を出力
        console.log('Number of records retrieved:', data.length);

        window.books = data;
        totalPages = Math.ceil(data.length / booksPerPage);
        showPage(currentPage); //最初のページを表示
    } catch (err) {
        console.error('Unexpected error:', err);
    }
}

function showPage(pageNumber) {
    const bookContainer = document.getElementById('book-container');
    bookContainer.innerHTML = '';

    const start = (pageNumber - 1) * booksPerPage;
    const end = start + booksPerPage;
    const pageBooks = window.books.slice(start, end);

    pageBooks.forEach(book => {
        const bookDiv = document.createElement('div');
        bookDiv.classList.add('book');

        const bookLink = document.createElement('a');
        bookLink.href = book.conn_location; 
        bookLink.target = '_blank';

        const bookImage = document.createElement('img');
        bookImage.src = book.image;
        bookImage.alt = 'Book image';
        bookImage.style.width = '200px';
        bookImage.style.height = 'auto';

        const bookTitle = document.createElement('h3');
        bookTitle.classList.add('small-text');
        bookTitle.textContent = book.title;

        const bookNote = document.createElement('p');
        bookNote.textContent = book.note;

        bookLink.appendChild(bookImage);
        bookDiv.appendChild(bookLink);
        bookDiv.appendChild(bookTitle);
        bookDiv.appendChild(bookNote);
        bookContainer.appendChild(bookDiv);
    });

    updatePagination(pageNumber);
}

function updatePagination(pageNumber) {
    const pagination = document.getElementById('pagination');
    pagination.innerHTML = '';

    if (totalPages <= 1) return;

    // 現在のページ番号が1より大きい場合に「前のページ」ボタンを表示
    if (pageNumber > 1) {
        const prevButton = document.createElement('button');
        prevButton.textContent = '前のページ';
        prevButton.onclick = () => showPage(pageNumber - 1);
        pagination.appendChild(prevButton);
    }

    //現在のページ番号が総ページ数未満である場合に「次のページ」ボタンを表示
    if (pageNumber < totalPages) {
        const nextButton = document.createElement('button');
        nextButton.textContent = '次のページ';
        nextButton.onclick = () => showPage(pageNumber + 1);
        pagination.appendChild(nextButton);
    }
}

//ページがロードされた時にデータを取得して表示
window.onload = fetchAndDisplayBooks;
