<script setup>
import { auth } from "../firebase";
import axios from "axios";
import { ref } from "vue";
import { dataTemp } from "../store/index";
import Modal from "../components/Modal.vue";

const genre = ref(28);
const search = ref("");
const movies = ref(null);
const currentPage = ref(1);
const currentURL = ref("");
const pageTotal = ref(0);

const getTMDBData = async (url, options) => {
  movies.value = (
    await axios.get(url, {
      params: {
        api_key: "d12599abac794e3972643d18b8533667",
        region: "US",
        language: "en",
        include_adult: false,
        page: currentPage.value,
        ...options,
      },
    })
  ).data;
  pageTotal.value = movies.value.total_pages;
  currentURL.value = url;
};

const viewProduct = (data) => {
  dataTemp().viewTemp = data;
  dataTemp().isOpen = true;
};

if (!auth.currentUser) {
  router.push("/Login");
}
</script>

<template>
  <div>
    <div class="interface">
      <div class="select">
        <select v-model="genre">
          <option value="28">Action</option>
          <option value="10751">Family</option>
          <option value="878">Science Fiction</option>
          <option value="12">Adventure</option>
          <option value="14">Fantasy</option>
          <option value="10770">TV Movie</option>
          <option value="16">Animation</option>
          <option value="36">History</option>
          <option value="53">Thriller</option>
          <option value="35">Comedy</option>
          <option value="27">Horror</option>
          <option value="10752">War</option>
          <option value="80">Crime</option>
          <option value="10402">Music</option>
          <option value="37">Western</option>
          <option value="99">Documentary</option>
          <option value="9648">Mystery</option>
          <option value="18">Drama</option>
          <option value="10749">Romance</option>
        </select>
        <button
          @click="
            getTMDBData('https://api.themoviedb.org/3/discover/movie', {
              with_genres: genre,
            })
          "
        >
          Get
        </button>
      </div>
      <div class="search">
        <input type="search" placeholder="Search bar" v-model="search" />
        <button
          @click="
            currentPage = 1;
            getTMDBData('https://api.themoviedb.org/3/search/movie', { query: search });
          "
        >
          Search
        </button>
      </div>
    </div>
    <div class="pagination">
      <button
        @click="
          getTMDBData(
            currentURL,
            { with_genres: genre, query: search },
            currentPage == 1 ? 1 : currentPage--
          )
        "
      >
        Prev
      </button>
      <p>{{ `Page ${currentPage} of ${pageTotal}` }}</p>
      <button
        @click="
          getTMDBData(
            currentURL,
            { with_genres: genre, query: search },
            currentPage <= pageTotal ? currentPage++ : pageTotal
          )
        "
      >
        Next
      </button>
    </div>
    <div v-if="movies" class="products">
      <div v-for="movie in movies.results">
        <img
          :src="`https://image.tmdb.org/t/p/w500/${movie.poster_path}`"
          @click="viewProduct(movie)"
        />
      </div>
    </div>
    <div class="pagination" v-if="movies">
      <button
        @click="
          getTMDBData(
            currentURL,
            { with_genres: genre, query: search },
            currentPage == 1 ? 1 : currentPage--
          )
        "
      >
        Prev
      </button>
      <p>{{ `Page ${currentPage} of ${pageTotal}` }}</p>
      <button
        @click="
          getTMDBData(
            currentURL,
            { with_genres: genre, query: search },
            currentPage <= pageTotal ? currentPage++ : pageTotal
          )
        "
      >
        Next
      </button>
    </div>
  </div>
  <Modal v-if="dataTemp().isOpen" />
</template>

<style scoped>
.products {
  display: grid;
  grid-template-columns: repeat(5, auto);
  grid-template-rows: repeat(4, auto);
  gap: 15px;
  padding: 15px;
  background-color: #292929;
}

img {
  width: 100%;
  height: 100%;
  border-radius: 6px;
}

input {
  display: block;
  width: 400px;
  height: 45px;
  font-size: 25px;
  padding-left: 1%;
  box-sizing: border-box;
  border-radius: 4px;
}

button {
  font-size: 25px;
  font-family: cursive;
  border-radius: 6px;
  padding: 4.5px 15px;
}

select {
  display: block;
  height: 45px;
  font-size: 25px;
  padding-left: 1%;
  box-sizing: border-box;
  border-radius: 4px;
}

.interface {
  margin-top: 12px;
  margin-bottom: 10px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}
.select {
  display: flex;
  flex-direction: row;
}

.search {
  display: flex;
  flex-direction: row;
}
.pagination {
  display: flex;
  flex-direction: row;
  gap: 12px;
  justify-content: center;
}

.pagination button {
  font-size: 17px;
  font-family: cursive;
  border-radius: 6px;
  height: 50%;
  margin-top: auto;
  margin-bottom: auto;
}

.pagination > p {
  font-size: 18px;
  font-family: cursive;
  color: white;
}

.products {
  display: grid;
  grid-template-columns: repeat(5, auto);
  grid-template-rows: repeat(4, auto);
  gap: 15px;
  padding: 15px;
}
</style>
