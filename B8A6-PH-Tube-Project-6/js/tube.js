const loadAllTubeItems = async () => {

    const allVideos = await fetch('https://openapi.programming-hero.com/api/videos/categories');

    const data = await allVideos.json();
    console.log(data.data);

    // loading all 4 tab or button sections. taking elements from API
    const catchTabContainer = document.getElementById('tab-container');

    // creating div and appending all 4 tab in that div.
    data.data.forEach((category) => {
        const div = document.createElement('div');
        div.innerHTML = `
        <a onclick="handleTubeTab('${category.category_id}')" class="tab bg-gray-200 container mx-auto rounded-md m-4">${category.category}</a> 
        
        `;
        catchTabContainer.appendChild(div);
    });

    // console.log("hello from js");

};

// showing all card in client's side by calling function handleTubeTab.
const handleTubeTab = async (category_id) => {

    const res = await fetch(`
    https://openapi.programming-hero.com/api/videos/category/${category_id}
    `);

    const data = await res.json();
    // Catching dynamic-card-append-container for appending card one by one and then show card in display.

    const dynamicCardAppendContainer = document.getElementById('dynamic-card-append-container');

    dynamicCardAppendContainer.innerHTML = "";

    if(data.data.length === 0){
      // dynamicCardAppendContainer.classList=`flex flex-row justify-center items-center`;
      dynamicCardAppendContainer.innerHTML =`
      
      <div class="mt-12">
       <img class="ml-14" src="./Icon.png"></img>
       <p class="mt-4">Opps! Sorry, There is no content here...</p>
      </div>
      
      `
    }
   

    // Creating div by forEach for dynamicCardAppendContainer

    else{
      data?.data?.forEach((tube) => {
        const seconds = (tube.others.posted_date)
        // console.log(seconds)
        const hours = Math.floor(seconds/3600);
        const mins = Math.floor((seconds % 3600) / 60);
        // let hrs=time/3600;
        // hrs=Math.floor(hrs);
      
        // let remainingHrs = time%3600;
        // let mins = remainingHrs*60;
        // mins = Math.floor(mins);
          const div = document.createElement('div');
          div.innerHTML = `
          <div class="card relative bg-base-100 m-4 rounded-lg shadow-xl">
          <figure class=" h-40 w-full rounded-lg" ><img src="${tube?.thumbnail}" alt="Shoes" /></figure>
          <p id = "posted-time" class="absolute bg-black rounded-md bottom-40 left-64 text-white font-medium text-sm ">${hours} hrs ${mins} min ago</p>
  
          <div class="card-body">
  
              <div class="flex gap-4">
              <div class="left-div"><img class=" h-10 w-10 rounded-full" src="${tube?.authors[0]?.profile_picture}" alt=""></div> 
  
              <div class="right-div" >
              <h2 class="font-semibold" >${tube.title}</h2>
              <div class="flex gap-4" >
              <p>${tube?.authors[0].profile_name}</p>
              <p class="badge badge-xs rounded-full mt-2">${tube?.authors[0]?.verified === true ? `
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
    <g clip-path="url(#clip0_11_245)">
      <path d="M19.375 10.0001C19.375 10.8001 18.3922 11.4595 18.1953 12.197C17.9922 12.9595 18.5063 14.022 18.1203 14.6892C17.7281 15.3673 16.5484 15.4486 15.9984 15.9986C15.4484 16.5486 15.3672 17.7282 14.6891 18.1204C14.0219 18.5064 12.9594 17.9923 12.1969 18.1954C11.4594 18.3923 10.8 19.3751 10 19.3751C9.2 19.3751 8.54062 18.3923 7.80312 18.1954C7.04062 17.9923 5.97813 18.5064 5.31094 18.1204C4.63281 17.7282 4.55156 16.5486 4.00156 15.9986C3.45156 15.4486 2.27187 15.3673 1.87969 14.6892C1.49375 14.022 2.00781 12.9595 1.80469 12.197C1.60781 11.4595 0.625 10.8001 0.625 10.0001C0.625 9.20012 1.60781 8.54075 1.80469 7.80325C2.00781 7.04075 1.49375 5.97825 1.87969 5.31106C2.27187 4.63293 3.45156 4.55168 4.00156 4.00168C4.55156 3.45168 4.63281 2.272 5.31094 1.87981C5.97813 1.49387 7.04062 2.00793 7.80312 1.80481C8.54062 1.60793 9.2 0.625122 10 0.625122C10.8 0.625122 11.4594 1.60793 12.1969 1.80481C12.9594 2.00793 14.0219 1.49387 14.6891 1.87981C15.3672 2.272 15.4484 3.45168 15.9984 4.00168C16.5484 4.55168 17.7281 4.63293 18.1203 5.31106C18.5063 5.97825 17.9922 7.04075 18.1953 7.80325C18.3922 8.54075 19.375 9.20012 19.375 10.0001Z" fill="#2568EF"/>
      <path d="M12.7094 7.20637L9.14065 10.7751L7.29065 8.92668C6.88909 8.52512 6.23752 8.52512 5.83596 8.92668C5.4344 9.32824 5.4344 9.97981 5.83596 10.3814L8.43127 12.9767C8.8219 13.3673 9.45627 13.3673 9.8469 12.9767L14.1625 8.66106C14.5641 8.25949 14.5641 7.60793 14.1625 7.20637C13.761 6.80481 13.111 6.80481 12.7094 7.20637Z" fill="#FFFCEE"/>
    </g>
    <defs>
      <clipPath id="clip0_11_245">
        <rect width="20" height="20" fill="white"/>
      </clipPath>
    </defs>
  </svg>
              
              ` : ''}</p>
              </div>
              <p>${tube?.others?.views}</p>
              </div>
          </div>
  
      </div>
      
      `;
  
      if( seconds === ''){
        div.querySelector('#posted-time').style.display = 'none';
      }
  
          // Appending card in container for showing in display for user
  
          dynamicCardAppendContainer.appendChild(div);
  
          
  
      }
      );
    }

    // console.log(data.data);

    // console.log(category_id);

}


// function for no data available for Drawing.

// const time = () =>{
//   let hrs=time/3600;
//   hrs=Math.floor(hrs);

//   let remainingHrs = time%3600;
//   let mins = remainingHrs*60;
//   mins = Math.floor(mins);
// }

// const noDataAvailableDrawing = (category_id) =>{
  
//   if (onclick="handleTubeTab('${category.category_id}')" ==='1005'){
//     const drawingTab = document.getElementById('drawing-tab-showing');
//     const div = document.createElement('div');
//     div.innerHTML = `
//     <img src="./Icon" alt="">
//     <p>Sorry!! No data available.</p>
//     `;
//     drawingTab.appendChild(div);
//     console.log(category_id);
//   }
// }

const blog = () =>{
  // window.open('http://127.0.0.1:5500/js/blog.html');
  window.location.href = './js/blog.html';
}


loadAllTubeItems();

handleTubeTab('1000');

// noDataAvailableDrawing();

