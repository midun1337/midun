const menuItems = document.querySelectorAll('.subs p');
const pict = document.querySelector('.pict');
const content = document.getElementById('content');

// default content
const defaultContent = {
  title: "Hi, who am I?",
  desc: "Just an ordinary person trying to be unique :)"
};

// data menu
const texts = {
  who: {
    title: "Who am I?",
    desc: "Again? Huh, okay. I'm a nudim, a person who is always curious about the world! I love exploring new things, learning, and experimenting."
  },
  am: {
    title: "What I Do",
    desc: "I'm currently learning web design, trying to build clean, minimalist projects. Sometimes I try to find things that people don't often look for, like bugs.🐞"
  },
  i: {
    title: "About Me",
    desc: "I am me 😎.  A one-of-a-kind individual who enjoys solving difficulties and creating things on the internet, such as inventing problems.  LoL.  Maybe..."
  }
};

function changeContent(newData) {
  content.classList.add("slide-out-left");
  setTimeout(() => {
    content.innerHTML = `
      <h2>${newData.title}</h2>
      <p>${newData.desc}</p>
    `;
    content.classList.remove("slide-out-left");
    content.classList.add("slide-in-right");
    setTimeout(() => {
      content.classList.remove("slide-in-right");
    }, 500);
  }, 500);
}

// render text default
document.addEventListener("DOMContentLoaded", () => {
  content.innerHTML = `
    <h2>${defaultContent.title}</h2>
    ${defaultContent.desc ? `<p>${defaultContent.desc}</p>` : ""}
  `;
});

// klik menu
menuItems.forEach(item => {
  item.addEventListener('click', () => {
    const target = item.getAttribute('data-target');
    changeContent(texts[target]);
  });
});

// klik pict → reset
pict.addEventListener('click', () => {
  changeContent(defaultContent);
});