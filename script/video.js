// get hour and rest seconds
function getTimeString (time) {
  const hour = parseInt (time/3600);
  let remainingSecond = time % 3600 ;
  const minute = parseInt (remainingSecond / 60);
  remainingSecond = parseInt(remainingSecond / 60);

  return `${hour} hrs ${minute} min ${remainingSecond} sec ago`
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

// Create displayCategories

const displayCategories = (categories) => {
  const categoryContainer = document.getElementById("categories");

  categories.forEach((item) => {
    console.log(item);
    // create button
    const button = document.createElement("button");
    button.classList = "btn";
    button.innerText = item.category;

    // add button to category container
    categoryContainer.appendChild(button);
  });
};

//Dynamic Video Sections
// load videos
const loadVideos = () => {
  fetch("https://openapi.programming-hero.com/api/phero-tube/videos")
    .then((res) => res.json())
    .then((data) => displayVideos(data.videos))
    .catch((error) => console.error(error));
};

// Create displayVideos

const displayVideos = (videos) => {
  const videoContainer = document.getElementById("videos");

  videos.forEach((video) => {
    console.log(video);
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
                
            </div>

            
        </div>
        `;

    // add button to category container
    videoContainer.appendChild(card);
  });
};

loadCategories();
loadVideos();
