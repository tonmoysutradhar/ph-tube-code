// get hour and rest seconds
function getTimeString (time) {
  const hour = parseInt (time/3600);
  let remainingSecond = time % 3600 ;
  const minute = parseInt (remainingSecond / 60);
  remainingSecond = parseInt(remainingSecond / 60);

  return `${hour} hrs ${minute} min ${remainingSecond} sec ago`
}

const removeActiveClass = () => {
  const buttons  = document.getElementsByClassName('category-btn')
  for (let btn of buttons ){
    btn.classList.remove('active');
  };
}

const loadDetails = async (videoId) => {
  console.log(videoId);
  const url = `https://openapi.programming-hero.com/api/phero-tube/video/${videoId}`
  const res = await fetch(url);
  const data = await res.json();
  displayDetails(data.video)
}

const displayDetails = (video) => {
  console.log(video);
  const detailContainer = document.getElementById('modal-content');

  detailContainer.innerHTML=`
    <img class="w-full" src="${video.thumbnail}" />
    <p>${video.description}</p>
  `
  // way-1
  document.getElementById('showModalData').click();

  // way-2
  // document.getElementById('customModal').showModal();
}

// 1. Fetch, Load and Show Categories on html

//Dynamic Category Section
// create loadCategories
const loadCategories = () => {
  fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
    .then((res) => res.json())
    .then((data) => displayCategories(data.categories))
    .catch((error) => console.error(error));
};

const loadCategoryVideos = (id) => {
  fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
    .then((res) => res.json())
    .then((data) => {

      removeActiveClass();
      // active class add remove

      const activeBtn = document.getElementById(`btn-${id}`)
      activeBtn.classList.add("active")
      displayVideos(data.category);
    })
    .catch((error) => console.error(error))
}

// Create displayCategories

const displayCategories = (categories) => {
  const categoryContainer = document.getElementById("categories");

  categories.forEach((item) => {
    // console.log(item);
    // create button
    const buttonContainer = document.createElement("div");
    buttonContainer.innerHTML = `
      <button id="btn-${item.category_id}" onclick="loadCategoryVideos(${item.category_id})" class = "btn category-btn">
        ${item.category}
      </button>
    `;

    // add button to category container
    categoryContainer.appendChild(buttonContainer);
  });
};

//Dynamic Video Sections
// load videos
const loadVideos = (searchText="") => {
  fetch(`https://openapi.programming-hero.com/api/phero-tube/videos?title=${searchText}`)
    .then((res) => res.json())
    .then((data) => displayVideos(data.videos))
    .catch((error) => console.error(error));
};

// Create displayVideos

const displayVideos = (videos) => {
  const videoContainer = document.getElementById("videos");

  videoContainer.innerHTML = "" ;

  if (videos.length == 0) {
    videoContainer.classList.remove("grid");
    videoContainer.innerHTML = `
      <div class="min-h-[300px] flex flex-col gap-5 justify-center items-center">
        <img src="assets/Icon.png" />
        <h2 class = " text-center text-xl font-bold">
          No Content Here in this Category
        </h2>
      </div>
    `;
    return;
  } else {
    videoContainer.classList.add("grid")
  }

  videos.forEach((video) => {
    // console.log(video);
    // create button
    const card = document.createElement("div");
    card.classList = "card card-compact";
    card.innerHTML = `
        <figure class = "h-[200px] relative ">
            <img
            src=${video.thumbnail}
            class="h-full w-full object-cover"
            alt="Shoes" />
            ${
              video.others.posted_date == 0
                ? ""
                : `<span class="absolute text-xs right-2 bottom-2 bg-black rounded p-1 text-white"> ${getTimeString(video.others.posted_date)} </span>`
            }
            
        </figure>
        <div class="px-0 py-2 flex gap-2">
            <div>
                <img class="w-10 h-10 rounded-full object-cover" src="${
                  video.authors[0].profile_picture
                }" />
            </div>
            <div>
                <h2 class="font-bold">${video.title}</h2>
                <div class="flex items-center gap-2">
                    <p class=" text-gray-400">${
                      video.authors[0].profile_name
                    }</p>

                    ${
                      video.authors[0].verified == true
                        ? `<img class="w-6" src="https://img.icons8.com/?size=48&id=D9RtvkuOe31p&format=png" />`
                        : ""
                    }
                </div>
                <p>
                    <button onclick="loadDetails('${video.video_id}') "class="btn btn-sm btn-error">Details</button>
                </p>
                
            </div>
        </div>
        `;

    // add button to category container
    videoContainer.appendChild(card);
  });
};

document.getElementById("search-input").addEventListener ("keyup", (e) => {
  loadVideos(e.target.value);
  
})

loadCategories();
loadVideos();
