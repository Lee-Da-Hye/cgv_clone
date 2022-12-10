
const moviesContents = document.querySelector('.movies-contents');
const userInput = document.querySelector('#userInput');
const bx = document.querySelector('.bx');
const genreContainer = document.querySelector('.genre-container');
let allMovies = [];

const URL = 'https://yts.mx/api/v2/list_movies.json';
fetch(URL).then(data =>data.json())
.then(data=>{
    // console.log(data);
        
    // if( data.status ){
    //     console.log( data.data.limit);
    //     console.log( data.data.movies);
    //     console.log( data.data.movies.length);
    // }
    
    allMovies = data.data.movies.map( movie => movie );
    movieList( allMovies ); 
})

userInput.addEventListener('keyup', (event)=>{
    console.log(event.target.value);
    let searchText = event.target.value.toUpperCase();

    if(searchText){
        const h3s = document.querySelectorAll('h3');
        for(h3 of h3s){
            let h3Text = h3.innerHTML.toUpperCase()
            if(!h3Text.includes(searchText)){
                h3.parentElement.parentElement.style.display = 'none';
            }else{
                h3.parentElement.parentElement.style.display = '';
            }
        }
        bx.classList.remove('bx-search-alt');
        bx.classList.add('bx-x-circle');
        
    }else{
        moviesContents.innerHTML = '';
        movieList(allMovies);
    }
    
})

userInput.addEventListener('focus', (event)=>{   
    inputBox.classList.add('active');
})

userInput.addEventListener('blur', ()=>{
    inputBox.classList.remove('active');
    bx.classList.add('bx-search-alt');
    bx.classList.remove('bx-x-circle');
    userInput.value = '';

    moviesContents.innerHTML = '';
    movieList(allMovies);
})

bx.addEventListener('click', ()=>{
    bx.classList.add('bx-search-alt');
    bx.classList.remove('bx-x-circle');
    userInput.value = '';

    //동작 오류류
    //if(bx,classList.contains('bx-search-alt')){
        // moviesContents.innerHTML = '';
        // movieList(allMovies);
    // }
    moviesContents.innerHTML = '';
    movieList(allMovies);
    
})


function movieList(movies){
    console.log( movies );

    for( movie of movies){
        createDom( movie);
    }
}

function validate(value){
    return !!value;
    //undefined, NaN, Null, 0 : false
    
}

function createDom( movie ){
    

    const movieBox = document.createElement('div');
    movieBox.classList.add('movie-box');
    
    const movieImg = document.createElement('div');
    movieImg.classList.add('movie-img');
    
    const img = document.createElement('img');
    
    //데이터가 비정상적일 때 처리
    if(validate(movie.large_cover_image)){
        img.setAttribute('src', movie.large_cover_image);
    }else{
        console.log('이미지 준비중입니다.' );
    }

    img.setAttribute('title',  movie.summary);

    movieImg.append(img);
    movieBox.append( movieImg);
                    
    const movieDetails = document.createElement('div');
    movieDetails.classList.add('movie-details');

    const h3 = document.createElement('h3');
    h3.innerHTML = movie.title;
    movieDetails.append(h3); // 제목의 길이를 어떻게 조절할 것인가 
    movieBox.append(movieDetails);

    const ul = document.createElement('ul');
    ul.classList.add('genres');

    const genres = movie.genres; 
    for( genre of genres){
        const li = document.createElement('li');
        li.innerHTML = genre;
        ul.append( li);
    }
    movieBox.append(ul);

    const rating = document.createElement('div');
    rating.classList.add('rating');
    rating.innerHTML = movie.rating; 
    
    movieBox.append(rating);
    moviesContents.append( movieBox); 
}


const inputBox = document.querySelector('.input-box');
inputBox.addEventListener('mouseenter', ()=>{
    inputBox.classList.add('active');
})

//ham 맨위에 있고 navigation이 아래 있어서 클릭이벤트를 받지 못함.
const ham = document.querySelector('.ham-btn');
ham.addEventListener('click', showNavi)
function showNavi(){
    document.querySelector('.navigation').classList.toggle('active');
}

genreContainer.addEventListener('click', (event)=>{
    //이벤트 위임 : 버튼 그룹으로 검색어를 찾을 것임.

    //console.log(event.target.innerHTML);

    let searchText = event.target.innerHTML;
    const searchMovies = searchGenre(searchText);
    
    //search한 영화를 별도로 담아서 뿌려주기
    moviesContents.innerHTML = '';
    if(searchText === "모두보기"){
        allMovies.forEach((movie)=>{
            createDom(movie);
    })
    }else{
        searchMovies.forEach((movie)=>{
        createDom(movie);
    })
    
    }
})
//데이터를 읽어 오는 시간

    function searchGenre(searchText){
    const searchMovies = [];
    //배열을 지우는 효과

    allMovies.map(movie => {
        //console.log(movie);
        //console.log(movie.genres);
            if(movie.genres.includes(searchText)){
            //console.log(movie)
            searchMovies.push(movie);
            }
        
    })
    console.log(searchMovies[0]);

    return searchMovies;
    
    
}