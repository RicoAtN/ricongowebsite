 //jshint esversion:6
require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const https = require("https");
const session = require('express-session');
const _ = require('lodash');

const app = express();
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true 
}));
app.use(express.static(__dirname + '/public'));
app.use("/static", express.static('./static/'));

// Render pages
app.get("/", function (req, res) {
  res.render("home");
});

app.get("/about", function (req, res) {
  res.render("about");
});

app.get("/portfolio", function (req, res) {
  res.render("portfolio");
});

// script for navbar and portfolio
if (typeof window !== "undefined") {
window.addEventListener('DOMContentLoaded', event => {

  // Navbar shrink function
  var navbarShrink = function () {
      const navbarCollapsible = document.body.querySelector('#mainNav');
      if (!navbarCollapsible) {
          return;
      }
      if (window.scrollY === 0) {
          navbarCollapsible.classList.remove('navbar-shrink')
      } else {
          navbarCollapsible.classList.add('navbar-shrink')
      }

  };

  // Shrink the navbar 
  navbarShrink();

  // Shrink the navbar when page is scrolled
  document.addEventListener('scroll', navbarShrink);

  // Activate Bootstrap scrollspy on the main nav element
  const mainNav = document.body.querySelector('#mainNav');
  if (mainNav) {
      new bootstrap.ScrollSpy(document.body, {
          target: '#mainNav',
          offset: 74,
      });
  };

  // Collapse responsive navbar when toggler is visible
  const navbarToggler = document.body.querySelector('.navbar-toggler');
  const responsiveNavItems = [].slice.call(
      document.querySelectorAll('#navbarResponsive .nav-link')
  );
  responsiveNavItems.map(function (responsiveNavItem) {
      responsiveNavItem.addEventListener('click', () => {
          if (window.getComputedStyle(navbarToggler).display !== 'none') {
              navbarToggler.click();
          }
      });
  });

    // Activate SimpleLightbox plugin for portfolio items
    new SimpleLightbox({
      elements: '#portfolio a.portfolio-box'
  });

});
}

//  run port
let port = process.env.PORT;
if (port == null || port == "") {
  port = 9000;
}
app.listen(port, function () {
  console.log("Server started on port 9000");
});
