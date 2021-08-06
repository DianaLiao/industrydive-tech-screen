

/* global variables */
const searchTextBox = document.querySelector("#id_text_search")
const selectForm = document.querySelector("ul.form-multiselect")
const allPosts = document.querySelectorAll("#archive > li")
const selectedTopics = []
let searchText = ""


/* event listeners */
searchTextBox.addEventListener("input", e => {
  setSearchText(e)
  filterByText(allPosts)
  // const filteredPosts = filterByTopic(allPosts)
  // filterByText(filteredPosts)
} )
selectForm.addEventListener("change", e => {
  setTopics(e)
  filterByTopic(allPosts)
  // const filteredPosts = filterByText(allPosts)
  // filterByTopic(filteredPosts)
})

/* setter functions */
function setSearchText(event){
  searchText = event.target.value.toLowerCase()
}

function setTopics(event){
  const clickedTopic = event.target.value
  const index = selectedTopics.indexOf(clickedTopic)

  if (index === -1){
    selectedTopics.push(clickedTopic)
  }
  else {
    selectedTopics.splice(index, 1)
  }
}

/* filtering functions */
function filterByText(posts){
  let filteredPosts = []

  posts.forEach(postLi => {
    const title = postLi.querySelector(".feed-link")
    const teaser = postLi.querySelector(".feed-teaser")
  

    const articleText = title.innerText.toLowerCase() + " " + teaser.innerText.toLowerCase()

    if (articleText.includes(searchText)){
      postLi.style.display = "block"
      filteredPosts.push(postLi)
    }
    else {
      postLi.style.display = "none"
      const index = filteredPosts.indexOf(postLi)
      filteredPosts.splice(index, 1)
    }
  })
  console.log(filteredPosts)
  return filteredPosts
}

function filterByTopic(posts){

  let filteredPosts = []
  const topicLis = selectForm.querySelectorAll("li")
  const topicChoices = Array.from(topicLis, topicLi => {
    const input = topicLi.querySelector("input")
    return {topicId: input.value, topicName: topicLi.innerText.trim()}
  })
  const selectedChoices = topicChoices.filter(choice => selectedTopics.includes(choice.topicId))
  const selectedTopicNames = selectedChoices.map(topic => topic.topicName)

  posts.forEach(postLi => {
    const postTopicTags = postLi.querySelectorAll(".label--tag")
    const postTopics = Array.from(postTopicTags, tag => tag.innerHTML)
 
    const isIncludedTopic = selectedTopicNames.some(e => postTopics.includes(e))

    if (selectedTopics !== [] && isIncludedTopic){
      postLi.style.display = "block"
      filteredPosts.push(postLi)
    }
    else if (selectedTopics.length == 0) {
      postLi.style.display = "block"
      filteredPosts = [...posts]
    }
    else {
      postLi.style.display = "none"
      const index = filteredPosts.indexOf(postLi)
      filteredPosts.splice(index, 1)
    }
  })
  return filteredPosts
}

