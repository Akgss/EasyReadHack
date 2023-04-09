const root = document.querySelector('html')

// Real cursor element
const cursor = document.createElement('div')
cursor.classList.add('cursor')
root.appendChild(cursor)

// Following extra cursor element
const follower = document.createElement('div')
follower.classList.add('cursor', 'cursor__follower')
root.appendChild(follower)

root.addEventListener('mousemove', (e) => {
  setPosition(follower, e)
  setPosition(cursor, e)
  scrolling = false;
})

function setPosition(element, e) {
  element.style.transform = `translate3d(${e.clientX + window.scrollX}px, ${e.clientY + window.scrollY}px, 0)`
}
