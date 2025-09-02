var titles = [
  "@",
  "@R",
  "@RT",
  "@RTF",
  "@TF",
  "@F"
];

function changeTitle() {
  var index = 0;

  setInterval(function() {
      document.title = titles[index];
      index = (index + 1) % titles.length;
  }, 1000);
}

changeTitle();
