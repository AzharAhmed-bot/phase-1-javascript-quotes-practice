document.addEventListener("DOMContentLoaded",()=>{
    
    function displayQuotes() {
        fetch("http://localhost:3000/quotes")
          .then(resp => resp.json())
          .then(data => {
            data.forEach(quotes => {
              const quote = document.querySelector(".quote");
              const list = document.createElement("li");
              list.classList.add("quote-card");
              list.innerHTML = `
                <div class="card">
                  <div class="card-body">
                    <blockquote class="blockquote">
                      <p class="mb-0">${quotes.quote}</p>
                      <footer class="blockquote-footer">${quotes.author}</footer>
                      <br>
                      <button class='btn-success' data-id=${quotes.id}>Likes: <span>${quotes.like}</span></button>
                      <button class='btn-danger'  data-id=${quotes.id}>Delete</button>
                    </blockquote>
                  </div>
                </div>
              `;
            
              quote.appendChild(list);
            });
      
            const deleteBtns = document.querySelectorAll(".btn-danger");
            deleteBtns.forEach(deleteBtn => {
              deleteBtn.addEventListener("click", () => {
                const likeId = deleteBtn.getAttribute("data-id");
                console.log('clicked')
              fetch(`http://localhost:3000/quotes/${likeId}`,{
                method: 'DELETE',
                headers:{
                    'Content-Type':'Application/json'
                }
              })
              .then(res=>res.json())
              .then((data)=>{
                console.log(data)
                deleteBtn.parentElement.parentElement.parentElement.remove();
            })
              });
              });
              //-------------------------------------------------------------------------------------//
          const likeBtns=document.querySelectorAll(".btn-success")
         //const spanNum=document.querySelectorAll('span')
         //const newSPanNum=spanNum+1
          likeBtns.forEach(likeBtn=>{
            likeBtn.addEventListener('click',()=>{
                const likeId = likeBtn.getAttribute("data-id");
            console.log('clicked')
            const span = likeBtn.querySelector('span');
           let spanNum=parseInt(span.textContent)
          spanNum++
           span.textContent=spanNum
           fetch(`http://localhost:3000/quotes/${likeId}`,{
            method:'PATCH',
            headers:{
                'Content-Type':'Application/json'
            },
              body:JSON.stringify({
                
               like: spanNum

            })
        })
            .then(resp=>resp.json())
            .then(data=>{console.log(data)
                span.textContent = data.like
            })
        
        
            })
          })
           
          });
      }
      
displayQuotes();

function addQuote(){
 const quoteForm=document.querySelector("#new-quote-form")
 const quoteInput= document.querySelector("#new-quote")
 const quoteAuthor= document.querySelector("#author")

 


 //const submitBtn=document.querySelector(".btn btn-primary")
 quoteForm.addEventListener("submit",(e)=>{
    e.preventDefault();
   // console.log("clicked")
   const quoteInputValue=quoteInput.value
   const quoteAuthorValue=quoteAuthor.value
    console.log(quoteInputValue)
    console.log(quoteAuthorValue)
    fetch("http://localhost:3000/quotes",{
    method: 'POST',
    headers: {
        'Content-Type':'application/json'
    },
    body: JSON.stringify({
     quote: quoteInputValue,
     author: quoteAuthorValue
    }) 
    })
    .then(resp=>resp.json())
    .then(data=>console.log(data))
    
    quoteForm.reset() 
 })
 
}
addQuote()






})