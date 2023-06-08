<script setup></script>

<template>
  <div class="footer">
    <div class="logo">
      <h1>StickMov</h1>
      <img src="../../img/Logo.png" />
    </div>
    <div>
      <h2>Contacts</h2>
      <h3>Number</h3>
      <p>123-456-7890</p>
      <h3>Email</h3>
      <p>Stickyum101@gmail.com</p>
    </div>
  </div>
</template>

<style scoped>
.footer {
  background-color: #212121;
  display: flex;
  padding-left: 2%;
  padding-top: 2.5%;
  padding-bottom: 1%;
}

.logo {
  display: flex;
  align-items: center;
  padding-right: 3%;
}

h1 {
  color: white;
  padding-right: 1%;
  font-family: cursive;
}

img {
  height: 40px;
}

h2 {
  color: white;
  font-family: cursive;
}

h3 {
  color: white;
  font-family: cursive;
}

p {
  color: white;
  font-family: cursive;
}
</style>
