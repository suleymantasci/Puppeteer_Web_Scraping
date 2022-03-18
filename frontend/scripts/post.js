let posts = document.querySelector("#posts");

var quill = new Quill('#editor', {
  theme: 'snow'
});

let getPosts = async () => {
  var url_string = window.location.href
  var url = new URL(url_string);
  var link = url.searchParams.get("link");

  let response = await fetch("http://localhost:5000/api/elmaelma/post?link="+link);
  let data = await response.json();

  let title = document.querySelector("#title")
  let summary = document.querySelector("#summary")
  let image = document.querySelector("#image")
  let editor = document.querySelector("#editor .ql-editor")

  title.value = data.title
  summary.innerHTML = data.summary
  image.src = data.img
  editor.innerHTML = data.subject.trim()
};

getPosts();