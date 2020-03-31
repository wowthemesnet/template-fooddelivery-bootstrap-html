//food menu  tabs
const buttons = document.querySelectorAll('.button');
const menus = document.querySelectorAll('.menu');

const highlight = document.createElement('span');
document.body.appendChild(highlight);
highlight.classList.add('highlight');

// Set initial dimensions and position of 'highlight' based on activeButton coords 
function initialHightlightLocation() {
  const activeButton = document.querySelector('.button--is-active');
  const activeButtonCoords = activeButton.getBoundingClientRect();

  const initialCoords = {
    width: activeButtonCoords.width,
    height: activeButtonCoords.height,
    left: activeButtonCoords.left + window.scrollX,
    top: activeButtonCoords.top + window.scrollY
  }

  highlight.style.width = `${initialCoords.width}px`;
  highlight.style.height = `${initialCoords.height}px`;
  highlight.style.transform = `translate(${initialCoords.left}px, ${initialCoords.top}px)`;
}

function handleClick(e) {
  e.preventDefault();

  buttons.forEach(button => button.classList.remove('button--is-active'));
  this.classList.add('button--is-active');

  // Set current dimensions and position of 'highlight' based on the clicked button 
  const buttonCoords = this.getBoundingClientRect();
  const coords = {
    width: buttonCoords.width,
    height: buttonCoords.height,
    left: buttonCoords.left + window.scrollX,
    top: buttonCoords.top + window.scrollY
  }
  highlight.style.width = `${coords.width}px`;
  highlight.style.height = `${coords.height}px`;
  highlight.style.transform = `translate(${coords.left}px, ${coords.top}px)`;

  // Show the menu associated to the clicked button
  const targetMenu = document.querySelector(`#${this.dataset.target}`);
  menus.forEach(menu => {
    menu.classList.remove('menu--is-visible');
    targetMenu.classList.add('menu--is-visible');
  })
}

window.addEventListener('load', initialHightlightLocation);
window.addEventListener('resize', initialHightlightLocation);
buttons.forEach(button => button.addEventListener('click', handleClick));


//mycart
$(function () {

  var goToCartIcon = function($addTocartBtn){
    var $cartIcon = $(".my-cart-icon");
    var $image = $('<img width="30px" height="30px" src="' + $addTocartBtn.data("image") + '"/>').css({"position": "fixed", "z-index": "999"});
    $addTocartBtn.prepend($image);
    var position = $cartIcon.position();
    $image.animate({
      top: position.top,
      left: position.left
    }, 500 , "linear", function() {
      $image.remove();
    });
  }

  $('.my-cart-btn').myCart({
    classCartIcon: 'my-cart-icon',
    classCartBadge: 'my-cart-badge',
    affixCartIcon: true,
    checkoutCart: function(products) {
      $.each(products, function(){
        console.log(this);
      });
    },
    clickOnAddToCart: function($addTocart){
      goToCartIcon($addTocart);
    },
    getDiscountPrice: function(products) {
      var total = 0;
      $.each(products, function(){
        total += this.quantity * this.price;
      });
      return total * 0.5;
    }
  });

});