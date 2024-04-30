<template>
  <div class="about container">
    <h1>About Me</h1>
    <img src="@/assets/home-icon.png" alt="page logo">
    <table class="table">
      <tbody>
        <tr>
          <th class="col">Name</th>
          <td class="col">Aung Khant Kyaw</td>
        </tr>
        <tr>
          <th class="col">Hometown</th>
          <td class="col">Mandalay</td>
        </tr>
        <tr>
          <th class="col">Education</th>
          <td class="col">Swinburne University of Technology</td>
        </tr>
        <tr>
          <th class="col">Hobies</th>
          <td class="col">Reading Manga, Watching movies and anime</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>

</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;600&display=swap');

body {
  font-family: 'Open Sans', sans-serif;
  color: #333;
  background-color: #f4f4f4;
}

h1 {
  margin: 70px auto 20px auto;
  font-size: 2.5em;
  text-align: center;
  color: #2c3e50;
}

img {
  display: block;
  height: 100px;
  margin: 20px auto 30px auto;
}

.table {
  margin: 0 auto;
  width: 80%;
  background-color: #fff;
  box-shadow: 0 0 10px rgba(0,0,0,0.1);
  border-collapse: collapse;
  margin-bottom: 40px;
}

.col {
  padding: 15px;
  text-align: left;
  border-bottom: 1px solid #eee;
}

.col:nth-child(odd) {
  background-color: #f9f9f9;
}

.col th {
  font-weight: 600;
  color: #27ae60;
}

@media screen and (max-width: 768px) {
  .table {
    width: 95%;
  }

  h1 {
    font-size: 2em;
  }
}
</style>
