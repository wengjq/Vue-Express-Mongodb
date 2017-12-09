<template lang='html'>
	<div class='list'>
		<table class='highlight centered responsive-table'>
      <thead>
        <tr>
          <th>电影海报</th>
          <th>电影名称</th>
          <th>简介</th>
          <th>评分</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for='movie of movies'>
          <td><img class="movie-poster" :src="movie.poster"></td>
          <td><h5>{{ movie.title }}</h5></td>
          <td><p class="movie-introduction">{{ movie.introduction }}</p></td>
          <td class="movie-rating">{{ movie.rating }}</td>
          <td>
            <a @click="showDetail(movie.title)" class="waves-effect waves-light btn"><i class="material-icons left">details</i>详细</a>
          	<a @click="openEditMovie(movie)" class="waves-effect waves-light btn"><i class="material-icons left">edit</i>修改</a>
          	<a @click="removeMovie(movie)" class="waves-effect waves-light btn"><i class="material-icons left">delete</i>删除</a>
          </td>
        </tr>
      </tbody>
    </table>
    <a @click="openAddMovieModal" class="btn-floating btn-large waves-effect waves-light"><i class="material-icons">add</i></a>
    <!-- 添加电影表单 -->
    <vodal :show="addMovieModal" animation="slideDown" :width="500" :height="480" :closeButton="false">
    	<div class="row">
        <div class="input-field col s12">
        	<i class="material-icons prefix">local_movies</i>
          <input v-model="title" id="movie_name" type="text" class="validate">
          <label v-show="!title" for="movie_name">电影名称</label>
        </div>
        <div class="input-field col s12">
        	<i class="material-icons prefix">picture_in_picture</i>
          <input v-model="poster" id="movie_poster" type="text" class="validate">
          <label v-show="!poster" for="movie_poster">海报地址</label>
        </div>
        <div class="input-field col s12">
        	<i class="material-icons prefix">description</i>
          <textarea v-model="introduction" id="movie_introduction" class="materialize-textarea"></textarea>
          <label v-show="!introduction" for="movie_introduction">简介</label>
        </div>
        <div class="input-field col s12">
        	<i class="material-icons prefix">star</i>
          <input v-model="rating" id="movie_rating" type="text" class="validate">
          <label v-show="!rating" for="movie_rating">评分</label>
        </div>
      </div>
      <div class="row">
        <a @click="addMovie" class="waves-effect waves-light btn"><i class="material-icons left">check</i>确定</a>
        <a @click="closeModal" class="waves-effect waves-light btn"><i class="material-icons left">undo</i>取消</a>
      </div>  
    </vodal>
    <!-- 编辑电影表单 -->
    <vodal :show="editMovieModal" animation="slideDown" :width="500" :height="480" :closeButton="false">
    	<div class="row">
        <div class="input-field col s12">
        	<i class="material-icons prefix">local_movies</i>
          <input v-model="title" id="movie_name" type="text" class="validate">
          <label v-show="!title" for="movie_name">电影名称</label>
        </div>
        <div class="input-field col s12">
        	<i class="material-icons prefix">picture_in_picture</i>
          <input v-model="poster" id="movie_poster" type="text" class="validate">
          <label v-show="!poster" for="movie_poster">海报地址</label>
        </div>
        <div class="input-field col s12">
        	<i class="material-icons prefix">description</i>
          <textarea v-model="introduction" id="movie_introduction" class="materialize-textarea"></textarea>
          <label v-show="!introduction" for="movie_introduction">简介</label>
        </div>
        <div class="input-field col s12">
        	<i class="material-icons prefix">star</i>
          <input v-model="rating" id="movie_rating" type="text" class="validate">
          <label v-show="!rating" for="movie_rating">评分</label>
        </div>
      </div>
      <div class="row">
        <a @click="editMovie" class="waves-effect waves-light btn"><i class="material-icons left">check</i>确定</a>
        <a @click="closeModal" class="waves-effect waves-light btn"><i class="material-icons left">undo</i>取消</a>
      </div>  
    </vodal>
	</div>
</template>

<script>
export default {
	name: 'List',
	created () {
    this.getMovies();
    document.title = this.$route.name
  },
  components: {},
  data () {
    return {
      title: '',
      poster: '',
      rating: null,
      introduction: '',
      movie_id: '',
      movies: [],
      addMovieModal: false,
      editMovieModal: false
    }
  },
  methods: {
    // 获取所有电影的方法
    getMovies () {
      this.$http.get('/api/movie')
        .then(res => {
          this.movies = res.data
        })
        .catch(err => {
          this.toastr.error(`${err.message}`, 'ERROR!')
        })
    },
    // 打开添加电影modal的方法
    openAddMovieModal() {
      this.addMovieModal = true
    },
    // 打开编辑电影modal的方法
    openEditMovie (movie) {
      this.editMovieModal = true
      this.title = movie.title
      this.rating = movie.rating
      this.introduction = movie.introduction
      this.poster = movie.poster
      this.movie_id = movie._id
    },
     // 关闭modal的方法
    closeModal () {
      this.addMovieModal = false
      this.editMovieModal = false
      this.title = ''
      this.rating = null
      this.poster = ''
      this.introduction = ''
      this.movie_id = ''
    },
    // 访问后端添加电影的方法
    addMovie () {
      this.$http.post('/api/movie', {
          title: this.title,
          poster: this.poster,
          introduction: this.introduction,
          rating: this.rating
        })
        .then(res => {
          this.toastr.success('添加电影成功')
          this.addMovieModal = false
          this.title = ''
          this.rating = null
          this.poster = ''
          this.introduction = ''
          this.movie_id = ''
          this.getMovies()
        })
        .catch(e => {
          this.toastr.warn('保存失败!')
          console.log(e)
        })
    },
    // 访问后端编辑电影的方法
    editMovie () {
      let id = this.movie_id
      this.$http.put(`/api/movie/${id}`, {
          title: this.title,
          poster: this.poster,
          introduction: this.introduction,
          rating: this.rating,
        })
        .then(res => {
          this.toastr.success("更新电影成功!")
          this.closeModal()
          this.getMovies()
          this.title = ''
          this.rating = null
          this.poster = ''
          this.introduction = ''
          this.movie_id = ''
        })
        .catch(err => console.log(err))
    },
     // 删除电影的方法
    removeMovie (movie) {
      let id = movie._id
      this.$http.delete(`/api/movie/${id}`)
        .then(res => {
          this.toastr.success("删除成功.")
          this.getMovies()
        })
        .catch(e => console.log(e))
    },
    // 跳转到电影详情页的方法
    showDetail (title) {
      this.$router.push(`/movie/${title}`)
    }
  }
}
</script>
<style lang="css">
table {
	table-layout: fixed;
}
.movie-poster {
	width: 100px;
}
.movie-introduction {
  white-space: normal;
  padding: 4px 4px;
  letter-spacing: 1px;
  font-size: 14px;
  text-align: left;
  text-indent: 2em;
}
.btn, .btn-floating  {
	background-color: #009dd7 !important;
}
.btn {
	padding: 0 1rem;
}
.input-field label {
  color: #009dd7 !important;
}
/* label focus color */
.input-field input[type=text]:focus + label {
  color: #009dd7 !important;
}
/* label underline focus color */
.input-field input[type=text]:focus {
  border-bottom: 1px solid #009dd7 !important;
  box-shadow: 0 1px 0 0 #009dd7 !important;
}
.input-field input[type=text].valid {
  border-bottom: 1px solid #009dd7 !important;
  box-shadow: 0 1px 0 0 #009dd7 !important;
}
/* invalid color */
.input-field input[type=text].invalid {
  border-bottom: 1px solid #009dd7 !important;
  box-shadow: 0 1px 0 0 #009dd7 !important;
}
/* icon prefix focus color */
.input-field .prefix.active {
  color: #009dd7 !important;
}

</style>