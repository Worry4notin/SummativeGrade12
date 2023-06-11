<script setup>
import axios from "axios";
import { ref } from "vue";
import { useRouter } from "vue-router";
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
  console.log(movies.value.page)
};

const viewProduct = (data) => {
    dataTemp().viewTemp = data;
    dataTemp().isOpen = true;
}
</script>

 <template>
  <div>
    <div class="controls">
      <div>
        <input type="search" placeholder="Enter search items" v-model="search" />
        <button @click=" getTMDBData('https://api.themoviedb.org/3/search/movie', { query: search, })">Search</button>
      </div>
      <div>
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
        <button @click="getTMDBData('https://api.themoviedb.org/3/discover/movie', { with_genres: genre,})">Get</button>
      </div>
    </div>
    <div class="pagination">
      <button @click=" getTMDBData(currentURL,{with_genres: genre , query: search,},currentPage == 1 ? 1 : currentPage--)">Prev</button>
      <p>{{ `Page ${currentPage} of ${pageTotal}` }}</p>
      <button @click="getTMDBData(currentURL,{with_genres: genre, query: search,},currentPage <= pageTotal ? currentPage++ : pageTotal )">Next</button>
    </div>
    <div v-if="movies" class="tiles">
      <div v-for="movie in movies.results">
        <img :src="`https://image.tmdb.org/t/p/w500/${movie.poster_path}`" @click="viewProduct(movie)"/>
      </div>
    </div>
  </div>
  <Modal v-if="dataTemp().isOpen" />
</template>

<style scoped>
</style>