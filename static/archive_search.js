

/* global variables */
const searchTextBox = document.querySelector("#id_text_search")
const selectForm = document.querySelector("ul.form-multiselect")
const allPosts = document.querySelectorAll("#archive > li")
const selectedTopics = []

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
  const clickedTopic = target.value
  const index = selectedTopics.indexOf(clickedTopic)

  if (index === -1){
    selectedTopics.push(clickedTopic)
  }
  else {
    selectedTopics.splice(index, 1)
  }
  
  const topicLis = selectForm.querySelectorAll("li")
  const topicChoices = Array.from(topicLis, topicLi => {
    const input = topicLi.querySelector("input")
    return {topicId: input.value, topicName: topicLi.innerText.trim()}
  })
  const selectedChoices = topicChoices.filter(choice => selectedTopics.includes(choice.topicId))
  const selectedTopicNames = selectedChoices.map(topic => topic.topicName)

  allPosts.forEach(postLi => {
    const postTopicTags = postLi.querySelectorAll(".label--tag")
    const postTopics = Array.from(postTopicTags, tag => tag.innerHTML)
 
    const isIncludedTopic = selectedTopicNames.some(e => postTopics.includes(e))

    console.log(selectedTopics)

    if (selectedTopics !== [] && isIncludedTopic){
      postLi.style.display = "block"
    }
    else if (selectedTopics.length == 0) {
      postLi.style.display = "block"
    }
    else {
      postLi.style.display = "none"
    }
  })

}

