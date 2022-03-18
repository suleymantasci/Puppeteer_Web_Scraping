let posts = document.querySelector("#posts");

let pagefunction = () => {
  var url_string = window.location.href
  var url = new URL(url_string);
  var link = url.searchParams.get("link");
  var link_url = new URL(link);
  var page = link_url.searchParams.get("page");
  return Number(page)
}


let getPosts = async (page) => {
  var url_string = window.location.href
  var url = new URL(url_string);
  var link = url.searchParams.get("link");

  let pageParam;
  if(page && page > 1){
    pageParam ="?page="+page
  }else{
    pageParam =""
  }

  let pageNumber = pagefunction() 
  if(pageNumber ==0){
    pageNumber = 1
  }
  let response = await fetch("http://localhost:5000/api/elmaelma/posts?link="+link+pageParam);
  let data = await response.json();
  data.map((res,i) => {
      let el = `
      <tr>
      <td>
      ${((pageNumber-1)*15) + (i+1)}
      </td>
      <td>
      <div style="width:200px">
      <img style="width:100%" src="${res.img}">
      </div>
      </td>
      <td>
      ${res.name}
      </td>
      <td>
      <a href="${"post.html?link="+res.url}" class="pickPost">Yazıya Git</a>
      </td>
      </tr>
      `
      posts.innerHTML += el
  })
};

getPosts();

let nextBtn = document.querySelector("#next-btn")
let prevBtn = document.querySelector("#prev-btn")


nextBtn.addEventListener("click", async function(){

  let page = pagefunction()
  if(page == 0){
    page = 2
  }else{
    page += 1 
  }

  location.href = "posts.html?link=https://www.elmaelma.com/saglik?page="+ page;
})

prevBtn.addEventListener("click",function(){

  let page = pagefunction() -1

  if(page && page >=1){
    location.href = "posts.html?link=https://www.elmaelma.com/saglik?page="+page;
  }
})

