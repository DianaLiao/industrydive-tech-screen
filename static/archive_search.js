

/* global variables */
const searchTextBox = document.querySelector("#id_text_search")
const selectForm = document.querySelector("ul.form-multiselect")
const allPosts = document.querySelectorAll("#archive > li")

/* event listeners */
searchTextBox.addEventListener("input", filterByText)
selectForm.addEventListener("change", filterByTopic)

/* filtering functions */

function filterByText(event){
  const searchText = event.target.value.toLowerCase()

  allPosts.forEach(postLi => {
    const title = postLi.querySelector(".feed-link")
    const teaser = postLi.querySelector(".feed-teaser")

    const articleText = title.innerText.toLowerCase() + " " + teaser.innerText.toLowerCase()

    if (articleText.includes(searchText)){
      postLi.style.display = "block"
    }
    else {
      postLi.style.display = "none"
    }
  })
}

function filterByTopic({target}){
  console.log(target.value)
}

