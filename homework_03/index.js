((count = 5) => {
  const button = document.getElementById("buttonClickMe");
  button.innerHTML = count.toString();

  window.addEventListener( 'load', () => {
    Promise.resolve().then( () => {
      console.log( 'start' );
    });

    button.classList.add("active");
  });

  const interval = setInterval(() => {
    queueMicrotask( () => console.log( count ));
    queueMicrotask( () => count-- );
    button.innerHTML = count.toString();
  }, 1000);

  setTimeout(() => {
    Promise.resolve().then( () => {
      clearInterval(interval);
    });

    button.classList.remove("active");
    button.classList.add("disactive");

    console.log( 'end' );
  },  (count + 1) * 1000);
})(10);