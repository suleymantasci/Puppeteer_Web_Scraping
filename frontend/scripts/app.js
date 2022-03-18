let categories = document.querySelector("#categories");

let getCategories = async () => {
  let response = await fetch("http://localhost:5000/api/elmaelma/");
  let data = await response.json();
  console.log(data);
  data.map((res,i) => {
      let el = `
      <tr>
      <td>
      ${i+1}
      </td>
      <td>
      ${res.name}
      </td>
      <td>
      <a href="${"posts.html?link="+res.url}" class="pickCategory">Kategoriye Git</a>
      </td>
      </tr>
      `
      categories.innerHTML += el
  })
};

getCategories();
